import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import { useSelector } from "react-redux";
import { RootState } from "../Redux/storeConfigurations";
import { useAppDispatch } from "../../AppRouter";
import { toggleTheme } from "../Redux/Slice/theme.slice";
import Brightness5Icon from "@mui/icons-material/Brightness5";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { AUTH } from "../services/auth";
import Badge from "@mui/material/Badge";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import HomeIcon from "@mui/icons-material/Home";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import { NavLink, useLocation } from "react-router-dom";
import { CartsSelectors } from "../Redux/Reducers/cart.reducers";

export default function MenuAppBar() {
  const theme = useSelector((state: RootState) => state.theme);
  const cartItem = useSelector(CartsSelectors.selectAll);
  const isLoggedIn = useSelector((state: RootState) => state.auth);
  const dispatch = useAppDispatch();
  const { pathname } = useLocation();

  const handleClose = () => {
    AUTH.logout();
  };

  const count =
    cartItem.length > 0 ? cartItem.reduce((a, b: any) => a + b.quantity, 0) : 0;

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Demo
          </Typography>
          {isLoggedIn.auth && (
            <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleClose}
                color="inherit"
              >
                <PowerSettingsNewIcon />
              </IconButton>
              {pathname.includes("landing") && (
                <NavLink to="/cart">
                  <Badge badgeContent={count} color="warning">
                    <ShoppingCartIcon color="secondary" />
                  </Badge>
                </NavLink>
              )}

              {pathname.includes("cart") && (
                <NavLink to="/landing">
                  <Badge badgeContent={0} color="primary">
                    <HomeIcon color="secondary" />
                  </Badge>
                </NavLink>
              )}
            </div>
          )}

          <div>
            <IconButton
              onClick={() => dispatch(toggleTheme())}
              size="large"
              aria-label="account of current user"
              aria-haspopup="true"
              color="inherit"
            >
              {theme.darkTheme ? <Brightness5Icon /> : <DarkModeIcon />}
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
