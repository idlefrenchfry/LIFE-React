import React, { useState, useEffect, useMemo } from 'react';
import { useTable } from 'react-table';

function Table({ data, columns }) {

    console.log("Logging Data");
    console.log(data);

    //const [columns, setColumns] = useState([]);
    //const [data, setData] = useState([{}]);

    //useEffect(() => {
    //    let prepColumns = [];
    //    console.log(props.columns);
    //    props.columns.forEach(element => {
    //        prepColumns.push({
    //            Header: element.toUpperCase(),
    //            accessor: element
    //        });
    //    })
    //    setColumns(useMemo(props.columns, []));
    //    setData(useMemo(props.data, []));
    //});

    let prepColumns = [{ Header: "Fuck", columns: []}];
    columns.forEach(element => {
        prepColumns[0].columns.push({
            Header: element,
            accessor: element
        });
    })

    const memoColumns = useMemo(() => prepColumns, [prepColumns]);
    const memoData = useMemo(() => data, [data]);

    console.log("FInished Memoizing!")

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable({
        memoColumns,
        memoData,
    })

    //const mapData = (data, index) => {
    //    return (
    //        <tr key={index}>
    //            {columns.map((headName, key) =>
    //                <td key={key}>{data[headName]}</td>
    //            )}
    //        </tr>
    //    );
    //}

    //return (
    //    <table id="datatable">
    //        <thead>
    //            <tr>
    //                {columns.map((headName, index) => <th key={index}>{headName}</th>)}
    //            </tr>
    //        </thead>

    //        <tbody>
    //            {data.map((data, index) => mapData(data, index) )}
    //        </tbody>
    //    </table>
    //);
    return (
        <table {...getTableProps()}>
            <thead>
                {headerGroups.map(headerGroup => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map(column => (
                            <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                        ))}
                    </tr>
                ))}
            </thead>
            <tbody {...getTableBodyProps()}>
                {rows.map((row, i) => {
                    prepareRow(row)
                    return (
                        <tr {...row.getRowProps()}>
                            {row.cells.map(cell => {
                                return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                            })}
                        </tr>
                    )
                })}
            </tbody>
        </table>
    );
}

export default Table;
