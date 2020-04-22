import React, { useState } from 'react';

function Recurring({ id }) {
    const [custom, setCustom] = useState("custom");

    const handleCustomChange = (e) => {
        if (e.target.value !== custom)
            setCustom(e.target.value);
    }

    return (
        <div className="recurringinputs">
            <label for={"customOption" + id}>Recurrence</label>
            <select onChange={handleCustomChange} id={"customOption" + id}>
                <option value="custom">Custom</option>
                <option value="notCustom">Not Custom</option>
            </select>

            {
                (custom === "custom" ?
                    <div>
                        <div style={{display:"flex"}}>
                            <div style={{ display: "block" }}>
                                <span>Repeat every</span>
                                <input style={{ width: "60px", margin: "0 10px" }} name={"noOccurence" + id} />
                            </div>
                            <div>
                                <select style={{ margin: "0" }} id={"occurenceType" + id}>
                                    <option value="day">day</option>
                                    <option value="week">week</option>
                                    <option value="monthly">month</option>
                                </select>
                            </div>
                        </div>
                        <br />
                    </div> :
                    null)
            }
        </div>
    );
}

export default Recurring;
