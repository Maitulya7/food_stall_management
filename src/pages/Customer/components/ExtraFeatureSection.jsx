import {
  AccountCircle,
  Restaurant,
  MenuBook,
  ShoppingCart,
  Payments,
  Star,
  Insights,
  Notifications
} from "@mui/icons-material";
import { Box, Grid, Typography } from "@mui/material";
import appFeatureBg from "../../../images/app_feature.png";

const ExtraFeatureSection = () => {
  return (
    <>
      <Box
        sx={{
          height: '100vh',
          px: { xs: 4, sm: 8, md: 20, lg: 22 },
          py: 4,
          background: 'linear-gradient(180deg, #056C4F, #047857)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >

        <Grid container spacing={4} justifyContent="center" alignItems="center" sx={{ height: '100vh' }}>
          <Grid item lg={3} xs={12} sm={6} md={6}>
            {['Users', 'Stalls', 'Menus', 'Orders'].map((feature, index) => (
              <Box
                key={index}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  color: 'white',
                  padding: { xs: '8px', sm: '12px', md: '16px', lg: '20px' },
                  marginBottom: { xs: '12px', sm: '14px', md: '16px', lg: '18px' },
                  borderRadius: '8px',
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(4px)',
                  width: '100%',
                }}
              >
                {index === 0 && <AccountCircle sx={{ fontSize: { xs: 40, sm: 50, md: 60 }, color: 'white', marginRight: { xs: 1, sm: 2 } }} />}
                {index === 1 && <Restaurant sx={{ fontSize: { xs: 40, sm: 50, md: 60 }, color: 'white', marginRight: { xs: 1, sm: 2 } }} />}
                {index === 2 && <MenuBook sx={{ fontSize: { xs: 40, sm: 50, md: 60 }, color: 'white', marginRight: { xs: 1, sm: 2 } }} />}
                {index === 3 && <ShoppingCart sx={{ fontSize: { xs: 40, sm: 50, md: 60 }, color: 'white', marginRight: { xs: 1, sm: 2 } }} />}

                <Typography sx={{ fontWeight: 'bold', fontSize: { xs: 'h6', sm: 'h5', md: 'h4', lg: 'h3' }, color: 'white' }}>
                  {feature}
                </Typography>
              </Box>
            ))}
          </Grid>
          <Grid item lg={6} xs={12} sm={12} md={4}>
            <Box
              sx={{
                width: '100%',
                height: '100%',
                display: { xs: 'none', sm: 'none', md: 'block', lg: 'block' },
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
                  <Typography sx={{textAlign:"center" , fontSize:"20px" , color:"white" , fontWeight:"bold"}}>Awsome Features</Typography>
              <img
                src={appFeatureBg}
                alt="Features Background"
                style={{
                  width: '100%',
                  height: '100%',
                }}
              />
            </Box>
          </Grid>
          <Grid item lg={3} xs={12} sm={6} md={6}>
            {['Payments', 'Reviews', 'Insights', 'Notifications'].map((feature, index) => (
              <Box
                key={index}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  color: 'white',
                  padding: { xs: '8px', sm: '12px', md: '16px', lg: '20px' },
                  marginBottom: { xs: '12px', sm: '14px', md: '16px', lg: '18px' },
                  borderRadius: '8px',
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(4px)',
                  width: '100%',
                }}
              >
                {index === 0 && <Payments sx={{ fontSize: { xs: 40, sm: 50, md: 60 }, color: 'white', marginRight: { xs: 1, sm: 2 } }} />}
                {index === 1 && <Star sx={{ fontSize: { xs: 40, sm: 50, md: 60 }, color: 'white', marginRight: { xs: 1, sm: 2 } }} />}
                {index === 2 && <Insights sx={{ fontSize: { xs: 40, sm: 50, md: 60 }, color: 'white', marginRight: { xs: 1, sm: 2 } }} />}
                {index === 3 && <Notifications sx={{ fontSize: { xs: 40, sm: 50, md: 60 }, color: 'white', marginRight: { xs: 1, sm: 2 } }} />}

                <Typography sx={{ fontWeight: 'bold', fontSize: { xs: 'h6', sm: 'h5', md: 'h4' }, color: 'white' }}>
                  {feature}
                </Typography>
              </Box>
            ))}
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default ExtraFeatureSection;
