module.exports = {
  siteMetadata: {
    title: `Max by Max`,
    name: `Max's Blog`,
    siteUrl: `https://www.maxgrok.com`,
    description: `Welcome to Max's Blog!` + `clear thoughts on tech topics`,
    hero: {
      heading: `I'm happy you dropped by. Read these articles for my thoughts on tech topics.`,
      maxWidth: 642,
    },
    social: [
      {
        name: `twitter`,
        url: `https://twitter.com/maxxgrok`,
      },
      {
        name: `github`,
        url: `https://github.com/maxgrok`,
      },
      {
        name: `linkedin`,
        url: `https://www.linkedin.com/in/max-g-33665718/`,
      },
    ],
  },
  plugins: [
    {
      resolve: "@narative/gatsby-theme-novela",
      options: {
        contentPosts: "content/posts",
        contentAuthors: "content/authors",
        basePath: "/",
        authorsPage: true,
        sources: {
          local: true,
          // contentful: true,
        },
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Max's Blog`,
        short_name: `Max's Blog`,
        start_url: `/`,
        background_color: `#fff`,
        theme_color: `#fff`,
        display: `standalone`,
        icon: `src/assets/favicon.png`,
      },
    },
    {
      resolve: `gatsby-plugin-netlify-cms`,
      options: {
      },
    },
  ],
};


/* eslint-disable */

module.exports = ({
  contentAuthors = 'content/authors',
  contentPosts = 'content/posts',
  pathPrefix = '',
  sources: { local, contentful } = { local: true, contentful: false },
}) => ({
  pathPrefix,
  mapping: {
    'Mdx.frontmatter.author': `AuthorsYaml`,
  },
  plugins: [
    `gatsby-plugin-typescript`,
    `gatsby-image`,
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    `gatsby-transformer-remark`,
    `gatsby-transformer-yaml`,
    `gatsby-plugin-theme-ui`,
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        query: `
          {
            site {
              siteMetadata {
                title
                description
                siteUrl
                site_url: siteUrl
              }
            }
          }
        `,
        setup: ({
          query: {
            site: { siteMetadata },
          },
          ...rest
        }) => {
          siteMetadata.feed_url = siteMetadata.siteUrl + '/rss.xml';
          siteMetadata.image_url =
            siteMetadata.siteUrl + '/icons/icon-512x512.png';
          const siteMetadataModified = siteMetadata;
          siteMetadataModified.feed_url = `${siteMetadata.siteUrl}/rss.xml`;
          siteMetadataModified.image_url = `${siteMetadata.siteUrl}/icons/icon-512x512.png`;

          return {
            ...siteMetadataModified,
            ...rest,
          };
        },
        feeds: [
          {
            serialize: ({ query: { site, allArticle, allContentfulArticle } }) => {
              if (local && !contentful) {
                return allArticle.edges
                  .filter(edge => !edge.node.secret)
                  .map(edge => {
                    return {
                      ...edge.node,
                      description: edge.node.excerpt,
                      date: edge.node.date,
                      url: site.siteMetadata.siteUrl + edge.node.slug,
                      guid: site.siteMetadata.siteUrl + edge.node.slug,
                      // body is raw JS and MDX; will need to be processed before it can be used
                      // custom_elements: [{ "content:encoded": edge.node.body }],
                      author: edge.node.author,
                    };
                  });
              } else if (!local && contentful) {
                return allContentfulArticle.edges
                  .filter(edge => !edge.node.secret)
                  .map(edge => {
                    return {
                      ...edge.node,
                      description: edge.node.excerpt,
                      date: edge.node.date,
                      url: site.siteMetadata.siteUrl + '/' + edge.node.slug,
                      guid: site.siteMetadata.siteUrl + '/' + edge.node.slug,
                      custom_elements: [{ "content:encoded": edge.node.body.childMarkdownRemark.html }],
                      author: edge.node.author ? edge.node.author.name : '',
                    };
                  });
              } else {
                const allArticlesData = { ...allArticle, ...allContentfulArticle };
                return allArticlesData.edges
                  .filter(edge => !edge.node.secret)
                  .map(edge => {
                    return {
                      ...edge.node,
                      description: edge.node.excerpt,
                      date: edge.node.date,
                      url: site.siteMetadata.siteUrl + edge.node.slug,
                      guid: site.siteMetadata.siteUrl + edge.node.slug,
                      // custom_elements: [{ "content:encoded": edge.node.body }],
                      author: edge.node.author ? edge.node.author.name : '',
                    };
                  });
              }
            },
            query:
              local && !contentful
                ? `
              {
                allArticle(sort: {order: DESC, fields: date}) {
                  edges {
                    node {
                      body
                      excerpt
                      date
                      slug
                      title
                      author
                      secret
                    }
                  }
                }
              }
              `
                : !local && contentful
                ? `
              {
                allContentfulArticle(sort: {order: DESC, fields: date}) {
                  edges {
                    node {
                      excerpt
                      date
                      slug
                      title
                      body {
                        childMarkdownRemark {
                          html
                        }
                      }
                      author {
                        name
                      }
                      secret
                    }
                  }
                }
              }
              `
                : `
              {
                allArticle(sort: {order: DESC, fields: date}) {
                  edges {
                    node {
                      body
                      excerpt
                      date
                      slug
                      title
                      author
                      secret
                    }
                  }
                }
                allContentfulArticle(sort: {order: DESC, fields: date}) {
                  edges {
                    node {
                      excerpt
                      date
                      slug
                      title
                      body {
                        childMarkdownRemark {
                          html
                        }
                      }
                      author {
                        name
                      }
                      secret
                    }
                  }
                }
              }
              `,
            output: '/rss.xml',
          },
        ],
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: contentPosts,
        name: contentPosts,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: contentAuthors,
        name: contentAuthors,
      },
    },
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        extensions: [`.mdx`, `.md`],
        gatsbyRemarkPlugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 10000,
              linkImagesToOriginal: false,
              quality: 80,
              withWebp: true,
            },
          },
          {
            resolve: `@raae/gatsby-remark-oembed`,
            options: {
              providers: {
                include: ["Instagram"]
              }
            }
          },
          {
            resolve: "gatsby-remark-embed-video",
            options: {
              width: 680,
              ratio: 1.77, // Optional: Defaults to 16/9 = 1.77
              height: 400, // Optional: Overrides optional.ratio
              related: false, //Optional: Will remove related videos from the end of an embedded YouTube video.
              noIframeBorder: true, //Optional: Disable insertion of <style> border: 0
              urlOverrides: [
                {
                  id: 'youtube',
                  embedURL: (videoId) => `https://www.youtube-nocookie.com/embed/${videoId}`,
                }
              ] //Optional: Override URL of a service provider, e.g to enable youtube-nocookie support
            }
          },
          { resolve: `gatsby-remark-copy-linked-files` },
          { resolve: `gatsby-remark-numbered-footnotes` },
          { resolve: `gatsby-remark-smartypants` },
          {
            resolve: 'gatsby-remark-external-links',
            options: {
              target: '_blank',
              rel: 'noreferrer', // eslint-disable-line unicorn/prevent-abbreviations
            },
          },
        ],
        remarkPlugins: [require(`remark-slug`)], // eslint-disable-line global-require
      },
    },
    {
      resolve: `gatsby-plugin-emotion`,
      options: {
        autoLabel: process.env.NODE_ENV === `development`,
      },
    },
  ],
});
