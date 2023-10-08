import React from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { BiTrash } from "react-icons/bi";
import Form from "react-bootstrap/Form";
// import InvoiceModal from "./InvoiceModal";
export default function InvoiceItem({
  items,
  currency,
  onRowAdd,
  onRowDel,
  onItemChange,
}) {
  return (
    <div>
      <Table>
        <thead>
          <tr>
            <th>ITEM</th>
            <th>QTY</th>
            <th>PRICE/RATE</th>
            <th className="text-center">ACTION</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id}>
              <td style={{ width: "100%" }}>
                <Form.Control
                  type="text"
                  value={item.name}
                  name="name"
                  placeholder="Item name"
                  onChange={(event) =>
                    onItemChange(item.id, "name", event.target.value)
                  }
                  required
                />
                <Form.Control
                  type="text"
                  value={item.description}
                  name="description"
                  placeholder="Item description"
                  onChange={(event) =>
                    onItemChange(item.id, "description", event.target.value)
                  }
                  required
                />
              </td>
              <td>
                <Form.Control
                  type="text"
                  value={item.quantity}
                  name="quantity"
                  onChange={(event) =>
                    onItemChange(item.id, "quantity", event.target.value)
                  }
                  style={{
                    maxWidth: "40px",
                  }}
                  required
                />
              </td>

              <td>
                <td
                  style={{
                    maxWidth: "20px",
                    textAlign: "center",
                    backgroundColor: "#F2F3F7",
                    padding: "7px",
                    borderRadius: "2px",
                  }}
                >
                  {currency}
                </td>
                <td>
                  <Form.Control
                    type="number"
                    value={item.price}
                    name="price"
                    onChange={(event) =>
                      onItemChange(item.id, "price", event.target.value)
                    }
                    min="1"
                    step="0.01"
                    precision={2}
                    style={{
                      maxWidth: "50px",
                      textAlign: "end",
                    }}
                    required
                  />
                </td>

                {/* Display currency symbol here */}
              </td>

              <td className="text-center" style={{ minWidth: "50px" }}>
                <BiTrash
                  onClick={() => onRowDel(item.id)}
                  style={{ height: "33px", width: "33px", padding: "7.5px" }}
                  className="text-white mt-1 btn btn-danger"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Button className="fw-bold" onClick={onRowAdd}>
        Add Item
      </Button>
    </div>
  );
}
