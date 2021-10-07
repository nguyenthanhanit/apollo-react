import React, {useState} from 'react';
import {gql, useMutation} from '@apollo/client';
import _ from "lodash";
import {onChange, save} from "../../utils";

const CREATE_DATA = gql`
    mutation CreateCategoryMutation($name: String!, $description: String!) {
        createCategory(name: $name, description: $description) {
            id
            name
        }
    }
`;

export default function Category(props) {
    const width = _.get(props, 'width', '');
    const [createCategory] = useMutation(CREATE_DATA, {
        refetchQueries: [
            props.query, // DocumentNode object parsed with gql
            'getCategorys' // Query name
        ],
    });
    const [dataForm, setDataForm] = useState({
        name: '',
        description: ''
    });

    const handleSubmit = event => {
        save(event, createCategory, dataForm)
        if (_.isFunction(props.onClose)) {
            props.onClose();
        }
    }

    const handle = event => {
        onChange(event, setDataForm, dataForm)
    }

    return (
        <>
            <form className='w-full' onSubmit={handleSubmit}>
                <table className={`w-1/2 mx-auto ${width}`}>
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
                        <td>Description</td>
                        <td>
                            <textarea name="description" id="description" className='border-2 w-full p-2' cols="30"
                                      rows="10"
                                      value={dataForm.description} onChange={handle}/>
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
        </>
    )
}