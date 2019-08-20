import algoliasearch from 'algoliasearch/lite'
import React from 'react'
import { InstantSearch } from 'react-instantsearch-dom'
import CustomSearchBox from './CustomSearchBox'
import CustomSearchHits from './CustomSearchHits'
import { ClickAwayListener } from '@material-ui/core'

const searchClient = algoliasearch(
  process.env.GATSBY_ALGOLIA_APP_ID,
  process.env.GATSBY_ALGOLIA_SEARCH_API_KEY
)

interface DocSearchProps {
  darkMode?: boolean
}

const DocSearch: React.FunctionComponent<DocSearchProps> = props => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLInputElement | null>(null)
  const [showHits, setShowHits] = React.useState(false)
  const containerRef = React.useRef<HTMLDivElement>()

  const handleSearchClick = (event: React.FormEvent<HTMLInputElement>) => {
    setAnchorEl(event.currentTarget)
    setShowHits(true)
  }
  const handleSearchClose = (event: React.MouseEvent<Document, MouseEvent>) => {
    setShowHits(false)
  }
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
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
            expanded={showHits}
            darkMode={props.darkMode || false}
            onClick={handleSearchClick}
            onChange={handleSearchChange}
            onClose={handleSearchClose}
          />
          {containerRef && (
            <CustomSearchHits
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
