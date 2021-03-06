import { useStaticQuery, graphql } from "gatsby"
import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import BlogContainer from "../components/BlogContainer"
import { makeStyles } from "@material-ui/core"

const useStyles = makeStyles(theme => ({
  title: {
    fontSize: "2rem",
    marginTop: "2rem",
    marginBottom: 0,
    textAlign: "center",
  },
  subtitle: {
    fontSize: "1.1rem",
    color: "#777",
    marginTop: "0.2rem",
    textAlign: "center",
  },
}))

const EachTagPageTemplate = ({ pageContext }) => {
  const { tag } = pageContext

  const data = useStaticQuery(graphql`
    query {
      allContentfulBlogWithDescription(
        sort: { fields: createdAt, order: DESC }
      ) {
        edges {
          node {
            node_locale
            title
            author
            slug
            tags
            description {
              content {
                content {
                  value
                }
              }
            }
            thumbnail {
              file {
                url
              }
            }
            createdAt(formatString: "MMMM Do, YYYY")
          }
        }
      }
    }
  `)

  const displayArray = data.allContentfulBlogWithDescription.edges.filter(
    edge => edge.node.node_locale === "en-US" && edge.node.tags.includes(tag)
  )

  const classes = useStyles()

  return (
    <Layout>
      <SEO title={`${tag}`} />
      <h1 className={classes.title}>{tag} </h1>
      {displayArray.length === 1 && (
        <p className={classes.subtitle}>
          There is {displayArray.length} post which matches with the "{tag}" tag
        </p>
      )}
      {displayArray.length > 1 && (
        <p className={classes.subtitle}>
          There are {displayArray.length} posts which match with the "{tag}" tag
        </p>
      )}
      {displayArray.length > 0 &&
        displayArray.map(edge => {
          return (
            <BlogContainer
              title={edge.node.title}
              date={edge.node.createdAt}
              thumbnail={edge.node.thumbnail.file.url}
              tags={edge.node.tags}
              description={edge.node.description.content[0].content[0].value}
              slug={edge.node.slug}
              key={edge.node.title}
            />
          )
        })}
    </Layout>
  )
}

export default EachTagPageTemplate
