import React, { Component } from 'react'
import {Navbar} from "react-bootstrap";
import {Link} from "react-router-dom";

export default class Header extends Component {
  render() {
    return (
     <>
         <Navbar bg="dark" variant="dark">
             <Navbar.Brand as={Link} to={"/"}>mBarcode</Navbar.Brand>
         </Navbar>
     </>
    )
  }
}
