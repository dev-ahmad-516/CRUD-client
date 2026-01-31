import React, { useState } from "react";
import { Button, Form, Card, Spinner } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function CreateProduct() {
  const [products, setProducts] = useState({
    title: "",
    desc: "",
    price: "",
    rating: "",
    review: "",
    image: "",
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  function changeHandler(e) {
    const { name, value } = e.target;
    setProducts({ ...products, [name]: value });
  }

  async function submitHandler(e) {
    e.preventDefault();
    const { title, desc, price, image } = products;

    if (!title || !desc || !price) {
      return toast.error("Please fill in all required fields!");
    }

    setLoading(true);

    // ADMIN CONTROL LOGIC:
    // If you paste a link, we use it.
    // If you leave it blank, we use a neutral placeholder.
    const finalImage =
      image.trim() !== ""
        ? image
        : "https://placehold.co/600x400?text=No+Image+Added";

    const finalData = {
      ...products,
      image: finalImage,
    };

    try {
      await axios.post("https://crud-server-yqbp.onrender.com/products", finalData);
      toast.success("Product created successfully!");
      navigate("/");
    } catch (error) {
      toast.error("Failed to save product.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-50 mx-auto mt-4 my-4">
      <Card
        className="p-4 shadow-sm border-0"
        style={{ borderRadius: "15px", backgroundColor: "#fefefe" }}
      >
        <h2 className="fst-italic mb-4 text-center">✨ Create New Product</h2>
        <Form onSubmit={submitHandler}>
          {/* Title Field */}
          <Form.Group className="mb-3">
            <Form.Label className="fw-bold">Product Title</Form.Label>
            <Form.Control
              type="text"
              name="title"
              required
              placeholder="e.g. Nike Shoes, Rolex Watch"
              value={products.title}
              onChange={changeHandler}
            />
          </Form.Group>

          {/* Description Field */}
          <Form.Group className="mb-3">
            <Form.Label className="fw-bold">Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={2}
              name="desc"
              required
              placeholder="Write a short catchy description..."
              value={products.desc}
              onChange={changeHandler}
            />
          </Form.Group>

          {/* Price and Rating Row */}
          <div className="row">
            <div className="col-md-6">
              <Form.Group className="mb-3">
                <Form.Label className="fw-bold">Price ($)</Form.Label>
                <Form.Control
                  type="number"
                  name="price"
                  required
                  value={products.price}
                  onChange={changeHandler}
                />
              </Form.Group>
            </div>
            <div className="col-md-6">
              <Form.Group className="mb-3">
                <Form.Label className="fw-bold">Rating (1-5)</Form.Label>
                <Form.Control
                  type="number"
                  name="rating"
                  min="1"
                  max="5"
                  value={products.rating}
                  onChange={changeHandler}
                />
              </Form.Group>
            </div>
          </div>

          {/* Image URL Field - Manual Input */}
          <Form.Group className="mb-3">
            <Form.Label className="fw-bold text-primary">
              Custom Image URL
            </Form.Label>
            <Form.Control
              type="text"
              name="image"
              placeholder="Paste your image link here..."
              value={products.image}
              onChange={changeHandler}
            />
            <Form.Text className="text-muted small">
              Tip: Right-click an image online and select "Copy Image Address".
            </Form.Text>
          </Form.Group>

          {/* LIVE IMAGE PREVIEW SECTION */}
          {products.image && (
            <div className="mb-3 text-center animate__animated animate__fadeIn">
              <p className="small fw-bold text-muted mb-2">Image Preview:</p>
              <img
                src={products.image}
                alt="Preview"
                style={{
                  maxHeight: "180px",
                  width: "100%",
                  objectFit: "contain",
                  borderRadius: "10px",
                  border: "2px dashed #ccc",
                  padding: "5px",
                }}
                onError={(e) => {
                  e.target.src =
                    "https://placehold.co/600x400?text=Invalid+Image+URL";
                }}
              />
            </div>
          )}

          {/* Review Field */}
          <Form.Group className="mb-4">
            <Form.Label className="fw-bold">Top Review</Form.Label>
            <Form.Control
              type="text"
              name="review"
              placeholder="What do customers say?"
              value={products.review}
              onChange={changeHandler}
            />
          </Form.Group>

          {/* Submit Button */}
          <div className="d-grid">
            <Button
              type="submit"
              variant="dark"
              size="lg"
              className="rounded-pill shadow-sm"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Spinner animation="border" size="sm" className="me-2" />
                  Publishing...
                </>
              ) : (
                "Publish Product"
              )}
            </Button>
          </div>
        </Form>
      </Card>
    </div>
  );
}

export default CreateProduct;
