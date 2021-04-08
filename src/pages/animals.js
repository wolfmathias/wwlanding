import React from "react";
import { navigate } from 'gatsby-link'
import Layout from "../components/layout";
import SEO from "../components/seo";
// import { checkPropTypes } from "prop-types";

function encode(data) {
    return Object.keys(data)
      .map((key) => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
      .join('&')
}

// function AnimalFields() {
//     const [state, setState] = React.useState()
//     const handleChange = (e) => {
//         setState({...state, [e.target.name]: e.target.value})
//         console.log(state)
//     }

//     return (
//         <div>
//             <label className="block mb-2 text-xs font-bold uppercase" htmlFor="name">Name</label>
//             <input className="w-full mb-6 form-input" type="text" name="name" id="name" onChange={handleChange}/>

//             <label className="block mb-2 text-xs font-bold uppercase" htmlFor="species">Species</label>
//             <input className="w-full mb-6 form-input" type="text" name="species" id="species" onChange={handleChange}/>

//             <label className="block mb-2 text-xs font-bold uppercase" htmlFor="bio">Bio</label>
//             <input className="w-full mb-6 form-input" type="text-area" name="bio" id="bio" onChange={handleChange}/>


//         </div>
//     )
// }

class AnimalSignup extends React.Component {
    constructor() {
        super();
    
        this.state = this.getInitialState();
        // this.handleCheck = this.handleCheck.bind(this);
        // console.log(this.state)
    }

    getInitialState() {
        const initialState = {
            animalForm: {
                zoo: {
                    name: '',
                    website: ''
                },
                user: {
                    first_name: '',
                    last_name: '',
                    email: ''
                },
                animals: [ {
                    name: '',
                    species: '',
                    dob: '',
                    bio: '',
                    toys: [ {url: ''}, {url: ''}, {url: ''} ],
                    images: []
                }, {
                    name: '',
                    species: '',
                    dob: '',
                    bio: '',
                    toys: [ {url: ''}, {url: ''}, {url: ''} ],
                    images: []
                } ],
            },
            errors: {}
        }
        return initialState
    }

    // handleCheck() {
    //     this.setState({
    //       checked: !this.state.checked
    //     })
    // }

    
    handleChange = (e) => {
        this.setState({ ...this.state, [e.target.name]: e.target.value })
    }
 

    handleSubmit = (e) => {
        e.preventDefault()
        const form = e.target
        console.log(this.state)
        fetch('/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: encode({
                'form-name': form.getAttribute('name'),
                ...this.state,
            }),
        })
        .then(() => navigate(form.getAttribute('action')))
        .catch((error) => alert(error))
    }
    
    renderAnimalInputs() {
        return this.state.animalForm.animals.map( (e, i) => {
          Object.entries(e).forEach( ([k, v]) => {
            if (typeof(v) === 'string') {
                let inputType = (k == 'bio' ? 'textarea':'text')
                let element = {
                    key: i,
                    name: k,
                    value: v
                }
                console.log(element)
                return ( 
                    <div key={i}>
                        <label
                        className="block mb-2 text-xs font-bold uppercase"
                        htmlFor={k}
                        >
                            {k}
                        </label>
                        <input
                        className="w-full mb-6 form-input"
                        type={inputType}
                        name={k}
                        value={v}
                        onChange={ e => {this.handleInputChange(e, this.state.animalForm, i)} }
                        />
                    </div>
                )   
            } else if (typeof(v) === 'object') {
              let element = {
                key: i,
                name: k,
                value: v
              }
              console.log(element)
            }
          })
        })
      }
    
    render () {
        // const hidden = this.state.checked ? '' : 'hidden';

        return (
            <Layout>
            <SEO
                keywords={[`wildwish`, `wildheart`, `signup`, `zoo`, `nonprofit`]}
                title="Signup"
            />
            <section className="mt-24 md:mt-0">
                <form 
                    className="mx-auto py-8 w-3/4 lg:w-1/3" 
                    name="signup"
                    method="post"
                    action="/thanks/"
                    data-netlify="true"
                    data-netlify-honeypot="bot-field"
                    onSubmit={this.handleSubmit}
                >

                {/* The `form-name` hidden field is required to support form submissions without JavaScript */}
                <input type="hidden" name="form-name" value="animal_signup" />
                <p hidden>
                    <label>
                        Don’t fill this out: <input name="bot-field" onChange={this.handleChange} />
                    </label>
                </p>

                <p className="mb-8 leading-loose">
                    Add your animals and their wishes to the pilot program
                </p>

                {/* The `form-name` hidden field is required to support form submissions without JavaScript */}
                <input type="hidden" name="form-name" value="animal_signup"/>

                <label
                    className="block mb-2 text-xs font-bold uppercase"
                    htmlFor="first-name"
                >
                    First Name
                </label>

                <input
                    className="w-full mb-6 form-input"
                    id="first-name"
                    name="first-name"
                    placeholder="Paul"
                    type="text"
                    onChange={this.handleChange}
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
                    name="last-name"
                    placeholder="Blart"
                    type="text"
                    onChange={this.handleChange}
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
                    name="email"
                    placeholder="Use your work email if you are a zookeeper"
                    type="email"
                    onChange={this.handleChange}
                />
                    
                {/* {
                    this.state.animalForm.animals.map( (e, i) => {
                        return Object.entries(e).forEach( ([k, v]) => {
                          if (typeof(v) === 'string') {
                              let inputType = (k == 'bio' ? 'textarea':'text')
                              
                              console.log([i, k, v])
                              return ( 
                                  // {
                                  //     type: inputType,
                                  //     name: k,
                                  //     value: v,
                                  //     key: i
                                  // }
                                  <div key={i}>
                                      <label
                                      className="block mb-2 text-xs font-bold uppercase"
                                      htmlFor={k}
                                      >
                                          {k}
                                      </label>
                                      <input
                                      className="w-full mb-6 form-input"
                                      type={inputType}
                                      name={k}
                                      value={v}
                                      onChange={ e => {this.handleInputChange(e, this.state.animalForm, i)} }
                                      />
                                  </div>
                              )   
                          // } else if (typeof(v) === 'object') {
                          //   let element = {
                          //     // type: inputType,
                          //     name: k,
                          //     value: v,
                          //     key: ix
                          //   }
                          //   console.log(element)
                          }
                        })
                    })
                } */}
                {this.renderAnimalInputs()}
{/* 
                <input 
                    className="form-checkbox"
                    type="checkbox"
                    onChange={this.handleCheck}
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
                        name="zoo-name"
                        onChange={this.handleChange}
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
                    name="message"
                    placeholder="What's your favorite animal?"
                    rows="8"
                    onChange={this.handleChange}
                /> 
*/}
                <button 
                    className="px-4 py-2 text-sm font-bold text-white bg-gray-700 border-b-4 border-gray-800 rounded hover:border-gray-700 hover:bg-gray-600"
                    type='submit'
                >    
                    Submit
                </button>
                </form>
            </section>
            </Layout>
        )
    }
}

export default AnimalSignup;
