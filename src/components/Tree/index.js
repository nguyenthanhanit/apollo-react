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

export default function Tree() {
    const authors = _.get(useQuery(GET_DATA), 'data.getAuthors', []);
    const columns = ['Authors', 'Comics', 'Chapters'];

    const renderHeader = (column) => {
        return (
            <th>{column}</th>
        )
    }

    const renderRow = (data, path, level = 0) => {
        return _.map(data, function (value, name) {
            if (name === 'id' || name === '__typename') return;
            const newPath = [...path, name];
            if (_.isArray(value)) {
                return renderRow(value, newPath, level + 1)
            }
            if (_.isObject(value)) {
                return renderRow(value, newPath, level)
            }
            const typename = _.get(authors, [...path, '__typename']);
            const id = _.get(authors, [...path, 'id']);
            return (
                <tr>
                    <td className={!level ? 'border-blue-500 border-b' : ''}>
                        {
                            !level &&
                            <Link to={`${typename}/${id}`}>{data.name}</Link>
                        }
                    </td>
                    <td className={level === 1 ? 'border-blue-500 border-b border-l' : ''}>
                        {
                            level === 1 &&
                            <Link to={`${typename}/${id}`}>{data.name}</Link>
                        }
                    </td>
                    <td className={level === 2 ? 'border-blue-500 border-b border-l' : ''}>
                        {
                            level === 2 &&
                            <Link to={`${typename}/${id}`}>{data.name}</Link>
                        }
                    </td>
                </tr>
            )
        })
    }

    return (
        <table className='w-full'>
            <tr>
                {
                    _.map(columns, renderHeader)
                }
            </tr>
            {
                _.map(authors, function (author, index) {
                    return renderRow(author, [index])
                })
            }
        </table>
    )
}