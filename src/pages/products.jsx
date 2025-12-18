import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

function Products() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  async function fetchProducts() {
    // Fetching all products from the server by using fetch method

    // const res = await fetch("http://localhost:8000/");
    // console.log("res", res);
    // const data = await res.json();
    // console.log("data", data);

    const res = await axios.get("http://localhost:8000");
    console.log(res);
    setProducts(res.data);
  }
  // fetchProducts();    we cannot use this here as it will create infinite loop

  useEffect(() => {
    // we can use useEffect to call the function only once when the component is mounted
    fetchProducts();
  }, []);
  return (
    <div className="w-75 mx-auto my-4 ">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>All Products</h1>
        <Button variant="dark" onClick={() => navigate("/create")}>
          {/* <Link to="/create">Create Products</Link>  // it is the method of navigating from oonr route to another!! */}
          Create products
        </Button>
      </div>

      {/* <div className="d-flex justify-content-between flex-wrap mt-4 gap-5">
        {products.map((meriProduct) => {
          return (
            <Card style={{ width: "18rem" }}>
              <Card.Img variant="top" src="holder.js/100px180" />
              <Card.Body>
                <Card.Title>{meriProduct.title}</Card.Title>
                <Card.Text>{meriProduct.desc}</Card.Text>
                <Card.Text>{meriProduct.price}</Card.Text>
                <Card.Text>{meriProduct.rating}</Card.Text>
                <Card.Text>{meriProduct.reviews}</Card.Text>
                <Button variant="primary">Details</Button>
              </Card.Body>
            </Card>
          );
        })}
      </div> */}

      <div className="row g-4 mt-4">
        {products
          .filter((p) => p.title)
          .map((meriProduct) => (
            <div
              className="col-12 col-sm-6 col-md-4 col-lg-3"
              style={{ flexWrap: "wrap" }}
              key={meriProduct._id || meriProduct.id}
            >
              <Card className="h-100">
                <Card.Img
                  variant="top"
                  src={
                    meriProduct.image || "https://via.placeholder.com/300x180"
                  }
                />
                <Card.Body>
                  <Card.Title>{meriProduct.title}</Card.Title>
                  <Card.Text>{meriProduct.desc}</Card.Text>
                  <Card.Text>Price: ${meriProduct.price}</Card.Text>
                  <Card.Text>Rating: {meriProduct.rating}</Card.Text>
                  <Card.Text>Reviews: {meriProduct.reviews}</Card.Text>
                  <Button variant="primary">Details</Button>
                </Card.Body>
              </Card>
            </div>
          ))}
      </div>
    </div>
  );
}

export default Products;
