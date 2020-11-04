import { Link } from "gatsby";
import React from "react";

import Layout from "../components/layout";
import SEO from "../components/seo";
import tigerCardboard from "../images/tigercardboard.png"

function IndexPage() {
  return (
    <Layout>
      <SEO
        keywords={[`gatsby`, `tailwind`, `react`, `tailwindcss`]}
        title="Home"
      />
      <div className="h-screen bg-local bg-cover bg-center" style={{ backgroundImage:`url(${tigerCardboard})`}}>
        <div className="h-full pt-32">
          <div className="uppercase text-5xl md:text-6xl md:text-center text-white font-semibold tracking-widest leading-relaxed p-6">
            <h1>
              Toys and enrichment for zoo animals around the world
            </h1>
            <Link
              className="underline text-sm"
              href="/about/">
                Learn more
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default IndexPage;
