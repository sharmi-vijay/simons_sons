import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllInvoices,
  searchInvoices,
  reset,
  deleteInvoice,
} from "../../features/invoices/invoicesSlice";
import Button from "react-bootstrap/esm/Button";
import { logOut } from "../../features/users/usersSlice";
import { useNavigate } from "react-router-dom";
import Container from "react-bootstrap/esm/Container";
import { toast } from "react-toastify";

function Invoices() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchProduct, setSearchProduct] = useState("");
  const { credentials, isLoggedIn } = useSelector((state) => state.users);
  const { invoicesList, isDelSuccess, isSuccess, isLoading, isError, message } =
    useSelector((state) => state.invoices);

  const searchByProductsBtn = () => {
    if (searchProduct === "") {
      dispatch(getAllInvoices(credentials));
    } else {
      dispatch(
        searchInvoices({
          customerId: credentials.id,
          productName: searchProduct,
        })
      );
      dispatch(reset());
    }
  };

  const deleteInvoiceBtn = (id) => {
    dispatch(deleteInvoice(id));
  };

  useEffect(() => {
    dispatch(getAllInvoices(credentials));
  }, [dispatch]);

  useEffect(() => {
    if (isDelSuccess) {
      toast.success("Invoice record deleted successfully!");
      dispatch(getAllInvoices(credentials));
    }
  }, [dispatch, isDelSuccess]);

  useEffect(()=> {
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, [])

  return (
    <>
      <Container fluid className="mt-2">
        <div className="d-flex align-items-center justify-content-between">
          <h2>Invoices</h2>
          <span className="d-flex gap-3">
            <input
              type="search"
              name="searchProduct"
              value={searchProduct}
              onChange={(e) => setSearchProduct(e.target.value)}
            />
            <Button type="button" onClick={searchByProductsBtn}>
              Search
            </Button>
          </span>
        </div>
        <Table responsive>
          <thead>
            <tr>
              <th>#</th>
              <th>Products</th>
              <th>Customer Name</th>
              <th>Phone #</th>
              <th>Email</th>
              <th>Date</th>
              <th>Expected Delivery Date</th>
              <th>Total Cost ($)</th>
              <th>Street Address</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan="13">loading...</td>
              </tr>
            ) : null}
            {isSuccess ? (
              <>
                {invoicesList && invoicesList.length !== 0 ? (
                  invoicesList.map((data, i) => (
                    <tr key={i}>
                      <td>{i + 1}</td>
                      <td>{data.products.map((pData) => pData).join(",")}</td>
                      <td>{data.customerName}</td>
                      <td>{data.phone}</td>
                      <td>{data.email}</td>
                      <td>{data.date}</td>
                      <td>{data.deliveryDate}</td>
                      <td>{data.totalCost}</td>
                      <td>{data.address}</td>
                      <td>
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => deleteInvoiceBtn(data._id)}
                        >
                          Del.
                        </Button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="13">No invoices records yet.</td>
                  </tr>
                )}{" "}
              </>
            ) : null}
            {isError ? (
              <tr>
                <td colSpan="13">{message}</td>
              </tr>
            ) : null}
          </tbody>
        </Table>
      </Container>
    </>
  );
}

export default Invoices;
