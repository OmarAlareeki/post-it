import { useState } from "react";
import { InputLabel, MenuItem, FormControl, Select } from "@material-ui/core";

const Sort = ({ setSortValue, setSortType }) => {
  const [sortOption, setSortOption] = useState("");

  const handleSortChange = (e) => {
    console.log(e.target.value);
    if (e.target.value === "") {
      setSortValue("postDate");
      setSortType("desc");
      setSortOption("");
    } else if (e.target.value === "Post Date Asc") {
      setSortValue("postDate");
      setSortType("asc");
      setSortOption("Post Date Asc");
    } else if (e.target.value === "Post Date Desc") {
      setSortValue("postDate");
      setSortType("desc");
      setSortOption("Post Date Desc");
    } else {
      setSortValue(e.target.value.split(" ")[0].toLowerCase());
      setSortType(e.target.value.split(" ")[1].toLowerCase());
      setSortOption(e.target.value);
    }
  };

  const renderValue = (value) => {
    return value;
  };

  return (
    <>
      <FormControl
        variant="standard"
        sx={{ m: 1, minWidth: 115, bottom: 8, color: "#00243D" }}
      >
        <InputLabel id="demo-simple-select-helper-label">SortBy</InputLabel>
        <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          value={sortOption}
          renderValue={() => renderValue(sortOption)}
          onChange={handleSortChange}
          h={40}
          defaultValue=""
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value="Price Asc">Price Asc</MenuItem>
          <MenuItem value="Price Desc">Price Desc</MenuItem>
          <MenuItem value="Title Asc">Title Asc</MenuItem>
          <MenuItem value="Title Desc">Title Desc</MenuItem>
          <MenuItem value="Post Date Asc">Post Date</MenuItem>
          <MenuItem value="Post Date Desc">Post Date Desc</MenuItem>
        </Select>
      </FormControl>
    </>
  );
};
export default Sort;
