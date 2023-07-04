//add to cart function using localstorage
export const addToCart = (product) => {
    const cart = getCart();
    const productInCart = cart.find(
      (item) => item.id === product.id
    );
  
    if (productInCart) {
      productInCart.quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }
  
    localStorage.setItem('cart', JSON.stringify(cart));
  };

  export const decreaseQuantity = (product) => {
    const cart = getCart();
    const productInCart = cart.find(
      (item) => item.id === product.id
    );
  
    if (productInCart) {
      productInCart.quantity -= 1;
    } else {
      removeFromCart(product.id)
    }
  
    localStorage.setItem('cart', JSON.stringify(cart));
  };
  
  //get cart function using localstorage
  export const getCart = () => {
    if (typeof window !== 'undefined') {
      const cart = localStorage.getItem('cart');
  
      return cart ? JSON.parse(cart) : [];
    } else {
      return [];
    }
  };
  
  export const getCartCount = () => {
    if (typeof window !== 'undefined') {
      const cart = localStorage.getItem('cart');
  
      return cart ? JSON.parse(cart)?.length : 0;
    }
  };
  
  //remove from cart function using localstorage
  export const removeFromCart = (productId) => {
    const cart = getCart();
    const updatedCart = cart.filter((item) => item.id !== productId);
  
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };
  
  //clear cart function using localstorage
  export const clearCart = () => {
    localStorage.removeItem('cart');
  };
  
  //get total price function using localstorage
  export const getTotalPrice = () => {
    if (typeof window !== 'undefined') {
      const cart = getCart();
  
      return cart.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );
    }
  };