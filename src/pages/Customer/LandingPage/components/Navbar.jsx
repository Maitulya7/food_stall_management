import { Typography, Button, AppBar, Toolbar, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
const Navbar = () => {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    console.log(path)
    navigate(path);
  };
  return (
    <>
      <AppBar
        sx={{
          paddingX: 20,
          paddingY: 2,
          backgroundColor: "transparent",
          color: "black",
          boxShadow: "none",
        }}
        position="static"
      >
        <Toolbar>
          <Typography
            variant="h4"
            component="div"
            sx={{ flexGrow: 1, color: "#047857", fontWeight: "bold" }}
          >
            Quick
            <span style={{ color: "black", marginLeft: "3px" }}>Crave</span>
          </Typography>
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              gap: "15px",
              alignItems: "center",
            }}
          >
            <Button
              onClick={() => handleNavigation("/vendor/login")}
              sx={{
                backgroundColor: "#047857",
                borderRadius: "15px",
                paddingX: "24px",
                paddingY: "12px",
                color: "white",
                "&:hover": { backgroundColor: "#047857" },
              }}
            >
              Login
            </Button>
            <Button
              onClick={() => handleNavigation("/vendor/register")}
              sx={{
                backgroundColor: "#047857",
                borderRadius: "15px",
                paddingX: "24px",
                paddingY: "12px",
                color: "white",
                "&:hover": { backgroundColor: "#047857" },
              }}
            >
              Sign Up
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Navbar;
