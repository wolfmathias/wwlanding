import React from "react";

import Layout from "../components/layout";
import SEO from "../components/seo";
import hippoToy from "../images/hippo_toy.png";

function AboutPage() {
  return (
    <Layout>
      <SEO
        keywords={[`gatsby`, `tailwind`, `react`, `tailwindcss`]}
        title="About"
      />

    
      <section className="flex flex-col items-center md:flex-row">
        <div className="bg-white">
          <div className="mx-2 mt-24 md:mt-0 p-4 lg:px-24">
            <blockquote className="pl-4 font-serif leading-loose text-justify border-l-4 border-gray-900">
              Enriching the lives of wild animals in captivity.
            </blockquote>
            <div className="float text-justify font-light tracking-wide leading-relaxed space-y-6 py-6">
              <figure className="float-right w-2/3 p-2">
                <img alt="Hippo playing with a ball" src={hippoToy} />
              </figure>
              <p className="text-left">
                That was the mission when I started WildHeart in a coffee shop in 2015, and it&apos;s the mission now.
              </p>
              <p className="clear">
                The core work was improving enclosures with pools, furniture, and other additions. But the foundation was built on sending toys
                to animals in zoos around the world. Zookeepers would reach out on social media, and WildHeart would send a toy for their animals.
              </p>
              <p>
                Wildwish.org connects people with the animals their money is helping. Toys and enrichment are crowdsourced with microdonations, and donors are
                notified when their animal gets the toy they helped buy.
              </p>
              <p className="clear-right">
                This program is free for zoos and wildlife sanctuaries. We often get asked &quot;What&apos;s the catch?&quot; when working with a zoo to
                provide enrichment. The answer is that there isn&apos;t one. The WildHeart Foundation is a passion project; an organization consisting
                of me and some friends who love and work with wildlife. The projects we&apos;ve worked on have been acheivements on par with 
                larger nonprofits, but WildHeart is still ran from coffee shops on weekends (except in times of pandemic), and projects are
                scheduled around day jobs or worked on using vacation. We do this because we want to see happy animals.
              </p>
              <p>
                We do this because our hearts are wild.
              </p>
              <cite className="block mt-4 p-4 text-xs font-bold text-left uppercase">
                – Matt Plichta, Founder
              </cite>
              <a href="/signup" className="p-4  uppercase text-xs font-medium text-blue-500 underline">
                Sign up for the program
              </a>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}

export default AboutPage;
