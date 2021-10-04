import {useQuery, gql} from '@apollo/client';
import _ from "lodash";
import {useParams} from "react-router-dom";
import Chapters from '../Chapters'

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
            {!_.isEmpty(chapters) && <Chapters list={chapters}/>}
        </>
    );
};

export default Comic;