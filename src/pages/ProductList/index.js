import React, { useEffect, useState } from "react";
import ProductCard from "../../components/ProductCard";
import { getProducts } from "../../data/remote/api";
import { Backdrop, Box, CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";

const ProductList = () => {
  const [productList, setProductList] = useState([]);
  const [isLoading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    const getData = async () => {
      const data = await getProducts();
      setProductList(data);
      setLoading(false);
    };
    getData();
  }, []);
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        paddingTop: "70px",
      }}
    >
      {isLoading ? (
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={isLoading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      ) : (
        productList.map((product) => {
          return (
            <Box
              key={product.id}
              sx={{ margin: "0.5rem" }}
              onClick={() => navigate(`/product-details/${product.id}`)}
            >
              <ProductCard {...product} />
            </Box>
          );
        })
      )}
    </Box>
  );
};

export default ProductList;
