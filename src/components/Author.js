import {useQuery, gql} from '@apollo/client';
import _ from "lodash";
import {useParams} from "react-router-dom";

const buildQuery = (id) => {
    return gql`
        {
            getAuthor(id: ${id}) {
                id
                name
                email
                password
            }
        }
    `;
}

const Author = () => {
    const {id} = useParams();
    const author = _.get(useQuery(buildQuery(id)), 'data.getAuthor', []);

    return <form action="#" method='POST'>
        <table className='w-full'>
            <tbody>
            <tr>
                <td>Name</td>
                <td>
                    <input type="text"
                           className='border border-emerald-300 focus:border-emerald-500 bg-white text-green-900 appearance-none inline-block w-full focus:text-red-600 rounded py-3 px-4 focus:outline-none'
                           value={author.name} readOnly={true}/>
                </td>
            </tr>
            <tr>
                <td>Email</td>
                <td>
                    <input type="email"
                           className='border border-emerald-300 focus:border-emerald-500 bg-white text-green-900 appearance-none inline-block w-full focus:text-red-600 rounded py-3 px-4 focus:outline-none'
                           value={author.email} readOnly={true}/>
                </td>
            </tr>
            <tr>
                <td>Password</td>
                <td>
                    <input type="password"
                           className='border border-emerald-300 focus:border-emerald-500 bg-white text-green-900 appearance-none inline-block w-full focus:text-red-600 rounded py-3 px-4 focus:outline-none'
                           value={author.password} readOnly={true}/>
                </td>
            </tr>
            </tbody>
        </table>
    </form>
}

export default Author