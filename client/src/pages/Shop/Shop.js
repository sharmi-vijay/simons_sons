import React from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Container from "react-bootstrap/esm/Container";
import ProductList from "../../components/ProductList/ProductList";
import Cart from "../../components/Cart/Cart";
import { useSelector } from "react-redux";

function Shop() {
  const productsCategory = useSelector(
    (state) => state.products.productsCategory
  );
  console.log(productsCategory);
  return (
    <>
      <Container>
        <div className="d-flex justify-content-between align-items-center">
          <h1 className="my-4">Shop Now!</h1>
          <div>
            <Cart />
          </div>
        </div>
        <Tabs
          defaultActiveKey="All"
          id="justify-tab-example"
          className="mb-3"
          justify
        >
          <Tab eventKey="All" title="All">
            <ProductList accessFrom="shop" category="All" />
          </Tab>
          {productsCategory.map((cat, id) => (
            <Tab key={id} eventKey={cat} title={cat}>
              <ProductList accessFrom="shop" category={cat} />
            </Tab>
          ))}
        </Tabs>
      </Container>
    </>
  );
}

export default Shop;
