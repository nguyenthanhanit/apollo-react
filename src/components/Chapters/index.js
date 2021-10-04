import {Link} from "react-router-dom";
import _ from "lodash";

const render = (chapter) => {
    return (
        <tr key={chapter.id}>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {chapter.id}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {chapter.name}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                <Link to={`chapter/${chapter.id}`}
                      className='bg-blue-500 text-white px-3 py-2 rounded-md text-sm font-medium mr-1'>View</Link>
                <Link to={`chapter/${chapter.id}/edit`}
                      className='bg-blue-500 text-white px-3 py-2 rounded-md text-sm font-medium'>Edit</Link>
            </td>
        </tr>
    );
}

const Comics = (props) => {
    const chapters = props.list;

    return (
        <div className="flex flex-col">
            <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                    <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                            <tr>
                                <th scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Id
                                </th>
                                <th scope="col"
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Name
                                </th>
                                <th scope="col" className="relative px-6 py-3">
                                    <span className="sr-only">Action</span>
                                </th>
                            </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                            {
                                _.map(chapters, render)
                            }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Comics;