// ***************************** imports; *********************************

import { useParams } from "react-router-dom";
import { SingleCoin } from "../config/api";
import { useEffect, useState } from "react";
import { CryptoState } from "../CryptoContext";
import axios from "axios";
import { makeStyles } from "@material-ui/styles";
import Chart from "../components/Chart";
import parse from "html-react-parser";
import { numberWithCommas } from "../components/Banner/Carousal";

import { Typography, LinearProgress } from "@material-ui/core";

// ***********************************************custom Styles ********************************************************
const useStyles = makeStyles({
  container: {
    // contains the sidebar and the chart.
    display: "flex",
  },

  sidebar: {
    width: "35%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: 25,
    borderRight: "2px solid grey",
  },

  "@media (max-width: 900px)": {
    container: {
      flexDirection: "column",
      alignItems: "center",
    },

    sidebar: {
      width: "100%",
    },

    description: {
      textAlign: "justify",
      padding: 25,
    },
  },

  heading: {
    fontWeight: "bold",
    marginBottom: 20,
    fontFamily: "Montserrat",
  },

  description: {
    padding: "12px",
    fontSize: "18px",
  },

  ans: {
    fontSize: "24px",
    marginLeft: "10px",
    fontWeight: "normal",
  },
});

// ********************************* return function *******************************************
const Coin = () => {
  // ***************local states, and custorm params *****************************
  const { id } = useParams();
  const [coin, setCoin] = useState(null);
  const { currency, symbol } = CryptoState();
  const classes = useStyles();

  // *************************fetching coin details from SingleCoin endpoint**********************
  const fetchCoin = async () => {
    const { data } = await axios.get(SingleCoin(id));
    setCoin(data);
  };

  // ********************useEffect ************************ for rendering

  useEffect(() => {
    fetchCoin();
  }, []);

  if (!coin) return <LinearProgress />; // this is important, else jab tak coin null rhega tab page break ho jaega because coin.name error dedega
  return (
    coin && (
      // return value , inside a div.container / added a side bar and a chart component
      <div className={classes.container}>
        <div className={classes.sidebar}>
          {/* **********************adding image, name and a little description ***********************/}
          <img
            src={coin.image.large}
            alt={coin.name}
            style={{ marginBottom: 20, width: 200 }}
          />
          <Typography variant="h3" className={classes.heading}>
            {coin.name}
          </Typography>
          <Typography variant="subtitle2" className={classes.description}>
            {parse(coin.description.en.split(". ")[0])}
          </Typography>
          {/* **************************** adding the rank / current price and market cap  **************************/}
          {/* Rank  */}
          <span
            style={{
              teaxtAlign: "center",
              display: "flex",
              justifyContent: "space-around",
            }}
          >
            <Typography
              variant="h5"
              style={{
                fontFamily: "Montserrat",
                fontWeight: "bold",
                fontSize: 25,
              }}
            >
              Rank:
            </Typography>
            <Typography className={classes.ans}>
              {coin.market_data.market_cap_rank}
            </Typography>
          </span>
          &nbsp; &nbsp;
          {/* Current Price  */}
          <span style={{ teaxtAlign: "center", display: "flex" }}>
            <Typography
              variant="h5"
              style={{
                fontFamily: "Montserrat",
                fontWeight: "bold",
                fontSize: 25,
              }}
            >
              Current Price:
            </Typography>
            <Typography className={classes.ans}>
              {symbol}
              {numberWithCommas(
                coin.market_data.current_price[currency.toLowerCase()]
              )}
            </Typography>
          </span>
          &nbsp; &nbsp;
          {/* Market value */}
          <span style={{ teaxtAlign: "center", display: "flex" }}>
            <Typography
              variant="h5"
              style={{
                fontFamily: "Montserrat",
                fontWeight: "bold",
                fontSize: 25,
              }}
            >
              Market Cap:
            </Typography>
            <Typography className={classes.ans}>
              {symbol}
              {numberWithCommas(
                coin.market_data.market_cap[currency.toLowerCase()]
              )
                .toString()
                .slice(0, -6)}{" "}
              M
            </Typography>
          </span>
          &nbsp; &nbsp;
          {/* Chart component  */}
        </div>
        <Chart coin={coin} />
      </div>
    )
  );
};

export default Coin;
