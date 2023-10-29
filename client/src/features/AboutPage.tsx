import { Box, Typography } from "@mui/material";
import AboutPageDetails from "./components/aboutPage/AboutPageDetails";
import AboutPageSteps from "./components/aboutPage/AboutPageSteps";

export default function AboutPage() {
  return (
    <>
      <Box sx={{display:"flex", justifyContent:"left", mb:10}}>
        <Typography variant="h4">Use Header to navigate between pages and click your name to open more options ie. to logout</Typography>
      </Box>
      <AboutPageSteps />
      <AboutPageDetails />
    </>
  );
}
