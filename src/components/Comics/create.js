import React, {Fragment, useRef, useState} from 'react';
import {Dialog, Transition} from '@headlessui/react'
import {useQuery, gql, useMutation} from '@apollo/client';
import _ from "lodash";
import CreateAuthor from '../Authors/create';
import CreateCategory from '../Categories/create';
import {onChange, save} from "../../utils";

const GET_DATA = gql`
    query Query {
        getAuthors {
            id
            name
        }
        getTypes {
            id
            name
        }
        getCategories {
            id
            name
        }
    }
`;

const CREATE_DATA = gql`
    mutation CreateComicMutation($name: String!, $author: Int!, $type: Int!, $categories: Array) {
        createComic(name: $name, authorId: $author, typeId: $type, categories: $categories) {
            id
            name
            author {
                id
            }
            categories {
                id
            }
            type {
                id
            }
        }
    }
`;

const GET_ALL_DATA = gql`
    query Query {
        getComics {
            id
            name
            author {
                name
            }
        }
    }
`;

const Form = props => {
    const [createComic] = useMutation(CREATE_DATA, {
        refetchQueries: [
            GET_ALL_DATA, // DocumentNode object parsed with gql
            'getComics' // Query name
        ],
    });
    let {getTypes, getAuthors, getCategories} = props;
    const [open, setOpen] = useState(false);
    const [modelModal, setModelModal] = useState('');
    const cancelButtonRef = useRef(null);
    const [dataForm, setDataForm] = useState({
        name: '',
        author: _.parseInt(_.get(getAuthors, ['0', 'id'])),
        type: _.parseInt(_.get(getTypes, ['0', 'id'])),
        categories: []
    });

    const handleSubmit = event => {
        save(event, createComic, dataForm)
    }

    const handleModal = event => {
        if (!open) setModelModal(event.target.id)
        setOpen(!open)
    }

    const handle = event => {
        onChange(event, setDataForm, dataForm)
    }

    const modal = (
        <Transition.Root show={open} as={Fragment}>
            <Dialog as="div" className="fixed z-10 inset-0 overflow-y-auto" initialFocus={cancelButtonRef}
                    onClose={setOpen}>
                <div
                    className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"/>
                    </Transition.Child>

                    <span className="hidden sm:inline-block sm:align-middle sm:h-screen"
                          aria-hidden="true">&#8203;</span>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        enterTo="opacity-100 translate-y-0 sm:scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                        leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    >
                        <div
                            className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                    <Dialog.Title as="h3"
                                                  className="text-lg leading-6 font-medium text-gray-900">
                                        Add {modelModal}
                                    </Dialog.Title>
                                    <div className="mt-2 mb-16">
                                        {
                                            modelModal === 'Author' &&
                                            <CreateAuthor width='w-full' onClose={handleModal} query={GET_DATA}/>
                                        }
                                        {
                                            modelModal === 'Category' &&
                                            <CreateCategory width='w-full' onClose={handleModal} query={GET_DATA}/>
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition.Root>
    )

    return (
        <>
            <form className='w-full' onSubmit={handleSubmit}>
                <table className='w-1/2 mx-auto'>
                    <tbody>
                    <tr>
                        <td>Name</td>
                        <td>
                            <input type="text" name='name' className='border-2 h-10 w-full p-2'
                                   value={dataForm.name}
                                   onChange={handle}/>
                        </td>
                    </tr>
                    <tr>
                        <td>Author</td>
                        <td>
                            <select name="author" id="author" className='border-2 h-10 w-full p-2'
                                    value={dataForm.author}
                                    onChange={handle}>
                                {
                                    getAuthors && _.map(getAuthors, function (author) {
                                        return <option key={author.id} value={author.id}>{author.name}</option>
                                    })
                                }
                            </select>
                        </td>
                        <td>
                            <button
                                type="button"
                                id='Author'
                                className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-blue-500 text-base font-medium text-white sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                                onClick={handleModal}
                            >
                                Add
                            </button>
                        </td>
                    </tr>
                    <tr>
                        <td>Categories</td>
                        <td>
                            <div className='flex gap-2 w-full'>
                                {
                                    getCategories && _.map(getCategories, function (category) {
                                        return <div className='flex-1' key={`cat-${category.id}`}>
                                            <input type="checkbox" id={`cat-${category.id}`} name='categories'
                                                   value={category.id}
                                                   checked={dataForm.categories.includes(_.parseInt(category.id))}
                                                   onChange={handle}/>
                                            <label htmlFor={`cat-${category.id}`}>{category.name}</label>
                                        </div>
                                    })
                                }
                            </div>
                        </td>
                        <td>
                            <button
                                type="button"
                                id='Category'
                                className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-blue-500 text-base font-medium text-white sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                                onClick={handleModal}
                            >
                                Add
                            </button>
                        </td>
                    </tr>
                    <tr>
                        <td>Type</td>
                        <td>
                            <div className='flex gap-2 w-full'>
                                {
                                    getTypes && _.map(getTypes, function (type) {
                                        return <div className='flex-1' key={`type-${type.id}`}>
                                            <input type="radio" id={`type-${type.id}`} name='type' value={type.id}
                                                   checked={dataForm.type === parseInt(type.id)}
                                                   onChange={handle}/>
                                            <label htmlFor={`type-${type.id}`}>{type.name}</label>
                                        </div>
                                    })
                                }
                            </div>
                        </td>
                    </tr>
                    </tbody>
                </table>
                <div className='w-1/2 mt-2'>
                    <button type='submit'
                            className='float-right bg-blue-500 text-white px-3 py-2 rounded-md font-medium'>Save
                    </button>
                </div>
            </form>
            {!_.isEmpty(modelModal) && modal}
        </>
    )
}

function Comic() {
    const {loading, data} = useQuery(GET_DATA);
    if (loading) {
        return <div>Loading</div>
    }
    return <Form {...data} />
}

export default Comic