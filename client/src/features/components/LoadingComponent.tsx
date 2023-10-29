import { Backdrop, Box, CircularProgress, Typography } from "@mui/material";

interface Props {
  message?: string;
}
/**
 * takes string to customsie messages
 * @param param0
 * @returns loading components
 */
export default function LoadingComponent({ message = "Loading..." }: Props) {
  return (
    <Backdrop
      open={true}
      invisible={true}
    >
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <CircularProgress
          size={100}
          color="secondary"
        />
        <Typography
          variant="h4"
          sx={{ justifyContent: "center", position: "fixed", top: "60%" }}
        >
          {message}
        </Typography>
      </Box>
    </Backdrop>
  );
}
