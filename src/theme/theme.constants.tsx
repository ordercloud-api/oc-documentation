import { createMuiTheme } from "@material-ui/core/styles"
import { ioblue, aliengreen } from "./ocPalette.constants"
import { teal } from "@material-ui/core/colors"

export default createMuiTheme({
  palette: {
    primary: {
      main: ioblue[500],
    },
    secondary: {
      main: aliengreen[300],
      contrastText: "#FFF",
    },
  },
})
