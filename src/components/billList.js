import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { BiTrash, BiShowAlt, BiWindowOpen } from "react-icons/bi";

const header = [
  { name: "Invoice Id", key: "id" },
  { name: "Invoice number", key: "invoiceNumber" },
  { name: "Due date", key: "dateOfIssue" },
  { name: "Bill to", key: "billTo" },
  { name: "Bill from", key: "billFrom" },
  { name: "Total", key: "total" },
  { name: "Actions", key: "actions" },
];

const BillList = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [viewInvoiceId, setViewInvoiceId] = useState(null);
  const navigate = useNavigate();

  // Use useState to manage the list of invoices
  const [parseInvoices, setParseInvoices] = useState(() => {
    const savedNotes = JSON.parse(localStorage.getItem("invoice-list"));
    return Array.isArray(savedNotes) ? savedNotes : [];
  });

  // const handleView = (id) => {
  //   setViewInvoiceId(id);
  //   setIsOpen(true);
  // };

  const handleDelete = (id) => {
    const updatedInvoices = parseInvoices.filter(
      (invoice) => invoice.id !== id
    );
    setParseInvoices(updatedInvoices);
  };

  return (
    <Container>
      <Row className="my-3">
        <Col>
          <h2>Invoice List</h2>
        </Col>
        <Col className="d-flex justify-content-end">
          <Button
            variant="primary"
            className="d-block"
            onClick={() => navigate("/createInvoice")}
          >
            Create New Invoice
          </Button>
        </Col>
      </Row>
      <Card className="p-4 p-xl-5 my-3 my-xl-4">
        <Table style={{ minHeight: "200px" }} responsive>
          <thead>
            <tr>
              {header.map((item) => (
                <th key={item.key}>{item.name}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {parseInvoices.map((item) => {
              return (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.invoiceNumber}</td>
                  <td>{item.dateOfIssue}</td>
                  <td>{item.billTo}</td>
                  <td>{item.billFrom}</td>
                  <td>{item.total}</td>
                  <td>
                    {/* <BiShowAlt
                      style={{
                        height: "23px",
                        width: "23px",
                        padding: "4.5px",
                      }}
                      className="text-white btn btn-primary"
                      onClick={() => handleView(item.id)}
                    /> */}

                    <BiTrash
                      style={{
                        height: "23px",
                        width: "23px",
                        padding: "4.5px",
                      }}
                      className="text-white btn btn-danger"
                      onClick={() => handleDelete(item.id)}
                    />
                  </td>
                </tr>
              );
            })}
            {parseInvoices.length === 0 && (
              <tr>
                <td colSpan={header.length}>
                  <div
                    className="d-flex flex-column align-items-center w-100"
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      minHeight: "200px",
                    }}
                  >
                    No invoices added
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </Card>
    </Container>
  );
};

export default BillList;
