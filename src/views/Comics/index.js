import {useQuery, gql, useMutation} from '@apollo/client';
import _ from "lodash";
import React from "react";
import List from "../../components/List";

const GET_DATA = gql`
    query Query {
        getComics {
            id
            name
            author {
                name
            }
        }
    }
`;

const DELETE_DATA = gql`
    mutation DeleteComicMutation($id: ID!) {
        deleteComic(id: $id)
    }
`;

export default function Comics() {
    const authors = _.get(useQuery(GET_DATA), 'data.getComics', []);
    const fields = ['name', 'author.name'];
    const model = 'Comic';
    const [deleteAuthor] = useMutation(DELETE_DATA, {
        refetchQueries: [
            GET_DATA,
            'getComics'
        ],
    });

    return <List data={authors} model={model} fields={fields} actionDelete={deleteAuthor}/>
};