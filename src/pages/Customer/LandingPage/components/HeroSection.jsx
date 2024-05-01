import { Button, Grid, Typography } from "@mui/material";
import heroImage from "../../../../images/mobile_image.png";

const HeroSection = () => {
  return (
    <Grid
    container
    spacing={4}
    sx={{
      paddingX: { xs: 2, sm: 4, md: 8, lg: 22 },
      paddingY: { xs: 4, sm: 8 },
    }}
  >
    <Grid
      item
      xs={12}
      md={8}
      sx={{
        marginTop: { xs: '20px' , md:"40px" , lg:"80px" }, 
      }}
    >
      <Grid container direction="column" spacing={2} >
        <Grid item>
          <Typography
            variant="h3"
            sx={{
              marginBottom: 2,
              color: "#047857",
              fontWeight: "bold",
              fontSize: { xs: '24px', sm: '32px', md: '60px' , lg:"80px" },
              textAlign: {xs:"center" , md:"start"}, 
            }}
          >
            Quick
            <span
              style={{
                color: "black",
                marginLeft: "3px",
                fontSize: { xs: '24px', sm: '32px', md: '60px' , lg:"60px" },
              }}
            >
              Crave
            </span>
          </Typography>
        </Grid>
        <Grid item>
          <Typography
            variant="body2"
            sx={{
              marginBottom: 2,
              width: { xs: "100%", sm: "80%" }, // Full width on small screens
              textAlign: {xs:"center" , md:"start" }, // Center the text on small screens
              fontSize: { xs: '10px', sm: '10px', md: '15px' , lg:"20px" },
            }}
          >
            Some Text Goes Here. Lorem ipsum dolor sit amet, consectetur
            adipiscing elit. Sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua.
          </Typography>
        </Grid>
        <Grid item sx={{ display: 'flex', justifyContent:{xs:"center" , md:"start"} , gap: 2 }}>
          <Button
            sx={{
              backgroundColor: "#047857",
              borderRadius: "4px",
              paddingX: { xs: "8px", sm: "15px", md: "24px" },
              paddingY: { xs: "4px", sm: "8px", md: "14px" },
              '&:hover': { backgroundColor: '#047857' },
              fontSize: { xs: "10px", sm: "10px", md: "15px" },
            }}
            variant="contained"
          >
            Get Started
          </Button>
          <Button
            sx={{
              backgroundColor: "#047857",
              borderRadius: "4px",
              paddingX: { xs: "8px", sm: "15px", md: "20px" },
              paddingY: { xs: "4px", sm: "8px", md: "14px" },
              '&:hover': { backgroundColor: '#047857' },
              fontSize: { xs: "10px", sm: "10px", md: "15px" },
            }}
            variant="contained"
          >
            View More
          </Button>
        </Grid>
      </Grid>
    </Grid>
    <Grid
      item
      xs={12}
      md={4}
      sx={{ display: { xs: 'none', md: 'block' } }}
    >
      <img src={heroImage} alt="Image" style={{ width: '100%' }} />
    </Grid>
  </Grid>
  );
};

export default HeroSection;
