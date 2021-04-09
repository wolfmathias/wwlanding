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
    
    deleteAnimal = i => e => {
        e.preventDefault()
        const animalForm = this.state.animalForm
        let animals = [
          ...animalForm.animals.slice(0, i),
          ...animalForm.animals.slice(i + 1)
        ]

        animalForm.animals = animals

        this.setState({
          animalForm: animalForm 
        })
        console.log(animalForm)
    }
    
    addAnimal = e => {
    e.preventDefault()
    let animals = this.state.animalForm.animals.concat([''])
    this.setState({
        animals
    })
    }

    handleInputChange = (e , object , type, ix, iy) => {
        // object = this.state.animalForm.animals[0]
        // e.name = 'name'
        // e.value = 'Shirkan'

        // object = this.state.animalForm.user
        // e.name = 'last_name'
        // e.value = 'Blart'

       
        const animalForm = this.state.animalForm;
        let key = e.target.name;
        let value = e.target.value;
        object[key] = value;

        console.log(this.state.animalForm)


        
        if(type === 'animal'){
            animalForm.animals[ix] = object
        } else if (type === 'user'){
            animalForm.user = object
        } else if (type === 'toy'){
            animalForm.animals[ix].toys[iy] = object
        }

        this.setState({
          animalForm : animalForm
        });

        console.log(this.state.animalForm)
    }

    renderAnimalInputs() {
        // map through 'animals' object of state, then render inputs for each field
        return (
        <>
        <h2>Animals</h2>
        <ul >
        {this.state.animalForm.animals.map( (e, i) => {
            return (
                <li key={i}>{i + 1}
                <button onClick={this.deleteAnimal(i)}>X</button>
                {Object.entries(e).map( ([k, v], ix) => {
                    if (typeof(v) === 'string') {
                        return ( 
                            <div key={ix}>
                                <label
                                className="block mb-2 text-xs font-bold uppercase"
                                htmlFor={k}
                                >
                                    {k}
                                </label>
                                
                                {k === 'bio' ? 
                                // Use 'textarea' for bio input
                                <textarea
                                className="w-full h-24 mb-6 form-input"
                                type='text'
                                name={k}
                                value={v}
                                onChange={ e => {this.handleInputChange(e, this.state.animalForm.animals[i], 'animal', i)} }
                                />
                                :
                                // Also check to see if 'text' or 'date' should be used for input
                                <input
                                className="w-full md:w-1/3 mb-6 form-input"
                                type={k === 'dob' ? 'date':'text'}
                                name={k}
                                value={v}
                                onChange={ e => {this.handleInputChange(e, this.state.animalForm.animals[i], 'animal', i)} }
                                />
                                }
                                
                            </div>
                        )   
                    } else if (typeof(v) === 'object') {
                        // 'animals' object may contain nested objects like toys and images
                        // Check for those and map through them to return inputs for each
                        if (k === 'toys') {
                            return v.map( (e, idx) => {
                                return Object.entries(e).map( ([k, v], ix) => {
                                    return (
                                    <div className="ml-4" key={ix}>
                                    <label
                                    className="block mb-2 text-xs font-bold uppercase"
                                    htmlFor={k}
                                    >
                                        Toy {idx + 1} URL
                                    </label>
                                    <input
                                    className="w-full mb-6 form-input"
                                    type="url"
                                    name={k}
                                    value={v}
                                    onChange={ e => {this.handleInputChange(e, this.state.animalForm.animals[i].toys[idx], 'toy', i, idx)} }
                                    />
                                    </div>
                                    )
                                })
                            });
                        }
                    }
                })}
                
            </li>
            )
        })}
        </ul>
        <button onClick={this.addAnimal}>Add Animal</button>
        </>
        )
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
                    className="mx-auto py-8 w-3/4 lg:w-1/2" 
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
                    htmlFor="first_name"
                >
                    First Name
                </label>

                <input
                    className="w-full mb-6 form-input"
                    id="first_name"
                    name="first_name"
                    placeholder="Paul"
                    type="text"
                    onChange={ e => {this.handleInputChange(e, this.state.animalForm.user, 'user')} }
                />

                <label
                    className="block mb-2 text-xs font-bold uppercase"
                    htmlFor="last-name"
                >
                    Last Name
                </label>

                <input
                    className="w-full mb-6 form-input"
                    id="last_name"
                    name="last_name"
                    placeholder="Blart"
                    type="text"
                    onChange={ e => {this.handleInputChange(e, this.state.animalForm.user, 'user')} }
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
                    onChange={ e => {this.handleInputChange(e, this.state.animalForm.user, 'user')} }
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
                          } else if (typeof(v) === 'object') {
                            let element = {
                              // type: inputType,
                              name: k,
                              value: v,
                              key: ix
                            }
                            console.log(element)
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
