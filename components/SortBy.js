import React from "react";

const SortBy = ({ setSortValue }) => {
  return (
    <>
      <select
        style={{ marginRight: "30px", border: "solid 2px" }}
        onChange={(e) => {
          setSortValue(e.target.value);
        }}
      >
        <option>Sort By...</option>
        <option value="'price', 'asc'">Price Asc</option>
        <option value="'price', 'desc'">Price Desc</option>
        <option value="'title', 'asc'">Title Asc</option>
        <option value="'title', 'desc'">Title Desc</option>
        <option value="'postDate', 'asc'">Post Date Asc</option>
        <option value="'postDate', 'desc'">Post Date Desc</option>

        <option value="'zip', 'desc'">Location</option>
      </select>
    </>
  );
};

// Incase we move to MUI**** below code//

// <FormControl fullWidth>
//   <InputLabel id="demo-simple-select-label">Age</InputLabel>
//   <Select
//     labelId="demo-simple-select-label"
//     id="demo-simple-select"
//     value={age}
//     label="Age"
//     onChange={handleChange}
//   >
//     <MenuItem value={10}>Ten</MenuItem>
//     <MenuItem value={20}>Twenty</MenuItem>
//     <MenuItem value={30}>Thirty</MenuItem>
//   </Select>
// </FormControl>;

export default SortBy;
