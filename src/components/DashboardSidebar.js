import { useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  Box,
  Divider,
  Drawer,
  Hidden,
  List,
  Typography
} from '@material-ui/core';
import {
  AlertCircle as AlertCircleIcon,
  Search,
  Settings as SettingsIcon,
  User as UserIcon,
  UserPlus as UserPlusIcon,
  Users as UsersIcon
} from 'react-feather';
import NavItem from './NavItem';
import { AuthContext } from 'src/utils/context/auth';

import Logo from './Logo';
import { userType } from 'src/utils/Constants';

const items = [
  {
    href: '/app/tickets',
    icon: UsersIcon,
    title: 'Tickets',
    role: userType.Manager
  },
  {
    href: '/app/tickets',
    icon: UsersIcon,
    title: 'Faults History',
    role: userType.HelpDesk
  },
  {
    href: '/app/create',
    icon: AlertCircleIcon,
    title: 'Record Fault',
    role: userType.HelpDesk
  },
  {
    href: '/app/search',
    icon: Search,
    title: 'Search Faults',
    role: userType.HelpDesk
  },
  {
    href: '/admin/register',
    icon: UserIcon,
    title: 'Create User Account',
    role: userType.Admin
  },
  {
    href: '/admin/settings',
    icon: SettingsIcon,
    title: 'Change Password',
    role: userType.Admin
  },
  {
    href: '/admin/accountdetails',
    icon: UsersIcon,
    title: 'Profile',
    role: userType.Admin
  },
  {
    href: '/app/accountdetails',
    icon: UsersIcon,
    title: 'Profile',
    role: userType.HelpDesk
  },
  {
    href: '/admin/account',
    icon: UserPlusIcon,
    title: 'View User Accounts',
    role: userType.Admin
  },
  {
    href: '/app/settings',
    icon: SettingsIcon,
    title: 'Change Password',
    role: userType.HelpDesk
  }
];

const DashboardSidebar = ({ onMobileClose, openMobile }) => {
  const location = useLocation();
  const state = useContext(AuthContext);

  useEffect(() => {
    if (openMobile && onMobileClose) {
      onMobileClose();
    }
  }, [location.pathname]);
  console.log(state.user);
  const content = (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%'
      }}
    >
      <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'column',
          p: 2
        }}
      >
        <Logo />
        <Typography color="textPrimary" variant="h5">
          {state.user?.username}
        </Typography>
        <Typography color="textSecondary" variant="body2">
          {state.user?.Man_Number || ''}
        </Typography>
      </Box>
      <Divider />
      <Box sx={{ p: 2 }}>
        <List>
          {items.map(
            (item) =>
              item.role === state.user?.userType && (
                <NavItem
                  href={item.href}
                  key={item.title}
                  title={item.title}
                  icon={item.icon}
                />
              )
          )}
        </List>
      </Box>
      <Box sx={{ flexGrow: 1 }} />
    </Box>
  );

  return (
    <>
      <Hidden lgUp>
        <Drawer
          anchor="left"
          onClose={onMobileClose}
          open={openMobile}
          variant="temporary"
          PaperProps={{
            sx: {
              width: 256
            }
          }}
        >
          {content}
        </Drawer>
      </Hidden>
      <Hidden lgDown>
        <Drawer
          anchor="left"
          open
          variant="persistent"
          PaperProps={{
            sx: {
              width: 256,
              top: 64,
              height: 'calc(100% - 64px)'
            }
          }}
        >
          {content}
        </Drawer>
      </Hidden>
    </>
  );
};

DashboardSidebar.propTypes = {
  onMobileClose: PropTypes.func,
  openMobile: PropTypes.bool
};

DashboardSidebar.defaultProps = {
  onMobileClose: () => {},
  openMobile: false
};

export default DashboardSidebar;
