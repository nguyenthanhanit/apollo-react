import React from "react";
import List from "../../components/List";

export default function Chapters(props) {
    const chapters = props.list;
    const fields = ['name'];
    const model = 'Chapter';

    return <List data={chapters} model={model} fields={fields}/>
}