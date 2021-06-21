import {
  Grow,
  IconButton,
  InputAdornment,
  InputBase,
  Theme,
} from '@material-ui/core'
import { createStyles, makeStyles } from '@material-ui/core/styles'
import { Close } from '@material-ui/icons'
import SearchIcon from '@material-ui/icons/Search'
import React, { useRef } from 'react'
import { connectSearchBox } from 'react-instantsearch-dom'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: (props: any) => ({
      zIndex: 1,
      borderRadius: theme.shape.borderRadius,
      padding: theme.spacing(0, 1.5),
    }),
    input: (props: any) => ({
      fontFamily: theme.typography.h1.fontFamily,
      padding: theme.spacing(2, 1, 2, 0),
      transition: theme.transitions.create('width', {
        duration: theme.transitions.duration.shorter,
      }),
    }),
    adornment: (props: any) => ({
      color: theme.palette.text.primary,
    }),
  })
)

interface OrderCloudSearchBoxProps {
  onClick: (event: any) => void
  onChange: () => void
  onClose: () => void
  refine: (refineBy: string) => void
  noPopper: boolean
  expanded: boolean
  darkMode: boolean
  currentRefinement: string
  placeholder: string
  classes?: {
    searchRoot: string
    searchInput: string
  }
}
const OrderCloudSearchBox = ({
  currentRefinement,
  refine,
  onClick,
  onChange,
  onClose,
  darkMode,
  expanded,
  placeholder,
  classes,
  noPopper,
}: OrderCloudSearchBoxProps) => {
  const classesSelf = useStyles({ darkMode, expanded })
  const inputRef = useRef<HTMLInputElement | undefined>()

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    refine(event.currentTarget.value)
    onChange()
  }

  const handleInputClick = (event: React.MouseEvent) => {
    onClick(event)
    if (inputRef && inputRef.current) {
      inputRef.current.focus()
    }
  }

  const handleClearClick = (event: React.MouseEvent) => {
    event.preventDefault()
    event.stopPropagation()
    refine('')
    onClose()
  }

  return (
    <InputBase
      value={currentRefinement}
      onChange={handleInputChange}
      onClick={handleInputClick}
      classes={{
        input: `${classesSelf.input} ${classes.searchInput}`,
        root: `${classesSelf.root} ${classes.searchRoot}`,
      }}
      placeholder={placeholder || 'Search OrderCloud...'}
      inputProps={{ 'aria-label': 'search' }}
      inputRef={inputRef}
      startAdornment={
        <InputAdornment
          position="start"
          classes={{ root: classesSelf.adornment }}
        >
          <IconButton color="inherit" size="small" edge="start">
            <SearchIcon color="inherit" />
          </IconButton>
        </InputAdornment>
      }
      endAdornment={
        <InputAdornment
          position="end"
          classes={{ root: classesSelf.adornment }}
        >
          <Grow
            in={Boolean(currentRefinement.length) || (noPopper && expanded)}
          >
            <IconButton
              color="inherit"
              size="small"
              edge="end"
              onClick={handleClearClick}
            >
              <Close color="inherit" />
            </IconButton>
          </Grow>
        </InputAdornment>
      }
    />
  )
}
export default connectSearchBox(OrderCloudSearchBox)
