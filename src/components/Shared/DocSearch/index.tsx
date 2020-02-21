import { ClickAwayListener } from '@material-ui/core'
import algoliasearch from 'algoliasearch/lite'
import React from 'react'
import { InstantSearch } from 'react-instantsearch-dom'
import CustomSearchBox from './CustomSearchBox'
import CustomSearchHits from './CustomSearchHits'

const searchClient = algoliasearch(
  process.env.GATSBY_ALGOLIA_APP_ID,
  process.env.GATSBY_ALGOLIA_SEARCH_API_KEY
)

interface DocSearchProps {
  darkMode?: boolean
  noPopper?: boolean
  placeholder?: string
  classes?: {
    searchBox?: string
    searchBoxInput?: string
    searchHits?: string
    searchHitsPaper?: string
  }
}

const DocSearch: React.FunctionComponent<DocSearchProps> = (
  props: DocSearchProps
) => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLInputElement | null>(null)
  const [showHits, setShowHits] = React.useState(false)
  const containerRef = React.useRef<HTMLDivElement>()

  const handleSearchClick = (event: React.FormEvent<HTMLInputElement>) => {
    setAnchorEl(event.currentTarget)
    setShowHits(true)
  }
  const handleSearchClose = () => {
    setShowHits(false)
  }
  const handleSearchChange = () => {
    setShowHits(true)
  }
  return (
    <ClickAwayListener onClickAway={handleSearchClose}>
      <section ref={containerRef} style={{ position: 'relative', zIndex: 2 }}>
        <InstantSearch
          searchClient={searchClient}
          indexName={process.env.GATSBY_ALGOLIA_INDEX_NAME}
        >
          <CustomSearchBox
            noPopper={props.noPopper || false}
            classes={
              props.classes && {
                searchRoot: props.classes.searchBox,
                searchInput: props.classes.searchBoxInput,
              }
            }
            placeholder={props.placeholder}
            expanded={showHits}
            darkMode={props.darkMode || false}
            onClick={handleSearchClick}
            onChange={handleSearchChange}
            onClose={handleSearchClose}
          />
          {containerRef && (
            <CustomSearchHits
              noPopper={props.noPopper || false}
              classes={
                props.classes && {
                  searchHits: props.classes.searchHits,
                  searchHitsPaper: props.classes.searchHitsPaper,
                }
              }
              darkMode={props.darkMode || false}
              open={showHits}
              anchorEl={anchorEl}
              container={containerRef.current}
            />
          )}
        </InstantSearch>
      </section>
    </ClickAwayListener>
  )
}

export default DocSearch
