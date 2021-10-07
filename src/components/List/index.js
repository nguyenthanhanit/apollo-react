import _ from "lodash";
import {Link} from "react-router-dom";
import {save} from "../../utils";

export default function List(props) {
    const {model, data, fields, actionDelete} = props;

    const renderHeader = field => {
        return (
            <>
                <th scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {_.head(_.split(field, '.'))}
                </th>
            </>
        )
    }

    const renderBody = data => {
        return (
            <tr key={data.id}>
                {
                    _.map(fields, function (field) {
                        return (
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {_.get(data, field)}
                            </td>
                        )
                    })
                }
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className='float-right'>
                        <Link to={`${model}/${data.id}`}
                              className='bg-blue-500 text-white px-3 py-2 rounded-md text-sm font-medium mr-1'>View</Link>
                        <Link to={`${model}/${data.id}/edit`}
                              className='bg-green-500 text-white px-3 py-2 rounded-md text-sm font-medium mr-1'>Edit</Link>
                        {
                            _.isFunction(actionDelete) && <button
                                type="button"
                                className="bg-red-500 text-white px-3 py-2 rounded-md text-sm font-medium"
                                onClick={(event) => save(event, actionDelete, {id: data.id})}
                            >
                                Delete
                            </button>
                        }
                    </div>
                </td>
            </tr>
        );
    }

    return (
        <div>
            <Link to={`${model}/create`}
                  className='bg-blue-500 text-white px-3 py-2 rounded-md text-sm font-medium mr-1'>Create</Link>
            <div className="flex flex-col mt-5">
                <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                        <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                            <table className="min-w-full divide-y divide-gray-200">
                                <caption>{model}</caption>
                                <thead className="bg-gray-50">
                                <tr>
                                    {
                                        _.map(fields, renderHeader)
                                    }
                                    <th scope="col" className="relative px-6 py-3">
                                        <span className="sr-only">Action</span>
                                    </th>
                                </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                {
                                    _.map(data, renderBody)
                                }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}