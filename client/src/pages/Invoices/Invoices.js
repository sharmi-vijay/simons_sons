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
  
  const[amt , setamount] = useState();
  const handlePayment =(e)=>{
      e.preventDefault();
      if(amt === ""){
        alert("Enter the amount")
      }
      else if(amt != amt){
        alert("Enter the correct amount")
      }
      else{
        var options = {
            key: "rzp_test_AQcWvXY8SA8Atg",
            key_secret: "1WMZLTjpqygf6r5ZczGkt1YN",
            amount: amt*100, // Example amount in paise (₹50)
            currency: 'INR',
            name: 'antique',
            description: 'Payment for products',
            handler: function (response) {
              alert(response.razorpay_payment_id);
            },
            prefill: {
                    name: "sharmila",
                    email: "sritharvijay07@gmail.com",
                    contact: "9715710666"
                },
                notes:{
                  address:"Razorpay Corporate Office"
                },
                theme: {
                        color: '#3399cc'
                    } 
      };
        var pay = new window.Razorpay(options);
        pay.open();
  }
}
  

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
  }, []);

  useEffect(() => {
    if (isDelSuccess) {
      toast.success("Record deleted successfully!");
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
          <h2>CartList</h2>
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
              <th>SNo</th>
              <th>Products</th>
              <th>Customer Name</th>
              <th>Phone </th>
              <th>Email</th>
              <th>Date</th>
              <th>Expected Delivery Date</th>
              <th>Total Cost </th>
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

        {/* Razorpay */}
      <input type="text" placeholder ="Total cost"  value ={invoicesList.map((data) => data.totalCost).join(', ')}  
      onChange = {(e)=>setamount(e.target.value)} />{"   "}
      <button class="btn btn-success" onClick={handlePayment} >payment</button>
        <br/>
        <br/>
        Wanna change your mind? <a class="btn btn-warning btn-sm" href="/">Back</a>
        <br/>
        <br/>
      </Container>
    </>
  );
}

export default Invoices;
