import { InputLabel, MenuItem, Select } from "@mui/material";

const CategoryDropDown = ({ category, handleChange, isFormDropDown }) => {
  return (
    <>
      <InputLabel id="category" mb={3}>
        Category
      </InputLabel>
      <Select
        id="category"
        name="category"
        label={isFormDropDown ? "Category" : ""}
        value={category}
        onChange={handleChange}
      >
        {!isFormDropDown ? <MenuItem value="">None</MenuItem> : null}
        <MenuItem value="Action">Action</MenuItem>
        <MenuItem value="Science Fiction">Science Fiction</MenuItem>
        <MenuItem value="Animation">Animation</MenuItem>
        <MenuItem value="Fantasy">Fantasy</MenuItem>
        <MenuItem value="Adventure">Adventure</MenuItem>
      </Select>
    </>
  );
};

export default CategoryDropDown;
