import React from "react";
import axios from "axios";
import { navigate } from 'gatsby-link'
import Layout from "../components/layout";
import SEO from "../components/seo";
// import { checkPropTypes } from "prop-types";
import Dropzone from 'react-dropzone-uploader'

// function encode(data) {
//     return Object.keys(data)
//       .map((key) => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
//       .join('&')
// }

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
                    images: [],
                    toys: [ {url: ''}, {url: ''}, {url: ''} ],
                } ],
            },
            errors: {}
        }
        return initialState
    }

    handleChangeStatus = ({ meta, file }, status) => { console.log(status, meta, file) }

    handleChange = (e) => {
        this.setState({ ...this.state, [e.target.name]: e.target.value })
    }
 
    // Example submit from 'react-dropzone' docs
    handleDropSubmit = (files, allFiles) => {
        console.log(files.map(f => f.meta))
        allFiles.forEach(f => f.remove())
    }

    handleSubmit = (e) => {
        e.preventDefault()
        const DEV_URL = 'http://127.0.0.1:3000/animals/landing'
        console.log(DEV_URL)

        // console.log(files.map(f => f.meta))
        // allFiles.forEach(f => f.remove())

        const form = e.target
        // console.log(this.state)
        // fetch(DEV_URL, {
        //     method: 'POST',
        //     headers: { "Content-Type": "application/json", },
        //     body: encode({
        //         'form-name': form.getAttribute('name'),
        //         ...this.state.animalForm,
        //     }),
        // })
        // .then(() => navigate(form.getAttribute('action')))
        // .catch((error) => alert(error))

        
        // axios.get(DEV_URL)
        axios.post(DEV_URL, 
            this.state.animalForm,
            {
                headers: {
                    "Content-Type": 'multipart/form-data', 
                    // 'X-CSRFToken': csrfToken
                }
            }
        )
        .then(resp => console.log(resp))
        .then(() => navigate(form.getAttribute('action')))
        .catch((error) => alert(error))

    }

    deleteObject = (type, ix, iy) => e => {
        e.preventDefault()
        const animalForm = this.state.animalForm
        
        if (type === 'animal') {
            let newArray = [
                ...animalForm.animals.slice(0, ix),
                ...animalForm.animals.slice(ix + 1)
            ]

            animalForm.animals = newArray            
        } else if (type === 'toy') {
            let newArray = [
                ...animalForm.animals[ix].toys.slice(0, iy),
                ...animalForm.animals[ix].toys.slice(iy + 1)
            ]

            animalForm.animals[ix].toys = newArray
        }

        this.setState({
            animalForm: animalForm
        });
    };
    
    addObject = (type) => e => {
        e.preventDefault()
        const animalForm = this.state.animalForm

        if (type === 'animal') {
            const animal = {
                name: '',
                species: '',
                dob: '',
                bio: '',
                toys: [ {url: ''}, {url: ''}, {url: ''} ],
                images: []
            }
            animalForm.animals = this.state.animalForm.animals.concat(animal)
        } else if (type === 'toy') {
            const toy = {
                url: ''
            }
            animalForm.toys = this.state.animalForm.toys.concat(toy)
        }
        
        this.setState({
            animalForm: animalForm
        });
    };

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
    }

    
    // specify upload params and url for your files
    // getUploadParams = ({ meta }) => { return { url: 'https://httpbin.org/post' } }
    getUploadParams = () => { return { url: 'https://httpbin.org/post' } }

    // called every time a file's `status` changes
    handleChangeStatus = (file, status, fileList, i) => { 
        console.log(i, status, file, fileList) 
        const animalForm = this.state.animalForm

        if (status === 'done') {
            animalForm.animals[i].images.push(file)
            
            this.setState({
                animalForm : animalForm
            })
        } else if (status === 'removed') {
            const images = animalForm.animals[i].images
            let imgIndex = images.indexOf(file)
            console.log(imgIndex)

            let newArray = [
                ...animalForm.animals[i].images.slice(0, imgIndex),
                ...animalForm.animals[i].images.slice(imgIndex + 1)
            ]

            animalForm.animals[i].images = newArray
        }
    }
    
    // receives array of files that are done uploading when submit button is clicked
    handleFileSubmit = (files, allFiles) => {
        console.log(files.map(f => f.meta))
        allFiles.forEach(f => f.remove())
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
                <button onClick={this.deleteObject('animal', i)}>X</button>
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
                                return Object.entries(e).map( ([k, v], iy) => {
                                    return (
                                    <div className="ml-4" key={iy}>
                                    
                                    <label
                                    className="block mb-2 text-xs font-bold uppercase"
                                    htmlFor={k}
                                    >
                                        Toy {idx + 1} URL
                                    </label>
                                    <button onClick={this.deleteObject('toy', i, iy)}>X</button>
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
                        } else if (k === 'images') {
                            return (
                                <div key={ix}>
                                <Dropzone
                                    getUploadParams={this.getUploadParams}
                                    onChangeStatus={(file, status, fileList) => this.handleChangeStatus(file, status, fileList, i)}
                                    // onSubmit={this.handleDropSubmit}
                                    accept="image/*,audio/*,video/*"
                                />                                
                                </div>
                                
                            )
                        }
                    }
                })}
            </li>
            )
        })}
        </ul>
        <button onClick={this.addObject('animal')}>Add Animal</button>
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
