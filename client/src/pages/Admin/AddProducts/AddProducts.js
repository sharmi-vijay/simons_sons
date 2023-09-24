import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";
import Container from "react-bootstrap/esm/Container";
import { useDispatch, useSelector } from "react-redux";
import {
  addProduct,
  getAllProducts,
  updateProduct,
} from "../../../features/products/productsSlice";
import ProductList from "../../../components/ProductList/ProductList";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function AddProducts() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector((state) => state.users.credentials.token);
  const { singleProduct, isUpdate, productsCategory } = useSelector(
    (state) => state.products
  );

  const productTemplate = {
    name: "",
    brand: "",
    price: "",
    image: "",
    category: "",
  };

  const [product, setProduct] = useState(productTemplate);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({
      ...product,
      [name]: value,
    });
  };

  const uploadFile = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      if (file.size <= 5000000) {
        reader.readAsDataURL(file);
        reader.onload = (e) => {
          setProduct({
            ...product,
            image: e.target.result,
          });
          toast.success(file.size);
        };
      } else {
        toast.error(file.size);
      }
    }
  };

  useEffect(() => {
    dispatch(getAllProducts(token));
  }, []);

  const addProductBtn = (e) => {
    e.preventDefault();
    dispatch(addProduct(product));
    dispatch(getAllProducts(token));
    setProduct(productTemplate);
  };

  const updateProductBtn = (e) => {
    e.preventDefault();
    dispatch(updateProduct(product));
    dispatch(getAllProducts(token));
    setProduct(productTemplate);
  };

  useEffect(() => {
    if (isUpdate) {
      setProduct({ ...product, ...singleProduct });
    }
  }, [isUpdate]);

  useEffect(() => {
    const isAdminLoggedIn = localStorage.getItem("adminLogin");
    if (!isAdminLoggedIn) {
      navigate("/admin");
    }
  }, []);

  return (
    <>
      <Container>
        <h1 className="my-4"> {isUpdate ? "Update" : "Add"} Product</h1>
        <Form onSubmit={isUpdate ? updateProductBtn : addProductBtn}>
          <Row>
            <Col md={4}>
              <Form.Group as={Col} className="mb-3" controlId="formBasicEmail">
                <Form.Control
                  type="text"
                  name="name"
                  value={product.name}
                  onChange={handleChange}
                  placeholder="Name"
                  required
                />
              </Form.Group>

              <Form.Group
                as={Col}
                className="mb-3"
                controlId="formBasicPassword"
              >
                <Form.Control
                  type="text"
                  name="brand"
                  value={product.brand}
                  onChange={handleChange}
                  placeholder="Brand"
                  required
                />
              </Form.Group>

              <Form.Group
                as={Col}
                className="mb-3"
                controlId="formBasicPassword"
              >
                <Form.Control
                  type="text"
                  name="price"
                  value={product.price}
                  onChange={handleChange}
                  placeholder="Price ($)"
                  required
                />
              </Form.Group>

              <Form.Group
                as={Col}
                className="mb-3"
                controlId="validationCustom01"
              >
                <Form.Select
                  name="category"
                  value={product.category}
                  onChange={handleChange}
                  aria-label="Default select example"
                >
                  <option hidden>Category</option>
                  {productsCategory.map((category, id) => (
                    <option key={id} value={category}>
                      {category}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label
                  htmlFor="productImage"
                  className="btn btn-outline-success"
                >
                  Upload Product Image
                </Form.Label>
                <Form.Control
                  className="w-25"
                  type="file"
                  id="productImage"
                  accept=".jpeg,.png,.jpg"
                  hidden
                  onChange={uploadFile}
                />
              </Form.Group>
            </Col>
            <Col md={3} className="">
              <figure
                style={{
                  border: "2px solid #d8d8d8d8",
                  height: "180px",
                  width: "100%",
                }}
              >
                {product.image ? (
                  <>
                    <img
                      src={product.image}
                      style={{ height: "180px", width: "100%" }}
                    />
                  </>
                ) : (
                  <></>
                )}
              </figure>
            </Col>
          </Row>
          <Button variant="primary" type="submit">
            {isUpdate ? "Update" : "Add"} Product
          </Button>
        </Form>

        <h1 className="my-4">Product List</h1>
        <ProductList accessFrom="admin" />
      </Container>
    </>
  );
}

export default AddProducts;
