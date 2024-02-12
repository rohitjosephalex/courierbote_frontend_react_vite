import React, { useState } from "react";
import { AppBar, Stack, Toolbar, Typography, Button, Menu, MenuItem } from "@mui/material";
import {  useNavigate } from 'react-router-dom';
import logoImage from "../../assets/courierbote logo white transparent.png"; // Replace with the actual path to your image

function NavBar({companyName}) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const Navigate = useNavigate();
  const handleUserClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogOut = () => {
    sessionStorage.removeItem('api_token');
    sessionStorage.removeItem('userid');
    console.log('logginout');
    Navigate('/corporate/signin');
  };

  return (
    <AppBar position="static" sx={{ background: 'transparent'  }}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          {/* <img src={logoImage} alt="Logo" style={{ width: '150px', height: 'auto', margin: '3px' }} /> */}
          CourierBote
        </Typography>
        <Stack direction="row" spacing={2}>
          <Button
            color="inherit"
            id="user-button"
            onClick={handleUserClick}
            aria-controls={open ? "user-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            User
          </Button>
        </Stack>
        <Menu
          id="user-menu"
          anchorEl={anchorEl}
          open={open}
          MenuListProps={{ "aria-labelledby": "user-button" }}
          onClose={handleClose}
        >
          <MenuItem>{companyName}</MenuItem>
          <MenuItem>Setting</MenuItem>
          <MenuItem onClick={handleLogOut}>Logout</MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
}

export default NavBar;
