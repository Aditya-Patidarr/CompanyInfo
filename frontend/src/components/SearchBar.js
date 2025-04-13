import { InputBase, Typography, styled, Button, Box, Menu, MenuItem, Divider } from '@mui/material'
import React from 'react'
import { useState } from 'react'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import AddCompany from './AddCompany';
import { useTheme } from '@mui/material/styles';
import { getCompaniesByCategory } from '../services/companyService';
const Search = styled("div")(({ theme }) => ({
  backgroundColor: "white",
  width: "100%",
  padding: "2px 10px",
}));

const SearchBox = styled(Box)({
  display: "flex",
  gap: "20px",
  alignItems: "center",
  width: "100%"
})
const AppBox = styled(Box)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: "80px",
  margin: "0px 50px",
  marginTop: "40px",
  marginBottom: "20px"
})
const SearchBar = () => {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedValue, setSelectedValue] = useState('Sort By');
  const [isFormOpen, setOpen] = useState(false);
  const open = Boolean(anchorEl);
  const closeForm = () => {
    setOpen(false);
  }
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleAddCompany = () => {
    setOpen(true);
  }
  const handleClose = (value) => {

    const fetchData = async () => {
      try {
        const response = await getCompaniesByCategory(value);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    fetchData();
    if (value) {
      setSelectedValue(value);
    }
    setAnchorEl(null);
  };
  return (
    <>
      <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", marginBottom: "100px" }}>
        <AppBox>
          <SearchBox>
            <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "flex-start" }}>
              <Box>
                <Typography sx={{ paddingLeft: "10px" }} variant='subtitle1' color='black'>Select City</Typography></Box>
              <Box>
                <Search>
                  <InputBase placeholder='' sx={{ border: '1px solid black', width: "100%" }}></InputBase>
                </Search>
              </Box>
            </Box>
            <Button size="small" variant='contained' sx={{ height: "40px", width: "150px", padding: "0px 10px", backgroundColor: theme.palette.primary.main }}>Find Company</Button>
          </SearchBox>
          <Button onClick={handleAddCompany} variant='contained' color="primary" sx={{
            height: "40px", width: "250px", 
            backgroundColor: `${theme.palette.primary.main}`,
            }}>Add Company</Button>
          <div>
            <Button
              id="sort-button"
              variant="outlined"
              aria-controls={open ? 'sort-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              onClick={handleClick}
              endIcon={<KeyboardArrowDownIcon />}
            >
              {selectedValue}
            </Button>
            <Menu
              id="sort-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={() => handleClose()}
              aria-labelledby="sort-button"
            >
              <MenuItem onClick={() => handleClose('Name')}>Name</MenuItem>
              <MenuItem onClick={() => handleClose('Average')}>Average</MenuItem>
              <MenuItem onClick={() => handleClose('Rating')}>Rating</MenuItem>
              <MenuItem onClick={() => handleClose('Location')}>Location</MenuItem>
            </Menu>
          </div>
        </AppBox>
        <Divider sx={{ width: '70%' }} />
      </Box>
      <AddCompany open={isFormOpen} closeForm={closeForm} />
    </>
  
  )
}

export default SearchBar