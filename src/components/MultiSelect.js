import React, { useState, useRef } from 'react';
import { cloneDeep } from 'lodash'; // To deep clone arrays with objects

// To Do:
// Adding and removing affect parent state
// SYNC THE MULTI SELECT
function MultiSelect(props) {
    // props = Options, index of section, add/remove function from parent
    // props = [ options:Array[obj], index:int, add:func, remove :func]

    const [currentlySelected, setCurrentlySelected] = useState([]);
    const [currentlyNotSelected, setCurrentlyNotSelected] = useState(cloneDeep(props.options));
    const [hasDropdown, setHasDropdown] = useState(false);
    const [searchInput, setSearchInput] = useState("");

    const searchInputRef = useRef(null);

    // handleDropDown:func()
    //     => check if dropdown is true
    //     => true: close dropdown (display: none)
    //     => false: dropdown (display: block)
    const handleDropDown = () => {
        searchInputRef.current.value = "";
        setSearchInput("");
        setHasDropdown(!hasDropdown);
    };

    const handleSearchInput = (e) => setSearchInput(e.target.value);

    // handleSelectOption:func(e)
    //     => add to currentlySelected
    //     => call add function (prop)
    //     => remove from currentlyNotSelected
    const handleSelectOption = (e) => {
        let optionIndex = e.target.getAttribute("data-id");

        let replaceSelected = cloneDeep(currentlySelected);
        let replaceNotSelected = cloneDeep(currentlyNotSelected);
        let transfer = replaceNotSelected.splice(optionIndex, 1);
        replaceSelected.push(...transfer);

        setCurrentlySelected(replaceSelected);
        setCurrentlyNotSelected(replaceNotSelected);
    }

    // handleRemoveOption:func(e)
    //     => remove from currentlySelected
    //     => call remove function (prop)
    //     => add to currentlyNotSelected
    const handleRemoveOption = (e) => {
        let optionIndex = e.target.getAttribute("data-id");

        console.log("Selected option: ", optionIndex)

        let replaceSelected = cloneDeep(currentlySelected);
        let replaceNotSelected = cloneDeep(currentlyNotSelected);
        let transfer = replaceSelected.splice(optionIndex, 1);
        replaceNotSelected.push(...transfer);

        // sort so inputs order will always be the same
        replaceNotSelected = replaceNotSelected.sort((a, b) => {
            if (a.label > b.label)
                return 1;
            else if (a.label < b.label)
                return -1;
            return 0;
        });

        setCurrentlySelected(replaceSelected);
        setCurrentlyNotSelected(replaceNotSelected);
    }


    return (
        <div className="multiSelect">
            <div className="multiSelectTop" style={hasDropdown ? {} : { borderBottom: "#e6e6e6 solid 1px" }}>
                <div className="selectedBox">
                    {
                        currentlySelected.map((option, index) => {
                            return (
                                <span key={index} className="selected noselect">
                                    {option.label}
                                    <input data-id={index} onClick={handleRemoveOption} type="button" value="&#10005;" />
                                </span>
                            );
                        })
                    }
                </div>

                <div className="dropdownButton" onClick={handleDropDown}><i className="downArrow"></i></div>
            </div>
            <div className="dropdown" style={hasDropdown ? {} : { display: "none" }}>
                <input ref={searchInputRef} className="selectSearch" onChange={handleSearchInput} />
                <ul>
                    {
                        currentlyNotSelected.map((option, index) => {
                            if (searchInput === "" || option.label.toUpperCase().includes(searchInput.toUpperCase())) {
                                return (
                                    <li data-id={index}
                                        key={index}
                                        onClick={handleSelectOption}
                                        className="noselect"
                                    >
                                        {option.label}
                                    </li>
                                );
                            }
                        })
                    }
                </ul>
            </div>
        </div>
    );
}

export default MultiSelect;