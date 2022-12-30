// react
import { Button } from "@mui/material";
import React from "react";
import { numberFormat } from "../../../ui-componets/utils/valueFormat";
import styles from "./CartItem.module.scss";

// ----------------------------------------------------------------------------------

interface CartItemProps {
  item: any;
  addToCart: (id: any) => void;
  removeFromCart: (id: number) => void;
  deleFromCart: (id: number) => void;
}

const CartItem: React.FC<CartItemProps> = ({
  item,
  addToCart,
  removeFromCart,
  deleFromCart
}) => {
  return (
    <div id="item" className={styles.wapper}>
      <img className={styles.img} src={item.thumbnail} alt={item.title} />
      <div className={styles.content}>
        <h3>{item.title}</h3>
        <h3>{`Price : ${numberFormat(item.price)}`}</h3>
        <h3>{`Total : ${numberFormat(item.price * item.quantity)}`}</h3>
      </div>
      <div className={styles.buttons}>
          <Button
            size="small"
            disableElevation
            variant="contained"
            className={styles.button}
            onClick={() => removeFromCart(item.id)}
          >
            -
          </Button>
          <p>{item.quantity}</p>
          <Button
            size="small"
            disableElevation
            variant="contained"
            className={styles.button}
            onClick={() => addToCart(item.id)}
          >
            +
          </Button>
        </div>
        <Button onClick={()=>deleFromCart(item.id)} className={styles.delebutton}>Delete</Button>
    </div>
  );
};

// ----------------------------------------------------------------------------------

export default CartItem;
