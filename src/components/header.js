import { Link } from "gatsby";
import React, { useState } from "react";
import logoSmall from '../images/ww-logo-small.png'
function Header() {
  const [isExpanded, toggleExpansion] = useState(false);

  //  TODO: 
  //  Add animation of header opacity turning to 80 or so onScroll
  //  Fix positioning of site title
  return (
    <header className="bg-primary bg-opacity-75 md:bg-opacity-100 absolute md:static w-full">
      <div className="flex flex-wrap items-center justify-between max-w-4xl p-4 mx-auto lg-px-8">
        <Link to="/">
            <img className="rows-span-3 float-left h-16" src={logoSmall} alt="wildwish.org" />
        </Link>
        <Link to="/">
        </Link>
        <div className="grid-rows-auto md:hidden">
        <button
          className="items-center block px-3 py-2 text-white border-2 border-white rounded"
          onClick={() => toggleExpansion(!isExpanded)}
        >
          <svg
            className="w-3 h-3 fill-current"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Menu</title>
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
          </svg>
        </button>
        </div>

        <nav
          className={`${
            isExpanded ? `block` : `hidden`
          } md:block md:items-center w-full md:w-auto`}
        >
          {[
            {
              route: `/about`,
              title: `About`,
            },
            {
              route: `/signup`,
              title: `Sign Up`,
            },
            {
              route: `/contribute`,
              title: `Contribute`
            }
          ].map((link) => (
            <Link
              className="block mt-4 text-white no-underline md:inline-block md:mt-0 md:ml-6"
              key={link.title}
              to={link.route}
            >
              {link.title}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}

export default Header;
