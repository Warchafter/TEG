import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import * as actions from '../../store/actions/index';

import {
  CSidebar,
  CSidebarBrand,
  CSidebarNav,
  CSidebarToggler,
  CCreateNavItem,
} from '@coreui/react';

import Logo from '../Logo/Logo';

import SimpleBar from 'simplebar-react';
import 'simplebar/dist/simplebar.min.css';

// sidebar nav config
import navigation from '../../_nav';

const AppSidebar = () => {
  const dispatch = useDispatch();
  const unfoldable = useSelector((state) => state.interface.sidebarUnfoldable);
  const sidebarShow = useSelector((state) => state.interface.sidebarShow);

  const onSetSidebarUnfoldable = useCallback(() => dispatch(actions.setSidebarUnfoldable()), [dispatch]);
  const onSetSidebarShow = useCallback(() => dispatch(actions.setSidebarShow()), [dispatch]);

  return (
    <CSidebar
      position="fixed"
      selfHiding="md"
      unfoldable={unfoldable}
      show={sidebarShow}
      onShow={() => console.log('show')}
      onHide={() => onSetSidebarShow()} //sidebarShow: false
    >
      <CSidebarBrand className="d-none d-md-flex" to="/">
        <Logo />
        {/* <CIcon className="sidebar-brand-full" name="logo-negative" height={35} /> */}
        {/* <CIcon className="sidebar-brand-narrow" name="sygnet" height={35} /> */}
      </CSidebarBrand>
      <CSidebarNav>
        <SimpleBar>
          <CCreateNavItem items={navigation} />
        </SimpleBar>
      </CSidebarNav>
      <CSidebarToggler
        className="d-none d-lg-flex"
        onClick={() => onSetSidebarUnfoldable()} //sidebarUnfoldable: !unfoldable
      />
    </CSidebar>
  );
};

export default React.memo(AppSidebar);