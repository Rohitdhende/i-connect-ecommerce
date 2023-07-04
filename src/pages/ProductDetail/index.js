import { Backdrop, CircularProgress, IconButton, Rating } from "@mui/material";
import { Button, Typography } from "@mui/joy";
import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import { getProduct } from "../../data/remote/api";
import { useParams } from "react-router-dom";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { getCart, getCartCount } from "../../methods";
import {  toast } from 'react-toastify';

const ProductDetails = (props) => {
  const { cart, addToCart, setCartCount } = props;
  const [productDetails, setProductDetails] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const { id } = useParams();
  useEffect(() => {
    setLoading(true);
    const getData = async () => {
      const data = await getProduct(id);
      setProductDetails(data);
      setLoading(false);
    };
    getData();
  }, [id]);

  const { title, image, description, category, price, rating } = productDetails;
  const [isProductAlreadyInCart, setProductInCart] = useState(false);

  useEffect(() => {
    const findItemInCart = cart.findIndex(
      (item) => item.id.toString() === id.toString()
    );
    if (findItemInCart !== -1) {
      setProductInCart(true);
    }
  }, [cart, id]);

  const handleCart = () => {
    addToCart(productDetails);
    setProductInCart(true);
    toast.success("Item added to cart !")
  };

  useEffect(() => {
    setCartCount(getCartCount());
  });

  useEffect(() => {
    const fetchData = async () => {
      const cart = await getCart();
      const cartCount = await getCartCount();
      props.setCart(cart);
      props.setCartCount(cartCount);
    };

    fetchData();
  }, [isProductAlreadyInCart]);

  return (
    <>
      {isLoading ? (
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={isLoading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      ) : (
        <>
          {id ? (
            <Box
              sx={{
                display: "flex",
                flexDirection: {
                  xs: "column",
                  sm: "row",
                  md: "row",
                  lg: "row",
                  xl: "row",
                },
                paddingTop: { xs: "5rem", md: "70px" },
                alignItems: "center",
                justifyContent: "space-around",
                minHeight: "80vh",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  flex: 1,
                  paddingLeft: {
                    xs: "0",
                    sm: "0",
                    md: "2rem",
                    lg: "2rem",
                    xl: "2rem",
                  },
                }}
              >
                <img
                  src={image}
                  srcSet={image}
                  loading="lazy"
                  alt=""
                  width={"80%"}
                />
              </Box>

              <Box
                sx={{
                  display: "flex",
                  flex: 2,
                  padding: "1rem",
                  flexDirection: "column",
                  gap: 1,
                }}
              >
                <Typography fontSize="lg" fontWeight="lg">
                  {title}
                </Typography>

                <Typography variant="h6">{description}</Typography>
                <Typography variant="h5">category: {category}</Typography>
                <Box
                  sx={{
                    "& > legend": { mt: 2 },
                  }}
                >
                  <Rating
                    name="read-only"
                    value={rating?.rate}
                    readOnly
                    size="small"
                  />
                </Box>
                <Typography fontSize="lg" fontWeight="lg">
                  ₹{price}
                </Typography>

                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Button>Buy</Button>
                  {isProductAlreadyInCart ? (
                    <Typography sx={{ marginLeft: "1rem" }} variant="body3">
                      Product into the cart
                    </Typography>
                  ) : (
                    <IconButton
                      sx={{ marginLeft: "1rem" }}
                      onClick={handleCart}
                    >
                      <AddShoppingCartIcon />
                    </IconButton>
                  )}
                </Box>
              </Box>
            </Box>
          ) : (
            <Box
              sx={{
                display: "flex",
                flexDirection: {
                  xs: "column",
                  sm: "row",
                  md: "row",
                  lg: "row",
                  xl: "row",
                },
                paddingTop: { xs: "5rem", md: "70px" },
                alignItems: "center",
                justifyContent: "space-around",
                minHeight: "80vh",
              }}
            >
              <Typography>Opps something went wrong</Typography>
            </Box>
          )}
        </>
      )}
    </>
  );
};

export default ProductDetails;
