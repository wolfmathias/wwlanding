import React from "react";
import { GitHub, Mail } from 'react-feather'
import Layout from "../components/layout";
import SEO from "../components/seo";

function ContributePage() {
    let github = 'github.com/mattplichtawild/django-wildwish'
    let email = 'mattplichtawild@gmail.com'

    return (
        <Layout>
            <SEO
                keywords={[`gatsby`, `tailwind`, `react`, `tailwindcss`]}
                title="Contribute"
            />
            <section className="container mt-24">
                <div className="grid grid-rows-3">
                    
                    {github && (
                    <a  href={github}>
                        <GitHub /> {github}
                    </a>
                    )}
                    {email && (
                    <a className="grid-span-1" href={`mailto:${email}`}>
                        <Mail /> <span>{email}</span>
                    </a>
                    )}
                </div>
            </section>
        </Layout>
    )
}

export default ContributePage;