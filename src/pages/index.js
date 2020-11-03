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
        <div className="h-full pt-20">
          <div className="uppercase text-4xl text-gray-300 font-medium tracking-widest p-6">
            
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default IndexPage;
