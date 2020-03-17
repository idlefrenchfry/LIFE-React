import React, { useMemo } from 'react';
import { useTable, useSortBy, usePagination } from 'react-table';
import up from '../up.jpg';
import down from '../down.jpg';
import nosort from '../nosort.jpg';

function Table({ data, columns }) {

    // Create new column object format to fit reactttable library
    let prepColumns = [];
    columns.forEach(element => {
        prepColumns.push({
            Header: element,
            accessor: element,
            disableSortBy: (element === "contact" || element === "date" ? true : false)
        });
    })

    // Memoizing is required for reacttable use
    const memoColumns = useMemo(() => prepColumns, []);
    const memoData = useMemo(() => data, [data]);

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
        page, 
        canPreviousPage,
        canNextPage,
        pageOptions,
        pageCount,
        gotoPage,
        nextPage,
        previousPage,
        setPageSize,
        state: { pageIndex, pageSize },
    } = useTable(
        {
            columns: memoColumns,
            data: memoData,
            initialState: { pageIndex: 0, pageSize: 7 }
        },
        useSortBy,
        usePagination
    )

    // Creates array of page numbers (E.g. [1, 2, 3, 4, 5])
    // To map for pagination
    function pageList(length) {
        let pages = [];
        for(let i = 1; i < length + 1; i++)
            pages.push(i);

        return pages;
    }

    return (
        <div>
            <table {...getTableProps()}>
                <thead>
                    {headerGroups.map(headerGroup => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map(column => (
                                <th {...column.getHeaderProps(column.getSortByToggleProps())} className="noselect" >
                                    {column.render('Header')}
                                    {/* Add a sort direction indicator */}
                                    <span style={(column.disableSortBy ? {display: "none"} : null)}>
                                        {column.isSorted
                                            ? column.isSortedDesc
                                            ? <img style={{paddingLeft: "5px", height: "0.5em"}} src={down} alt="sort down" />
                                            : <img style={{paddingLeft: "5px", height: "0.5em"}} src={up} alt="sort up" />
                                            : <img style={{paddingLeft: "5px", height: "0.5em"}} src={nosort} alt="not sorted" />}
                                    </span>
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                
                <tbody {...getTableBodyProps()}>
                    {page.map((row, i) => {
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

            {/* Switch pages of table */}
            <div className="pagination">
                {/* Previous page */}
                <button onClick={() => previousPage()} disabled={!canPreviousPage}>
                {'<'}
                </button>

                {/* Page numbers */}
                {pageList(pageOptions.length).map((index) => {
                    return <button onClick={() => gotoPage(index - 1)}>{index}</button>
                })}

                {/* Next page */}
                <button onClick={() => nextPage()} disabled={!canNextPage}>
                {'>'}
                </button>
            </div>
        </div>
    );
}

// TO DO:
// - Search Bar
// - Filters

export default Table;
