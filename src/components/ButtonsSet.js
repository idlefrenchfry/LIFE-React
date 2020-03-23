import React from 'react';
import { Link } from 'react-router-dom';

function ButtonsSet({module, dataToExport, addPage}) {
    return (
        <div className="buttonsSet">
            <button>Export List</button>
            <button>Import List</button>
            <button><Link to={addPage}>Add {module}</Link></button>
        </div>
    );
}

export default ButtonsSet;
