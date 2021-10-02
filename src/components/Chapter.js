import {useQuery, gql} from '@apollo/client';
import _ from "lodash";
import {useParams} from "react-router-dom";

const buildQuery = (id) => {
    return gql`
        {
            getChapter(id: ${id}) {
                id
                name
                content
            }
        }
    `;
}

const Chapter = () => {
    const {id} = useParams();
    const chapter = _.get(useQuery(buildQuery(id)), 'data.getChapter', []);

    return (
        chapter && <div>
            Name: {chapter.name}
            <br/>
            {chapter.content}
        </div>
    );
};

export default Chapter;