import React from 'react';

function ButtonsSet({module, dataToExport}) {
    return (
        <div className="buttonsSet">
            <button>Export List</button>
            <button>Import List</button>
            <button>Add {module}</button>
        </div>
    );
}

export default ButtonsSet;
