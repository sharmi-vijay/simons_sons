import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductDetails, addReview } from "../../features/products/productsSlice";
import { useParams } from "react-router-dom";
import { Button, Form } from "react-bootstrap";

const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { productDetails } = useSelector((state) => state.products);
  const [review, setReview] = useState({ rating: 0, comment: "" });

  console.log("product id:", id);
  
  useEffect(() => {
    dispatch(getProductDetails(id));
  }, [dispatch, id]);

  const submitReview = (e) => {
    e.preventDefault();
    dispatch(addReview({ reviewData: { ...review, productId: id }, token: localStorage.getItem("token") }));
    setReview({ rating: 0, comment: "" });
  };

  return (
    <div>
      <h2>{productDetails.name}</h2>
      <img src={productDetails.image || "NoImage.png"} alt={productDetails.name} width="200" />
      <p><b>Brand:</b> {productDetails.brand}</p>
      <p><b>Price:</b> ₹{productDetails.price}</p>
      <p><b>Category:</b> {productDetails.category}</p>
      <p><b>Description:</b> {productDetails.description}</p>

      <h3>Overall Rating: {productDetails.averageRating ? productDetails.averageRating.toFixed(1) : "No ratings yet"}</h3>

      <h3>Reviews:</h3>
      {productDetails.reviews && productDetails.reviews.length > 0 ? (
        productDetails.reviews.map((review, index) => (
          <div key={index}>
            <p><b>{review.name}</b> ({review.rating} ⭐)</p>
            <p>{review.comment}</p>
          </div>
        ))
      ) : (
        <p>No reviews yet.</p>
      )}

      <h3>Add a Review</h3>
      <Form onSubmit={submitReview}>
        <Form.Group>
          <Form.Label>Rating</Form.Label>
          <Form.Control
            type="number"
            min="1"
            max="5"
            value={review.rating}
            onChange={(e) => setReview({ ...review, rating: e.target.value })}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Comment</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={review.comment}
            onChange={(e) => setReview({ ...review, comment: e.target.value })}
          />
        </Form.Group>
        <Button type="submit">Submit Review</Button>
      </Form>
    </div>
  );
};

export default ProductDetails;
