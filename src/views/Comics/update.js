import {useQuery, gql, useMutation} from '@apollo/client';
import _ from "lodash";
import {useParams} from "react-router-dom";
import React, {useState} from 'react';
import {onChange, save} from "../../utils";

const GET_DATA = gql`
    query Query($id: ID!) {
        getComic(id: $id) {
            id
            name
            author {
                id
            }
            type {
                id
            }
            categories {
                id
            }
        }
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

const UPDATE_DATA = gql`
    mutation UpdateComicMutation($id: ID!, $name: String, $author: Int, $type: Int, $categories: Array) {
        updateComic(id: $id, name: $name, authorId: $author, typeId: $type, categories: $categories) {
            id
            name
            type {
                id
            }
            author {
                id
            }
            categories {
                id
            }
        }
    }
`;

const Form = props => {
    const [updateComic] = useMutation(UPDATE_DATA);
    const types = _.get(props, 'getTypes');
    const authors = _.get(props, 'getAuthors');
    const categories = _.get(props, 'getCategories');
    const [dataForm, setDataForm] = useState({
        id: _.get(props, 'getComic.id'),
        name: _.get(props, 'getComic.name'),
        author: parseInt(_.get(props, 'getComic.author.id')),
        type: parseInt(_.get(props, 'getComic.type.id')),
        categories: _.map(_.map(props.getComic.categories, 'id'), _.parseInt)
    });

    const handleSubmit = event => {
        save(event, updateComic, dataForm)
    }

    const handle = event => {
        onChange(event, setDataForm, dataForm)
    }

    return (
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
                                authors && _.map(authors, function (author) {
                                    return <option key={author.id} value={author.id}>{author.name}</option>
                                })
                            }
                        </select>
                    </td>
                </tr>
                <tr>
                    <td>Type</td>
                    <td>
                        <div className='flex gap-2 w-full'>
                            {
                                types && _.map(types, function (type) {
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
                <tr>
                    <td>Categories</td>
                    <td>
                        <div className='flex gap-2 w-full'>
                            {
                                categories && _.map(categories, function (category) {
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
                </tr>
                </tbody>
            </table>
            <div className='w-1/2 mt-2'>
                <button type='submit'
                        className='float-right bg-blue-500 text-white px-3 py-2 rounded-md font-medium'>Save
                </button>
            </div>
        </form>
    )
}

export default function Comic() {
    const {loading, data} = useQuery(GET_DATA, {
        variables: useParams()
    });
    if (loading) {
        return <div>Loading</div>
    }
    return <Form {...data} />
}