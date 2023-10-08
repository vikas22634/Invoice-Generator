// import React, { useState } from "react";
import "./App.css";
import Router from "./router";
// import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; // Import BrowserRouter and related components
// import BillList from "./components/billList";
// import CreateList from "./components/createList";
import "bootstrap/dist/css/bootstrap.min.css";
// import BillList from "./components/billList";
import Container from "react-bootstrap/Container";
import { RouterProvider } from "react-router-dom";

function App() {
  return (
    <div className="App d-flex flex-column align-items-center w-100">
      <Container>
        <RouterProvider router={Router} />
      </Container>
    </div>
  );
}

export default App;
