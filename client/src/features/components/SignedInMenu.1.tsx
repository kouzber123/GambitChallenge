export default function SignedInMenu() {
  return (
    <Dropdown>
      <MenuButton>Dashboard...</MenuButton>
      <Menu>
        <MenuItem>Profile</MenuItem>
        <MenuItem>My account</MenuItem>
        <MenuItem>Logout</MenuItem>
      </Menu>
    </Dropdown>
  );
}
