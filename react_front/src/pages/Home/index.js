import React, {Component, createRef} from 'react'
import {Badge, Button, Card, Col, Container, ListGroup, Row} from "react-bootstrap";
import Header from "../../components/Header";
import RestClient from "../../RestAPI/RestClient";
import AppUrl from "../../RestAPI/AppUrl";
import Notification from "../../RestAPI/Notification";
import {Helmet} from "react-helmet";

export default class Home extends Component {

    constructor(props) {
        super(props);

        this.state = {
            barcode: '',
            order: [],
            totalPrice: 0
        }

        this.videoRef = createRef();
        this.canvasRef = createRef();
        this.intervalId = null;


    }

    openCamera = () => {
        navigator.mediaDevices.getUserMedia({video: {width: 800, height: 500}}).then(stream => {
            this.videoRef.current.srcObject = stream;
            this.videoRef.current.play();

            const canvas = this.canvasRef.current;
            const ctx = canvas.getContext("2d");

            const barcode = new window.BarcodeDetector({formats: ["qr_code", "ean_13"]});

            this.intervalId = setInterval(() => {
                canvas.width = this.videoRef.current.videoWidth / 1.35;
                canvas.height = this.videoRef.current.videoHeight;

                ctx.drawImage(this.videoRef.current, 0, 0, this.videoRef.current.videoWidth, this.videoRef.current.videoHeight);

                barcode.detect(canvas).then(([data]) => {
                    if (data) {
                        this.setState({
                            barcode: data.rawValue
                        });
                    }
                })

            }, 100);

        })
    }

    componentWillUnmount() {
        this.stopCamera();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevState.barcode !== this.state.barcode && this.state.barcode !== '') {
            this.addOrder();
        }
    }

    addOrder = () => {
        const {barcode, order, totalPrice} = this.state;

        RestClient.postRequest(AppUrl.product, {
            barcode
        }).then((res) => {
            const status = res.status;
            const result = res.data;

            if (status === 200) {
                let newOrder = [...order, {
                    pd_barcode: result.data.pd_barcode,
                    pd_name: result.data.pd_name,
                    pd_price: result.data.pd_price,
                }];

                let newPrice = totalPrice + result.data.pd_price;

                this.setState({
                    order: newOrder,
                    totalPrice: newPrice
                })
            } else {
                Notification.error(result);
            }
        }).catch((err) => {
            console.log(err);
            Notification.error({
                title: "Hata",
                message: "Bir Hata Oluştu. Lütfen daha sonra tekrar deneyiniz"
            });
        })
    }

    stopCamera = () => {
        if (this.videoRef.current && this.videoRef.current.srcObject) {
            const stream = this.videoRef.current.srcObject;
            const tracks = stream.getTracks();
            tracks.forEach(track => track.stop());
            this.videoRef.current.srcObject = null;
        }

        if (this.intervalId) {
            clearInterval(this.intervalId);
            this.intervalId = null;

            this.setState({
                barcode: '',
                order: []
            })
        }

        const canvas = this.canvasRef.current;
        if (canvas) {
            const ctx = canvas.getContext("2d");
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        }
    }

    render() {
        const {barcode, order, totalPrice} = this.state;

        return (
            <>
                <Header/>

                <Helmet>
                    <meta charSet="utf-8"/>
                    <title>mBarcode | MFSoftware Blog</title>
                </Helmet>

                <Container className={"container mt-3"}>
                    <Button variant={"success"} onClick={() => this.openCamera()}>Kamerayı Aç</Button>
                    <Button variant={"danger ml-2"} onClick={() => this.stopCamera()}>Kamerayı Kapat</Button>
                    <br/>
                    <Row className={"mt-3"}>
                        <Col md={7}>
                            <Card>
                                <Card.Header>Barkod Okuyucu</Card.Header>
                                <Card.Body>
                                    <video ref={this.videoRef} muted playsInline hidden/>
                                    <canvas ref={this.canvasRef}/>
                                    <br/>
                                    {(barcode) && (
                                        <div>
                                            Bulunan Barkod : {barcode}
                                        </div>
                                    )}
                                </Card.Body>
                            </Card>
                        </Col>
                        {(order.length > 0) &&
                            <Col md={5}>
                                <Card>
                                    <Card.Header>Sepet</Card.Header>
                                    <Card.Body>
                                        <ListGroup>
                                            {order.map((item, index) => {
                                                return (
                                                    <ListGroup.Item key={index}
                                                                    className={"d-flex justify-content-between align-items-center"}>
                                                        {item.pd_name} x 1

                                                        <Badge pill bg={"success"}
                                                               className={"text-white"}>{item.pd_price} ₺</Badge>
                                                    </ListGroup.Item>
                                                )
                                            })}
                                        </ListGroup>
                                    </Card.Body>
                                    <Card.Footer>
                                        Total Ücret: {totalPrice} ₺
                                    </Card.Footer>
                                </Card>
                            </Col>
                        }
                    </Row>
                </Container>
            </>
        )
    }
}
