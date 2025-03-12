import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllProducts,
  deleteProduct,
  setDatatoForm,
  addToWishlist,
  removeFromWishlist,
  clearWishlist,
} from "../../features/products/productsSlice";
import NoImage from "../../assets/NoImage.png";
import {
  addToCart,
  removeFromCart,
  incrementQuantity,
  decrementQuantity,
} from "../../features/invoices/invoicesSlice";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";


function ProductList(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // PRODUCT LISTING
  const { accessFrom, category, productStyles } = props;
  const products = useSelector((state) => state.products.productList);
  const token = useSelector((state) => state.users.credentials.token);

  const wishlist = useSelector((state) => state.products.wishlist);

  const [hoveredProduct, setHoveredProduct] = useState(null);

  const filteredProducts =
    products &&
    products.filter((product) => {
      if (category == "All") {
        return products;  //changed
      } else {
        return product.category === category;
      }
    });

  //WISHLIST
  const addToWishlistBtn = (product) => {
    dispatch(addToWishlist(product));
    toast.success(`${product.name} added to Wishlist!`);
  };

  const removeFromWishlistBtn = (productId) => {
    dispatch(removeFromWishlist(productId));
    toast.info("Product removed from Wishlist!");
  };


  // ------------------ ADMIN BUTTONS ------------------
  const deleteProductBtn = (id) => {
    dispatch(deleteProduct(id));
    dispatch(getAllProducts(token));
  };
  const updateProductBtn = (data) => {
    dispatch(setDatatoForm(data));
    window.scrollTo(0, 0);
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

  const handleNavigate = (product) => {
    console.log("Navigating to:", `/products/${product._id}`); // Debugging
    navigate(`/products/${product._id}`);
  };

  const styles = {
    productContainer: {
      padding: "10px",
      backgroundColor: "#fff",
      borderRadius: "5px",
      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
      transition: "all 0.4s ease",
      cursor: "pointer",
    },
    productContainerHovered: {
      boxShadow: "0 20px 30px rgba(0, 0, 0, 0.2)",
      transform: "scale(1.05)",
      border: "1px solid black"
    },

  };

  const buttonStyles = {
    base: {
      backgroundColor: "black",
      border: "none",
      color: "white",
      padding: "5px 15px",
      alignItems: "center",
      textAlign: "center",
      textDecoration: "none",
      display: "inline-block",
      fontSize: "16px",
      fontWeight: "bolder",
      margin: "2px 2px",
      transition: "all 0.4s ease",
      cursor: "pointer",
    },
    hover: {
      backgroundColor: "white",
      color: "black",
      border: "2px solid black",
      transform: "scale(1.05)",
    },
    smallScreen: {
      padding: "4px 12px",
      fontSize: "14px",
    },
  };

  const useStyles = {
    cardContainer: {
      width: "18rem",
      margin: "10px",
      borderRadius: "8px",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      overflow: "hidden",
      transition: "transform 0.3s ease, box-shadow 0.3s ease",
    },
    cardContainerHover: {
      transform: "scale(1.05)",
      boxShadow: "0 6px 12px rgba(0, 0, 0, 0.2)",
    },
    cardImg: {
      width: "100%",
      height: "auto",
      objectFit: "cover",
      borderRadius: "8px",
      border: "1px solid rgba(0, 0, 0, 0.1)",
      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
      padding: "2px",
    },
    cardBody: {
      padding: "15px",
      backgroundColor: "#fff",
      color: "#333",
    },
    cardTitle: {
      fontSize: "1.2rem",
      fontWeight: "bold",
      marginBottom: "10px",
      textAlign: "center"
    },
    cardText: {
      fontSize: "0.95rem",
      marginBottom: "5px",
    },
    // Responsive styles
    cardContainerResponsive: {
      width: "100%",
      margin: "10px 0",
    },
    cardTitleResponsive: {
      fontSize: "1rem",
    },
    cardTextResponsive: {
      fontSize: "0.85rem",
    },
  };

  const [isHovered, setIsHovered] = useState(false);

  return (
    <>
      <div className="d-flex gap-3 flex-wrap">
        {accessFrom === "admin"
          ? filteredProducts &&
          filteredProducts.map((product, id) => (
            <Card
              key={id}
              style={{ width: "18rem" }}>
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
          :
          filteredProducts.map((product, id) => (

            <div
              key={id}
              style={{
                ...productStyles,
                ...(hoveredProduct === id ? styles.productContainerHovered : {}),
              }}
              onMouseOver={() => setHoveredProduct(id)}
              onMouseOut={() => setHoveredProduct(null)}
            >
              <Card key={id}
                style={styles}
                onMouseOver={() => setIsHovered(true)}
                onMouseOut={() => setIsHovered(false)}
              >
                <Card.Img
                  style={useStyles.cardImg}
                  variant="top"
                  src={product.image == "" ? NoImage : product.image}
                />
                <Card.Body style={useStyles.cardBody}>
                  <Card.Title style={useStyles.cardTitle}>
                    {product.name} {" "}

                    {/* WISHLIST */}
                    <Button
                      style={{ fontWeight: "bold" }}
                      variant={wishlist.some((item) => item._id === product._id) ? "danger" : "light"}
                      size="sm"
                      onClick={() =>
                        wishlist.some((item) => item._id === product._id)
                          ? removeFromWishlistBtn(product._id)
                          : addToWishlistBtn(product)
                      }
                    >
                      {wishlist.some((item) => item._id === product._id) ? "❤" : "🖤"}
                    </Button>

                  </Card.Title>
                  <Card.Text style={useStyles.cardText}>
                    <b>Brand:</b> {product.brand}
                  </Card.Text>
                  <Card.Text style={useStyles.cardText}>
                    <b>Price:</b> {`\u20B9`}{product.price}
                  </Card.Text>
                  <Card.Text style={useStyles.cardText}>
                    <b>Category:</b> {product.category}
                  </Card.Text>

                  {/* INCREMENT DECREMENT BUTTON */}

                  <div className="d-flex gap-2">
                    {productsCart.some((prod) => prod.productId === product._id) ? (
                      // If product is in the cart, show increment/decrement buttons and remove button
                      <>
                        <div className="d-flex align-items-center gap-2">
                          <Button
                            variant="outline-danger"
                            size="sm"
                            onClick={() => dispatch(decrementQuantity({ productId: product._id }))}
                            disabled={
                              productsCart.find((prod) => prod.productId === product._id)?.quantity <= 1
                            }
                          >
                            -
                          </Button>
                          <span>
                            {productsCart.find((prod) => prod.productId === product._id)?.quantity || 0}
                          </span>
                          <Button
                            variant="outline-success"
                            size="sm"
                            onClick={() => dispatch(incrementQuantity({ productId: product._id }))}
                          >
                            +
                          </Button>
                        </div>

                        <Button
                          style={{ fontWeight: "bold" }}
                          variant="danger"
                          size="sm"
                          onClick={() => removeFromCartBtn(product)}
                        >
                          Remove from Cart
                        </Button>
                      </>
                    ) : (
                      // If product is not in the cart, show "Add to Cart" button
                      <>
                        <Button
                          style={{
                            ...buttonStyles.base,
                            ...(window.innerWidth < 768 ? buttonStyles.smallScreen : {}),
                          }}
                          onMouseOver={(e) => {
                            Object.assign(e.target.style, buttonStyles.hover);
                          }}
                          onMouseOut={(e) => {
                            Object.assign(e.target.style, buttonStyles.base);
                          }}
                          size="sm"
                          onClick={() => addToCartBtn(product)}
                        >
                          Add To Cart
                          </Button>
                          
                          <Button onClick={() => handleNavigate(products)}>View Details</Button>
                      </>
                    )}
                  </div>
                </Card.Body>

              </Card>
            </div>
          ))}

      </div>
    </>
  );
}

export default ProductList;
