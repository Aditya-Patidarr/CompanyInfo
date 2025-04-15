import { InputBase, Typography, styled, Button, Box, Menu, MenuItem, Divider } from '@mui/material'
import React from 'react'
import { useState } from 'react'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import AddIcon from '@mui/icons-material/Add';
import AddCompany from './AddCompany';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import CompanyList from './CompanyList';
const Search = styled("div")(({ theme }) => ({
  backgroundColor: "white",
  display:"flex",
  width: "100%",
  padding: "2px 10px",
  alignItems:"center"
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
  const [anchorEl, setAnchorEl] = useState(null);
  const [refreshList, setRefreshList] = useState(false);
  const [selectedValue, setSelectedValue] = useState('Name');
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
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Box>
                <Typography sx={{ paddingLeft: "10px" }} variant='subtitle1' color='grey'>Select City</Typography></Box>
              <Box>
                <Search>
                  <InputBase placeholder='  Indore, Madhya Pradesh, India' color='black' sx={{ border: '1px solid black', width: "350px" }}>
                  </InputBase>
                  <LocationOnOutlinedIcon/>
                </Search>
              </Box>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', paddingTop: "30px", justifyContent: 'flex-end' }}>
              <Button size="small" variant='contained' sx={{ height: "35px", width: "150px", padding: "0px 10px", backgroundColor: '#8F00FF' }}>Find Company</Button>
            </Box>
          </SearchBox>
          <Box sx={{ paddingTop: "30px" }}>
            <Button
              onClick={handleAddCompany}
              variant='contained'
              color="primary"
              startIcon={<AddIcon />}
              sx={{
                height: "35px", width: "160px",
                backgroundColor: '#8F00FF', paddingTop: "6px"
              }}>Add Company</Button>
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column', paddingTop: "0px" }}>
            <Typography color="black" variant='subtitle1'>Sort:</Typography>
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
              width="200px"
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
          </Box>
        </AppBox >
        <Divider sx={{ width: '70%' }} />
      </Box >
      <AddCompany open={isFormOpen} closeForm={closeForm} onCompanyAdded={() => setRefreshList(prev => !prev)}  />
      <CompanyList selectedValue={selectedValue} refresh={refreshList}/>
    </>

  )
}

export default SearchBar