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
          <div className="mx-2 mt-24 md:mt-0 p-4 md:w-2/3 md:mr-8 ">
            <blockquote className="pl-4 font-serif leading-loose text-justify border-l-4 border-gray-900">
              Enriching the lives of wild animals in captivity.
            </blockquote>

            <p>
              That was the mission when I started WildHeart in a coffee shop in 2015, and it&apos;s the mission now.
            </p>
            <p>
              The core work was improving enclosures with pools, furniture, and other additions. But the foundation was built on sending toys
              to animals in zoos around the world. Zookeepers would reach out on social media, and WildHeart would send a toy for their animals.
            </p>
            <p>
              Wildwish.org connects people with the animals their money is helping. Toys and enrichment are directly crowdsourced, and donors are
              notified when the animal they conributed to receives a toy.
            </p>
            <p>
              This program is free for zoos and wildlife sanctuaries. We often get asked &quot;What&apos;s the catch?&quot; when working with a zoo to
              provide enrichment. The answer is that there isn&apos;t one. The WildHeart Foundation is a passion project; an organization consisting
              of me and some friends who love and work with wildlife. The projects we&apos;ve worked on have been acheivements on par with 
              larger nonprofits, but WildHeart is still ran from coffee shops on weekends (except in times of pandemic), and projects are
              scheduled around day jobs or worked on using vacation. We do this because we want to see happy animals. I love showing friends pictures
              of animals playing with a toy we sent or swimming in a pool we helped build.
            </p>
            <p>
              The program is still being built, and I need help. We don&apos;t have a software team, it&apos;s just me hacking away. I learned to 
              program so I could build this idea, plugging away as the WildHeart crew supports the foundation in the free time we have.
            </p>
            <p>
              Contact us if you are a software engineer who wants to help me a whole lot of happy animals.
            </p>
            <p>Zookeepers! Sign up to gain early access to the pilot program.</p>
            {/* <cite className="block mt-4 text-xs font-bold text-right uppercase">
              – Matt Plichta 
            </cite> */}
          </div>
          <figure className="w-2/3 md:w-1/3">
            <img alt="Hippo playing with a ball" src={hippoToy} />
          </figure>
        </div>
      </section>
    </Layout>
  );
}

export default AboutPage;
