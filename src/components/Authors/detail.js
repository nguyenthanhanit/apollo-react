import {useQuery, gql} from '@apollo/client';
import _ from "lodash";
import {useParams} from "react-router-dom";

const buildQuery = (id) => {
    return gql`
        {
            getAuthor(id: ${id}) {
                id
                name
                gender
            }
        }
    `;
}

const Author = () => {
    const {id} = useParams();
    const author = _.get(useQuery(buildQuery(id)), 'data.getAuthor', []);

    return <div>
        {!_.isEmpty(author) &&
        <h2>
            Name: {author.name}
            <br/>
            Gender: {author.gender ? 'Male' : 'Female'}
        </h2>
        }
    </div>
}

export default Author