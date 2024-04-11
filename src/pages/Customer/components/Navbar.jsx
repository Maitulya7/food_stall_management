import { Typography, Button, AppBar, Toolbar, Box } from '@mui/material';
const Navbar = () => {
  return (
    <>
      <AppBar sx={{ paddingX: 20, paddingY: 2, backgroundColor: "transparent", color: "black", boxShadow: "none" }} position="static">
        <Toolbar >
          <Typography variant="h4" component="div" sx={{ flexGrow: 1 , color: "#047857", fontWeight: "bold" }}>
          Quick<span style={{ color: "black" ,  marginLeft:"3px"}}>Crave</span>
          </Typography>
          <Box  sx={{  display: { xs: 'none', md: 'flex' }, gap: "15px", alignItems: "center" }}>
            <Button sx={{ backgroundColor: "#047857", borderRadius: "15px", paddingX: "24px", paddingY: "12px", color: "white", '&:hover': { backgroundColor: '#F0745E' } }}>Login</Button>
            <Button sx={{ backgroundColor: "#047857", borderRadius: "15px", paddingX: "24px", paddingY: "12px", color: "white", '&:hover': { backgroundColor: '#F0745E' } }}>Sign Up</Button>
          </Box>
        </Toolbar>
      </AppBar>
    </>
  )
}

export default Navbar