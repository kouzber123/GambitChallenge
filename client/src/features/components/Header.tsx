import { AppBar, Box, List, ListItem, Toolbar, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";
import { useAppSelector } from "../../store/configureStore";
import SignedInMenu from "./SignedInMenu";

const midLinks = [
  { title: "Data", path: "/data" },
  { title: "about", path: "/about" },
];
const rightLinks = [
  { title: "login", path: "/login" },
  { title: "register", path: "/register" },
];

const navStyles = [
  {
    color: "inherit",
    typography: "h6",
    textDecoration: "none",
    "&:hover": { color: "grey.500" },
    "&.active": { color: "text.secondary" },
  },
];
export default function Header() {
  const { user } = useAppSelector(state => state.account);
  return (
    <AppBar

      position="static"
      sx={{ mb: 4, backgroundColor: "#3b82f6" }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Box
          display={"flex"}
          alignItems={"center"}
        >
          <Typography
            component={NavLink}
            to={user ? "/about" : "/"}
            sx={navStyles}
          >
            Gambit
          </Typography>
        </Box>
        {user && (
          <List sx={{ display: "flex" }}>
            {midLinks.map(({ title, path }) => (
              <ListItem
                component={NavLink}
                to={path}
                key={path}
                sx={navStyles}
              >
                {title.toUpperCase()}
              </ListItem>
            ))}
          </List>
        )}

        <Box
          display={"flex"}
          alignItems={"center"}
        >
          {user ? (
            <SignedInMenu />
          ) : (
            <List sx={{ display: "flex" }}>
              {rightLinks.map(({ title, path }) => (
                <ListItem
                  component={NavLink}
                  to={path}
                  key={path}
                  sx={navStyles}
                >
                  {title.toUpperCase()}
                </ListItem>
              ))}
            </List>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}
