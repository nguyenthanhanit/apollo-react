import {useQuery, gql} from '@apollo/client';
import _ from "lodash";
import {useParams} from "react-router-dom";
import Chapters from '../Chapters'
import React from "react";

const GET_DATA = gql`
    query Query($id: ID!) {
        getComic(id: $id) {
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

function Comic() {
    const {loading, data} = useQuery(GET_DATA, {
        variables: useParams()
    });
    const comic = _.get(data, 'getComic', []);
    if (loading) {
        return <div>Loading</div>
    }
    return (
        <>
            Name: {comic.name}
            <br/>
            Author: {comic.author.name}
            {!_.isEmpty(comic.chapters) && <Chapters list={comic.chapters}/>}
        </>
    );
}

export default Comic;