import React from "react";
import { navigate } from 'gatsby-link'
import Layout from "../components/layout";
import SEO from "../components/seo";

function encode(data) {
    return Object.keys(data)
      .map((key) => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
      .join('&')
}

function SignUpPage() {
    const [checked, setState] = React.useState(False)

    const handleChange = () => {
      setState({ checked: !checked })
    }

    const hidden = checked ? '' : 'hidden';

    const handleSubmit = (e) => {
        e.preventDefault()
        const form = e.target
        fetch('/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: encode({
            'form-name': form.getAttribute('name'),
            ...state,
          }),
        })
          .then(() => navigate(form.getAttribute('action')))
          .catch((error) => alert(error))
    }

    return (
        <Layout>
        <SEO
            keywords={[`wildwish`, `wildheart`, `signup`, `zoo`, `nonprofit`]}
            title="Signup"
        />
        <section className="mt-24 md:mt-0">
            <form 
                className="mx-auto py-8 w-3/4 lg:w-1/3" 
                name="contact"
                method="post"
                action="/signup/"
                data-netlify="true"
                data-netlify-honeypot="bot-field"
                onSubmit={handleSubmit}
            >
            <p className="mb-8 leading-loose">
                Sign up to get notified when wildwish.org launches.
            </p>

            {/* The `form-name` hidden field is required to support form submissions without JavaScript */}
            <input type="hidden" name="form-name" value="signup" />

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

            <label
                className="block mb-2 text-xs font-bold uppercase"
                htmlFor="email"
            >
                Email
            </label>

            <input
                className="w-full mb-6 form-input"
                id="email"
                placeholder="Use your work email if you are a zookeeper"
                type="email"
            />

            <input 
                className="form-checkbox"
                type="checkbox"
                onChange={handleChange}
            />

            <label className="inline-block px-2 mb-2 text-xs font-thin tracking-tight">
                Add my animals to the pilot program.
            </label>

            <div className={ hidden }>
                <label className="block my-2 text-xs font-bold uppercase">
                    Zoo Name
                </label>
                <input 
                    className="w-full mb-2 form-input"
                    type="text"
                >
                </input>
                <p className="inline-block mb-2 text-xs font-thin tracking-tight">You&apos;ll get a link to create an account and add your animals when we launch.</p>
            </div>

            <label
                className="block mb-2 mt-4 text-xs font-bold uppercase"
                htmlFor="message"
            >
                Message <span className="font-xs font-hairline">(optional)</span>
            </label>

            <textarea
                className="w-full mb-6 form-textarea"
                id="message"
                placeholder="What's your favorite animal?"
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

export default SignUpPage;
