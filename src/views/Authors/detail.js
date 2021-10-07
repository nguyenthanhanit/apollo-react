import {useQuery, gql} from '@apollo/client';
import _ from "lodash";
import {useParams} from "react-router-dom";
import React from "react";

const GET_DATA = gql`
    query Query($id: ID!) {
        getAuthor(id: $id) {
            id
            name
            gender
        }
    }
`;

export default function Author() {
    const {loading, data} = useQuery(GET_DATA, {
        variables: useParams()
    });
    const author = _.get(data, 'getAuthor', []);
    if (loading) {
        return <div>Loading</div>
    }

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