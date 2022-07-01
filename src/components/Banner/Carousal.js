// imports
import React from "react";
import { Container, makeStyles, Typography } from "@material-ui/core";
import axios from "axios";
import { TrendingCoins } from "../../config/api"; // TrendingCoins is the endpoint for fetching the current trending coins.
import { CryptoState } from "../../CryptoContext"; // The context api to get the global state variables.
import { useState, useEffect } from "react";
import AliceCarousel from "react-alice-carousel"; // pre defined carousal liabrary
import { Link } from "react-router-dom";

// defining the styles
const useStyles = makeStyles({
  coins: {
    height: "120px",
    padding: "10px",
  },

  carIcons: {
    color: "gold",
    fontWeight: "bold",
  },

  typoText: {
    display: "Flex",
    justifyContent: "flex-start",
  },
  carousel: {
    height: "50%",
    display: "flex",
    alignItems: "center",
  },
  carouselItem: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    cursor: "pointer",
    textTransform: "uppercase",
  },
});

// ******************* the number with commas function****************
export function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// rafce function

const Carousal = () => {
  const classes = useStyles();
  const { currency, symbol } = CryptoState(); // getting the global state variables from the context api cryptoState
  const [trending, setTrending] = useState([]); // defining a local variable for storing trending coins.

  // function which will set the trending array to the top 10 cryptos
  const fetchApis = async () => {
    const { data } = await axios.get(TrendingCoins(currency));
    setTrending(data);
  };

  // using useEffect to call this function every time the currency changes, to the new data with the required currency.
  // it has a dependency of currency which means it will render everytime currency changes
  useEffect(() => {
    fetchApis();
  }, [currency]);

  // trending is now the array which contains data of top 10 crypto currencies.
  // setting items as the items to add to the carousal. (data type of an array where each array is represented as the element.)
  const items = trending.map((coin) => {
    // this profit logic is to give a + or - and to give a red or green color to the change in prices of the coin.
    let profit = coin.price_change_percentage_24h >= 0;

    return (
      <Link to={`/coin/${coin.id}`} className={classes.carouselItem}>
        <div className={classes.carIcons}>
          <img src={coin.image} alt="not-found" className={classes.coins} />
          <Typography className={classes.typoText}>
            {coin.symbol} &nbsp;
            <Typography
              style={{ color: profit > 0 ? "rgb(14, 203, 129)" : "red" }}
            >
              {profit && "+"} {coin.price_change_percentage_24h.toFixed(2)}%
            </Typography>
          </Typography>

          <Typography
            style={{
              fontSize: 22,
              fontWeight: 500,
              fontFamily: "montserrat",
            }}
          >
            {symbol}
            &nbsp;
            {numberWithCommas(coin.current_price)}
          </Typography>
        </div>
      </Link>
    );
  });

  // defined to give responsive behaviour to the carousal
  const responsive = {
    0: { items: 2 },
    512: { items: 4 },
  };

  // returning the carousal
  return (
    <Container>
      <div className={classes.carousal}>
        <AliceCarousel
          mouseTracking
          infinite
          autoPlayInterval={1000}
          animationDuration={1500}
          responsive={responsive}
          autoPlay
          items={items}
        />
      </div>
    </Container>
  );
};

export default Carousal;
