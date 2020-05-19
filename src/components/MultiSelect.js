import React, { useState, useEffect, useRef } from 'react';
import { cloneDeep } from 'lodash'; // To deep clone arrays with objects

// To Do:
// Clicking outside of dropdown should close it
// Default values

function MultiSelect(props) {
    // props = Options, index of section, add/remove function from parent, default (preselected) values, in sync with other MultiSelect Components?
    // props = [ options:Array[obj], index:int, add:func, remove:func, defaultOptions:Array[obj], sync:bool ]

    const [currentlySelected, setCurrentlySelected] = useState([]);

    useEffect(() => {
        if (props.defaultOptions) {
            let replaceSelected = cloneDeep(props.defaultOptions);
            replaceSelected.sort(sortByLabel);
            setCurrentlySelected(replaceSelected);
        }
    }, [props.defaultOptions])

    const [currentlyNotSelected, setCurrentlyNotSelected] = useState([]);

    useEffect(() => {
        let replace = cloneDeep(props.options);
        // if props.sync, let parent component handle props.options instead
        if (props.defaultOptions && !props.sync) {
            // loop through each section to check for selected inputs
            if (props.defaultOptions.length > 0) {
                for (let i = 0; i < props.defaultOptions.length; i++) {
                    const selected = props.defaultOptions[i];
                    // loop through list of unselected inputs and compare
                    for (let x = replace.length; x > 0; x--) {
                        const input = replace.pop();
                        // if not the selected input, add back to unselected
                        if (input.label !== selected.label)
                            replace.unshift(input);
                    }
                }
            }
        }
        replace.sort(sortByLabel);
        setCurrentlyNotSelected(replace);
    }, [props.options, props.defaultOptions, props.sync])

    const [hasDropdown, setHasDropdown] = useState(false);
    const [searchInput, setSearchInput] = useState("");

    const searchInputRef = useRef(null);

    // handleDropDown:func()
    //     => check if dropdown is true
    //     => true: close dropdown (display: none)
    //     => false: dropdown (display: block)
    const handleDropDown = (e) => {
        if (e.key === "Enter" || e.key === undefined) {
            searchInputRef.current.value = "";
            setSearchInput("");
            setHasDropdown(!hasDropdown);
        }
    };

    const handleSearchInput = (e) => setSearchInput(e.target.value);

    // handleSelectOption:func(e)
    //     => add to currentlySelected
    //     => call add function (prop)
    //     => remove from currentlyNotSelected
    const handleSelectOption = (e) => {
        if (e.key === "Enter" || e.key === undefined) {
            let optionIndex = e.target.getAttribute("data-id");

            let replaceSelected = cloneDeep(currentlySelected);
            let replaceNotSelected = cloneDeep(currentlyNotSelected);
            let transfer = replaceNotSelected.splice(optionIndex, 1);
            replaceSelected.push(...transfer);

            if (props.add !== undefined)
                props.add(...transfer, props.dataId);

            setCurrentlySelected(replaceSelected);
            setCurrentlyNotSelected(replaceNotSelected);
        }
    }

    // handleRemoveOption:func(e)
    //     => remove from currentlySelected
    //     => call remove function (prop)
    //     => add to currentlyNotSelected
    const handleRemoveOption = (e) => {
        let optionIndex = e.target.getAttribute("data-id");

        let replaceSelected = cloneDeep(currentlySelected);
        let replaceNotSelected = cloneDeep(currentlyNotSelected);
        let transfer = replaceSelected.splice(optionIndex, 1);
        replaceNotSelected.push(...transfer);

        if (props.rm !== undefined)
            if (props.dataId === undefined)
                console.error("Unable to call remove function, dataId is empty!")
            else
                props.rm(...transfer, props.dataId);

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

                <div className="dropdownButton" tabIndex="0" onKeyPress={handleDropDown} onClick={handleDropDown}><i className="downArrow"></i></div>
            </div>
            <div className="dropdown" style={hasDropdown ? {} : { display: "none" }}>
                <input ref={searchInputRef} placeholder="Search" className="selectSearch" onChange={handleSearchInput} />
                <ul style={currentlyNotSelected.length === 0 ? { textAlign: "center", padding: "10px" } : {}}>
                    {
                        (currentlyNotSelected.length !== 0 && hasDropdown ? currentlyNotSelected.map((option, index) => {
                            if (searchInput === "" || option.label.toUpperCase().includes(searchInput.toUpperCase())) {
                                return (
                                    <li data-id={index}
                                        key={index}
                                        tabIndex="0"
                                        onKeyPress={handleSelectOption}
                                        onClick={handleSelectOption}
                                        className="noselect"
                                    >
                                        {option.label}
                                    </li>
                                );
                            }

                            return null;
                        }) : <span>List is empty!</span>)
                    }
                </ul>
            </div>
        </div>
    );
}
const sortByLabel = (a, b) => {
    if (a.label > b.label)
        return 1;
    else if (a.label < b.label)
        return -1;
    return 0;
}

export default MultiSelect;