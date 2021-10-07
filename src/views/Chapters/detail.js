import {useQuery, gql} from '@apollo/client';
import _ from "lodash";
import {useParams} from "react-router-dom";
import React from "react";

const GET_DATA = gql`
    query Query($id: ID!) {
        getChapter(id: $id) {
            name
            content
        }
    }
`;

export default function Chapter() {
    const {loading, data} = useQuery(GET_DATA, {
        variables: useParams()
    });
    const chapter = _.get(data, 'getChapter', []);
    if (loading) {
        return <div>Loading</div>
    }

    return <div>
        {!_.isEmpty(chapter) &&
        <h2>
            Name: {chapter.name}
            <br/>
            {chapter.content}
        </h2>
        }
    </div>
}