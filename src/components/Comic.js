import {useQuery, gql} from '@apollo/client';
import _ from "lodash";
import {Link, useParams} from "react-router-dom";

const buildQuery = (id) => {
    return gql`
        {
            getComic(id: ${id}) {
                id
                name
                author {
                    name
                }
                chapters {
                    id
                    name
                }
            }
        }
    `;
}

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
                      className='mr-1 bg-blue-500 text-white px-3 py-2 rounded-md text-sm font-medium mr-1'>View</Link>
                <Link to={`chapter/edit/${chapter.id}`}
                      className='mr-1 bg-blue-500 text-white px-3 py-2 rounded-md text-sm font-medium mr-1'>Edit</Link>
            </td>
        </tr>
    );
}

const Comic = () => {
    const {id} = useParams();
    const comic = _.get(useQuery(buildQuery(id)), 'data.getComic', []);
    const {author = {}, chapters = {}} = comic;
    if (_.isEmpty(comic)) {
        return <></>;
    }

    return (
        <>
            Name: {comic.name}
            <br/>
            Author: {author.name}
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
        </>
    );
};

export default Comic;