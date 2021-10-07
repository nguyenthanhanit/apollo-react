import {useQuery, gql, useMutation} from '@apollo/client';
import _ from "lodash";
import React from "react";
import List from "../../components/List";

const GET_DATA = gql`
    query Query {
        getCategories {
            id
            name
        }
    }

`;

const DELETE_DATA = gql`
    mutation DeleteCategoryMutation($id: ID!) {
        deleteCategory(id: $id)
    }
`;

export default function Categories() {
    const authors = _.get(useQuery(GET_DATA), 'data.getCategories', []);
    const fields = ['name'];
    const model = 'Category';
    const [deleteCategory] = useMutation(DELETE_DATA, {
        refetchQueries: [
            GET_DATA,
            'getCategories'
        ],
    });

    return <List data={authors} model={model} fields={fields} actionDelete={deleteCategory}/>
};