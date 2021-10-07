import {useQuery, gql, useMutation} from '@apollo/client';
import _ from "lodash";
import React from "react";
import List from "../../components/List";

const GET_DATA = gql`
    {
        getAuthors {
            id
            name
            gender
        }
    }
`;

const DELETE_DATA = gql`
    mutation DeleteAuthorMutation($id: ID!) {
        deleteAuthor(id: $id)
    }
`;

export default function Authors() {
    const authors = _.get(useQuery(GET_DATA), 'data.getAuthors', []);
    const fields = ['name', 'gender'];
    const model = 'Author';
    const [deleteAuthor] = useMutation(DELETE_DATA, {
        refetchQueries: [
            GET_DATA,
            'getAuthors'
        ],
    });

    return <List data={authors} model={model} fields={fields} actionDelete={deleteAuthor}/>
};