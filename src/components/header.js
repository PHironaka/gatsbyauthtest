import React from "react"
import { StaticQuery, Link } from "gatsby"
import SearchBox from './search'
import { graphql } from "gatsby"

const Header = () => (
  <StaticQuery
    query={graphql`
      query SearchIndexQuery {
        siteSearchIndex {
          index
        }
      }
    `}
    render={data => (
      <header>
         <h1 style={{ margin: 0 }}>
        <Link
          to="/"
          style={{
            textDecoration: `none`,
            color: `black`,
          }}
        >
         Ellington Hammond
        </Link>
      </h1>
        <SearchBox searchIndex={data.siteSearchIndex.index} />
      </header>
    )}
  />
)

export default Header

