import Avatar from "@mui/material/Avatar";
import TextField from "@mui/material/TextField";

import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { login } from "../../interface/login";
import { LoadingButton } from "@mui/lab";
import { useAppDispatch, useAppSelector } from "../../store/configureStore";
import { signInUser } from "./accountSlice";
import { router } from "../../Routes";

const defaultTheme = createTheme();
/**
 * Login components form that takes input data and dispatch via redux to our agent file
 * @returns navigate to about
 */
export default function Login() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector(state => state.account);
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm<login>();

  async function submitForm(data: login) {
    try {
      await dispatch(signInUser(data));
      navigate(location.state?.from || "/about");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <ThemeProvider theme={defaultTheme}>
      <>
        {user ? (
          router.navigate("/data")
        ) : (
          <Container
            component={Paper}
            maxWidth="sm"
            sx={{ display: "flex", flexDirection: "column", alignItems: "center", p: 4 }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography
              component="h1"
              variant="h5"
            >
              Sign in
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit(submitForm)}
              noValidate
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                label="Username"
                autoFocus
                {...register("username", { required: "Username is required" })}
                error={!!errors.username}
                helperText={errors.username?.message}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                label="Password"
                type="password"
                {...register("password", { required: "Password is required" })}
                error={!!errors.password}
                helperText={errors.password?.message}
              />

              <LoadingButton
                loading={isSubmitting}
                disabled={!isValid}
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </LoadingButton>
              <Grid container>
                <Grid
                  item
                  xs
                ></Grid>
                <Grid item>
                  <Link to="/register">{"Don't have an account? Sign Up"}</Link>
                </Grid>
              </Grid>
            </Box>
          </Container>
        )}
      </>
    </ThemeProvider>
  );
}
