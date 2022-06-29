// this is for the app bar

// imports
import {
  AppBar,
  Container,
  Typography,
  Select,
  MenuItem,
  makeStyles,
  Toolbar,
  createTheme,
  ThemeProvider,
} from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { CryptoState } from "../CryptoContext";

// creating a dark theme.

const darkTheme = createTheme({
  palette: {
    primary: {
      main: "#fff",
    },
    type: "dark",
  },
});

// definging the styles.
const useStyles = makeStyles({
  title: {
    flex: 1,
    fontFamily: "Montserrat",
    fontWeight: "bold",
    cursor: "pointer",
    color: "gold",
  },

  cont: {
    padding: "0",
  },
});

const Header = () => {
  const classes = useStyles();
  const history = useHistory();
  const { currency, setCurrency } = CryptoState();
  return (
    <ThemeProvider theme={darkTheme}>
      <AppBar color="transparent" position="static">
        <Container className={classes.cont}>
          <Toolbar>
            <Typography
              variant="h5"
              className={classes.title}
              onClick={() => history.push("/")}
            >
              Crypto Guy
            </Typography>
            <Select
              variant="outlined"
              style={{
                width: "100px",
                height: "40px",
                marginRight: "15px",
                color: "white",
              }}
              value={currency}
              onChange={(e) => {
                setCurrency(e.target.value);
              }}
            >
              <MenuItem value={"USD"}>USD</MenuItem>
              <MenuItem value={"INR"}>INR</MenuItem>
            </Select>
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  );
};

export default Header;
