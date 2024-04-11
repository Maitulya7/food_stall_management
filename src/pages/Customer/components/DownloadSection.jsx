import { FaGooglePlay, FaApple } from 'react-icons/fa';
import { Grid, Button, Typography, Box } from '@mui/material';
import downloadSectionImage from "../../../images/application_bg.png";

const DownloadSection = () => {
    return (
        <Grid
            container
            spacing={4}
            sx={{
                paddingX: { xs: 2, sm: 4, md: 8, lg: 22 },
                paddingY: { xs: 4, sm: 6, md: 8 },
                height: { xs: 'auto', md: '100vh' },
                alignItems: 'center',
            }}
        >
            <Grid
                item
                xs={12}
                md={6}
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    paddingRight: { xs: 0, md: '2rem' },
                    textAlign: { xs: 'center', md: 'left' },
                }}
            >
                <Typography
                    variant="h3"
                    sx={{
                        marginBottom: { xs: '0.5rem', sm: '1rem' },
                        color: "#047857",
                        fontWeight: "bold",
                        fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem' },
                    }}
                >
                    The innovative way to shop
                </Typography>
                <Typography
                    variant="body1"
                    sx={{
                        marginBottom: { xs: '2rem', sm: '3rem' },
                        width: { xs: '100%', sm: '90%', md: '80%' },
                    }}
                >
                    When you join DeliverZe you will enjoy our new and improved way of shopping through our virtual mall experience.
                </Typography>
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: { xs: 'center', md: 'flex-start' },
                        gap: '1rem',
                    }}
                >
                    <Button
                        variant="contained"
                        startIcon={<FaGooglePlay size="24px" />}
                        sx={{
                            padding: { xs: '5px 10px', sm: '10px 20px', md: '20px 25px' ,lg:"20px 30px" },
                            borderRadius: '8px',
                            color: "white",
                            backgroundColor: "green",
                            fontWeight: "bold",
                            '&:hover': { backgroundColor: '#00864B' },
                        }}
                    >
                        Play Store
                    </Button>

                    {/* Button for Apple Store */}
                    <Button
                        variant="contained"
                        startIcon={<FaApple size="24px" />}
                        sx={{
                          padding: { xs: '5px 10px', sm: '10px 20px', md: '20px 25px' ,lg:"20px 30px" },
                            borderRadius: '8px',
                            color: "white",
                            fontWeight: "bold",
                            backgroundColor: "black",
                            fontSize:{xs:"15px"},
                            '&:hover': { backgroundColor: '#222' },
                        }}
                    >
                        Apple Store
                    </Button>
                </Box>
            </Grid>

            {/* Right column */}
            <Grid
                item
                xs={0}
                md={6}
                sx={{ textAlign: 'center', display: { xs: 'none', md: 'block' } }}
            >
                {/* Image is only visible on medium screens and up */}
                <img
                    src={downloadSectionImage}
                    alt="Download Section"
                    style={{
                        width: '100%',
                        height: 'auto',
                        borderRadius: '10px', // Optional: add border radius if you want rounded corners
                    }}
                />
            </Grid>
        </Grid>
    );
};

export default DownloadSection;
