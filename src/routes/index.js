import { useRoutes } from "react-router-dom";
import Products from "../pages/ProductList";
import ProductDetail from "../pages/ProductDetail";
import Cart from "../pages/Cart";

export default function Router(props) {
  const routes = useRoutes([
    {
      path: "/",
      element: <Products />,
    },
    {
      path: "/product-details/:id",
      element: <ProductDetail {...props}/>,
    },
    {
      path: "/cart",
      element: <Cart {...props}/>,
    },
  ]);
  return routes;
}
