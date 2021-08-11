import React from 'react';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ReceiptIcon from '@material-ui/icons/Receipt';
import LocalShippingIcon from '@material-ui/icons/LocalShipping';
import { NavLink } from 'react-router-dom';

const _nav = [
  {
    _component: 'CNavItem',
    as: NavLink,
    anchor: 'Dashboard',
    to: '/dashboard',
    icon: <DashboardIcon fontSize="large" />,
    badge: {
      color: 'info',
      text: 'NEW',
    },
  },
  {
    _component: 'CNavTitle',
    anchor: 'Productos',
  },
  {
    _component: 'CNavTitle',
    anchor: 'Proveedores',
  },
  {
    _component: 'CNavItem',
    as: NavLink,
    anchor: 'Pruebas Proveedores',
    to: '/suppliertesting',
    icon: <LocalShippingIcon fontSize="large" />,
  },
  {
    _component: 'CNavItem',
    as: NavLink,
    anchor: 'Proveedores',
    to: '/suppliers',
    icon: <LocalShippingIcon fontSize="large" />,
  },
  {
    _component: 'CNavTitle',
    anchor: 'Facturas',
  },
  {
    _component: 'CNavGroup',
    as: NavLink,
    anchor: 'Facturas',
    to: '/to',
    icon: <ReceiptIcon fontSize="large" />,
    items: [
      {
        _component: 'CNavItem',
        as: NavLink,
        anchor: 'Pagos Facturas',
        to: '/bill-payments',
        icon: <ReceiptIcon fontSize="large" />,
      },
    ],
  },
  {
    _component: 'CNavItem',
    as: NavLink,
    anchor: 'Pruebas Facturas',
    to: '/billtesting',
    icon: <ReceiptIcon fontSize="large" />,
  },
  {
    _component: 'CNavItem',
    as: NavLink,
    anchor: 'Vertical Tabs Test',
    to: '/vertical-tabs-testing',
    icon: <ReceiptIcon fontSize="large" />,
  },
  {
    _component: 'CNavGroup',
    as: NavLink,
    anchor: 'Demo',
    to: '/to',
    icon: <ReceiptIcon fontSize="large" />,
    items: [
      {
        _component: 'CNavItem',
        as: NavLink,
        anchor: 'Demo Kanban Style Grid',
        to: '/demo2',
        icon: <ReceiptIcon fontSize="large" />,
      },
      {
        _component: 'CNavItem',
        as: NavLink,
        anchor: 'Demo Firebase Style Grid',
        to: '/demo3',
        icon: <ReceiptIcon fontSize="large" />,
      },
      {
        _component: 'CNavItem',
        as: NavLink,
        anchor: 'Demo Nested List',
        to: '/demo4',
        icon: <ReceiptIcon fontSize="medium" />,
      },
    ],
  },
  {
    _component: 'CNavTitle',
    anchor: 'Extras',
  },
  {
    _component: 'CNavGroup',
    as: NavLink,
    anchor: 'Extra',
    to: '/to',
    icon: <ReceiptIcon fontSize="large" />,
    items: [
      {
        _component: 'CNavItem',
        as: NavLink,
        anchor: 'Banco',
        to: '/extra/banks',
      },
      {
        _component: 'CNavItem',
        as: NavLink,
        anchor: 'Moneda',
        to: '/extra/currencies',
      },
      {
        _component: 'CNavItem',
        as: NavLink,
        anchor: 'Estados de Pago',
        to: '/extra/payment-status',
      },
      {
        _component: 'CNavItem',
        as: NavLink,
        anchor: 'Métodos de Pago',
        to: '/extra/payment-methods',
      },
      {
        _component: 'CNavItem',
        as: NavLink,
        anchor: 'Estados de la Compra',
        to: '/extra/purchase-status',
      },
    ],
  },
];

export default _nav;
