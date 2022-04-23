import { styled, Button, Alert, Drawer } from "@mui/material";
import { Box } from "@mui/system";
import { useCallback, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToBasket } from "../store/actions/shopActions";
import { decreaseProduct } from "../store/actions/shopActions";

const Wrapper = styled("div")`
  position: fixed;
  z-index: 1000;
  right: 20px;
  top: 80px;
  width: 100px;
  height: 100px;
  border-radius: 50px;
  background-color: #dfdfdf77;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  /* ${({ expanded }) =>
    expanded &&
    `
    width: 600px;
    height: 600px;
    background: white;
    border: 1px solid #486df577;
    border-radius: 10px;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    padding: 16px;
  `} */

  ${({ expanded }) =>
    expanded &&
    `
   opacity:0;
   transition:0;
  `}
  @media (max-width: 620px) {
    position: fixed;
    z-index: 1000;
    right: 20px;
    top: 80px;
    width: 100px;
    height: 100px;
    border-radius: 50px;
    background-color: #486df577;
    display: flex;
    align-items: center;
    justify-content: center;

    cursor: pointer;
    transition: 0.2s;
    /* ${({ expanded }) =>
      expanded &&
      `
    width: 80%;
    height: auto;
    font-size:7px;
    background-color: white;
    border-radius: 10px;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    
  `} */
  }
`;
const BasketIcon = styled("span")`
  font-size: 40px;
  position: relative;
  ${({ expanded }) =>
    expanded &&
    `
    display:none
    `}
`;
const ButtonX = styled("span")`
  ${({ expanded }) =>
    expanded &&
    `
    font-size:27px;
    margin-left: 90%;
    `}
  ${({ expanded }) =>
    !expanded &&
    `z-index: 1001;
  position: absolute;
  opacity:0;
  width: 150px;
  height: 150px;
  border-radius: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer`}
  
&:hover {
    transform: rotate(180deg);
    transition: 0.3s;
  }
`;
const ThName = styled("div")`
  width: 370px;
  @media (max-width: 620px) {
    width: 200px;
  }
`;
const ThAmount = styled("div")`
  width: 100px;
  @media (max-width: 620px) {
    width: 50px;
  }
`;
const ButtonReset = styled(Button)`
  margin-left: 80%;
  &:hover {
    color: red;
  }
`;
const EmptyIcon = styled("div")`
  font-size: 72px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  position: absolute;
  @media (max-width: 620px) {
    font-size: 30px;
  }
`;
const ButtonDelete = styled(Button)`
  width: 30px;
`;
export function BasketItem({ product, count }) {
  const dispatch = useDispatch();
  const handleAddToBasket = useCallback(
    (product) => {
      dispatch(addToBasket(product));
    },
    [dispatch],
  );
  const handleDecrease = useCallback(
    (product) => {
      dispatch(decreaseProduct(product));
    },
    [dispatch],
  );
  const handleRemoveClick = useCallback(() => {
    dispatch({ type: "basketProduct/remove", payload: product.id });
  }, [product.id, dispatch]);
  const ImageBasket = styled("img")`
    width: 70px;
    height: 70px;
    object-fit: contain;
    margin-left: 20px;
    @media (max-width: 620px) {
      width: 40px;
      height: 40px;
      object-fit: contain;
      margin: 0;
    }
  `;

  let total = +product.price * +count;

  return (
    <table style={{ "border-bottom": "1px solid #3535354d", backgroundColor: "#e2dfdf39" }}>
      <tbody>
        <tr>
          <td>
            <ImageBasket src={product.image} />
          </td>
          <td style={{ width: "300px" }}> {product.title}</td>
          <td>
            <p style={{ fontSize: "24px" }}> {count}</p>
          </td>
          <td>
            <Button onClick={() => handleAddToBasket(product)}>+</Button>
            <Button onClick={() => handleDecrease(product)}>-</Button>
          </td>
          <td style={{ color: "red" }}>{total.toFixed(2)}$</td>
          <td>
            <ButtonDelete onClick={handleRemoveClick}>x</ButtonDelete>
          </td>
        </tr>
      </tbody>
    </table>
    // <div style={{ display: "flex", alignItems: "center" }}>
    //   <ImageBasket src={product.image}></ImageBasket>
    //   {product.title}
    //   {/* <input type="number " value={count} /> */}
    //   <span>amount: {count}</span>
    //   <Button onClick={() => handleAddToBasket(product)}>+1</Button>
    //   <Button onClick={() => handleDecrease(product)}>-1</Button>
    //   <Button onClick={handleRemoveClick}> delete</Button>
    // </div>
  );
}

