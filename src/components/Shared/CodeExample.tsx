import {
  createStyles,
  IconButton,
  makeStyles,
  Paper,
  Theme,
  Toolbar,
  Typography,
} from '@material-ui/core'
import { useSelector, useDispatch } from 'react-redux'
import { FileCopyOutlined } from '@material-ui/icons'
import { ToggleButton, ToggleButtonGroup } from '@material-ui/lab'
import { configureStore, createSlice } from '@reduxjs/toolkit'
import Prism from 'prismjs'
import React, {
  FunctionComponent,
  useCallback,
  useMemo,
} from 'react'

interface CodeExampleContent {
  http?: string
  javascript?: string
  typescript?: string
  csharp?: string
}

interface CodeExampleProps {
  title?: string
  description?: string
  hide?: Array<keyof CodeExampleContent>
  content: CodeExampleContent
}

export const MOCK_CONTENT: CodeExampleContent = {
  javascript: `var test = "banana";`,
  typescript: `let test:string = "banana";`,
  csharp: `string test = "banana";`,
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      margin: theme.spacing(4, 0),
    },
    toggleButton: {
      minWidth: 38,
    },
    grow: {
      flexGrow: 1,
    },
    contentContainer: {
      position: 'relative',
      '&:hover > $copyButton': {
        opacity: 1,
      },
    },
    copyButton: {
      opacity: 0,
      position: 'absolute',
      right: theme.spacing(1),
      top: theme.spacing(1),
      color: theme.palette.common.white,
    },
  })
)

export type CodeExampleLanugage = keyof CodeExampleContent

export const codeExampleSlice = createSlice({
  name: 'codeExample',
  initialState: {
    value: 'http' as CodeExampleLanugage,
  },
  reducers: {
    changeLanguage: (state, action) => {
      state.value = action.payload
    },
  },
})

const { changeLanguage } = codeExampleSlice.actions

export const codeExampleStore = configureStore({
  reducer: {
    codeExample: codeExampleSlice.reducer,
  },
})

export type CodeExampleRootState = ReturnType<typeof codeExampleStore.getState>

const CodeExample: FunctionComponent<CodeExampleProps> = (
  props: CodeExampleProps
) => {
  const { title, description, content, hide } = props
  const classes = useStyles()
  const language = useSelector(
    (state: CodeExampleRootState) => state.codeExample.value
  )
  const dispatch = useDispatch()

  const handleLanguageChange = useCallback(
    (e: React.MouseEvent, value: any) => {
      if (!value || language === value) return
      dispatch(changeLanguage(value))
    },
    [language]
  )

  const currentContent = useMemo(() => {
    let l = language
    if (!l || !content[l]) {
      l = Object.keys(content)[0] as keyof CodeExampleContent
    }
    return Prism.highlight(content[l], Prism.languages[l], l)
  }, [language, content])

  const showLanguage = useCallback(
    (language: keyof CodeExampleContent) => {
      if (!content[language]) return false
      return !hide || (hide && !hide.includes(language))
    },
    [hide, content]
  )

  const handleCopyClick = useCallback(() => {
    navigator.clipboard.writeText(content[language])
  }, [language, content])

  return (
    <div className={classes.root}>
      <Toolbar disableGutters variant="dense">
        {(title || description) && (
          <div>
            {title && <Typography variant="h5">{title}</Typography>}
            {description && (
              <Typography variant="caption">{description}</Typography>
            )}
          </div>
        )}
        <div className={classes.grow} />
        <ToggleButtonGroup
          size="small"
          exclusive
          value={language}
          onChange={handleLanguageChange}
        >
          {showLanguage('http') && (
            <ToggleButton
              className={classes.toggleButton}
              value="http"
              arial-label="HTTP"
              disabled={!content.http}
            >
              HTTP
            </ToggleButton>
          )}
          {showLanguage('javascript') && (
            <ToggleButton
              className={classes.toggleButton}
              value="javascript"
              aria-label="Javascript"
              disabled={!content.javascript}
            >
              JS
            </ToggleButton>
          )}
          {showLanguage('typescript') && (
            <ToggleButton
              className={classes.toggleButton}
              value="typescript"
              aria-label="Typescript"
              disabled={!content.typescript}
            >
              TS
            </ToggleButton>
          )}
          {showLanguage('csharp') && (
            <ToggleButton
              className={classes.toggleButton}
              value="csharp"
              aria-label="C-Sharp"
              disabled={!props.content.csharp}
            >
              C#
            </ToggleButton>
          )}
        </ToggleButtonGroup>
      </Toolbar>
      <Paper
        component="pre"
        className={`${classes.contentContainer} language-${language}`}
      >
        <IconButton
          className={classes.copyButton}
          size="small"
          onClick={handleCopyClick}
          title="Copy to clipboard"
        >
          <FileCopyOutlined />
        </IconButton>
        <code
          className={`language-${language}`}
          dangerouslySetInnerHTML={{ __html: currentContent }}
        ></code>
      </Paper>
    </div>
  )
}

export default CodeExample
