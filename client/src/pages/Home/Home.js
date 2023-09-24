import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/esm/Container";

function Home() {
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.users.isLoggedIn);

  return (
    <>
      <Container>
        <h1 className="my-4">Welcome to Tek-Electronics!</h1>
        <p>
          "Tek-Electronics" is a premier online destination for all your
          electronic accessories needs. As a leading e-commerce platform
          specializing in electronics accessories, Tek-Electronics is dedicated
          to providing a wide range of high-quality products designed to enhance
          and complement your electronic devices. With a commitment to
          innovation, customer satisfaction, and convenience, Tek-Electronics
          has become a trusted name in the world of online electronics retail.
        </p>
        <p>
          At Tek-Electronics, we understand that today's electronic devices are
          integral to both work and leisure. Whether you're a tech enthusiast, a
          professional, or simply someone who appreciates the convenience of
          modern gadgets, our online shop offers an extensive selection of
          accessories to meet your every requirement. From protective cases and
          chargers to headphones, cables, and adapters, we've curated a
          comprehensive inventory of products that cater to a variety of brands
          and models.
        </p>
        <p>
          What sets Tek-Electronics apart is our unwavering dedication to
          delivering products that not only meet but exceed industry standards
          for quality and performance. Our team of experts carefully selects
          each item in our catalog, ensuring that it meets our stringent
          criteria for reliability, durability, and compatibility with popular
          electronic devices. We take pride in offering accessories that enhance
          the functionality, style, and longevity of your valuable electronics.
        </p>
        <p>
          Shopping at Tek-Electronics is a seamless and enjoyable experience.
          Our user-friendly website is designed to provide you with easy
          navigation, detailed product information, and secure payment options.
          Whether you're searching for the latest tech gadgets, replacement
          parts, or accessories that reflect your personal style, our online
          shop is your one-stop destination.
        </p>
        <p>
          We believe in putting our customers first, and our commitment to
          exceptional customer service is unwavering. Our knowledgeable and
          responsive support team is here to assist you with any inquiries or
          concerns you may have, ensuring that your shopping experience with
          Tek-Electronics is nothing short of exceptional.
        </p>
        <p>
          Discover the world of electronics accessories with Tek-Electronics,
          where quality, variety, and convenience come together to enhance your
          electronic devices and elevate your tech-savvy lifestyle. Experience
          the difference when you choose Tek-Electronics as your trusted online
          destination for all things electronic accessories.
        </p>
        <Button
          variant="warning"
          onClick={() => {
            isLoggedIn ? navigate("/shop") : navigate("/login");
          }}
          type="button"
        >
          Let's Explore!
        </Button>
      </Container>
    </>
  );
}

export default Home;
