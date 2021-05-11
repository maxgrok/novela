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

