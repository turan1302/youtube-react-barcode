import React, { Component } from 'react'
import {Navigate, Route, Routes} from "react-router-dom";
import Home from "../pages/Home";

export default class AppRouter extends Component {
  render() {
    return (
    <Routes>
        <Route path={"/"} element={<Home/>}/>
        <Route path={"*"} element={<Navigate to={"/"}/>}/>
    </Routes>
    )
  }
}
