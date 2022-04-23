import { Container, Grid, CircularProgress } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect } from "react";
import { addToBasket, fetchProducts } from "../store/actions/shopActions";
import { ProductBlock } from "../components/ProductBlock";
import { Basket } from "../components/Basket";

export function ShopPage() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.shop.products);
  const loadingStatus = useSelector((state) => state.shop.loading);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleAddToBasket = useCallback(
    (product) => {
      console.log("gggggg");
      dispatch(addToBasket(product));
    },
    [dispatch],
  );

  return (
    <Container>
      {loadingStatus ? (
        <CircularProgress />
      ) : (
        <>
          <Grid container spacing={2}>
            {products.map((product) => (
              <Grid item xs={12} sm={6} md={3} key={product.id}>
                <ProductBlock product={product} onAddToBasket={() => handleAddToBasket(product)} />
              </Grid>
            ))}
          </Grid>
          <Basket />
        </>
      )}
    </Container>
  );
}
