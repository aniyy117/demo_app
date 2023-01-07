// react
import React, { useEffect } from "react";
import styles from "./Cart.module.scss";
import { useDispatch, useSelector } from "react-redux";
// import { numberFormat } from "../../ui-componets/utils/valueFormat";
import { CartsSelectors } from "../../Redux/Reducers/cart.reducers";
import {
  decrementQuantity,
  incrementQuantity,
  removeItem,
  resetCart,
} from "../../Redux/Actions/cart.action";
import CartItem from "./CartItem/CartItem";
import { Button, Fade, Grid } from "@mui/material";
import { numberFormat } from "../../ui-componets/utils/valueFormat";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import NoData from "../../Core/NoData/NoData";
import { useHistory } from "react-router-dom";
import { useDocumentTitle } from "../../Core/CustomHooks/useDocumentTitle";
import logo from "../../../app/assets/icons/logo.png";
import { ADMIN } from "../../services/admin.service";
import { AUTH } from "../../services/auth";

// ----------------------------------------------------------------------------------

interface CartProps {}

const Cart: React.FC<CartProps> = () => {
  useDocumentTitle("Cart");
  const dispatch = useDispatch();
  const cartItem = useSelector(CartsSelectors.selectAll);
  const history = useHistory();

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  //for total
  const grandTotal = cartItem.reduce((acc: any, item: any) => {
    return acc + item.price * item.quantity;
  }, 0);

  const options = {
    key: "rzp_test_HJG5Rtuy8Xh2NB",
    amount: grandTotal * 100, //  we have to multiply total amount with 100
    currency: "INR", // we can change currency also
    name: "Demo Shop",
    description: "Test",
    image: logo,
    handler: function (response: any) {
      ADMIN.toast.success("Payment is Done");
      dispatch(resetCart());
    },
    prefill: {
      name: AUTH.user_name,
      contact: "9999999999",
      email: AUTH.email,
    },
    notes: {
      address: "some address",
    },
    // theme: {
    //   color: "#F37254",
    //   hide_topbar: false,
    // },
  };

  const openPayModal = (options: any) => {
    //@ts-ignore
    var rzp1 = new window.Razorpay(options);
    rzp1.open();
  };

  return (
    <div id="Cart" className={styles.container}>
      {cartItem.length !== 0 && (
        <div className={styles.payment_info}>
          <div className={styles.grandTotal}>
            <h3>{`Grand Total :  ${numberFormat(grandTotal)}`}</h3>
          </div>
          <Button onClick={() => openPayModal(options)}>Check Out</Button>
        </div>
      )}
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
    </div>
  );
};

// ----------------------------------------------------------------------------------

export default Cart;
