import React, {useState} from 'react';
import {gql, useMutation} from '@apollo/client';
import _ from "lodash";
import {onChange, save} from "../../utils";

const CREATE_DATA = gql`
    mutation CreateAuthorMutation($name: String!, $gender: Boolean!) {
        createAuthor(name: $name, gender: $gender) {
            id
            name
            gender
        }
    }
`;

const Author = props => {
    const width = _.get(props, 'width', '');
    const [createAuthor] = useMutation(CREATE_DATA, {
        refetchQueries: [
            props.query, // DocumentNode object parsed with gql
            'getAuthors' // Query name
        ],
    });
    const [dataForm, setDataForm] = useState({
        name: '',
        gender: true
    });

    const handleSubmit = event => {
        save(event, createAuthor, dataForm)
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
                        <td>Gender</td>
                        <td>
                            <div className='flex gap-2 w-full'>
                                <div className='flex-1' key='male'>
                                    <input type="radio" id='male' name='gender' value={true}
                                           defaultChecked={dataForm.gender}
                                           onChange={handle}/>
                                    <label htmlFor='male'>Male</label>
                                </div>
                                <div className='flex-1' key='female'>
                                    <input type="radio" id='female' name='gender' value={false}
                                           onChange={handle}/>
                                    <label htmlFor='female'>Female</label>
                                </div>
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
        </>
    )
}

export default Author