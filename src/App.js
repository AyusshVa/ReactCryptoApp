import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Coin from "./Pages/Coin";
import Header from "./components/Header";
import { makeStyles } from "@material-ui/core";

function App() {
  const useStyles = makeStyles({
    AppBody: {
      background: "#14161a",
      minHeight: "100vh",
      color: "white",
    },
  });

  const classes = useStyles();

  return (
    <Router>
      <div className={classes.AppBody}>
        <Header />
        <Switch>
          <Route path="/" exact>
            <Home />
          </Route>
          <Route path="/coin/:id">
            <Coin />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
