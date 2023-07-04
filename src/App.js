import { BrowserRouter } from "react-router-dom";
import Router from "./routes";
import Header from "./components/Header";
import { useEffect, useState } from "react";
import { getCart,addToCart, getCartCount, decreaseQuantity, removeFromCart } from "./methods";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [cartCount, setCartCount] = useState(0);
  const [subTotal, setSubTotal] = useState(0);
  const [cart, setCart] = useState([]);
  

  const saveCart = (cart) => {
    localStorage.setItem("cart", JSON.stringify(cart));
    let subT = 0;
    let keys = Object.keys(cart);
    for (let i = 0; i < keys.length; i++) {
      subT += cart[keys[i]].quantity * cart[keys[i]].price;
    }
    setSubTotal(subT);
  };
  
  useEffect(()=>{
    setCart(getCart())
    setCartCount(getCartCount())
  },[])

  const clearCart = () => {
    localStorage.clear();
    setCart([]);
    saveCart([]);
  };
  
  return (
    <BrowserRouter>
      <Header
        cart={cart}
        setCart={setCart}
        clearCart={clearCart}
        setCartCount={setCartCount}
        decreaseQuantity={decreaseQuantity}
        subTotal={subTotal}
        cartCount={cartCount}
      />
      <Router
        cart={cart}
        setCart={setCart}
        addToCart={addToCart}
        clearCart={clearCart}
        decreaseQuantity={decreaseQuantity}
        setCartCount={setCartCount}
        removeFromCart={removeFromCart}
        subTotal={subTotal}
        cartCount={cartCount}
      />
      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;
