import Dropdown from "@mui/joy/Dropdown";
import IconButton from "@mui/joy/IconButton";
import Menu from "@mui/joy/Menu";
import MenuButton from "@mui/joy/MenuButton";
import MenuItem from "@mui/joy/MenuItem";
import MoreVert from "@mui/icons-material/MoreVert";
import { useAppDispatch, useAppSelector } from "../../store/configureStore";
import { signOut } from "../account/accountSlice";

export default function SignedInMenu() {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector(state => state.account);
  return (
    <>
      <Dropdown>
        <MenuButton
          slots={{ root: IconButton }}
          sx={{ typography: "h6" , color: "inherit"}}
        >
          {user?.username}
          <MoreVert />
        </MenuButton>
        <Menu>
          <MenuItem onClick={() => dispatch(signOut())}>Logout</MenuItem>
        </Menu>
      </Dropdown>
    </>
  );
}
