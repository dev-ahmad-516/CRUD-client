import React, { useState, useEffect } from "react";
import { Button, Form, Card, Spinner } from "react-bootstrap";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

function EditProduct() {
  const { id } = useParams(); // Gets the ID from the URL
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState({
    title: "",
    desc: "",
    price: "",
    rating: "",
    review: "",
    image: "",
  });

  // 1. Fetch the existing data when the page loads
  useEffect(() => {
    async function getProduct() {
      try {
        const res = await axios.get(
          `https://crud-server-yqbp.onrender.com/products/${id}`,
        );
        setProduct(res.data);
      } catch (err) {
        toast.error("Could not find this product!");
      }
    }
    getProduct();
  }, [id]);

  function changeHandler(e) {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  }

  async function submitHandler(e) {
    e.preventDefault();
    setLoading(true);

    // Use the ID directly from the product state to be safe
    const targetId = product.id || product._id || id;

    try {
      // We send the 'product' object to the server
      await axios.put(
        `https://crud-server-yqbp.onrender.com/products/${targetId}`,
        product,
      );
      toast.success("Product Updated Successfully!");
      navigate("/");
    } catch (error) {
      console.error("Update Error:", error.response); // This will show more detail in console
      toast.error(
        `Update failed: ${error.response?.statusText || "Server Error"}`,
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-50 mx-auto mt-4 my-4">
      <Card className="p-4 shadow-sm border-0" style={{ borderRadius: "15px" }}>
        <h2 className="fst-italic mb-4 text-center">✏️ Edit Product</h2>
        <Form onSubmit={submitHandler}>
          <Form.Group className="mb-3">
            <Form.Label className="fw-bold">Title</Form.Label>
            <Form.Control
              name="title"
              value={product.title}
              onChange={changeHandler}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label className="fw-bold">Image URL</Form.Label>
            <Form.Control
              name="image"
              placeholder="Paste new image address here..."
              value={product.image}
              onChange={changeHandler}
            />
          </Form.Group>

          {/* PREVIEW TO HELP YOU FIX THE 'NO IMAGE' PROBLEM */}
          {product.image && (
            <div className="text-center mb-3">
              <img
                src={product.image}
                alt="Preview"
                style={{ maxHeight: "150px", borderRadius: "10px" }}
                onError={(e) => {
                  e.target.src = "https://placehold.co/400?text=Invalid+Link";
                }}
              />
            </div>
          )}

          <div className="d-grid">
            <Button
              type="submit"
              variant="success"
              size="lg"
              className="rounded-pill"
              disabled={loading}
            >
              {loading ? (
                <Spinner animation="border" size="sm" />
              ) : (
                "Save Changes"
              )}
            </Button>
          </div>
        </Form>
      </Card>
    </div>
  );
}

export default EditProduct;
