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
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500 inline-block cursor-pointer"
                             viewBox="0 0 20 20"
                             onClick={(event) => save(event, actionDelete, {id: data.id})}
                             fill="currentColor">
                            <path fillRule="evenodd"
                                  d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                                  clipRule="evenodd"/>
                        </svg>
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