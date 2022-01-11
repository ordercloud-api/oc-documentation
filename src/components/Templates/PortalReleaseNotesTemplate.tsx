import {
  Collapse,
  createStyles,
  makeStyles,
  Theme,
  Typography,
} from '@material-ui/core'
import { ExpandLess, ExpandMore } from '@material-ui/icons'
import { graphql, Link } from 'gatsby'
import MDXRenderer from 'gatsby-plugin-mdx/mdx-renderer'
import { groupBy, map, sortBy } from 'lodash'
import React, { useState, useLayoutEffect } from 'react'
import { Helmet } from 'react-helmet'
import { seafoam } from '../../theme/ocPalette.constants'
import utility from '../../services/utility'
import Layout from '../Layout/Layout'
import LayoutContainer from '../Layout/LayoutContainer'
import LayoutMain from '../Layout/LayoutMain'
import LayoutMenu from '../Layout/LayoutMenu'
import RSSFeedLink from '../Shared/RSSFeedLink'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    body: {},
    year: {
      cursor: 'pointer',
      color: theme.palette.grey[500],
      display: 'flex',
      alignItems: 'center',
    },
    yearActive: {
      color: theme.palette.getContrastText(theme.palette.background.paper),
    },
    months: {
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(2),
    },
    month: {
      cursor: 'pointer',
      lineHeight: 1.75,
      color: theme.palette.grey[500],
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
      display: 'flex',
      alignItems: 'center',
    },
    monthActive: {
      color: theme.palette.getContrastText(theme.palette.background.paper),
      fontWeight: 'bold',
    },
    releases: {
      marginBottom: theme.spacing(1),
    },
    releaseLink: {
      cursor: 'pointer',
      textDecoration: 'none',
    },
    release: {
      lineHeight: 1.75,
      color: theme.palette.getContrastText(theme.palette.background.paper),
    },
    releaseActive: {
      fontWeight: 'bold',
      marginLeft: -theme.spacing(2.5),
      paddingLeft: theme.spacing(2),
      borderLeft: `${theme.spacing(0.5)}px solid ${seafoam[500]}`,
    },
    searchBox: {
      width: '100%',
      marginTop: theme.spacing(3),
    },
  })
)

function PortalReleaseNotesComponent(props: any) {
  const { data, location } = props
  const classes = useStyles(props)
  const release = data.allMdx.edges.filter(
    e => e.node.id === props.pageContext.nodeID
  )[0].node
  const [currentYear, setCurrentYear] = useState(release.frontmatter.year)
  const [currentMonth, setCurrentMonth] = useState(release.frontmatter.month)

  useLayoutEffect(() => {
    if (!props.location.hash) return
    const el = document.getElementById(props.location.hash.split('#')[1])
    if (!el) return
    window.scrollTo(0, el.offsetTop)
  }, [props.location.hash])

  const years = map(
    groupBy(
      data.allMdx.edges.map(e => e.node),
      n => n.frontmatter.year
    ),
    (nodes: any, y) => ({
      year: y,
      months: sortBy(
        map(
          groupBy(nodes, n => n.frontmatter.month),
          (r, m) => ({
            month: m,
            releases: r,
          })
        ),
        m => Number(m.month) - 1
      ).reverse(),
    })
  ).reverse()

  const onYearClick = (y: string, m: string) => () => {
    setCurrentYear(y)
    setCurrentMonth(m)
  }

  const onMonthClick = (y: string, m: string) => () => {
    setCurrentYear(y)
    setCurrentMonth(m)
  }

  return (
    <Layout location={location}>
      <Helmet
        title={`OrderCloud Portal Release Notes - ${release.frontmatter.apiVersion}`}
      >
        <link
          rel="icon"
          type="image/png"
          href="/images/favicon.ico"
          sizes="16x16"
        />
      </Helmet>
      <LayoutContainer>
        <LayoutMain>
          <Typography variant="h1">
            Portal v{release.frontmatter.apiVersion} Release Notes
          </Typography>
          <div id="RENDER_BOX">
            <MDXRenderer>{release.body}</MDXRenderer>
          </div>
        </LayoutMain>
        <LayoutMenu>
          {years.map(y => (
            <React.Fragment key={y.year}>
              <Typography
                className={`${classes.year} ${
                  y.year === currentYear ? classes.yearActive : undefined
                }`}
                variant="h4"
                component="h5"
                onClick={onYearClick(y.year, y.months[0].month)}
              >
                {y.year}
                {y.year === currentYear ? <ExpandLess /> : <ExpandMore />}
              </Typography>
              <Collapse in={y.year === currentYear}>
                <div className={classes.months}>
                  {y.months.map(m => (
                    <React.Fragment key={`${y.year}_${m.month}`}>
                      <Typography
                        className={`${classes.month} ${
                          y.year === currentYear && m.month === currentMonth
                            ? classes.monthActive
                            : undefined
                        }`}
                        variant="button"
                        component="h6"
                        onClick={onMonthClick(y.year, m.month)}
                      >
                        {new Date(
                          Number(y.year),
                          Number(m.month) - 1,
                          1
                        ).toLocaleString('default', { month: 'long' })}
                        {y.year === currentYear && m.month === currentMonth ? (
                          <ExpandLess />
                        ) : (
                          <ExpandMore />
                        )}
                      </Typography>
                      <Collapse
                        in={y.year === currentYear && m.month === currentMonth}
                      >
                        <div className={classes.releases}>
                          {m.releases.map(r => (
                            <Link
                              key={r.id}
                              to={utility.resolvePath(r.fileAbsolutePath)}
                              className={classes.releaseLink}
                            >
                              <Typography
                                variant="body1"
                                className={`${classes.release} ${
                                  r.id === release.id
                                    ? classes.releaseActive
                                    : undefined
                                }`}
                              >{`v${r.frontmatter.apiVersion}`}</Typography>
                            </Link>
                          ))}
                        </div>
                      </Collapse>
                    </React.Fragment>
                  ))}
                </div>
              </Collapse>
            </React.Fragment>
          ))}
          <RSSFeedLink to="/rss/portal-release-notes.xml" />
        </LayoutMenu>
      </LayoutContainer>
    </Layout>
  )
}

export const pageQuery = graphql`
  query {
    allMdx(
      sort: { order: DESC, fields: [frontmatter___date] }
      filter: {
        fileAbsolutePath: { glob: "**/content/portal-release-notes/**/*.mdx" }
      }
    ) {
      edges {
        node {
          id
          fileAbsolutePath
          body
          frontmatter {
            apiVersion
            date: date(formatString: "MMMM DD, YYYY")
            year: date(formatString: "YYYY")
            month: date(formatString: "MM")
            day: date(formatString: "DD")
          }
        }
      }
    }
  }
`

export default PortalReleaseNotesComponent
