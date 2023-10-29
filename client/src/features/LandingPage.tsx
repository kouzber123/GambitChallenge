import { Box, Button, Container, Typography } from "@mui/material";

import { useAppSelector } from "../store/configureStore";
import { router } from "../Routes";
import { NavLink } from "react-router-dom";

/**
 * ternary operation here because this page will be rendered regardless if user is logged in
 * after closing the browser this is one trick to fix it
 * as all the other components are rendered so to avoid login page displaying again
 * @returns  login or navigation to data
 */
export default function LandingPage() {
  const { user } = useAppSelector(state => state.account);
  return (
    <>
      {user ? (
        router.navigate("/data")
      ) : (
        <Box>
          <Container
            sx={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", mt: 6 }}
          >
            <Typography
              variant="h2"
              sx={{ mb: 3, color: "inherit" }}
            >
              Welcome To Gambit
            </Typography>
            <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
              <Button
                variant="contained"
                size="large"
                component={NavLink}
                to="/login"
              >
                Login
              </Button>
              <Button
                variant="contained"
                size="large"
                component={NavLink}
                to="register"
              >
                Register
              </Button>
            </Box>
          </Container>
        </Box>
      )}
    </>
  );
}
