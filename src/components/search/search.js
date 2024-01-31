import React, { useState } from "react";
import { AsyncPaginate } from "react-select-async-paginate";

import { geoApiOptions, GEO_API_URL } from "../../api";

// const loadOptions = (inputValue) => {
//   return fetch(
//     `${GEO_API_URL}/cities?minPopulation=1000000&namePrefix=${inputValue}`,
//     geoApiOptions
//   )
//     .then((response) => response.json())
//     .then((response) => {
//       return {
//         options: response.data.map((city) => {
//           return {
//             value: `${city.latitude} ${city.longitude}`,
//             label: `${city.name}, ${city.countryCode}`,
//           };
//         }),
//       };
//     });
// };

const Search = ({ onSearchChange }) => {
  const [search, setSearch] = useState(null);

  const loadOptions = (inputValue) => {
    // return fetch(
    //   `${GEO_API_URL}/cities?minPopulation=1000000&namePrefix=${inputValue}`,
    //   geoApiOptions
    // )

    return  fetch(`${GEO_API_URL}/cities?minPopulation=1000000&namePrefix=${inputValue}`, geoApiOptions)
    .then ((response) => response.json())
    .then ((response) => {

      if (response.error) {
        // If the response contains an error message, return an options array with the error
        return { options: [{ value: null, label: response.error.message }] };
      }

      return {

        options:response.data.map((city)=>{

          return {
            value:  `${city.latitude} ${city.longitude}`,
            label : `${city.name}, ${city.countryCode} `,
          }
        
        })
        
      }
    })
    .catch((err) =>{
      console.error(err)
      return { options: [{ value: null, label: "Error loading options. Please try again." }] };
      
    } )
    
  };

  const handleOnChange = (searchData) => {
    setSearch(searchData);
    onSearchChange(searchData);
  };

  return (
    <AsyncPaginate
      placeholder="Search for city"
      debounceTimeout={600}
      value={search}
      onChange={handleOnChange}
      loadOptions={loadOptions}
    />
  );
};

export default Search;
