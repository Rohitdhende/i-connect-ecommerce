import React, { useEffect, useState } from "react";
import { Container, Box, Button, IconButton, Typography } from "@mui/material";
import { getCart, getCartCount, getTotalPrice } from "../../methods";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import ControlPointIcon from "@mui/icons-material/ControlPoint";

const Cart = (props) => {
  const [subTotal, setSubTotal] = useState(0);
  const [render, renderComponent] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const subTotal = await getTotalPrice();
      const cart = await getCart();
      const cartCount = await getCartCount();
      props.setCart(cart);
      props.setCartCount(cartCount);
      setSubTotal(subTotal);
    };

    fetchData();

    if (render) {
      setTimeout(() => {
        renderComponent(false);
      }, 100);
    }
  }, [render]);

  const handleRemoveButton = (productId) => {
    props.removeFromCart(productId);
    renderComponent(true);
  };

  // this will increase the quantity if the item already exist in the cart
  const handleAddToCart = (productDetails) => {
    props.addToCart(productDetails);
    renderComponent(true);
  };
  const handleDecreaseQuantity = (productDetails) => {
    props.decreaseQuantity(productDetails);
    if (productDetails.quantity < 2) {
      props.removeFromCart(productDetails.id);
      renderComponent(true);
    }
    renderComponent(true);
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          paddingTop: "6rem",
        }}
      >
        <Typography variant="h6" fontWeight={600}>
          Your Cart
        </Typography>
        {props.cart.length > 0 && (
          <Typography
            variant="body"
            fontWeight={600}
            sx={{
              position: "sticky",
              top: '3.5rem',
              backgroundColor: "white",
              boxShadow: "0px 15px 10px -15px #111",
              width:'100%',
              display:'flex',
              justifyContent:'center',
              zIndex:1111,
              padding:'1rem 0',
              gap:1
            }}
          >
            You have to pay <span style={{ color: "green" }}> ₹{subTotal}</span>
          </Typography>
        )}
        <Container sx={{ width: "90%", }}>
          {props.cart?.length === 0 && (
            <Box
              sx={(theme) => ({
                textAlign: "center",
                paddingY: "1rem",
                borderRadius: "1rem",
              })}
            >
              Your iConnect Shop Cart is empty
            </Box>
          )}
          {props.cart.length > 0 && (
            <>
              <Container
                sx={{
                  display: {
                    xs: "none",
                    sm: "none",
                    md: "flex",
                    lg: "flex",
                    xl: "flex",
                    boxShadow: "0px 15px 10px -20px #111",
                    textAlign: "center",
                    paddingY: "1rem",
                  },
                }}
              >
                <h4 style={{ width: "220px" }}>Product</h4>
                <h4 style={{ width: "220px" }}>Quantity</h4>
                <h4 style={{ width: "200px" }}>Price</h4>
                <h4 style={{ width: "200px" }}>Total</h4>
                <h4 style={{ width: "200px" }}> </h4>
              </Container>

              <Box
                sx={{
                  textAlign: "center",
                  padding: "1rem",
                  borderRadius: "1rem",
                }}
              >
                {props.cart?.map((item, index) => (
                  <Container
                    key={index}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      boxShadow: "0px 15px 10px -20px #111",
                      padding: "1rem 0",
                      flexDirection: {
                        xs: "column",
                        sm: "column",
                        md: "row",
                        lg: "row",
                        xl: "row",
                      },
                      gap: 1,
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        gap: 1,
                        width: "200px",
                        alignItems: "center",
                      }}
                    >
                      <img
                        src={item.image}
                        height="auto"
                        alt="thumbnail"
                        width="70px"
                      ></img>
                      <h5 style={{ flex: 1 }}> {item.title}</h5>
                    </Box>

                    <Box
                      sx={{
                        width: "200px",
                        display: "flex",
                        justifyContent: {
                          xs: "flex-start",
                          sm: "flex-start",
                          md: "center",
                          lg: "center",
                          xl: "center",
                        },
                        alignItems: "center",
                        gap: 1,
                      }}
                    >
                      <Typography
                        sx={{
                          display: {
                            xs: "block",
                            sm: "block",
                            md: "none",
                            lg: "none",
                            xl: "none",
                          },
                        }}
                      >
                        Quantity:{" "}
                      </Typography>
                      <IconButton onClick={() => handleAddToCart(item)}>
                        <ControlPointIcon />
                      </IconButton>
                      <Typography variant="body" fontWeight={500}>
                        {item.quantity}
                      </Typography>
                      <IconButton
                        onClick={() => handleDecreaseQuantity(item)}
                        disabled={item.quantity < 1}
                      >
                        <RemoveCircleOutlineIcon />
                      </IconButton>
                    </Box>
                    <Box
                      sx={{
                        width: "200px",
                        display: "flex",
                        justifyContent: {
                          xs: "flex-start",
                          sm: "flex-start",
                          md: "center",
                          lg: "center",
                          xl: "center",
                        },
                        alignItems: "center",
                        gap: 1,
                      }}
                    >
                      <Typography
                        sx={{
                          display: {
                            xs: "block",
                            sm: "block",
                            md: "none",
                            lg: "none",
                            xl: "none",
                          },
                        }}
                      >
                        Price:
                      </Typography>

                      <Typography variant="body" fontWeight={500}>
                        ₹{item.price}
                      </Typography>
                    </Box>

                    <Box
                      sx={{
                        width: "200px",
                        display: "flex",
                        justifyContent: {
                          xs: "flex-start",
                          sm: "flex-start",
                          md: "center",
                          lg: "center",
                          xl: "center",
                        },
                        alignItems: "center",
                        gap: 1,
                      }}
                    >
                      <Typography
                        sx={{
                          display: {
                            xs: "block",
                            sm: "block",
                            md: "none",
                            lg: "none",
                            xl: "none",
                          },
                        }}
                      >
                        Total Price:
                      </Typography>

                      <Typography variant="body" fontWeight={500}>
                        ₹{item.price * item.quantity}
                      </Typography>
                    </Box>

                    <Button
                      variant="contained"
                      onClick={() => handleRemoveButton(item.id)}
                    >
                      Remove
                    </Button>
                  </Container>
                ))}
              </Box>
            </>
          )}
        </Container>
        <Button variant="outlined" color="success">
          Proceed to Pay
        </Button>
      </div>
    </div>
  );
};
export default Cart;
