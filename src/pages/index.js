import React from "react"
import Img from "gatsby-image"
import {graphql, Link} from "gatsby"
import Layout from '../components/Layout'
import Pager from '../components/Pager'
import {getChildren} from "../util/source-filesystem-children"
import toTitleCase from '../util/to-title-case'

export default ({data, location, pageContext}) => {
  const children = getChildren(location.pathname, data);
  const { currentPage, numPages } = pageContext

  return (
    <Layout path={location.pathname}>
      <div className="listing-page">
        <section>
          {children.folders.map((folder, i) => {
            const title = toTitleCase(folder.replace(/.*\/([^/]+)$/, '$1'))
            return (
              <article key={i} className='folder'>
                <Link to={folder}>
                  <Img fixed={data.file.childImageSharp.fixed} alt={title} />
                  <div className="folder-title">{title}</div>
                </Link>
              </article>
            )
          })}
          {children.files.map((file, i) => {
            return (
              <article key={i} className='file'>
                <Link to={file.fsPath}>
                  <Img fixed={file.fixed} />
                </Link>
              </article>
            )
          })}
        </section>
      </div>
      <Pager path={location.pathname} currentPage={currentPage} numPages={numPages} />
      <br/>
    </Layout>
  );
}

export const query = graphql`
  query indexQuery($skip: Int!, $limit: Int!) {
    allDirectory {
      edges {
        node {
          relativePath
        }
      }
    }
    allFile(filter: {relativePath: {ne: "folder.png"}} limit: $limit skip: $skip) {
      edges {
        node {
          relativePath
          childImageSharp {
            fixed(width: 250, height: 250) {
              ...GatsbyImageSharpFixed
            }
          }
        }
      }
    }
    file(relativePath: { eq: "folder.png" }) {
      childImageSharp {
        fixed(width: 250, height: 250) {
          ...GatsbyImageSharpFixed
        }
      }
    }
  }
`