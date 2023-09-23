import { useEffect } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllProducts,
  deleteProduct,
  setDatatoForm,
} from "../../features/products/productsSlice";

function ProductList() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.productList);
  const token = useSelector((state) => state.users.credentials.token)

  useEffect(() => {
    dispatch(getAllProducts(token));
  }, [products]);

  const deleteProductBtn = (id) => {
    dispatch(deleteProduct(id));
    dispatch(getAllProducts(token));
  };

  const updateProductBtn = (data) => {
    dispatch(setDatatoForm(data))
  };

  return (
    <>
      <div className="d-flex gap-3">
        {products.map((product, id) => (
          <Card key={id} style={{ width: "18rem" }}>
            <Card.Img variant="top" src={product.image} />
            <Card.Body>
              <Card.Title>{product.name}</Card.Title>
              <Card.Text>
                <b>Brand:</b> {product.brand}
              </Card.Text>
              <Card.Text>
                <b>Price:</b> {product.price}
              </Card.Text>
              <Card.Text>
                <b>Category:</b> {product.category}
              </Card.Text>
              <div className="d-flex gap-2">
                <Button
                  variant="danger"
                  size={"sm"}
                  onClick={() => deleteProductBtn(product._id)}
                >
                  Delete
                </Button>
                <Button
                  variant="success"
                  size={"sm"}
                  onClick={()=> updateProductBtn(product)}
                >
                  Update
                </Button>
              </div>
            </Card.Body>
          </Card>
        ))}
      </div>
    </>
  );
}

export default ProductList;
