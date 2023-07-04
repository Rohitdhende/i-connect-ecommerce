import * as React from "react";
import AspectRatio from "@mui/joy/AspectRatio";
import Card from "@mui/material/Card";
import CardContent from "@mui/joy/CardContent";
import Typography from "@mui/joy/Typography";
import { Box, Divider, Rating } from "@mui/material";

export default function ProductCard(props) {
  const { title, price, image, rating } = props;
  return (
    <Card
      variant="outlined"
      sx={{
        width: { xs: "auto", sm: 320, md: 320, lg: 320, xl: 320 },
        boxShadow: 1,
        padding: "1rem",
        display: "flex",
        flexDirection: "column",
        gap: 2,
        borderRadius: "1rem",
        "&:hover": {
          boxShadow: 5,
          cursor: "pointer",
        },
      }}
    >
      <div>
        <Typography level="h2" fontSize="md" sx={{ mb: 0.5 }}>
          {title}
        </Typography>
        <Box
          sx={{
            "& > legend": { mt: 2 },
          }}
        >
          <Rating name="read-only" value={rating.rate} readOnly size="small" />
        </Box>
      </div>
      {/* <Divider /> */}
      <AspectRatio minHeight="120px" maxHeight="200px">
        <img src={image} srcSet={image} loading="lazy" alt="" />
      </AspectRatio>
      <Divider />
      <CardContent
        orientation="horizontal"
        sx={{ display: "flex", justifyContent: "space-between" }}
      >
        <div>
          <Typography level="body3">Total price:</Typography>
          <Typography fontSize="lg" fontWeight="lg">
            ₹{price}
          </Typography>
        </div>
        {/* <Box sx={{ display: "flex", alignItems: "center" }}>
          <IconButton
            aria-label="bookmark Bahamas Islands"
            variant="plain"
            color="neutral"
            size="sm"
            sx={{ marginRight: "1rem" }}
          >
            <AddShoppingCartIcon />
          </IconButton>
          <Button
            variant="solid"
            size="sm"
            color="primary"
            aria-label="Buy this product"
            sx={{ ml: "auto", fontWeight: 600 }}
          >
            Buy
          </Button>
        </Box> */}
      </CardContent>
    </Card>
  );
}
