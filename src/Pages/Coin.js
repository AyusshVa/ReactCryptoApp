import { useParams } from "react-router-dom";
import { SingleCoin } from "../config/api";
import { useEffect, useState } from "react";
import { CryptoState } from "../CryptoContext";
import axios from "axios";
import { makeStyles, ThemeProvider } from "@material-ui/styles";
import Chart from "../components/Chart";
import parse from "html-react-parser";
import { numberWithCommas } from "../components/Banner/Carousal";

import { Typography, LinearProgress } from "@material-ui/core";

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
const Coin = () => {
  const { id } = useParams();
  const [coin, setCoin] = useState(null);
  const { currency, symbol } = CryptoState();

  const fetchCoin = async () => {
    const { data } = await axios.get(SingleCoin(id));
    setCoin(data);
  };

  useEffect(() => {
    fetchCoin();
  }, []);

  const classes = useStyles();
  if (!coin) return <LinearProgress />;
  return (
    coin && (
      <div className={classes.container}>
        <div className={classes.sidebar}>
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
          {/* // adding the rank / current price and market cap  */}
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
          <Chart coin={coin} />
        </div>
      </div>
    )
  );
};

export default Coin;
