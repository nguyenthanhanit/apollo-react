import React, {useState} from 'react';
import {gql, useMutation} from '@apollo/client';
import _ from "lodash";

const CREATE_DATA = gql`
    mutation CreateAuthorMutation($name: String!, $gender: Boolean!) {
        createAuthor(name: $name, gender: $gender) {
            id
            name
            gender
        }
    }
`;

const Author = (props) => {
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

    const save = event => {
        event.preventDefault();
        createAuthor({
                variables: dataForm
            }
        );
        if (_.isFunction(props.onClose)) {
            props.onClose();
        }
    }

    const onChange = (event) => {
        const target = event.target;
        let {name, value} = target;
        if (_.includes(['radio', 'select-one', 'checkbox'], target.type)) {
            if (value === 'true') {
                value = true
            } else if (value === 'false') {
                value = false
            } else if (!_.isNaN(parseInt(value))) {
                value = parseInt(value)
            }
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
        <>
            <form className='w-full' onSubmit={save}>
                <table className={`w-1/2 mx-auto ${width}`}>
                    <tbody>
                    <tr>
                        <td>Name</td>
                        <td>
                            <input type="text" name='name' className='border-2 h-10 w-full p-2'
                                   value={dataForm.name}
                                   onChange={onChange}/>
                        </td>
                    </tr>
                    <tr>
                        <td>Gender</td>
                        <td>
                            <div className='flex gap-2 w-full'>
                                <div className='flex-1' key='male'>
                                    <input type="radio" id='male' name='gender' value={true}
                                           onChange={onChange}/>
                                    <label htmlFor='male'>Male</label>
                                </div>
                                <div className='flex-1' key='female'>
                                    <input type="radio" id='female' name='gender' value={false}
                                           onChange={onChange}/>
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