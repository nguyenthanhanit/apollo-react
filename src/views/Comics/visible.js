import {useQuery, gql, useMutation} from '@apollo/client';
import _ from "lodash";
import React, {useEffect, useState} from "react";

const GET_DATA = gql`
    query Query {
        getComics {
            id
            name
            visible
        }
    }
`;

const UPDATE_DATA = gql`
    mutation UpdateVisibleComicMutation($publicComics: Array, $privateComics: Array) {
        updateVisibleComic(PublicComics: $publicComics, PrivateComics: $privateComics)
    }
`;

export default function Comics() {
    const comics = _.get(useQuery(GET_DATA), 'data.getComics', []);
    const originPublicComics = _.filter(comics, ['visible', true]);
    const originPrivateComics = _.filter(comics, ['visible', false]);
    const [updateVisibleComic] = useMutation(UPDATE_DATA, {
        refetchQueries: [
            GET_DATA, // DocumentNode object parsed with gql
            'getComics' // Query name
        ],
    });
    const [publicComics, setPublicComics] = useState(originPublicComics);
    const [privateComics, setPrivateComics] = useState(originPrivateComics);
    const [lockTable, setLockTable] = useState(null);

    useEffect(() => {
        if (!_.isEmpty(comics)) {
            setPublicComics(originPublicComics);
            setPrivateComics(originPrivateComics);
        }
    }, [comics]);

    const move = all => {
        if (_.isNull(lockTable) && !all) return;
        let data = _.cloneDeep(publicComics);
        if (lockTable || all === 'right') {
            data = _.cloneDeep(privateComics);
        }
        let selected;
        if (all) {
            selected = data;
        } else {
            selected = _.filter(data, ['selected', true]);
        }
        if (_.isEmpty(selected)) return;
        let visible;
        if (_.isNull(lockTable)) {
            visible = all === 'right';
        }
        _.each(selected, function (d) {
            _.set(d, 'selected', false);
            _.set(d, 'visible', _.isUndefined(visible) ? lockTable : visible);
        })
        const restData = _.difference(data, selected);
        setLockTable(null)
        if (lockTable || all === 'right') {
            setPublicComics([...publicComics, ...selected]);
            setPrivateComics(restData);
            return;
        }
        setPrivateComics([...privateComics, ...selected]);
        setPublicComics(restData);
    }

    const select = (index, type = 0) => {
        let data = _.cloneDeep(privateComics);
        if (type) {
            data = _.cloneDeep(publicComics);
        }
        const visible = _.get(data, [index, 'selected'], false);
        _.set(data, [index, 'selected'], !visible);
        handleLockTable(data, type)
        if (type) {
            setPublicComics(data);
            return;
        }
        setPrivateComics(data)
    }

    const handleLockTable = (data, type) => {
        if (_.findIndex(data, ['selected', true]) > -1) {
            setLockTable(!type)
            return;
        }
        setLockTable(null)
    }

    const save = () => {
        const diffPublic = _.differenceBy(privateComics, originPrivateComics, 'id');
        const diffPrivate = _.differenceBy(publicComics, originPublicComics, 'id');
        const variables = {};
        if (!_.isEmpty(diffPublic)) {
            variables.privateComics = _.map(diffPublic, 'id');
        }
        if (!_.isEmpty(diffPrivate)) {
            variables.publicComics = _.map(diffPrivate, 'id');
        }
        updateVisibleComic({
            variables: variables
        })
    }

    return (
        <div className='flex w-full'>
            <div className='flex-1'>
                <table className="mx-auto border-separate border border-blue-800 w-full">
                    <caption className='font-bold'>Public</caption>
                    <tbody>
                    {
                        _.map(publicComics, function (comic, index) {
                            let classStyle = 'cursor-pointer';
                            if (comic.selected) {
                                classStyle += ' bg-blue-500 text-white'
                            } else {
                                classStyle += ' bg-white text-black hover:bg-blue-500 hover:text-white'
                            }
                            if (lockTable) {
                                classStyle += ' opacity-75 pointer-events-none'
                            }
                            return (
                                <tr key={comic.id} onClick={() => select(index, 1)}
                                    className={classStyle}>
                                    <td className="border border-blue-600 text-center">{comic.name}</td>
                                </tr>
                            )
                        })
                    }
                    {
                        _.isEmpty(publicComics) && <tr>
                            <td className='text-center bg-red-500'>Empty</td>
                        </tr>
                    }
                    </tbody>
                </table>
            </div>
            <div className='flex-1 pt-10 space-y-2'>
                <div className='flex justify-center'>
                    <button type='button'
                            onClick={() => save()}
                            className='bg-blue-500 text-white px-3 py-2 rounded-md font-medium'>Save
                    </button>
                </div>
                <svg xmlns="http://www.w3.org/2000/svg"
                     className={`h-6 w-6 mx-auto bg-blue-500 text-white rounded cursor-pointer ${!_.isNull(lockTable) && !lockTable ? 'opacity-75 pointer-events-none' : ''}`}
                     onClick={() => move()}
                     fill="none" viewBox="0 0 24 24"
                     stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"/>
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg"
                     className={`h-6 w-6 mx-auto bg-blue-500 text-white rounded cursor-pointer ${!_.isNull(lockTable) && !lockTable ? 'opacity-75 pointer-events-none' : ''}`}
                     fill="none" viewBox="0 0 24 24" onClick={() => move('right')}
                     stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                          d="M11 19l-7-7 7-7m8 14l-7-7 7-7"/>
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg"
                     className={`h-6 w-6 mx-auto bg-blue-500 text-white rounded cursor-pointer ${lockTable ? 'opacity-75 pointer-events-none' : ''}`}
                     onClick={() => move()}
                     fill="none" viewBox="0 0 24 24"
                     stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/>
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg"
                     className={`h-6 w-6 mx-auto bg-blue-500 text-white rounded cursor-pointer ${lockTable ? 'opacity-75 pointer-events-none' : ''}`}
                     onClick={() => move('left')}
                     fill="none" viewBox="0 0 24 24"
                     stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                          d="M13 5l7 7-7 7M5 5l7 7-7 7"/>
                </svg>
            </div>
            <div className='flex-1'>
                <table className="mx-auto border-separate border border-blue-800 w-full">
                    <caption className='font-bold'>Private</caption>
                    <tbody>
                    {
                        _.map(privateComics, function (comic, index) {
                            let classStyle = 'cursor-pointer';
                            if (comic.selected) {
                                classStyle += ' bg-blue-500 text-white'
                            } else {
                                classStyle += ' bg-white text-black hover:bg-blue-500 hover:text-white'
                            }
                            if (!_.isNull(lockTable) && !lockTable) {
                                classStyle += ' opacity-75 pointer-events-none'
                            }
                            return (
                                <tr key={comic.id} onClick={() => select(index)}
                                    className={classStyle}>
                                    <td className="border border-blue-600 text-center">{comic.name}</td>
                                </tr>
                            )
                        })
                    }
                    {
                        _.isEmpty(privateComics) && <tr>
                            <td className='text-center bg-red-500'>Empty</td>
                        </tr>
                    }
                    </tbody>
                </table>
            </div>
        </div>
    )
};