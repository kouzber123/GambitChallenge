import { Button, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";
export default function NotFoundPage() {
  return (
    <>
      <Typography>This is not found page </Typography>
      <Button
        component={NavLink}
        to="/"
      >
        Back to homepage{" "}
      </Button>
    </>
  );
}
