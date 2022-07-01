// ************************************************************general imports:
import { ThemeProvider, createTheme } from "@material-ui/core";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { CoinList } from "../config/api";
import { CryptoState } from "../CryptoContext";
import {
  Container,
  Typography,
  TextField,
  makeStyles,
  Paper,
  LinearProgress,
} from "@material-ui/core";

import { Pagination } from "@material-ui/lab";
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@material-ui/core";

import { useHistory } from "react-router-dom";
import { numberWithCommas } from "./Banner/Carousal";

// ********************************************DARK THEME CREATION***********************************
const darkTheme = createTheme({
  palette: {
    primary: {
      main: "#fff",
    },
    type: "dark",
  },
});

// *********************************************DEFAULT STYLES****************************************
const useStyles = makeStyles({
  Container: {
    padding: 20,
  },
  heading: {
    fontSize: 45,
    fontFamily: "Montserrat",
    textAlign: "center",
    marginBottom: 10,
  },
  textfield: {
    width: "100%",
    margin: "10 0",
    marginBottom: 20,
  },

  row: {
    backgroundColor: "#16171a",
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "#131111",
    },
  },
  cell: {
    backgroundColor: "gold",
    color: "black",
    fontWeight: 600,
    fontFamily: "montserrat",
    fontSize: 25,
  },

  item: {
    display: "flex",
    width: 150,
    padding: 4,
  },

  textItem: {
    marginLeft: 10,
  },
  span: {
    display: "block",
  },

  price: {
    fontSize: 17,
    fontFamily: "Montserrat",
    textAlign: "center",
  },
  pagination: {
    "& .MuiPaginationItem-root": {
      // this is just the brute force way to give styling to the pagination component of material ui. (from docs)
      // logic is given in the onChange
      color: "gold",
    },
  },
});

// ***********************************RAFCE FUNCTION **********************************************8
const CoinsTable = () => {
  // ************************************STATES******************************************************
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);
  const { currency, symbol } = CryptoState(); // CURRENCY GOT FROM THE CONTEXT API
  const [search, setSearch] = useState(null);
  const [page, setPage] = useState(1);

  const classes = useStyles(); // DEFINING CLASSES USESTYLES.
  const history = useHistory(); // DEFINING HISTORY

  // ******************************FUNCTION TO FETCH THE 100 COINS TO DISPLAY TO THE TABLE. *************** (the api endpoint is such that it will fetch 100 coins)
  const fetchCoins = async () => {
    setLoading(true);
    const { data } = await axios.get(CoinList(currency));
    setCoins(data);
    setLoading(false);
  };

  // *********************************useEffect  to fetch data again and again*************************************
  useEffect(() => {
    fetchCoins();
  }, [currency]);

  // ********************************HANDLE SEARCH***********************
  const handleSearch = () => {
    return coins.filter((s) => {
      if (search === null) return coins;
      return (
        s.name.toLowerCase().includes(search) ||
        s.symbol.toLowerCase().includes(search)
      );
    });
  };

  // RETURN VALUE OF REACT JS**************
  return (
    <ThemeProvider theme={darkTheme}>
      <Container className={classes.Container}>
        <Typography className={classes.heading}>
          CryptoCurrency prices by Market Cap
        </Typography>
        {/* search bar */}
        <TextField
          variant="outlined"
          label="Search For a Crypto Currency"
          className={classes.textfield}
          onChange={(e) => setSearch(e.target.value)}
        ></TextField>
        <TableContainer component={Paper}>
          {loading ? (
            <LinearProgress />
          ) : (
            <Table>
              {/* ******************************************Table header  ************************************************/}
              <TableHead>
                <TableRow className={classes.row}>
                  {["Coin", "Price", "24h Change", "Market Cap"].map((head) => (
                    <TableCell
                      key={head}
                      align={head == "Coin" ? "" : "center"}
                      className={classes.cell}
                    >
                      {head}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {handleSearch()
                  .slice((page - 1) * 10, (page - 1) * 10 + 10)
                  .map((row) => (
                    <TableRow
                      className={classes.row}
                      onClick={() => history.push(`/coin/${row.id}`)}
                      key={row.name}
                    >
                      <TableCell>
                        <div className={classes.item}>
                          <img src={row.image} alt={row.symbol} height="50" />
                          <div className={classes.textItem}>
                            <span
                              style={{
                                fontSize: 22,
                                textTransform: "uppercase",
                              }}
                              className={classes.span}
                            >
                              {row.symbol}
                            </span>

                            <span
                              style={{ color: "darkgray" }}
                              className={classes.span}
                            >
                              {row.name}
                            </span>
                          </div>
                        </div>
                      </TableCell>

                      <TableCell className={classes.price}>
                        {symbol}
                        {numberWithCommas(row.current_price.toFixed(2))}
                      </TableCell>

                      <TableCell
                        align="center"
                        style={{
                          color:
                            row.price_change_percentage_24h > 0
                              ? "rgb(14, 203, 129)"
                              : "red",

                          fontSize: 20,
                        }}
                      >
                        {row.price_change_percentage_24h > 0 && "+"}
                        {row.price_change_percentage_24h.toFixed(2)}%
                      </TableCell>

                      <TableCell>
                        {symbol}
                        {numberWithCommas(
                          row.market_cap.toString().slice(0, -6) // slicing from the back, removed 6 last digits.
                        )}
                        M
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          )}
        </TableContainer>

        <Pagination
          count={(handleSearch().length / 10).toFixed()}
          style={{
            padding: 20,
            widht: "100%",
            display: "flex",
            justifyContent: "center",
          }}
          classes={{ ul: classes.pagination }}
          onChange={(_, value) => {
            // this pageination takes the value like this, ie 2 arguments _ and value.
            setPage(value);
            window.scroll(0, 450);
          }}
        ></Pagination>
      </Container>
    </ThemeProvider>
  );
};

export default CoinsTable;
