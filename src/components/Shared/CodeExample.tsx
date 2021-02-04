import {
  createStyles,
  IconButton,
  makeStyles,
  Paper,
  Theme,
  Toolbar,
  Typography,
} from '@material-ui/core'
import { FileCopyOutlined } from '@material-ui/icons'
import { ToggleButton, ToggleButtonGroup } from '@material-ui/lab'
import Prism from 'prismjs'
import React, {
  Fragment,
  FunctionComponent,
  useCallback,
  useMemo,
  useState,
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
  })
)

const CodeExample: FunctionComponent<CodeExampleProps> = (
  props: CodeExampleProps
) => {
  const { title, description, content, hide } = props
  const classes = useStyles()
  const [language, setLanguage] = useState(Object.keys(content)[0])

  const handleLanguageChange = useCallback(
    (e: React.MouseEvent, value: any) => {
      if (!value || language === value) return
      setLanguage(value)
    },
    [language]
  )

  const currentContent = useMemo(() => {
    if (!language) return
    return Prism.highlight(
      content[language],
      Prism.languages[language],
      language
    )
  }, [language])

  const showLanguage = useCallback(
    (language: keyof CodeExampleContent) => {
      return !hide || (hide && !hide.includes(language))
    },
    [hide]
  )

  const handleCopyClick = useCallback(() => {
    navigator.clipboard.writeText(content[language])
  }, [language, content])

  return (
    <div className={classes.root}>
      <Toolbar disableGutters variant="dense">
        {(title || description) && (
          <Fragment>
            <div>
              {title && <Typography variant="h5">{title}</Typography>}
              {description && (
                <Typography variant="caption">{description}</Typography>
              )}
            </div>
            <div className={classes.grow} />
          </Fragment>
        )}
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
        <div className={classes.grow} />
        <IconButton
          size="small"
          onClick={handleCopyClick}
          title="Copy to clipboard"
        >
          <FileCopyOutlined />
        </IconButton>
      </Toolbar>
      <Paper component="pre" className={`language-${language}`}>
        <code
          className={`language-${language}`}
          dangerouslySetInnerHTML={{ __html: currentContent }}
        ></code>
      </Paper>
    </div>
  )
}

export default CodeExample
