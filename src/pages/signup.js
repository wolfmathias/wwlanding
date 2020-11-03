import React, { Component } from "react";

import Layout from "../components/layout";
import SEO from "../components/seo";

class SignupPage extends Component {
    
    render () {
        return (
            <Layout>
            <SEO
                keywords={[`gatsby`, `tailwind`, `react`, `tailwindcss`]}
                title="Signup"
            />
            <section className="mt-24 md:mt-0">
                <form className="mx-auto py-8 w-3/4 lg:w-1/3">
                <p className="mb-8 leading-loose">
                    Sign up to get notified when wildwish.org launches.{` `}
                    <a
                    className="font-bold text-gray-700 no-underline"
                    href="https://github.com/tailwindcss/custom-forms"
                    target="_blank"
                    rel="noopener noreferrer"
                    >
                    Read the docs
                    </a>
                    .
                </p>

                <label
                    className="block mb-2 text-xs font-bold uppercase"
                    htmlFor="first-name"
                >
                    First Name
                </label>

                <input
                    className="w-full mb-6 form-input"
                    id="first-name"
                    placeholder="Paul"
                    type="text"
                />

                <label
                    className="block mb-2 text-xs font-bold uppercase"
                    htmlFor="last-name"
                >
                    Last Name
                </label>

                <input
                    className="w-full mb-6 form-input"
                    id="last-name"
                    placeholder="Blart"
                    type="text"
                />

                <input 
                    className="form-checkbox"
                    type="checkbox"
                />

                <label className="inline-block px-2 mb-2 text-xs font-thin tracking-tight">
                    Contact me about adding my animals to the pilot program.
                </label>

                

                <label
                    className="block my-2 text-xs font-bold uppercase"
                    htmlFor="message"
                >
                    Message <span className="font-xs font-hairline">(optional)</span>
                </label>

                <textarea
                    className="w-full mb-6 form-textarea"
                    id="message"
                    placeholder="Tell us your favorite animal..."
                    rows="8"
                />

                <button className="px-4 py-2 text-sm font-bold text-white bg-gray-700 border-b-4 border-gray-800 rounded hover:border-gray-700 hover:bg-gray-600">
                    Submit
                </button>
                </form>
            </section>
            </Layout>
        )
    }
}

export default SignupPage;
