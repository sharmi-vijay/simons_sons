import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromWishlist, setWishlist } from "../../features/products/productsSlice";
import { Card, Button } from "react-bootstrap";
import { useState, useEffect } from "react";

function Wishlist() {
    const wishlist = useSelector((state) => state.products.wishlist);
    const dispatch = useDispatch();
    const [hoveredProduct, setHoveredProduct] = useState(null);

    useEffect(() => {
        localStorage.setItem("wishlist", JSON.stringify(wishlist));
    }, [wishlist]);

    const styles = {
        container: {
            padding: "20px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          },
          heading: {
            textAlign: "center",
            marginBottom: "20px",
            fontSize: "2rem",
            fontWeight: "bold",
          },
          wishlistGrid: {
            display: "grid",
            gap: "20px",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            width: "100%",
            maxWidth: "1200px",
            margin: "0 auto",
          },
          card: {
            width: "100%",
            maxWidth: "300px", 
            margin: "0 auto", 
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            borderRadius: "8px",
            overflow: "hidden",
            transition: "transform 0.3s ease, box-shadow 0.3s ease",
          },
          cardHovered: {
            transform: "scale(1.05)",
            boxShadow: "0 6px 12px rgba(0, 0, 0, 0.2)",
          },
          cardImg: {
            width: "80%",
            height: "200px",
            objectFit: "cover",
            margin: "0 auto", 
            display: "block", 
          },
          cardBody: {
            padding: "15px",
            backgroundColor: "#fff",
            textAlign: "center", 
          },
          button: {
            width: "100%",
            padding: "8px 12px",
            backgroundColor: "#ff4d4f",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            fontSize: "14px",
            transition: "background-color 0.3s ease",
          },
    };


    return (
        <div style={styles.container}>
            <h2 style={styles.heading}>My Wishlist</h2>
            <div style={styles.wishlistGrid}>
                {wishlist.length > 0 ? (
                    wishlist.map((product, id) => (
                        <Card
                            key={id}
                            style={{
                                ...styles.card,
                                ...(hoveredProduct === id ? styles.cardHovered : {}),
                            }}
                            onMouseEnter={() => setHoveredProduct(id)}
                            onMouseLeave={() => setHoveredProduct(null)}
                        >
                            <Card.Img variant="top"
                                src={product.image}
                                alt={product.name}
                                style={styles.cardImg}
                            />
                            <Card.Body style={styles.cardBody}>
                                <Card.Title>{product.name}</Card.Title>
                                <Card.Text>
                                    <b>Brand:</b> {product.brand}
                                </Card.Text>
                                <Card.Text>
                                    <b>Price:</b> {`\u20B9${product.price}`}
                                </Card.Text>
                                <Button
                                    style={styles.button}
                                    onMouseEnter={(e) => (e.target.style.backgroundColor = "#e43e3e")}
                                    onMouseLeave={(e) => (e.target.style.backgroundColor = "#ff4d4f")}
                                    onClick={() => dispatch(removeFromWishlist(product._id))}
                                >
                                    Remove
                                </Button>
                            </Card.Body>
                        </Card>
                    ))
                ) : (
                    <p>No products in your wishlist yet!</p>
                )}
            </div>
        </div>
    );
}

export default Wishlist;
