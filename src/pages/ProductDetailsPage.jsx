import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const apiURL = "https://fakestoreapi.com/products";

function ProductDetailsPage(props) {
  // The state variable `product` is currently an empty object {},
  // but you should use it to store the response from the Fake Store API (the product details).
  const [product, setProduct] = useState({});
  const { productId } = useParams();
  const [fetching, setFetching] = useState(true);

  // The `productId` coming from the URL parameter is available in the URL path.
  // You can access it with the `useParams` hook from react-router-dom.

  // To fetch the product details, set up an effect with the `useEffect` hook:

  useEffect(() => {
    axios
      .get(`${apiURL}/${productId}`)
      .then((response) => {
        setProduct(response.data);
        setFetching(false);
      })
      .catch((error) => console.log(error));
  }, [productId]);

  return (
    <div className="ProductDetailsPage">
      {fetching && <p>Loading ...</p>}
      <div className="card">
        <img src={product.image} />
        <p>{product.title}</p>
        <p>{product.category}</p>
        <p>${product.price}</p>
        <p>{product.description}</p>
      </div>
      <Link to={`/`}>
        <button>Back</button>
      </Link>
    </div>
  );
}

export default ProductDetailsPage;
