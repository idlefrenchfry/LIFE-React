import { useState, useEffect } from 'react';

// data: Object to be filtered
// filteredProperty: object property to be used for filtering 
// input: input of user
// setData: replace data with newly filtered object
function useSearchFilteredData(data, filteredProperty, input) {
    const [aData, setData] = useState(data);

    useEffect(() => {
        function handleInputChange() {
            let result = aData.filter(item => item[filteredProperty].includes(input));
            setData(result);
        }
    });

    return data;
}

export default useSearchFilteredData;