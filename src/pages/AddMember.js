import React, { useEffect, useState } from 'react';

function AddMembers() {
    return (
        <div className="card">
            <div className="cardTop">
                <h1>Add Member</h1>
                <div className="buttonsSet">
                    <button>Cancel</button>
                    <button>Save</button>
                </div>
            </div>

            <form>
                <div id="personalDetails">
                    <h3>Particulars</h3>
                    <div className="inputs">
                        <label for="eName">Name</label>
                        <br />
                        <input id="eName" name="eName" type="text"></input>
                        <br />
                        <label for="cName">Chinese Name</label>
                        <br />
                        <input id="cName" name="cName" type="text"></input>
                        <br />
                        <label for="gender">Gender</label>
                        <br />
                        <select id="gender" name="gender">
                            <option value="female">Female</option>
                            <option value="male">Male</option>
                        </select>
                        <br />
                        <label for="bloodtype">Blood Type</label>
                        <br />
                        <select id="bloodtype" name="bloodtype">
                            <option value="opos">O positive</option>
                            <option value="oneg">O negative</option>
                            <option value="apos">A positive</option>
                            <option value="aneg">A negative</option>
                            <option value="bpos">B positive</option>
                            <option value="bneg">B negative</option>
                            <option value="abpoos">AB positive</option>
                            <option value="abneg">AB negative</option>
                        </select>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default AddMembers;
