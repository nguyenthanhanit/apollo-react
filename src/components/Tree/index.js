import _ from "lodash";
import {gql, useQuery} from "@apollo/client";
import React from "react";
import {Link} from "react-router-dom";

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

    const renderRow = (data, level = 0) => {
        return _.map(data, function (value, name) {
            if (name === 'id' || name === '__typename') return;
            if (_.isArray(value)) {
                return renderRow(value, level + 1)
            }
            if (_.isObject(value)) {
                return renderRow(value, level)
            }
            return (
                <tr>
                    <td className={!level ? 'border-blue-500 border-b' : ''}>{!level ? data.name : ''} {level}</td>
                    <td className={level === 1 ? 'border-blue-500 border-b border-l' : ''}>{level === 1 ? data.name : ''} {level}</td>
                    <td className={level === 2 ? 'border-blue-500 border-b border-l' : ''}>{level === 2 ? data.name : ''} {level}</td>
                </tr>
            )
        })
    }

    return (
        <table className='w-full'>
            <tr>
                <th>Author</th>
                <th>Comic</th>
                <th>Chapter</th>
            </tr>
            {
                _.map(authors, function (author) {
                    return renderRow(author, 0)
                })
            }
        </table>
    )
}