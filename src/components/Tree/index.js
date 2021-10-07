import _ from "lodash";
import {gql, useQuery} from "@apollo/client";
import React from "react";

const GET_DATA = gql`
    query Query {
        getAuthors {
            id
            name
            comics {
                id
                name
                chapters {
                    id
                    name
                }
            }
        }
    }
`;

export default function Tree(props) {
    const authors = _.get(useQuery(GET_DATA), 'data.getAuthors', []);

    const renderBody = data => {
        return (
            <div>
                {
                    _.map(data, function (value, name) {
                        if (name === 'id' || name === '__typename') return;
                        if (_.isArray(value)) return <div className='ml-20'>{renderTable(value)}</div>
                        return <div>{value}</div>
                    })
                }
            </div>
        )
    }

    const renderTable = data => {
        return (
            <div>
                {
                    _.map(data, renderBody)
                }
            </div>
        )
    }

    return renderTable(authors)
}