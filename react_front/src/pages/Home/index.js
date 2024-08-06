import React, { Component } from 'react'
import {Badge, Button, Card, Col, Container, ListGroup, Navbar, Row} from "react-bootstrap";
import {Link} from "react-router-dom";
import Header from "../../components/Header";

export default class Home extends Component {
  render() {
    return (
      <>
        <Header/>

        <Container className={"container mt-3"}>
          <Button variant={"success"}>Kamerayı Aç</Button>
          <Button variant={"danger ml-2"}>Kamerayı Kapat</Button>
          <br/>
          <Row className={"mt-3"}>
            <Col md={7}>
              <Card>
                <Card.Header>Barkod Okuyucu</Card.Header>
                <Card.Body>
                  <div>
                    Bulunan Barkod: 123
                  </div>
                </Card.Body>
              </Card>
            </Col>
            <Col md={5}>
              <Card>
                <Card.Header>Sepet</Card.Header>
                <Card.Body>
                  <ListGroup>
                    <ListGroup.Item className={"d-flex justify-content-between align-items-center"}>
                      Macbook x 1

                      <Badge pill bg={"success"} className={"text-white"}>53000 ₺</Badge>
                    </ListGroup.Item>
                  </ListGroup>
                </Card.Body>
                <Card.Footer>
                  Total Ücret: 53000₺
                </Card.Footer>
              </Card>
            </Col>
          </Row>
        </Container>
      </>
    )
  }
}
