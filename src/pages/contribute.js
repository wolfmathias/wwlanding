import React from "react";
import { GitHub, Mail } from 'react-feather'
import Layout from "../components/layout";
import SEO from "../components/seo";

function ContributePage() {
    let github = 'https://github.com/mattplichtawild/django-wildwish'
    let email = 'mattplichtawild@gmail.com'

    return (
        <Layout>
            <SEO
                keywords={[`gatsby`, `tailwind`, `react`, `tailwindcss`]}
                title="Contribute"
            />
            <section className="container mt-24 px-4 md:px-24">
                <div className="text-justify font-light tracking-wide leading-relaxed space-y-6 py-4">
                    <h1 className="text-lg font-bold">Contribute to the project</h1>
                    <p className="">
                        This app is an extension of my passion project, the{` `}
                        <a 
                            className="text-blue-500 underline"
                            href='https://www.thewildheartfoundation.org' 
                            target='_blank' 
                            rel='noreferrer'
                        >WildHeart Foundation
                        </a>
                        .
                    </p>
                    <p>
                        There is no software team, just me plugging away when I can. The project is open source,
                        check it out on <a>github</a> or <a>email me</a> if you are interested in contributing.
                    </p>
                    <p>
                        Let&apos;s make some animals happy!
                    </p>
                </div>
                <div className="grid grid-flow-row auto-rows-max space-y-4 py-4">
                   <div className="text-sm">
                    {github && (
                    <a href={github}>
                        <span><GitHub />Github</span>
                    </a>
                    )}
                   </div>
                   <div className="text-sm">
                    {email && (
                    <a href={`mailto:${email}`}>
                        <Mail /> <span>{email}</span>
                    </a>
                    )}
                    </div>
                </div>
            </section>
        </Layout>
    )
}

export default ContributePage;