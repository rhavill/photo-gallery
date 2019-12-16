import React from 'react'
import PropTypes from 'prop-types'
import {graphql} from 'gatsby'
import Layout from '../components/Layout'
import Folders from '../components/Folders'
import Thumbnails from '../components/Thumbnails'
import Pager from '../components/Pager'
import {gatsbyPathnameToChildComponentPath} from '../util/text-utils'

const Index = ({data, location, pageContext}) => {
  const path = gatsbyPathnameToChildComponentPath(location.pathname, data)
  const {currentPage, numPages, basePath} = pageContext

  return (
    <Layout path={path}>
      <div className="listing-page" data-testid={path} >
        <section>
          <Folders path={path} data={data} />
          <Thumbnails path={path} data={data} currentPage={currentPage} 
            basePath={basePath} />
        </section>
      </div>
      <Pager path={path} currentPage={currentPage} numPages={numPages} />
      <br/>
    </Layout>
  )
}

export const query = graphql`
  query indexQuery($skip: Int!, $limit: Int!, $regexFilter: String!) {
    # Ideally, the next few lines of this query would be part of ThumbnailsFragment, 
    # but putting the line in that fragment caused the error: 'Variable "$skip" 
    # is never used in operation "indexQuery"'
    photos: allFile(filter: {
        relativePath: {ne: "folder.png", regex: $regexFilter}}, 
        sort: {fields: relativePath} limit: $limit skip: $skip) {
          ...ThumbnailsFragment
    }
    ...FoldersFragment
    site {
      pathPrefix
    }
  }
`

Index.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired
  }).isRequired,
  data: PropTypes.shape({
    photos: PropTypes.object.isRequired,
  }).isRequired,
  pageContext: PropTypes.shape({
    basePath: PropTypes.string.isRequired,
    currentPage: PropTypes.number.isRequired,
    numPages: PropTypes.number.isRequired,
    regexFilter: PropTypes.string.isRequired,
  }).isRequired
}

export default Index