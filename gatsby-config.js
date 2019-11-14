module.exports = {
  siteMetadata: {
    title: `Ellington Hammond`,
    description: `Photographer and Filmmaker`,
    author: `@ellington`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,

    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/static/assets`,
        name: 'uploads',
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/entries/`,
        name: `entries`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,      
    `gatsby-plugin-styled-components`,

    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          `gatsby-remark-relative-images`,
          {
            resolve: `gatsby-remark-images`,
            options: {
              // It's important to specify the maxWidth (in pixels) of
              // the content container as this plugin uses this as the
              // base for generating different widths of each image.
              maxWidth: 2048,
            },
          },
        ],
      },
    },

    {
      resolve: `@gatsby-contrib/gatsby-plugin-elasticlunr-search`,
      options: {
        // Fields to index
        fields: [`title`, `tags`],
        // How to resolve each field`s value for a supported node type
        resolvers: {
          // For any node of type MarkdownRemark, list how to resolve the fields` values
          MarkdownRemark: {
            title: node => node.frontmatter.title,
            tags: node => node.frontmatter.tags,
            slug: node => node.fields.slug,
          },
        },
      },
    },



    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Ellington`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#000`,
        theme_color: `#000`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    `gatsby-plugin-offline`,
  ],
}
