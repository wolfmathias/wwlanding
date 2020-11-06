import React from "react";
import { Link } from "gatsby";

import Layout from "../components/layout";
// import abductionIllustration from "../images/abduction-illustration.svg";

function ThankYouPage() {
  return (
    <Layout>
      <div className="mt-24 text-center leading-loose tracking-wide">
        {/* <img
          alt="Ghost getting abducted by aliens"
          className="block mx-auto w-1/2"
          src={abductionIllustration}
        /> */}
        <h2 className="text-4xl font-bold inline-block my-8 p-3">
            Thank you!
        </h2>
        <br/>
        <p className="inline-block my-8 p-3">
            You&apos;ll get an email when we launch.
        </p>
      </div>
      <div className="text-center">
        <Link
            className="underline text-sm"
            href="/"
        >
            Go Back
        </Link> 
      </div>
    </Layout>
  );
}

export default ThankYouPage;