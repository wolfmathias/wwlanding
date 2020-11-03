import PropTypes from "prop-types";
import React from "react";
import { graphql, useStaticQuery } from "gatsby";

import Header from "./header";

function Layout({ children }) {
  const { site } = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `);

  return (
    <div className="flex flex-col min-h-screen font-sans text-gray-900">
      <Header />

      <main className="flex-1 w-full mx-auto">
        {children}
      </main>

      <footer className="bg-primary text-thgrey md:p-4">
        <span className="flex justify-between max-w-4xl px-4 mx-auto text-xs">
          {site.siteMetadata.title}
        </span>
        <nav className="flex justify-between max-w-4xl px-4 mx-auto text-xs">
          <p className="text-thgrey">
            A program by{` `}
            <a
              className="font-bold no-underline"
              href="https://www.thewildheartfoundation.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              WildHeart
            </a>
          </p>

          <p>
            <a
              className="font-bold text-white no-underline"
              href="/contribute"
              target="_blank"
              rel="noopener noreferrer"
            >
              Contribute
            </a>
          </p>
        </nav>
      </footer>
    </div>
  );
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
