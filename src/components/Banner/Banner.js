// basic imports
import { makeStyles, Container, Typography } from "@material-ui/core";
import React from "react";
import Carousal from "./Carousal";

// defing the styles using makeStyles
const useStyles = makeStyles({
  banner: {
    backgroundImage: "url(./banner.jpg)",
    minHeight: 540,
  },

  bannerContent: {
    height: 540,
    display: "flex",
    flexDirection: "column",
    paddingTop: 25,
    justifyContent: "space-around",
  },

  tagline: {
    display: "flex",
    height: "40%",
    flexDirection: "column",
    justifyContent: "center",
    textAlign: "center",
  },

  carousel: {
    height: "50%",
    display: "flex",
    alignItems: "center",
  },
});

// rafce return function
const Banner = () => {
  // defining classes
  const classes = useStyles();

  return (
    <div className={classes.banner}>
      <Container className={classes.bannerContent}>
        <div className={classes.tagline}>
          <Typography
            variant="h2"
            style={{ fontWeight: "bold", marginBottom: 15 }}
          >
            Crypto Guy
          </Typography>

          <Typography
            style={{
              fontStyle: "italic",
              textTransform: "capitalize",
              color: "darkgrey",
            }}
          >
            Get all the information about your favourite crypto currencies
          </Typography>
        </div>
        {/* adding the carousal tag */}
        <Carousal />
      </Container>
    </div>
  );
};

export default Banner;
