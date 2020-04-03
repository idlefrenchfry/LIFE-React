import React from 'react';

function ButtonsSet({module, dataToExport, addPage}) {

    const redirect = () => window.location.href = addPage;

    return (
        <div className="buttonsSet">
            <button>Export List</button>
            <button>Import List</button>
            <button onClick={redirect}>Add {module}</button>
        </div>
    );
}

export default ButtonsSet;
