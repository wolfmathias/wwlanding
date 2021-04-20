import React from "react";
import axios from "axios";
import { navigate } from 'gatsby-link'
import Layout from "../components/layout";
import SEO from "../components/seo";
// import { checkPropTypes } from "prop-types";
import Dropzone from 'react-dropzone-uploader'
import { v4 as uuidv4 } from 'uuid';

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
                    images: [
                        // { uuid: 'string' }
                    ],
                    toys: [ {url: ''}, {url: ''}, {url: ''} ],
                } ],
            },
            errors: {}
        }
        return initialState
    }
 
    // Where was this being used?
    // handleChange = (e) => {
    //     this.setState({ ...this.state, [e.target.name]: e.target.value })
    // }
 
    // Example submit from 'react-dropzone' docs
    // handleDropSubmit = (files, allFiles) => {
    //     console.log(files.map(f => f.meta))
    //     allFiles.forEach(f => f.remove())
    // }

    handleSubmit = (e) => {
        e.preventDefault()
        // const ANIMAL_CREATE_URL = 'http://127.0.0.1:3000/animals/landing'
        const ANIMAL_CREATE_URL = 'https://dev.wildwish.org/animals/landing'
        const form = e.target
    
        axios.post(ANIMAL_CREATE_URL, 
            this.state.animalForm,
            {
                headers: { "Content-Type": "application/json", },
            }
        )
        .then(resp => console.log(resp))
        .then(() => navigate(form.getAttribute('action')))
        .catch((error) => alert(error))

    }

    deleteObject = (type, ix, iy) => e => {
        // type = 'string'
        // ix = int // index of first object
        // iy = int // index of object within ix
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
    
    addObject = (type, i) => e => {
        // type = 'string' // 'animal' or 'toy'
        // i = int // if provided, is the index of the object that new object will be appended to
        e.preventDefault()
        const animalForm = this.state.animalForm

        if (type === 'animal') {
            const object = {
                name: '',
                species: '',
                dob: '',
                bio: '',
                images: [],
                toys: [ {url: ''}, {url: ''}, {url: ''} ],
            }
            animalForm.animals = this.state.animalForm.animals.concat(object)
        } else if (type === 'toy') {
            const object = {
                url: ''
            }
            animalForm.animals[i].toys = this.state.animalForm.animals[i].toys.concat(object)
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

        // ix = int // Index of first nested object
        // iy = int // Index of nested object inside ix

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
        } else if (type === 'zoo'){
            animalForm.zoo = object
        }

        this.setState({
          animalForm : animalForm
        });
    }
   
    // getUploadParams and handleChangeStatus from react-dropzone-uploader API
    getUploadParams = (file) => { 
        const IMG_CREATE_URL = 'https://dev.wildwish.org/images/landing'
        // const IMG_CREATE_URL = 'http://127.0.0.1:3000/images/landing'

        file.meta.uuid = uuidv4()
        const fields = { 
            upload: file,
            uuid: file.meta.uuid, 
        }
        
        return { url: IMG_CREATE_URL, fields: fields} 
    }

    // called every time a dropzone file's `status` changes
    handleChangeStatus = (file, status, fileList, i) => { 
        const animalForm = this.state.animalForm
        
        if (status === 'done') {
            // add image uuid (set in getUploadParams) to form's state
            animalForm.animals[i].images.push({uuid: file.meta.uuid})
        } else if (status === 'removed') {
            // Will need to send a DELETE request with image uuid

            let imgIndex = animalForm.animals[i].images.indexOf(file)

            // New array with image object sliced out
            let newArray = [
                ...animalForm.animals[i].images.slice(0, imgIndex),
                ...animalForm.animals[i].images.slice(imgIndex + 1)
            ]

            animalForm.animals[i].images = newArray
        }

        this.setState({
            animalForm : animalForm
        })

        // Returning this ensures that file meta is set (uuid added earlier in lifecycle)
        return file.meta
    }
    
    renderAnimalInputs() {
        // map through 'animals' object in state, then render inputs for each field
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
                            return (
                                <div className="mt-4 mb-4 p-4" key={ix}>
                                <label className="block mb-2 text-xs font-bold uppercase">Toys</label>
                                {v.map( (e, idx) => {
                                    return Object.entries(e).map( ([k, v], iy) => {
                                        return (
                                        <div className="ml-4" key={iy}>
                                        
                                        <label
                                        className="block mb-2 text-xs font-bold uppercase"
                                        htmlFor={k}
                                        >
                                            Toy {idx + 1} URL
                                        </label>
                                        <button onClick={this.deleteObject('toy', i, idx)}>X</button>
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
                                })}
                                <button onClick={this.addObject('toy', i)}>Add Toy</button>
                                </div>
                            )
                        } else if (k === 'images') {
                            return (
                                <div key={ix}>
                                {/* EACH ANIMAL HAS DROPZONE FOR PICTURES; AUTOMATIC UPLOADS */}
                                <label className="block mb-2 text-xs font-bold uppercase">Pictures</label>
                                <Dropzone
                                    getUploadParams={this.getUploadParams}
                                    onChangeStatus={(file, status, fileList) => this.handleChangeStatus(file, status, fileList, i)}
                                    // onSubmit={this.handleDropSubmit}
                                    inputContent="Drag Files or Click to Upload"
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
                    encType="multipart/form-data"
                    className="mx-auto py-8 w-3/4 lg:w-1/2" 
                    name="signup"
                    method="post"
                    action="/thanks/"
                    data-netlify="true"
                    data-netlify-honeypot="bot-field"
                    onSubmit={this.handleSubmit}
                >

                {/* The `form-name` hidden field is required to support form submissions without JavaScript [Netlify] */}
                <input type="hidden" name="form-name" value="animal_signup" />
                <p hidden>
                    <label>
                        Don’t fill this out: <input name="bot-field" onChange={this.handleChange} />
                    </label>
                </p>

                <p className="mb-8 leading-loose">
                    Add your animals and their wishes to the pilot program
                </p>

                {/* The `form-name` hidden field is required to support form submissions without JavaScript [Netlify]*/}
                <input type="hidden" name="form-name" value="animal_signup"/>

                {/* BEGIN FORM INPUTS */}
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
                    placeholder=""
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
                    placeholder=""
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
                    placeholder=""
                    type="email"
                    onChange={ e => {this.handleInputChange(e, this.state.animalForm.user, 'user')} }
                />

                <label
                    className="block mb-2 text-xs font-bold uppercase"
                    htmlFor="name"
                >
                    Zoo Name
                </label>

                <input
                    className="w-full mb-6 form-input"
                    id="zoo_name"
                    name="name"
                    placeholder=""
                    type="text"
                    onChange={ e => {this.handleInputChange(e, this.state.animalForm.zoo, 'zoo')} }
                />

                <label
                    className="block mb-2 text-xs font-bold uppercase"
                    htmlFor="website"
                >
                    Website
                </label>
                
                <input
                    className="w-full mb-6 form-input"
                    id="website"
                    name="website"
                    placeholder=""
                    type="text"
                    onChange={ e => {this.handleInputChange(e, this.state.animalForm.zoo, 'zoo')} }
                />
            
                {/* RENDER DYNAMIC INPUTS */}
                {this.renderAnimalInputs()}

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
