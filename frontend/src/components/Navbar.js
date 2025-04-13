import React from 'react'
import {AppBar,styled,Toolbar,Typography,Box,InputBase} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import Company_logo from '../assets/Company_logo.png'
import { useTheme } from '@mui/material/styles'
const StyledToolbar = styled(Toolbar)({
  display:'flex',
  justifyContent:'space-between',
})

const Search = styled("div")(({theme})=>({
  backgroundColor: "white",
  width: "40%",
  padding:"2px 10px"
}));
const AppBox = styled(Box)({
  display:"flex",
  justifyContent:"flex-start",
  alignItems:"center",
  gap:"80px",
})
const Navbar = () => {
  const theme = useTheme();
  return (
    <AppBar position='sticky' color='white' sx={{padding:"10px 0px",zIndex:1101,backgroundColor:'white',boxShadow:3}}>
        <StyledToolbar>
          <Box sx={{display:"flex", justifyContent:"flex-start",alignItems:"center",marginLeft:"60px"}} flex={1}>
            <img src={Company_logo} alt="Company_logo"/>
           <Typography variant="h5" sx={{fontWeight:'normal',marginLeft:"10px" }}>
           Review<span style={{color:theme.palette.primary.main }}>&</span><b>RATE</b>
           </Typography>
           </Box>
           <AppBox flex={1}>
           <Search sx={{display:"flex",justifyContent:"space-between",alignItems:"center",border:"1px solid grey", borderRadius:"5px"}}>
           <InputBase placeholder='Search...'></InputBase>
           <SearchIcon/>
           </Search>
           <Typography variant="h6" color='black'>SignUp</Typography>
           <Typography variant="h6" color='black'>Login</Typography>
           </AppBox>
            
        </StyledToolbar>
    </AppBar>
  )
}

export default Navbar