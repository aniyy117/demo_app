import { API } from "./api-services";

const url = "products";

class Product {
  get = () => {
    return API.get(url);
  };
}

const product = new Product();

export default product;
