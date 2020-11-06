import React from "react";

import Layout from "../components/layout";
// import abductionIllustration from "../images/abduction-illustration.svg";

function ThankYouPage() {
  return (
    <Layout>
      <div>
        {/* <img
          alt="Ghost getting abducted by aliens"
          className="block mx-auto w-1/2"
          src={abductionIllustration}
        /> */}
        <h2 className="text-2xl font-bold inline-block my-8 p-3">
            Thank you!
        </h2>
        <p className="inline-block my-8 p-3">
            We&apos;ll reach out to sign your animals up soon!
        </p>
      </div>
    </Layout>
  );
}

export default ThankYouPage;