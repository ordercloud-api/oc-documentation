import {
  Box,
  Button,
  createStyles,
  Divider,
  Grid,
  Typography,
  withStyles,
  withWidth,
  Theme,
} from '@material-ui/core'
import { KeyboardArrowLeft, KeyboardArrowRight } from '@material-ui/icons'
import { Link } from 'gatsby'
import { flatten as _flatten } from 'lodash'
import React from 'react'
import { isWidthDown } from '@material-ui/core/withWidth'
import ButtonLink from '../Shared/ButtonLink'

const styles = (theme: Theme) =>
  createStyles({
    root: {
      [theme.breakpoints.down('sm')]: {
        marginLeft: -theme.spacing(2),
        marginRight: -theme.spacing(2),
      },
    },
    groupHelpful: {
      display: 'flex',
      alignItems: 'center',
    },
    groupHelpfulBtn: {
      marginInline: '1rem',
    },
    groupDirection: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    gridContainer: {
      marginBlockStart: `${theme.spacing(3)}px`,
      marginBlockEnd: `${theme.spacing(2)}px`,
    },
    gridItem: {
      display: 'flex',
    },
    btnNavigation: {
      display: 'flex',
      justifyContent: 'center',
      width: '100%',
    },
    typographyMain: {
      marginBlockEnd: '1rem;',
    },
    extendedIcon: {
      color: theme.palette.secondary.main,
      fontSize: theme.typography.h1.fontSize,
    },
    extendedIconSmall: {
      fontSize: theme.typography.h2.fontSize,
    },
    boxMain: {
      padding: theme.spacing(3, 3, 6),
      textAlign: 'center',
    },
    questionsHeader: {
      margin: theme.spacing(2, 0),
    },
    questionsText: {
      marginBottom: theme.spacing(3),
    },
    questionsBtn: {
      margin: theme.spacing(0, 0.5),
    },
  })

class DocFooter extends React.Component<any> {
  public render() {
    const { contents, currentGuide, classes, width } = this.props
    const flatContents: any = _flatten(contents.map(c => c.guides))
    const guideIndex = flatContents.findIndex(
      (section: any) => section.path === currentGuide
    )

    const buildDirectionLink = to =>
      React.forwardRef((props: any, ref: any) => (
        <Link to={to} {...props} innerRef={ref} />
      ))

    const directionalButton = direction => {
      const newGuideIndex =
        direction === 'Previous' ? guideIndex - 1 : guideIndex + 1
      return newGuideIndex > 0 && newGuideIndex < flatContents.length - 1 ? (
        <Button
          className={classes.btnNavigation}
          size="small"
          color="primary"
          component={buildDirectionLink(flatContents[newGuideIndex].path)}
          aria-label="Guide Navigation Button"
        >
          {direction === 'Previous' && (
            <KeyboardArrowLeft
              className={`${classes.extendedIcon} ${
                isWidthDown('md', width) ? classes.extendedIconSmall : undefined
              }`}
            />
          )}

          <div>
            <Typography
              variant="caption"
              display="block"
              align={direction === 'Previous' ? 'left' : 'right'}
            >{`${
              direction === 'Previous' ? 'Prev' : direction
            } Guide`}</Typography>
            <Typography
              variant="inherit"
              display="block"
              align={direction === 'Previous' ? 'left' : 'right'}
            >
              {flatContents[newGuideIndex].frontmatter.title}
            </Typography>
          </div>

          {direction === 'Next' && (
            <KeyboardArrowRight
              className={`${classes.extendedIcon} ${
                isWidthDown('md', width) ? classes.extendedIconSmall : undefined
              }`}
            />
          )}
        </Button>
      ) : null
    }

    return (
      //TODO: Link to Slack, syntax on ordercloud tag
      <div className={classes.root}>
        <Grid
          className={classes.gridContainer}
          container
          spacing={width === 'md' || width === 'lg' || width === 'xl' ? 3 : 0}
          justify="space-between"
          alignItems="stretch"
        >
          <Grid className={classes.gridItem} item xs={6}>
            {directionalButton('Previous')}
          </Grid>
          <Grid className={classes.gridItem} item xs={6}>
            {directionalButton('Next')}
          </Grid>
        </Grid>
        <Divider></Divider>
        <Box className={classes.boxMain}>
          {/* 
          TODO: Useful but not required for MVP add back in for phase 2 https://github.com/ordercloud-api/oc-documentation/issues/58
          <div className={classes.groupHelpful}>
            <IconButton
              className={classes.groupHelpfulBtn}
              aria-label="Helpful"
            >
              <ThumbUp fontSize="small" />
            </IconButton>
            <Typography variant="body2">Was this guide helpful?</Typography>
            <IconButton
              className={classes.groupHelpfulBtn}
              aria-label="Not Helpful"
            >
              <ThumbDown fontSize="small" />
            </IconButton>
          </div> */}
          <Typography variant="h4" className={classes.questionsHeader}>
            Questions?
          </Typography>
          <Typography variant="body1" className={classes.questionsText}>
            If you have any questions, please ask our Developer Community on
            Slack, or post your question on Stack Overflow using the tag &quot;
            <strong>ordercloud</strong>&quot;.
          </Typography>

          <ButtonLink
            variant="outlined"
            className={classes.questionsBtn}
            to="/slack"
          >
            Join Our Community
          </ButtonLink>

          <Button
            variant="outlined"
            href="https://stackoverflow.com/questions/tagged/ordercloud"
            target="_blank"
            rel="noreferrer"
            className={classes.questionsBtn}
            color="secondary"
          >
            Ask on Stack Overflow
          </Button>
        </Box>
      </div>
    )
  }
}

export default withStyles(styles, { withTheme: true })(withWidth()(DocFooter))
