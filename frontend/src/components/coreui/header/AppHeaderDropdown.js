import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import * as actions from '../../../store/actions/index';
import { useSelector } from 'react-redux';
import {
  CBadge,
  CDropdown,
  CDropdownDivider,
  CDropdownHeader,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
} from '@coreui/react';
import CIcon from '@coreui/icons-react';

import NotificationsIcon from '@material-ui/icons/Notifications';
import DraftsIcon from '@material-ui/icons/Drafts';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';
import MessageIcon from '@material-ui/icons/Message';
// import PersonIcon from '@material-ui/icons/Person';
// import SettingsIcon from '@material-ui/icons/Settings';
// import PaymentIcon from '@material-ui/icons/Payment';
// import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile';


import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import { deepOrange, deepPurple } from '@material-ui/core/colors';

import { firstLetterHandler } from '../../../shared/utility';


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  orange: {
    color: theme.palette.getContrastText(deepOrange[500]),
    backgroundColor: deepOrange[500],
  },
  purple: {
    color: theme.palette.getContrastText(deepPurple[500]),
    backgroundColor: deepPurple[500],
  },
}));

const AppHeaderDropdown = () => {
  const classes = useStyles();
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const user = useSelector(state => state.auth.user);

  const dispatch = useDispatch();

  const onLogout = useCallback(() => dispatch(actions.logout()), [dispatch]);

  return (
    <CDropdown variant="nav-item">
      <CDropdownToggle placement="bottom-end" className="py-0" caret={false}>
        {user === null
          ?
          null
          :
          <Avatar className={classes.purple}>{firstLetterHandler(user.name)}</Avatar>
        }
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
        <CDropdownHeader className="bg-light fw-semibold py-2">Account</CDropdownHeader>
        <CDropdownItem href="/billtesting">
          <NotificationsIcon />
          Updates
          <CBadge color="info" className="ms-2">
            42
          </CBadge>
        </CDropdownItem>
        <CDropdownItem href="#">
          <DraftsIcon />
          Messages
          <CBadge color="success" className="ms-2">
            42
          </CBadge>
        </CDropdownItem>
        <CDropdownItem href="#">
          <AssignmentTurnedInIcon />
          Tasks
          <CBadge color="danger" className="ms-2">
            42
          </CBadge>
        </CDropdownItem>
        <CDropdownItem href="#">
          <MessageIcon />
          Comments
          <CBadge color="warning" className="ms-2">
            42
          </CBadge>
        </CDropdownItem>
        <CDropdownHeader className="bg-light fw-semibold py-2">Settings</CDropdownHeader>
        {/* <CDropdownItem href="/suppliers" onClick={() => {onSetRedirectPath('/suppliers')}}> */}
        <CDropdownItem href="/user-profile" >
          <CIcon name="cil-user" className="me-2" />
          Profile
        </CDropdownItem>
        <CDropdownItem href="#">
          <CIcon name="cil-settings" className="me-2" />
          Settings
        </CDropdownItem>
        <CDropdownItem href="#">
          <CIcon name="cil-credit-card" className="me-2" />
          Payments
          <CBadge color="secondary" className="ms-2">
            42
          </CBadge>
        </CDropdownItem>
        <CDropdownItem href="#">
          <CIcon name="cil-file" className="me-2" />
          Projects
          <CBadge color="primary" className="ms-2">
            42
          </CBadge>
        </CDropdownItem>
        {isAuthenticated
          ?
          <React.Fragment>
            <CDropdownDivider />
            <CDropdownItem href="/logout" onClick={onLogout}>
              <CIcon name="cil-lock-locked" className="me-2" />
              Log Out
            </CDropdownItem>
          </React.Fragment>
          :
          <React.Fragment>
            <CDropdownDivider />
            <CDropdownItem href="/auth">
              <CIcon name="cil-lock-locked" className="me-2" />
              Log In
            </CDropdownItem>
          </React.Fragment>
        }
      </CDropdownMenu>
    </CDropdown>
  );
};

export default AppHeaderDropdown;