import { useEffect } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllProducts,
  deleteProduct,
  setDatatoForm,
} from "../../features/products/productsSlice";
import NoImage from "../../assets/NoImage.png";
import {
  addToCart,
  removeFromCart,
} from "../../features/invoices/invoicesSlice";
import { toast } from "react-toastify";

function ProductList(props) {
  const dispatch = useDispatch();

  // PRODUCT LISTING
  const { accessFrom, category } = props;
  const products = useSelector((state) => state.products.productList);
  const token = useSelector((state) => state.users.credentials.token);

  const filteredProducts =
    products &&
    products.filter((product) => {
      if (category == "All") {
        return products;  //changed
      } else {
        return product.category === category;
      }
    });

  // ------------------ ADMIN BUTTONS ------------------
  const deleteProductBtn = (id) => {
    dispatch(deleteProduct(id));
    dispatch(getAllProducts(token));
  };
  const updateProductBtn = (data) => {
    dispatch(setDatatoForm(data));
    window.scrollTo(0,0);
  };

  useEffect(() => {
    dispatch(getAllProducts(token));
  }, []);

  // ------------------ SHOP BUTTONS ------------------
  const productsCart = useSelector((state) => state.invoices.productsCart);
  const addToCartBtn = (prod) => {
    const product = {
      productId: prod._id,
      name: prod.name,
      price: prod.price,
      category: prod.category,
      quantity: 1,
    };
    console.log("Add Prod");
    dispatch(addToCart(product));
  };

  const removeFromCartBtn = (prod) => {
    const product = {
      productId: prod._id,
      name: prod.name,
      price: prod.price,
      category: prod.category,
      quantity: 1,
    };
    console.log("Remove Prod");
    dispatch(removeFromCart(product));
  };

  return (
    <>
      <div className="d-flex gap-3 flex-wrap">
        {accessFrom === "admin"
          ? products &&
            products.map((product, id) => (
              <Card key={id} style={{ width: "18rem" }}>
                <Card.Img variant="top" src={product.image == "" ? NoImage : product.image} />
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
                      onClick={() => updateProductBtn(product)}
                    >
                      Update
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            ))
          : filteredProducts.map((product, id) => (
              <Card key={id} style={{ width: "18rem" }}>
                <Card.Img
                  variant="top"
                  src={product.image == "" ? NoImage : product.image}
                />
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
                    {productsCart.includes(product.name) ? (
                      <>
                        {" "}
                        <Button
                          variant="danger"
                          size={"sm"}
                          onClick={() => removeFromCartBtn(product)}
                        >
                          Remove from Cart
                        </Button>{" "}
                      </>
                    ) : (
                      <>
                        <Button
                          variant="primary"
                          size={"sm"}
                          onClick={() => addToCartBtn(product)}
                        >
                          Add To Cart
                        </Button>
                      </>
                    )}
                  </div>
                </Card.Body>
              </Card>
            ))}
      </div>
    </>
  );
}

export default ProductList;