export function Basket(product) {
  const [expanded, setExpanded] = useState(true);
  const basket = useSelector((state) => state.shop.basket);
  const dispatch = useDispatch();
  const handleReset = useCallback(() => {
    dispatch({ type: "basketProduct/reset", payload: product.id });
  }, [product.id, dispatch]);

  const allTotal = useMemo(
    () => basket.reduce((acc, { product, count }) => acc + product.price * count, 0),
    [basket],
  );
  const allItems = useMemo(() => basket.reduce((acc, { count }) => acc + count, 0), [basket]);

  return (
    <Wrapper expanded={expanded}>
      <ButtonX expanded={expanded} onClick={() => setExpanded(!expanded)}>
        ✖️
      </ButtonX>
      <BasketIcon expanded={expanded}>🛒</BasketIcon>
      <div
        style={{
          position: "absolute",
          "font-size": "20px",
          "margin-left": "-10px",
          "margin-top": "-30px",
          "background-color": " #68686860",
          width: "30px",
          height: "30px",
          textAlign: "center",
          borderRadius: "50%",
        }}>
        {allItems}
      </div>
      <Drawer open={expanded} anchor={"right"} onClose={() => setExpanded(!expanded)}>
        <Box sx={{ width: { xs: "100%", md: "400px", lg: "600px" } }}>
          {basket.length ? (
            <>
              <div style={{ width: "100%", color: '"red' }}>
                {basket.length ? (
                  <h3 style={{ "border-bottom": "1px solid black" }}>
                    {allItems} items for {allTotal.toFixed(2)}
                  </h3>
                ) : (
                  ""
                )}
                {basket.length ? (
                  <table>
                    <thead>
                      <tr style={{ "border-bottom": "1px solid black" }}>
                        <th>
                          <ThName>Name</ThName>
                        </th>
                        <th>
                          <ThAmount>Amount</ThAmount>
                        </th>
                        <th>
                          <ThAmount>Total</ThAmount>
                        </th>
                      </tr>
                    </thead>
                  </table>
                ) : (
                  <EmptyIcon>
                    <div>🤷</div>
                  </EmptyIcon>
                )}
              </div>

              {basket.map(({ product, count }) => (
                <BasketItem product={product} count={count} key={product.id} />
              ))}
              <>{basket.length ? <ButtonReset onClick={handleReset}>Reset </ButtonReset> : ""}</>
              <>
                {basket.length ? (
                  <>
                    <div
                      style={{
                        justifyContent: "space-around",
                        display: "flex",
                        alignItems: "center",
                        fontSize: "18px",
                        textTransform: "uppercase",
                      }}>
                      <p style={{ display: "flex", marginLeft: "20px" }}> Total:</p>
                      <p style={{ display: "flex", marginLeft: "20px" }}>{allTotal.toFixed(2)}</p>
                    </div>
                    <div
                      style={{
                        justifyContent: "space-around",
                        display: "flex",
                        alignItems: "center",
                        fontSize: "18px",
                        textTransform: "uppercase",
                      }}>
                      <p style={{ display: "flex", marginLeft: "20px" }}> All items:</p>
                      <p style={{ display: "flex", marginLeft: "20px" }}>{allItems}</p>
                    </div>
                  </>
                ) : (
                  ""
                )}
              </>
            </>
          ) : (
            <EmptyIcon>
              <div>🤷</div>
            </EmptyIcon>
          )}
        </Box>
      </Drawer>
      {/* {expanded && (
        <div>
          {basket.length ? (
            <h3 style={{ "border-bottom": "1px solid black" }}>
              {allItems} items for {allTotal.toFixed(2)}
            </h3>
          ) : (
            ""
          )}
          {basket.length ? (
            <table>
              <thead>
                <tr style={{ "border-bottom": "1px solid black" }}>
                  <th>
                    <ThName>Name</ThName>
                  </th>
                  <th>
                    <ThAmount>Amount</ThAmount>
                  </th>
                  <th>
                    <ThAmount>Total</ThAmount>
                  </th>
                </tr>
              </thead>
            </table>
          ) : (
            <EmptyIcon>
              <div>🤷</div>
            </EmptyIcon>
          )}
        </div>
      )}
      {expanded &&
        basket.map(({ product, count }) => (
          <BasketItem product={product} count={count} key={product.id} />
        ))}
      {expanded && (
        <>{basket.length ? <ButtonReset onClick={handleReset}>Reset </ButtonReset> : ""}</>
      )}
      {expanded && (
        <>
          {basket.length ? (
            <>
              <div
                style={{
                  justifyContent: "space-around",
                  display: "flex",
                  alignItems: "center",
                  fontSize: "18px",
                  textTransform: "uppercase",
                }}>
                <p style={{ display: "flex", marginLeft: "20px" }}> Total:</p>
                <p style={{ display: "flex", marginLeft: "20px" }}>{allTotal.toFixed(2)}</p>
              </div>
              <div
                style={{
                  justifyContent: "space-around",
                  display: "flex",
                  alignItems: "center",
                  fontSize: "18px",
                  textTransform: "uppercase",
                }}>
                <p style={{ display: "flex", marginLeft: "20px" }}> All items:</p>
                <p style={{ display: "flex", marginLeft: "20px" }}>{allItems}</p>
              </div>
            </>
          ) : (
            ""
          )}
        </>
      )} */}
    </Wrapper>
  );
}
