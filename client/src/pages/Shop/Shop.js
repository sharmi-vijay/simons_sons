import React, { useEffect, useState } from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Container from "react-bootstrap/esm/Container";
import ProductList from "../../components/ProductList/ProductList";
import Cart from "../../components/Cart/Cart";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Typewriter from "typewriter-effect";


function Shop() {
  const navigate = useNavigate();
  const productsCategory = useSelector(
    (state) => state.products.productsCategory
  );

  // If not logged-in redirect to login page.
  const isLoggedIn = useSelector((state) => state.users.isLoggedIn);
  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, []);


  const [hoveredTab, setHoveredTab] = useState(null);

  const styles = {
    container: {
      fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
      padding: "20px",
      backgroundColor: "#f8f9fa",
      borderRadius: "10px",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      margin: "20px auto",
      maxWidth: "1200px",
    },
    header: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "20px",
    },
    title: {
      fontSize: "2.5em",
      color: "black",
      textShadow: "1px 1px 3px rgba(0, 0, 0, 0.1)",
    },
    tabsContainer: {
      margin: "20px 0",
      backgroundColor: "white",
      borderRadius: "10px",
      padding: "10px",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    },
    tabItem: {
      fontSize: "1.1em",
      fontWeight: "bold",
      padding: "10px 30px",
      color: "white",
      transition: "all 0.4s ease",
      cursor: "pointer",
      backgroundColor: "black"
    },
    tabItemHovered: {
      color: "black",
      backgroundColor: "white",
      border: "2px solid black",
      margin: "10px 15px",
      padding: "10px 20px"
    },
    tabItemActive: {
      fontSize: "1.1em",
      color: "white",
      fontWeight: "bold",
      padding: "10px 50px",
      transition: "all 0.4s ease",
      cursor: "pointer",
      backgroundColor: "black"
    },
    productContainer: {
      padding: "20px",
      backgroundColor: "#fff",
      borderRadius: "8px",
      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
      transition: "all 0.3s ease",
      cursor: "pointer",
    },
    productContainerHovered: {
      boxShadow: "0 6px 12px rgba(0, 0, 0, 0.2)",
      transform: "scale(1.05)",
    },
    '@media (max-width: 750px)': {
      title: {
        fontSize: "2em",
      },
      header: {
        flexDirection: "column",
        alignItems: "flex-start",
      },
      tabsContainer: {
        flexDirection: "column",
        padding: "10px",
      },
      tabItem: {
        fontSize: "1em",
        padding: "8px 10px",
      },
    },
  };

  return (
    <>
      <Container style={styles.container}>
        <div style={styles.header}>
          <h1 style={styles.title}>
            <Typewriter
              onInit={(typewriter) => {
                typewriter.typeString("Shop Now!")
                  .pauseFor(2000)
                  .start();
              }}
            />
          </h1>
          <div>
            <Cart />
          </div>
        </div>

        <div style={styles.tabsContainer}>
          <Tabs
            defaultActiveKey="All"
            id="justify-tab-example"
            className="mb-3"
            justify
          >
            <Tab eventKey="All"
              title={<span
                style={
                  hoveredTab === "All"
                    ? styles.tabItemHovered
                    : styles.tabItemActive
                }
                onMouseOver={() => setHoveredTab("All")}
                onMouseOut={() => setHoveredTab(null)}
              >
                All
              </span>
              }
            >
              <div>              
                <ProductList
                  accessFrom="shop"
                  category="All"
                  productStyles={styles.productContainer}
                />
              </div>
            </Tab>
            {productsCategory.map((cat, id) => (
              <Tab
                key={id}
                eventKey={cat}
                title={
                  <span
                    style={
                      hoveredTab === cat
                        ? styles.tabItemHovered
                        : styles.tabItem
                    }
                    onMouseOver={() => setHoveredTab(cat)}
                    onMouseOut={() => setHoveredTab(null)}
                  >
                    {cat}
                  </span>
                }
              >
                <div>                
                  <ProductList
                    accessFrom="shop"
                    category={cat}
                    productStyles={styles.productContainer}
                  />
                </div>
              </Tab>
            ))}
          </Tabs>
        </div>

      </Container>
    </>
  );
}

export default Shop;
