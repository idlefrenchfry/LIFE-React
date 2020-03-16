import React, { useState, useEffect } from 'react';

function Table(props) {

    const [headers, setHeaders] = useState([]);
    const [list, setList] = useState([{}]);

    useEffect(() => {
        setHeaders(props.headers);
        setList(props.list);
    });

    const mapData = (data, index) => {
        return (
            <tr key={index}>
                {headers.map((headName, key) =>
                    <td key={key}>{data[headName]}</td>
                )}
            </tr>
        );
    }

    return (
        <table id="datatable">
            <thead>
                <tr>
                    {headers.map((headName, index) => <th key={index}>{headName}</th>)}
                </tr>
            </thead>

            <tbody>
                {list.map((data, index) => mapData(data, index) )}
            </tbody>
        </table>
    );
}

export default Table;
