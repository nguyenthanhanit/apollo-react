import {useQuery, gql, useMutation} from '@apollo/client';
import _ from "lodash";
import {useParams} from "react-router-dom";
import React, {useState} from 'react';

const buildQuery = (id) => {
    return gql`
        {
            getComic(id: ${id}) {
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
            getCategories {
                id
                name
            }
            getTypes {
                id
                name
            }
            getAuthors {
                id
                name
            }
        }
    `;
}

const UPDATE_COMIC = gql`
    mutation UpdateComicMutation($id: ID!, $name: String) {
        updateComic(id: $id, name: $name) {
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
    }
`;

const Form = (props) => {
    const [dataForm, setDataForm] = useState({
        id: _.get(props, 'getComic.id'),
        name: _.get(props, 'getComic.name'),
        author: _.get(props, 'getComic.author.id'),
        type: _.get(props, 'getComic.type.id'),
        categories: _.get(props, 'getComic.type.id'),
    });
    const types = _.get(props, 'getTypes');
    const authors = _.get(props, 'getAuthors');
    const [updateComic, {data, loading, error}] = useMutation(UPDATE_COMIC);

    return (
        <form className='w-full' onSubmit={
            event => {
                event.preventDefault();
                updateComic({
                        variables: dataForm
                    }
                );
            }}>
            <table className='w-1/2 mx-auto'>
                <tbody>
                <tr>
                    <td>Name</td>
                    <td>
                        <input type="text" name='name' className='border-2 h-10 w-full p-2'
                               value={dataForm.name}
                               onChange={(e) => setDataForm({...dataForm, ...{name: e.target.value}})}/>
                    </td>
                </tr>
                <tr>
                    <td>Author</td>
                    <td>
                        <select name="author" id="author" className='border-2 h-10 w-full p-2'
                                value={dataForm.author}
                                onChange={(e) => setDataForm({...dataForm, ...{author: e.target.value}})}>
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
                                               checked={dataForm.type === type.id}
                                               onChange={(e) => setDataForm({...dataForm, ...{type: e.target.value}})}/>
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
    )
}

const Comic = () => {
    const {id} = useParams();
    const {data = {}} = useQuery(buildQuery(id));
    if (_.isEmpty(data)) {
        return <></>
    }
    return <Form {...data} />
}

export default Comic