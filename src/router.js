import React from "react";
import { createBrowserRouter } from "react-router-dom";
import BillList from "./components/billList";
import CreateForm from "./components/createForm";

const Router = createBrowserRouter([
  {
    path: "/",
    element: <BillList />,
  },
  {
    path: "/createInvoice", // Correct the path here
    element: <CreateForm />,
  },
]);

export default Router;
