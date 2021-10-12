import React from "react";
import _ from "lodash";

export default function Form(props) {
    const fields = _.get(props, 'fields');
    const actions = _.get(props, 'actions');
    const formData = _.get(props, 'formData');

    const handleSubmit = event => {
        event.preventDefault();
        actions.save()
    }

    const handleChange = event => {
        const target = event.target;
        const {name, value} = target;
        actions.changeDataForm({
            [name]: value
        })
    }

    return (
        <form className='w-full' onSubmit={handleSubmit}>
            <table className='w-1/2 mx-auto'>
                <tbody>
                {
                    _.map(fields, function (type, field) {
                        switch (type) {
                            case 'String':
                                return (
                                    <tr>
                                        <td className='uppercase'>{field}</td>
                                        <td>
                                            <input type="text" name='name' className='border-2 h-10 w-full p-2'
                                                   value={formData[field]}
                                                   onChange={handleChange}/>
                                        </td>
                                    </tr>
                                )
                            case 'Boolean':
                                return (
                                    <tr>
                                        <td className='uppercase'>{field}</td>
                                        <td>
                                            <div className='flex gap-2 w-full'>
                                                <div className='flex-1' key='male'>
                                                    <input type="radio" id='male' name='gender' value={true}
                                                           onChange={handleChange}/>
                                                    <label htmlFor='male'>Male</label>
                                                </div>
                                                <div className='flex-1' key='female'>
                                                    <input type="radio" id='female' name='gender' value={false}
                                                           onChange={handleChange}/>
                                                    <label htmlFor='female'>Female</label>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                )
                            default:
                                return <></>
                        }
                    })
                }
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