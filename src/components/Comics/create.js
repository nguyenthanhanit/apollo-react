import React, {useState} from 'react';
import {useQuery, gql, useMutation} from '@apollo/client';
import _ from "lodash";

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

const Save = (event, updateComic, data) => {
    event.preventDefault();
    updateComic({
            variables: data
        }
    );
}

const Form = (props) => {
    const [updateComic] = useMutation(CREATE_DATA);
    const {getTypes, getAuthors, getCategories} = props;
    const [dataForm, setDataForm] = useState({
        name: '',
        author: _.parseInt(_.get(getAuthors, ['0', 'id'])),
        type: _.parseInt(_.get(getTypes, ['0', 'id'])),
        categories: []
    });

    const handleChange = (event) => {
        const target = event.target;
        let {name, value} = target;
        if (_.includes(['radio', 'select-one', 'checkbox'], target.type)) {
            value = parseInt(value)
        }

        if (_.isArray(dataForm[name])) {
            const cloneData = dataForm[name];
            if (target.checked) {
                cloneData.push(value)
            } else {
                _.remove(cloneData, function (o) {
                    return o === value;
                })
            }
            value = cloneData;
        }

        setDataForm({
            ...dataForm,
            ...{
                [name]: value
            }
        });
    }

    return (
        <form className='w-full' onSubmit={event => Save(event, updateComic, dataForm)}>
            <table className='w-1/2 mx-auto'>
                <tbody>
                <tr>
                    <td>Name</td>
                    <td>
                        <input type="text" name='name' className='border-2 h-10 w-full p-2'
                               value={dataForm.name}
                               onChange={handleChange}/>
                    </td>
                </tr>
                <tr>
                    <td>Author</td>
                    <td>
                        <select name="author" id="author" className='border-2 h-10 w-full p-2'
                                value={dataForm.author}
                                onChange={handleChange}>
                            {
                                getAuthors && _.map(getAuthors, function (author) {
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
                                getTypes && _.map(getTypes, function (type) {
                                    return <div className='flex-1' key={`type-${type.id}`}>
                                        <input type="radio" id={`type-${type.id}`} name='type' value={type.id}
                                               checked={dataForm.type === parseInt(type.id)}
                                               onChange={handleChange}/>
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
                                getCategories && _.map(getCategories, function (category) {
                                    return <div className='flex-1' key={`cat-${category.id}`}>
                                        <input type="checkbox" id={`cat-${category.id}`} name='categories'
                                               value={category.id}
                                               checked={dataForm.categories.includes(_.parseInt(category.id))}
                                               onChange={handleChange}/>
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

const Comic = () => {
    const {loading, data} = useQuery(GET_DATA);
    if (loading) {
        return <div>Loading</div>
    }
    return <Form {...data} />
}

export default Comic