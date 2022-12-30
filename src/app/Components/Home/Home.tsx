// react
import React from "react";
import styles from "./Home.module.scss";
import { useQueryDispatch } from "../../Core/CustomHooks/useQueryDispatch";
import { getProduct } from "../../Redux/Actions/product.action";
import { ProductSelectors } from "../../Redux/Reducers/product.reducer";
import { useDispatch, useSelector } from "react-redux";
import LetSuspense from "../../Core/LetSuspense";
import Retry from "../../Core/Retry";
import Loader from "../../ui-componets/Loader";
import { addItem } from "../../Redux/Actions/cart.action";
import Items from "../Item/Item";
import { Fade, Grid } from "@mui/material";
import { useDocumentTitle } from "../../Core/CustomHooks/useDocumentTitle";

// ----------------------------------------------------------------------------------

interface HomeProps {}

const Home: React.FC<HomeProps> = () => {
  useDocumentTitle("Home")
  const dispatch = useDispatch();
  const fetchData = useQueryDispatch({
    query: {
      action: getProduct,
      arg: {},
    },
    dependency: [],
  });

  const product = useSelector(ProductSelectors.selectAll);

  return (
    <div id="Home" className={styles.container}>
      <LetSuspense
        condition={fetchData.match("TRUE")}
        errorCondition={fetchData.match("ERROR")}
        errorPlaceholder={<Retry onClick={fetchData.fetch} />}
        loadingPlaceholder={Loader}
      >
        <Grid container spacing={3}>
          {product?.map((item) => (
            <Fade in={true}>
              <Grid item key={item.id} xs={12} md={3} sm={4}>
                <Items
                  item={item}
                  handleAddToCart={(item) => {
                    dispatch(
                      addItem({
                        id: item.id,
                        title: item.title,
                        thumbnail: item.thumbnail,
                        price: item.price,
                      })
                    );
                  }}
                />
              </Grid>
            </Fade>
          ))}
        </Grid>
      </LetSuspense>
    </div>
  );
};

// ----------------------------------------------------------------------------------

export default Home;
