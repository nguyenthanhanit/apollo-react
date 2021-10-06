import {useQuery, gql} from '@apollo/client';
import _ from "lodash";
import {useParams} from "react-router-dom";
import React from "react";

const GET_DATA = gql`
    query Query($id: ID!) {
        getCategory(id: $id) {
            name
            description
        }
    }
`;

function Category() {
    const {loading, data} = useQuery(GET_DATA, {
        variables: useParams()
    });
    const category = _.get(data, 'getCategory', []);
    if (loading) {
        return <div>Loading</div>
    }

    return <div>
        {!_.isEmpty(category) &&
        <h2>
            Name: {category.name}
            <br/>
            Description: {category.description}
        </h2>
        }
    </div>
}

export default Category