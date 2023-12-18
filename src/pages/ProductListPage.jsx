import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const apiURL = "https://fakestoreapi.com/products";

function ProductListPage() {
  // The state variable `products` is currently an empty array [],
  // but you should use it to store the response from the Fake Store API (the list of products).
  const [products, setProducts] = useState([]);
  const [fetching, setFetching] = useState(true);

  // To fetch the list of products, set up an effect with the `useEffect` hook:
  useEffect(() => {
    axios
      .get(apiURL)
      .then((response) => {
        setProducts(response.data);
        setFetching(false);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <div className="ProductListPage">
      {fetching && <p>Loading ...</p>}
      {products.map((product) => {
        return (
          <Link key={product.id} to={`/product/details/${product.id}`}>
            <div className="card">
              <img src={product.image} />
              <p>{product.title}</p>
              <p>{product.category}</p>
              <p>${product.price}</p>
              <p>{product.description}</p>
            </div>
          </Link>
        );
      })}
    </div>
  );
}

export default ProductListPage;
