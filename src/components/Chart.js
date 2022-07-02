import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { CryptoState } from "../CryptoContext";
import { HistoricalChart } from "../config/api";
import {
  CircularProgress,
  createTheme,
  ThemeProvider,
  Button,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

// line chart ************************************************
import { Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto"; // this is required otherwise the chart won't work

import { chartDays } from "../config/data";

const darkTheme = createTheme({
  palette: {
    primary: {
      main: "#fff",
    },
    type: "dark",
  },
});

const useStyles = makeStyles({
  container: {
    width: "70%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: 25,
    padding: 40,
  },

  btnContainer: {
    display: "flex",
    justifyContent: "space-around",
    width: "100%",
    marginTop: 20,
  },
  btn: {
    background: "#FFDE2E",
    color: "black",
  },

  "@media (max-width : 900px)": {
    container: {
      width: "100%",
      marginTop: 0,
      paddgin: 20,
      paddingTop: 0,
    },
  },
});

const Chart = ({ coin }) => {
  const { currency, symbol } = CryptoState();
  const [days, setDays] = useState(1);
  const [historicData, setHistoricData] = useState();

  const classes = useStyles();
  const fetchHistoricData = async () => {
    const { data } = await axios.get(HistoricalChart(coin.id, days, currency));
    setHistoricData(data.prices);
  };

  useEffect(() => {
    fetchHistoricData();
  }, [currency, days]);

  const handleClick = (d) => {
    setDays(d.value);
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <div className={classes.container}>
        {!historicData ? (
          <CircularProgress
            style={{ color: "gold" }}
            size={250}
            thickness={1}
          />
        ) : (
          <>
            <Line
              data={{
                labels: historicData.map((coin) => {
                  let date = new Date(coin[0]);
                  let time =
                    date.getHours() > 12
                      ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                      : `${date.getHours()}:${date.getMinutes()} AM`;
                  return days === 1 ? time : date.toLocaleDateString();
                }),
                datasets: [
                  {
                    data: historicData.map((coin) => coin[1]),
                    label: `Price ( Past ${days} Days ) in ${currency}`,
                    borderColor: "#EEBC1D",
                  },
                ],
              }}
              options={{
                elements: {
                  point: {
                    radius: 1,
                  },
                },
              }}
            />

            <div className={classes.btnContainer}>
              {chartDays.map((day) => {
                return (
                  <Button
                    variant="contained"
                    className={classes.btn}
                    onClick={() => handleClick(day)}
                    key={day.label}
                  >
                    {day.label}
                  </Button>
                );
              })}
            </div>
          </>
        )}
      </div>
    </ThemeProvider>
  );
};

export default Chart;
