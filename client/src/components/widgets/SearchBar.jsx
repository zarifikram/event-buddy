import React from 'react'
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";

function SearchBar(props) {
    const { setSearchQuery } = props;

    return (
        <form>
            <TextField
                className="w-5/6"
                onInput={(e) => {
                    setSearchQuery(e.target.value);
                }}
                label="Search"
                variant="outlined"
                placeholder="Search events"
                size="small"
            />

            <IconButton type="button" aria-label="search">
                <SearchIcon className='text-blue-800' />
            </IconButton>
        </form>
    )
}

export default SearchBar