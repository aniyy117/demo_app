// react
import React from "react";
import styles from "./Cart.module.scss";
import { useDispatch, useSelector } from "react-redux";
// import { numberFormat } from "../../ui-componets/utils/valueFormat";
import { CartsSelectors } from "../../Redux/Reducers/cart.reducers";
import {
  decrementQuantity,
  incrementQuantity,
  removeItem,
} from "../../Redux/Actions/cart.action";
import CartItem from "./CartItem/CartItem";
import { Fade, Grid } from "@mui/material";
import { numberFormat } from "../../ui-componets/utils/valueFormat";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import NoData from "../../Core/NoData/NoData";
import { useHistory } from "react-router-dom";
import { useDocumentTitle } from "../../Core/CustomHooks/useDocumentTitle";

// ----------------------------------------------------------------------------------

interface CartProps {}

const Cart: React.FC<CartProps> = () => {
  useDocumentTitle("Cart");
  const dispatch = useDispatch();
  const cartItem = useSelector(CartsSelectors.selectAll);
  const history = useHistory();

  const grandTotal = cartItem.reduce((acc: any, item: any) => {
    return acc + item.price * item.quantity;
  }, 0);

  return (
    <div id="Cart" className={styles.container}>
      {cartItem.length === 0 ? (
        <NoData
          onClick={() => history.push("/landing")}
          message={"No Item in Cart"}
          subMessage={"Please add item"}
          icon={<AddCircleIcon sx={{ fontSize: 50, width: "100%" }} />}
        />
      ) : (
        <>
          <div className={styles.itemContainer}>
            <Grid container spacing={3}>
              {cartItem.map((item: any, index: any) => (
                <Fade in={true}>
                  <Grid item key={item.id} xs={12} sm={3}>
                    <CartItem
                      key={index}
                      item={item}
                      removeFromCart={(id) => {
                        dispatch(
                          decrementQuantity({
                            id: id,
                          })
                        );
                      }}
                      addToCart={(id) => {
                        dispatch(
                          incrementQuantity({
                            id: id,
                          })
                        );
                      }}
                      deleFromCart={(id) => {
                        dispatch(
                          removeItem({
                            id: id,
                          })
                        );
                      }}
                    />
                  </Grid>
                </Fade>
              ))}
            </Grid>
          </div>
        </>
      )}
      {cartItem.length !== 0 && (
        <div className={styles.grandTotal}>
          <h3>Grand Total</h3>
          <h3>{numberFormat(grandTotal)}</h3>
        </div>
      )}
    </div>
  );
};

// ----------------------------------------------------------------------------------

export default Cart;
