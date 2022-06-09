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
      width: '100%',
      '&-Previous': {
        justifyContent: 'flex-start',
      },
      '&-Next': {
        justifyContent: 'flex-end',
      },
    },
    typographyMain: {
      marginBlockEnd: '1rem;',
    },
    extendedIcon: {
      color: theme.palette.primary.main,
      fontSize: theme.typography.h1.fontSize,
    },
    extendedIconSmall: {
      fontSize: theme.typography.h2.fontSize,
    },
    boxMain: {
      padding: theme.spacing(2, 2, 3),
      textAlign: 'center',
    },
    questionsHeader: {
      margin: theme.spacing(1, 0),
    },
    questionsText: {
      maxWidth: 600,
      marginLeft: 'auto',
      marginRight: 'auto',
      marginBottom: theme.spacing(3),
    },
    questionsBtn: {
      margin: theme.spacing(0, 0.5),
    },
  })

class DiscoverFooter extends React.Component<any> {
  public render() {
    const { contents, currentGuide, classes, width } = this.props
    // const flatContents: any = _flatten(contents.map(c => c.guides))
    const guideIndex = contents.findIndex(
      (section: any) => section.path === currentGuide
    )

    const buildDirectionLink = to =>
      React.forwardRef((props: any, ref: any) => (
        <Link to={to} {...props} innerRef={ref} />
      ))

    const directionalButton = direction => {
      const newGuideIndex =
        direction === 'Previous' ? guideIndex - 1 : guideIndex + 1
      return newGuideIndex >= 0 && newGuideIndex <= contents.length - 1 ? (
        <Button
          className={`${classes.btnNavigation} ${classes.btnNavigation}-${direction}`}
          size="small"
          color="primary"
          component={buildDirectionLink(contents[newGuideIndex].path)}
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
            } Overview`}</Typography>
            <Typography
              variant="inherit"
              display="block"
              align={direction === 'Previous' ? 'left' : 'right'}
            >
              {contents[newGuideIndex].title}
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
          <Typography variant="h4" className={classes.questionsHeader}>
            How Can We Help?
          </Typography>
          <Typography variant="body1" className={classes.questionsText}>
            If you have any questions, you can contact us with a formal inquiry or join our Slack community below.
          </Typography>

          <Button
            variant="outlined"
            href="https://four51.io/contact-us/"
            target="_blank"
            rel="noreferrer"
            className={classes.questionsBtn}
          >
            Contact Us
          </Button>

          <ButtonLink
            variant="outlined"
            className={classes.questionsBtn}
            to="/slack"
            color="secondary"
          >
            Join Our Community
          </ButtonLink>
        </Box>
      </div>
    )
  }
}

export default withStyles(styles, { withTheme: true })(withWidth()(DiscoverFooter))
