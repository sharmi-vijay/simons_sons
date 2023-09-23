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
import demoImg from "../../../assets/demoImage.png";
import ProductList from "../../../components/ProductList/ProductList";

function AddProducts() {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.users.credentials.token)
  const { singleProduct, isUpdate } = useSelector((state) => state.products);

  // Changes
  const obj = {
    name: "",
    brand: "",
    price: "",
    image: "",
    category: "",
  };

  const [product, setProduct] = useState(obj);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({
      ...product,
      [name]: value,
    });
  };

  const uploadFile = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    console.log(file);
    reader.readAsDataURL(file);
    reader.onload = (e) => {
      setProduct({
        ...product,
        image: e.target.result,
      });
      console.log(e.target.result);
    };
  };

  useEffect(() => {
    dispatch(getAllProducts(token));
  }, []);

  const addProductBtn = () => {
    dispatch(addProduct(product));
    dispatch(getAllProducts(token));
    setProduct(obj);
  };
  // Changes
  const updateProductBtn = () => {
    dispatch(updateProduct(product));
    dispatch(getAllProducts(token));
    setProduct(obj);
  };

  // Changes
  useEffect(() => {
    if (isUpdate) {
      setProduct({ ...product, ...singleProduct });
    }
  }, [isUpdate]);

  return (
    <>
      <Container>
        {/* Changes */}
        <h1> {isUpdate ? "Update" : "Add"} Product</h1>
        <Form>
          <Row>
            <Col md={4}>
              <Form.Group as={Col} className="mb-3" controlId="formBasicEmail">
                <Form.Control
                  type="text"
                  name="name"
                  value={product.name}
                  onChange={handleChange}
                  placeholder="Name"
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
                />
              </Form.Group>

              <Form.Group
                as={Col}
                className="mb-3"
                controlId="formBasicPassword"
              >
                <Form.Control
                  type="text"
                  name="category"
                  value={product.category}
                  onChange={handleChange}
                  placeholder="Category"
                />
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
                      src={product.image ? product.image : demoImg}
                      style={{ height: "180px", width: "100%" }}
                    />
                  </>
                ) : (
                  <></>
                )}
              </figure>
            </Col>
          </Row>
          {/* Changes */}
          <Button
            variant="primary"
            type="button"
            onClick={isUpdate ? updateProductBtn : addProductBtn}
          >
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
