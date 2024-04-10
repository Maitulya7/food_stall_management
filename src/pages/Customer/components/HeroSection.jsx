import { Button, Grid, Typography } from "@mui/material"
import heroImage from "../../../images/mobile_image.png";

const HeroSection = () => {
    return(
        <>
         <Grid container spacing={4} sx={{ paddingX: 24, paddingY: 8 }}>
        <Grid item xs={8} sx={{ display: 'flex', justifyContent: 'center', marginTop: "60px" }}>
          <Grid container direction="column" spacing={2}>
            <Grid item>
              <Typography variant="h1" sx={{ marginBottom: 2, color: "#047857", fontWeight: "bold" }}>
                Food <span style={{ color: "black" }}>Stall</span>
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="body1" sx={{ marginBottom: 2, width: "80%" }}>
                Some Text Goes Here. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </Typography>
            </Grid>
            <Grid item sx={{ display: 'flex', gap: 2 }}>
              <Button sx={{ backgroundColor: "#047857", borderRadius: "15px", paddingX: "24px", paddingY: "12px", '&:hover': { backgroundColor: '#047857' } }} variant="contained">
                Get Started
              </Button>
              <Button sx={{ backgroundColor: "transparent", color: "black", border: "2px solid #047857", borderRadius: "15px", paddingX: "24px", paddingY: "12px", '&:hover': { backgroundColor: 'transparent' } }} variant="contained" color="secondary">
                View More
              </Button>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={4}>
          <img src={heroImage} alt="Image" style={{ width: '100%' }} />
        </Grid>
      </Grid>
        </>
    )
}

export default HeroSection