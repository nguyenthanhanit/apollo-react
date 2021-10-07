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

    const renderBody = (data, index) => {
        return (
            <div className={_.size(data) > 1 ? 'border-blue-500 border-l-4' : ''}>
                {
                    _.map(data, function (value, name) {
                        if (name === 'id' || name === '__typename') return;
                        if (_.isArray(value)) {
                            return (
                                <div className='ml-20 relative'>
                                    {renderTable(value)}
                                </div>
                            )
                        }
                        return (
                            <div className='relative'>
                                <div className='absolute h-1 w-5 bg-blue-500 top-1/2'/>
                                <div className='absolute h-5 w-1 bg-blue-500'  style={{top: -4}}/>
                                <span className='ml-8'>{value}</span>
                            </div>
                        )
                    })
                }
            </div>
        )
    }

    const renderTable = data => {
        return (
            <div className='ml-8'>
                {
                    _.map(data, renderBody)
                }
            </div>
        )
    }

    return renderTable(authors)
}