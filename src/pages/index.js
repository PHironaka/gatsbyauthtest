import React from "react"
import PropTypes from 'prop-types'
import Layout from "../components/layout"
import SEO from "../components/seo"
import Link from 'gatsby-link'
import Img from 'gatsby-image'
import styled from 'styled-components'

const PhotoGrid = styled.div`
    display:grid;
    grid-template-columns:1fr 1fr 1fr;
    grid-gap:2em;
`

export default class IndexPage extends React.Component {
  render() {
    const { data } = this.props
    const { edges: posts } = data.allMarkdownRemark

    return (
      <Layout>
        <SEO title="Home" />
        <PhotoGrid>
          {posts
            .filter(post => post.node.frontmatter.templateKey === 'blog-post')
            .map(({ node: post }) => (
              <div>
                  <Link to={post.fields.slug} rel="noopener noreferrer">
                      <Img fluid={post.frontmatter.mainImage[0].image.childImageSharp.fluid} alt={post.frontmatter.title} />
                  </Link>
            </div>

            ))}
            </PhotoGrid>
      </Layout>
    )
  }
}

IndexPage.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array,
    }),
  }),
}

export const pageQuery = graphql`
  query IndexQuery {
    allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
      edges {
        node {
          excerpt(pruneLength: 200)
          id
          html
          fields {
            slug
          }
          frontmatter {
            title
            mainImage {
              image {
                childImageSharp {
                fluid(maxWidth: 2048, quality: 100) {
                ...GatsbyImageSharpFluid
                  }
                }
              }
            }
           
            templateKey
            date(formatString: "YYYY")
          }
        }
      }
    }
  }
`