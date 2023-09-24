import React from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Container from "react-bootstrap/esm/Container";
import ProductList from "../../components/ProductList/ProductList";
import Cart from "../../components/Cart/Cart";

function Shop() {
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
          <Tab eventKey="Mobiles" title="Mobiles">
            <ProductList accessFrom="shop" category="Mobile" />
          </Tab>
          <Tab eventKey="Laptops & Computers" title="Laptops & Computers">
            <ProductList accessFrom="shop" category="Laptops & Computers" />
          </Tab>
          <Tab eventKey="Home Electronics" title="Home Electronics">
            <ProductList accessFrom="shop" category="Home Electronics"/>
          </Tab>
        </Tabs>
      </Container>
    </>
  );
}

export default Shop;
