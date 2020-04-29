import React from 'react';

function Details(props) {
    return (
        <div className="detailsInfo">
            <span>{props.label}</span>
            <span>{props.value}</span>
        </div>
    );
}

function DetailsFile(props) {
    return (
        <div className="detailsInfo fileDownload">
            <span>{props.label}</span>
            {
                props.value.map((value, index) => {
                    return <a key={index} href={props.path[index]} download="">{value}</a>
                })
            }
        </div>
    );
}

export { Details, DetailsFile };
