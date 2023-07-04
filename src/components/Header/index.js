import { useEffect, useState } from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";

import InputBase from "@mui/material/InputBase";
import Badge from "@mui/material/Badge";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { Button, Divider } from "@mui/material";
import { tabLinks } from "./config";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Logo from "../../assets/images/tlogo.png";
import BlueLogo from "../../assets/images/logo.png";
import { getCartCount } from "../../methods";
import { useNavigate } from "react-router-dom";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

export default function PrimarySearchAppBar(props) {
  const { cartCount, setCartCount } = props;
  const [isDrawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setDrawerOpen(open);
  };

  useEffect(() => {
    setCartCount(getCartCount());
  });
  const renderMobileMenu = (
    <IconButton
      size="large"
      edge="start"
      color="inherit"
      aria-label="open drawer"
      sx={{
        mr: 2,
        display: {
          xl: "none",
          lg: "none",
          md: "none",
          sm: "none",
          xs: "block",
        },
      }}
      onClick={toggleDrawer(true)}
    >
      <MenuIcon />
    </IconButton>
  );

  const navigate = useNavigate();

  const list = () => (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        <Box
          sx={{ display: "flex", justifyContent: "center", cursor: "pointer" }}
          onClick={() => navigate("/")}
        >
          <img src={BlueLogo} height={"60px"} alt="Logo"></img>
        </Box>
        <Divider />
        {tabLinks.map((item, index) => (
          <ListItem key={item.id} disablePadding>
            <ListItemButton onClick={() => navigate(item.path)}>
              <ListItemIcon>
                <item.icon />
              </ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
    </Box>
  );

  return (
    <Box sx={{ flexGrow: 1, position: "fixed", width: "100%", zIndex: 111 }}>
      <Drawer anchor={"left"} open={isDrawerOpen} onClose={toggleDrawer(false)}>
        {list("left")}
      </Drawer>
      <AppBar position="static">
        <Toolbar>
          {renderMobileMenu}
          <Box
            sx={{ display: { xs: "none", sm: "block" }, cursor: "pointer" }}
            onClick={() => navigate("/")}
          >
            <img src={Logo} height={"25px"} alt="Logo"></img>
          </Box>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
            />
          </Search>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: "flex" }}>
            <Button
              color="inherit"
              sx={{ display: { xs: "none", md: "flex" } }}
              onClick={() => navigate("/")}
            >
              Product List
            </Button>
            <IconButton
              size="large"
              aria-label="show 4 new mails"
              color="inherit"
              onClick={() => navigate("/cart")}
            >
              <Badge badgeContent={cartCount} color="error">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
