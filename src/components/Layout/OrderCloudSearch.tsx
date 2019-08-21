import React from 'react'
import { InputBase, Theme, InputAdornment } from '@material-ui/core'
import { fade, makeStyles, createStyles } from '@material-ui/core/styles'
import SearchIcon from '@material-ui/icons/Search'
import { connectSearchBox } from 'react-instantsearch-dom'
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    search: {
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      '&:hover': {
        backgroundColor: fade(theme.palette.common.white, 0.25),
      },
      marginRight: theme.spacing(1),
      marginLeft: theme.spacing(1),
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        width: 'auto',
      },
    },
    searchIcon: {
      width: theme.spacing(7),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    inputInput: {
      color: theme.palette.common.white,
      '&::placeholder': {
        color: theme.palette.common.white,
      },
    },
    leftAdornment: {
      paddingLeft: theme.spacing(2),
      color: theme.palette.common.white,
      minWidth: theme.spacing(8),
    },
  })
)
const OrderCloudSearchBox = ({
  currentRefinement,
  isSearchStalled,
  refine,
  onChange,
}) => {
  const classes = useStyles({})
  return (
    <InputBase
      fullWidth
      value={currentRefinement}
      onChange={event => {
        onChange(event)
        refine(event.currentTarget.value)
      }}
      classes={{ input: classes.inputInput }}
      placeholder="Search OrderCloud…"
      inputProps={{ 'aria-label': 'search' }}
      startAdornment={
        <InputAdornment position="start" className={classes.leftAdornment}>
          <SearchIcon />
        </InputAdornment>
      }
    />
  )
}
export default connectSearchBox(OrderCloudSearchBox)
