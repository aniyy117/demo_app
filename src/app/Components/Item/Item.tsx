// react
import React from "react";
import { Button } from "@mui/material";
import styles from "./Items.module.scss";
import { numberFormat } from "../../ui-componets/utils/valueFormat";

// ----------------------------------------------------------------------------------

interface ItemsProps {
  item: any;
  handleAddToCart: (item: any) => void;
}

const Items: React.FC<ItemsProps> = ({item , handleAddToCart}) => {


  return (
    <div id="item" className={styles.wapper}>
       <img className={styles.img} src={item.thumbnail} alt={item.title} />
      <div className={styles.content}>
        <h3>{item.title}</h3>
        <p>{item.description}</p>
        <h3>{numberFormat(item.price)}</h3>
      </div>
      <Button className={styles.button} onClick={() => handleAddToCart(item)}>Add to cart</Button>
    </div>
  );
};

// ----------------------------------------------------------------------------------

export default Items;
