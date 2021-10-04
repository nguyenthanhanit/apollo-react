import {useQuery, gql} from '@apollo/client';
import _ from "lodash";
import {useParams} from "react-router-dom";
import React, {useState} from 'react';
import {data} from "autoprefixer";

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

const save = (event) => {
    event.preventDefault();
}

const Comic = () => {
    const {id} = useParams();
    const {data = {}} = useQuery(buildQuery(id));
    const comic = _.get(data, 'getComic');
    const types = _.get(data, 'getTypes');
    const authors = _.get(data, 'getAuthors');
    const [dataForm, setDataForm] = useState();
    if (_.isEmpty(comic)) {
        return <></>
    }
    return (
        <form onSubmit={save}>
            <table className='w-full'>
                <tbody>
                <tr>
                    <td>Name</td>
                    <td>
                        <input type="text" name='name' className='border-2 h-10 w-1/2'
                               value={dataForm ? dataForm.name : comic.name}
                               onChange={(e) => setDataForm({...dataForm, ...{name: e.target.value}})}/>
                    </td>
                </tr>
                <tr>
                    <td>Author</td>
                    <td>
                        <select name="author" id="author" className='border-2 h-10 w-1/2'
                                value={dataForm ? dataForm.author : comic.author.id}
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
                        <div className='flex gap-2 w-1/2'>
                            {
                                types && _.map(types, function (type) {
                                    return <div className='flex-1' key={`type-${type.id}`}>
                                        <input type="radio" id={`type-${type.id}`} name='type' value={type.id}
                                               checked={(dataForm ? dataForm.type : comic.type.id) === type.id}
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
            <button type='submit' className='float-right bg-blue-500 text-white px-3 py-2 rounded-md font-medium'>Save
            </button>
        </form>
    )
}

export default Comic