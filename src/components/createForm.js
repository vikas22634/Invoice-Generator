// Import React and other necessary libraries
import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import InputGroup from "react-bootstrap/InputGroup";
import { useNavigate } from "react-router-dom";
import InvoiceModal from "./InvoiceModal";
import InvoiceItem from "./InvoiceItem";
import { nanoid } from "nanoid";

const initialData = {
  currency: "$",
  currentDate: "",
  invoiceNumber: 1,
  dateOfIssue: "",
  billTo: "",
  billToEmail: "",
  billToAddress: "",
  billFrom: "",
  billFromEmail: "",
  billFromAddress: "",
  notes: "",
  total: "0.00",
  subTotal: "0.00",
  taxRate: "",
  taxAmount: "0.00",
  discountRate: "",
  discountAmount: "0.00",
  items: [
    {
      id: 0,
      name: "",
      description: "",
      price: "1.00",
      quantity: 1,
    },
  ],
};

function CreateForm() {
  const [data, setData] = useState(initialData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const params = {};

  console.log({ data });

  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate("/");
  };

  const handleChange = (key, value) => {
    setData({ ...data, [key]: value });
  };

  const handleRemoveItem = (itemId) => {
    const updatedItems = data.items.filter((item) => item.id !== itemId);
    setData({ ...data, items: updatedItems });
  };

  const handleCalculateTotal = () => {
    const subTotal = data.items.reduce((acc, item) => {
      const itemPrice = parseFloat(item.price).toFixed(2);
      return acc + itemPrice * item.quantity;
    }, 0);
    const taxAmount = (subTotal * (data.taxRate / 100)).toFixed(2);
    const discountAmount = (subTotal * (data.discountRate / 100)).toFixed(2);
    const total = (subTotal - discountAmount + parseFloat(taxAmount)).toFixed(
      2
    );

    setData({ ...data, subTotal, taxAmount, discountAmount, total });
  };

  const openModal = (event) => {
    event.preventDefault();
    handleCalculateTotal();
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  const handleAddItem = () => {
    const newItem = {
      id: data.items.length,
      name: "",
      description: "",
      price: "1.00",
      quantity: 1,
    };

    setData({ ...data, items: [...data.items, newItem] });
  };

  return (
    <>
      <InvoiceModal
        showModal={isModalOpen}
        closeModal={closeModal}
        data={data}
        type={params?.formType ?? "create"}
      />

      <Form onSubmit={openModal}>
        <Row className="my-3 align-items-center">
          <Col md={1}>
            <Button
              variant="primary"
              className="d-block"
              onClick={handleButtonClick}
            >
              Back
            </Button>
          </Col>
          <Col md={11} className="text-md-start text-center mt-2 mt-md-0">
            <h2>
              {params?.formType === "edit"
                ? `Edit Invoice Id#: ${params?.id}`
                : "Create New Invoice"}
            </h2>
          </Col>
        </Row>

        <Row>
          <Col md={8} lg={9}>
            <Card className="p-4 p-xl-5 my-3 my-xl-4">
              <div className="d-flex flex-row align-items-start justify-content-between mb-3">
                <div className="d-flex flex-column">
                  <div className="d-flex flex-column">
                    <div className="mb-2">
                      <span className="fw-bold">Current&nbsp;Date:&nbsp;</span>
                      <span className="current-date">
                        {new Date().toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  <div className="d-flex flex-row align-items-center">
                    <span className="fw-bold d-block me-2">Due&nbsp;Date:</span>
                    <Form.Control
                      type="date"
                      value={data.dateOfIssue}
                      name={"dateOfIssue"}
                      onChange={(event) =>
                        handleChange("dateOfIssue", event.target.value)
                      }
                      style={{
                        maxWidth: "150px",
                      }}
                      required="required"
                    />
                  </div>
                </div>
                <div className="d-flex flex-row align-items-center">
                  <span className="fw-bold me-2">
                    Invoice&nbsp;Number:&nbsp;
                  </span>
                  <Form.Control
                    type="number"
                    value={data.invoiceNumber}
                    name={"invoiceNumber"}
                    onChange={(event) =>
                      handleChange("invoiceNumber", event.target.value)
                    }
                    min="1"
                    style={{
                      maxWidth: "70px",
                    }}
                    required="required"
                  />
                </div>
              </div>
              <hr className="my-4" />
              <Row className="mb-5">
                <Col>
                  <Form.Label className="fw-bold">Bill to:</Form.Label>
                  <Form.Control
                    placeholder={"Who is this invoice to?"}
                    rows={3}
                    value={data.billTo}
                    type="text"
                    name="billTo"
                    className="my-2"
                    onChange={(event) =>
                      handleChange("billTo", event.target.value)
                    }
                    autoComplete="name"
                    required="required"
                  />
                  <Form.Control
                    placeholder={"Email address"}
                    value={data.billToEmail}
                    type="email"
                    name="billToEmail"
                    className="my-2"
                    onChange={(event) =>
                      handleChange("billToEmail", event.target.value)
                    }
                    autoComplete="email"
                    required="required"
                  />
                  <Form.Control
                    placeholder={"Billing address"}
                    value={data.billToAddress}
                    type="text"
                    name="billToAddress"
                    className="my-2"
                    autoComplete="address"
                    onChange={(event) =>
                      handleChange("billToAddress", event.target.value)
                    }
                    required="required"
                  />
                </Col>
                <Col>
                  <Form.Label className="fw-bold">Bill from:</Form.Label>
                  <Form.Control
                    placeholder={"Who is this invoice from?"}
                    rows={3}
                    value={data.billFrom}
                    type="text"
                    name="billFrom"
                    className="my-2"
                    onChange={(event) =>
                      handleChange("billFrom", event.target.value)
                    }
                    autoComplete="name"
                    required="required"
                  />
                  <Form.Control
                    placeholder={"Email address"}
                    value={data.billFromEmail}
                    type="email"
                    name="billFromEmail"
                    className="my-2"
                    onChange={(event) =>
                      handleChange("billFromEmail", event.target.value)
                    }
                    autoComplete="email"
                    required="required"
                  />
                  <Form.Control
                    placeholder={"Billing address"}
                    value={data.billFromAddress}
                    type="text"
                    name="billFromAddress"
                    className="my-2"
                    autoComplete="address"
                    onChange={(event) =>
                      handleChange("billFromAddress", event.target.value)
                    }
                    required="required"
                  />
                </Col>
              </Row>
              {/* +++++++++++++++++++++++++++++++++++++ */}
              <InvoiceItem
                items={data.items}
                currency={data.currency}
                onRowAdd={handleAddItem}
                onRowDel={handleRemoveItem}
                onItemChange={(itemId, key, value) => {
                  const updatedItems = data.items.map((item) => {
                    if (item.id === itemId) {
                      return { ...item, [key]: value };
                    }
                    return item;
                  });
                  setData({ ...data, items: updatedItems });
                }}
              />

              {/* +++++++++++++++++++++++++++++++++++++ */}
              <Row className="mt-4 justify-content-end">
                <Col lg={6}>
                  <div className="d-flex flex-row align-items-start justify-content-between">
                    <span className="fw-bold">Subtotal:</span>
                    <span>
                      {data.currency}
                      {data.subTotal}
                    </span>
                  </div>
                  <div className="d-flex flex-row align-items-start justify-content-between mt-2">
                    <span className="fw-bold">Discount:</span>
                    <span>
                      <span className="small ">
                        ({data.discountRate || 0}%)
                      </span>
                      {data.currency}
                      {data.discountAmount || 0}
                    </span>
                  </div>
                  <div className="d-flex flex-row align-items-start justify-content-between mt-2">
                    <span className="fw-bold">Tax:</span>
                    <span>
                      <span className="small ">({data.taxRate || 0}%)</span>
                      {data.currency}
                      {data.taxAmount || 0}
                    </span>
                  </div>
                  <hr />
                  <div
                    className="d-flex flex-row align-items-start justify-content-between"
                    style={{
                      fontSize: "1.125rem",
                    }}
                  >
                    <span className="fw-bold">Total:</span>
                    <span className="fw-bold">
                      {data.currency}
                      {data.total || 0}
                    </span>
                  </div>
                </Col>
              </Row>
              <hr className="my-4" />
              <Form.Label className="fw-bold">Notes:</Form.Label>
              <Form.Control
                placeholder="Thanks for your business!"
                name="notes"
                value={data.notes}
                onChange={(event) => handleChange("notes", event.target.value)}
                as="textarea"
                className="my-2"
                rows={1}
              />
            </Card>
          </Col>
          <Col md={4} lg={3}>
            <div className="sticky-top pt-md-3 pt-xl-4">
              <Button
                variant="primary"
                type="submit"
                className="d-block w-100"
                onClick={() => setIsModalOpen(true)}
              >
                Review Invoice
              </Button>

              <Form.Group className="mb-3">
                <Form.Label className="fw-bold">Currency:</Form.Label>
                <Form.Select
                  onChange={(event) =>
                    handleChange("currency", event.target.value)
                  }
                  className="btn btn-light my-1"
                  aria-label="Change Currency"
                >
                  <option value="$">USD (United States Dollar)</option>
                  <option value="£">GBP (British Pound Sterling)</option>
                  <option value="¥">JPY (Japanese Yen)</option>
                  <option value="$">CAD (Canadian Dollar)</option>
                  <option value="$">AUD (Australian Dollar)</option>
                  <option value="$">SGD (Singapore Dollar)</option>
                  <option value="¥">CNY (Chinese Renminbi)</option>
                  <option value="₿">BTC (Bitcoin)</option>
                </Form.Select>
              </Form.Group>
              <Form.Group className="my-3">
                <Form.Label className="fw-bold">Tax rate:</Form.Label>
                <InputGroup className="my-1 flex-nowrap">
                  <Form.Control
                    name="taxRate"
                    type="number"
                    value={data.taxRate}
                    onChange={(event) =>
                      handleChange("taxRate", event.target.value)
                    }
                    className="bg-white border"
                    placeholder="0.0"
                    min="0.00"
                    step="0.01"
                    max="100.00"
                  />
                  <InputGroup.Text className="bg-light fw-bold text-secondary small">
                    %
                  </InputGroup.Text>
                </InputGroup>
              </Form.Group>
              <Form.Group className="my-3">
                <Form.Label className="fw-bold">Discount rate:</Form.Label>
                <InputGroup className="my-1 flex-nowrap">
                  <Form.Control
                    name="discountRate"
                    type="number"
                    value={data.discountRate}
                    onChange={(event) =>
                      handleChange("discountRate", event.target.value)
                    }
                    className="bg-white border"
                    placeholder="0.0"
                    min="0.00"
                    step="0.01"
                    max="100.00"
                  />
                  <InputGroup.Text className="bg-light fw-bold text-secondary small">
                    %
                  </InputGroup.Text>
                </InputGroup>
              </Form.Group>
            </div>
          </Col>
        </Row>
      </Form>
    </>
  );
}

export default CreateForm;
