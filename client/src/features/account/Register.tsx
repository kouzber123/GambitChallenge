import Avatar from "@mui/material/Avatar";

import TextField from "@mui/material/TextField";

import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { register } from "../../interface/register";

import { LoadingButton } from "@mui/lab";
import agent from "../../agent";
import { toast } from "react-toastify";

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();
/**
 *
 * @returns 201 or errors
 */
export default function Register() {
  const navigate = useNavigate();
  // const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isValid, isSubmitting },
  } = useForm<register>({ mode: "onTouched" });
  /**
   *  we set errors on formstate
   * @param errors
   */
  function handleApiErrors(errors: []) {
    if (errors) {
      errors.forEach((error: string) => {
        if (error.includes("Password")) {
          setError("password", { message: error });
        } else if (error.includes("Username")) {
          setError("username", { message: error });
        } else if (error.includes("Email")) {
          setError("email", { message: error });
        }
      });
    }
    console.log(errors);
  }
  return (
    <ThemeProvider theme={defaultTheme}>
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
          Sign up
        </Typography>
        <Box
          component="form"
          noValidate
          onSubmit={handleSubmit(data =>
            agent.account
              .register(data)
              .then(() => {
                toast.success("Registration Success you can now login");
                navigate("/login");
              })
              .catch(e => handleApiErrors(e))
          )}
          sx={{ mt: 3 }}
        >
          <Grid
            container
            spacing={2}
          >
            <Grid
              item
              xs={12}
            >
              <TextField
                {...register("username", { required: "Username is required" })}
                error={!!errors.username}
                helperText={errors.username?.message}
                required
                fullWidth
                label="username"
                autoFocus
              />
            </Grid>

            <Grid
              item
              xs={12}
            >
              <TextField
                required
                fullWidth
                label="Email Address"
                {...register("email", {
                  required: "Email is required",
                  pattern: { value: /^\w+[\w-.]*@\w+((-\w+)|(\w*))\.[a-z]{2,3}$/, message: "Not valid Email address" },
                })}
                error={!!errors.email}
                helperText={errors.email?.message}
              />
            </Grid>
            <Grid
              item
              xs={12}
            >
              <TextField
                required
                fullWidth
                {...register("password", {
                  required: "Password is required",
                  pattern: {
                    value:
                      /(?=^.{6,10}$)(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&amp;*()_+}{&quot;:;'?/&gt;.&lt;,])(?!.*\s).*$/,
                    message: "Password is too weak, 1 Special Letter, 1 Number, 1 Capital letter required",
                  },
                })}
                error={!!errors.email}
                helperText={errors.password?.message}
                label="Password"
                type="password"
              />
            </Grid>
            <Grid
              item
              xs={12}
            ></Grid>
          </Grid>
          <LoadingButton
            loading={isSubmitting}
            disabled={!isValid}
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </LoadingButton>
          <Grid
            container
            justifyContent="flex-end"
          >
            <Grid item>
              <Link to="/login">Already have an account? Sign in</Link>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
