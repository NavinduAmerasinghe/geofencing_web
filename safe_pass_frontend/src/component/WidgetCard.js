import * as React from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  card: {
    textAlign: "center",
    background: "linear-gradient(45deg, #394A64 30%, #7642BF 90%)",
    color: theme.palette.common.white,
  },
  icon: {
    fontSize: "3rem",
    marginBottom: theme.spacing(2),
  },
  footerLink: {
    color: theme.palette.primary.main,
  },
}));

const WidgetCard = ({
  entries,
  iconName,
  name,
  stat,
  unit,
  value,
  name2,
  value2,
}) => {
  const classes = useStyles();
  const theme = useTheme();
  return (
    <Card
      sx={{ display: "flex" }}
      className={classes.card}
      // style={{ backgroundColor: "#6644A6" }}
    >
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <CardContent sx={{ flex: "1 0 auto" }}>
          <Typography component="div" variant="h7" style={{ color: "white" }}>
            {name}
            {value}

            <br></br>
            {name2}
            {value2}
          </Typography>
          <Typography
            variant="subtitle1"
            color="text.secondary"
            component="div"
          >
            {stat}
          </Typography>
        </CardContent>
      </Box>
    </Card>
  );
};

export default WidgetCard;
