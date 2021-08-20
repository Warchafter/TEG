import React from 'react';
import { NavLink } from 'react-router-dom';

import CIcon from '@coreui/icons-react'
import { freeSet } from '@coreui/icons'

export const _nav1 = [
  {
    _component: 'CNavItem',
    as: NavLink,
    anchor: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon content={freeSet.cilHome} customClasses="nav-icon"/>,
    badge: {
      color: 'info',
      text: 'NEW',
    },
  },
  {
    _component: 'CNavTitle',
    anchor: 'Facturas',
  },
  {
    _component: 'CNavGroup',
    as: NavLink,
    anchor: 'Cotizaciones',
    to: '/to',
    icon: <CIcon content={freeSet.cilFile} customClasses="nav-icon"/>,
    items: [
      {
        _component: 'CNavItem',
        as: NavLink,
        anchor: 'Solicitudes de Cotización',
        to: '/bill-client-submission-history',
      },
    ],
  },
  {
    _component: 'CNavGroup',
    as: NavLink,
    anchor: 'Facturas',
    to: '/to',
    icon: <CIcon content={freeSet.cilDescription} customClasses="nav-icon"/>,
    items: [
      {
        _component: 'CNavItem',
        as: NavLink,
        anchor: 'Facturas por Procesar',
        to: '/purchase-bill-pending',
      },
      {
        _component: 'CNavItem',
        as: NavLink,
        anchor: 'Modificar Factura',
        to: '/purchase-bill-modify',
      },
    ],
  },
  {
    _component: 'CNavGroup',
    as: NavLink,
    anchor: 'Pagos',
    to: '/to',
    icon: <CIcon content={freeSet.cilCreditCard} customClasses="nav-icon"/>,
    items: [
      {
        _component: 'CNavItem',
      as: NavLink,
      anchor: 'Pagos Facturas',
      to: '/bill-payments',
      },
      {
        _component: 'CNavItem',
        as: NavLink,
        anchor: 'Pagos Por Procesar',
        to: '/demo2',
      },
    ],
  },
  {
    _component: 'CNavGroup',
    as: NavLink,
    anchor: 'Entregas',
    to: '/to',
    icon: <CIcon content={freeSet.cilShareBoxed} customClasses="nav-icon"/>,
    items: [
      {
        _component: 'CNavItem',
        as: NavLink,
        anchor: 'Histórico Entregas',
        to: '/demo2',
      },
      {
        _component: 'CNavItem',
      as: NavLink,
      anchor: 'Entregas Pendientes',
      to: '/bill-payments',
    },
    ],
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
    anchor: 'Proveedores',
    to: '/suppliers',
    icon: <CIcon content={freeSet.cilTruck} customClasses="nav-icon"/>,
  },
  {
    _component: 'CNavItem',
    as: NavLink,
    anchor: 'Pruebas Facturas',
    to: '/billtesting',
    icon: <CIcon content={freeSet.cilPuzzle} customClasses="nav-icon"/>,
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
    icon: <CIcon content={freeSet.cilStar} customClasses="nav-icon"/>,
    items: [
      {
        _component: 'CNavItem',
        as: NavLink,
        anchor: 'Verificar RIF',
        to: '/extra/verify-rif'
      },
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
  {
    _component: 'CNavItem',
    as: NavLink,
    anchor: 'Apex Charts',
    to: '/apex-charts-testing',
    icon: <CIcon content={freeSet.cilGraph} customClasses="nav-icon"/>,
  },
];

export const _nav2 = [
  {
    _component: 'CNavItem',
    as: NavLink,
    anchor: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon content={freeSet.cilHome} customClasses="nav-icon"/>,
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
    anchor: 'Facturas',
  },
  {
    _component: 'CNavItem',
    as: NavLink,
    anchor: 'Solicitud de Facturación',
    to: '/bill-client-submission',
    icon: <CIcon content={freeSet.cilCart} customClasses="nav-icon"/>,
  },
  {
    _component: 'CNavItem',
    as: NavLink,
    anchor: 'Mis Solicitudes',
    to: '/bill-client-submission-history',
    icon: <CIcon content={freeSet.cilListRich} customClasses="nav-icon"/>,
  },
];




