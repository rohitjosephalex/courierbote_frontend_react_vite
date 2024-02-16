import React, { useState } from "react";
import { AppBar, Stack, Toolbar, Typography, Button, Menu, MenuItem } from "@mui/material";
import {  useNavigate } from 'react-router-dom';
import logoImage from "../../assets/favicon.png"
import { faUserCircle ,faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
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
          <img src={logoImage} alt="CourierBote Logo"  style={{
                width: window.innerWidth > 768 ? '50px' : '35px', // 50px for larger screens, 35px for mobile view
                height: 'auto',
                marginTop: '5px',
                paddingTop: window.innerWidth > 768 ? '5px':"0px"
            }}/>
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
            <FontAwesomeIcon icon={faUser}size="2x" />
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