import React from "react";

const SortBy = ({ setSortBy }) => {
  return (
    <>
      <select
        style={{
          marginRight: '40px',
          border: 'solid 1px #f0f8ff',
          textAlign: 'center',
          fontSize: '.8rem',
          background: '#fff',
        }}
        onChange={(e) => {
          setSortBy(e.target.value);
          console.log(e.target.value);
        }}
      >
        <option>Sort by</option>
        <option value="price , asc">Price </option>
        <option value="priceDesc">Price Desc</option>
        <option value="titleAsc">Title</option>
        <option value="titleDesc">Title Desc</option>
        <option value="postDateAsc">Post Date </option>
        <option value="postDateDesc">Post Date Desc</option>
        <option value="zipDesc">Location</option>
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