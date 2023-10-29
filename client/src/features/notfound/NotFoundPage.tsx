import { Button, Typography } from "@mui/material";
import { NavLink, useLocation } from "react-router-dom";
export default function NotFoundPage() {
  const location = useLocation();
  return (
    <>
      <Typography variant="h1"> {location.pathname} Not found page </Typography>
      <Button
        size="large"
        variant="contained"
        component={NavLink}
        to="/"
      >
        Back to homepage{" "}
      </Button>
    </>
  );
}
