import React from 'react';

import DefaultLayout from './hoc/Layout/DefaultLayout';

// Layout Types
import Layout from './hoc/Layout/Layout';

// Route Views

const Home = React.lazy(() => {
    return import('./containers/Home/Home');
});


// Auth

const Auth = React.lazy(() => { return import('./containers/Auth/Auth'); });
const Activate = React.lazy(() => { return import('./containers/Auth/Activate/Activate'); });
const ResetPassword = React.lazy(() => { return import('./containers/Auth/ResetPassword/ResetPassword') });
const ResetPasswordConfirm = React.lazy(() => { return import('./containers/Auth/ResetPasswordConfirm/ResetPasswordConfirm') });
const Logout = React.lazy(() => { return import('./containers/Auth/Logout/Logout') });


// Product

const Product = React.lazy(() => { return import('./containers/Products/Products'); });


// Bills

const Loaders = React.lazy(() => { return import('./containers/Products/Loaders/Loaders') });
const Bill = React.lazy(() => { return import('./containers/Bill/Bill') });
const BillClientSubmission = React.lazy(() => { return import('./containers/Bill/BillClientSubmission/BillClientSubmission') });
const BillClientSubmissionHistory = React.lazy(() => { return import('./containers/Bill/BillClientSubmission/BillClientSubmissionHistory') });
const PurchaseBillList = React.lazy(() => { return import('./components/Bill/PurchaseBill/PurchaseBillList') });
const PurchaseBillModifier = React.lazy(() => {return import('./containers/Bill/PurchaseBill/PurchaseBillModifier')})
const BillPaymentDetailUpload = React.lazy(() => {return import ('./containers/Bill/BillPaymentDetail/BillPaymentDetailUpload') });
const BillKanbanStyleGrid = React.lazy(() => { return import('./containers/Bill/kanban-style/Bill-Kanbam-Style-Grid') });
const BillPaymentDetailApproval = React.lazy(() => { return import('./containers/Bill/BillPaymentDetail/BillPaymentDetailApproval') });

// Supplier

const Supplier = React.lazy(() => { return import('./containers/Supplier/Supplier') });
const SupplierTesting = React.lazy(() => { return import('./components/Supplier/Testing/SupplierTesting') });
const SupplierMain = React.lazy(() => { return import('./containers/Supplier/SupplierMain') });
const SupplierCreate = React.lazy(() => { return import('./containers/Supplier/SupplierCreate/SupplierCreate') });


// user profile

const UserProfile = React.lazy(() => { return import('./containers/UserProfile/UserProfile') });


// extra

const RifVerify = React.lazy(() => { return import('./containers/Extra/RifVerify') });
const Extra = React.lazy(() => { return import('./containers/Extra/Extra') });
const BankL = React.lazy(() => { return import('./containers/Extra/Loaders/Bank/BankL') });
const CurrencyL = React.lazy(() => { return import('./containers/Extra/Loaders/Currency/CurrencyL') });
const PaymentStatusL = React.lazy(() => { return import('./containers/Extra/Loaders/PaymentStatus/PaymentStatusL') });
const PaymentMethodL = React.lazy(() => { return import('./containers/Extra/Loaders/PaymentMethod/PaymentMethodL') });
const PurchaseStatusL = React.lazy(() => { return import('./containers/Extra/Loaders/PurchaseStatus/PurchaseStatusL') });

// demo

const ElevatedHeaderCardDemo = React.lazy(() => { return import('./components/MUI-Components/miui-card') });
const BillFirebaseStyleGrid = React.lazy(() => { return import('./containers/Bill/FirebaseStyle') });
const VerticalTabs = React.lazy(() => { return import('./components/MUI-Components/vertical-tabs') });
const NestedList = React.lazy(() => { return import('./components/MUI-Components/nested-list') });

// apex charts

const ApexCharts = React.lazy(() => { return import('./containers/ApexCharts/ApexCharts') });

// examples

// const Colors = React.lazy(() => import('./views/theme/colors/Colors'))
// const Typography = React.lazy(() => import('./views/theme/typography/Typography'))

// const Accordion = React.lazy(() => import('./views/components/base/accordion/Accordion'))
// const Breadcrumbs = React.lazy(() => import('./views/components/base/breadcrumbs/Breadcrumbs'))
// const Cards = React.lazy(() => import('./views/components/base/cards/Cards'))
// const Carousels = React.lazy(() => import('./views/components/base/carousels/Carousels'))
// const Collapses = React.lazy(() => import('./views/components/base/collapses/Collapses'))
// const ListGroups = React.lazy(() => import('./views/components/base/list-groups/ListGroups'))
// const Navs = React.lazy(() => import('./views/components/base/navs/Navs'))
// const Paginations = React.lazy(() => import('./views/components/base/paginations/Paginations'))
// const Popovers = React.lazy(() => import('./views/components/base/popovers/Popovers'))
// const Progress = React.lazy(() => import('./views/components/base/progress/Progress'))
// const Spinners = React.lazy(() => import('./views/components/base/spinners/Spinners'))
// const Tables = React.lazy(() => import('./views/components/base/tables/Tables'))
// const Tooltips = React.lazy(() => import('./views/components/base/tooltips/Tooltips'))

// const Buttons = React.lazy(() => import('./views/components/buttons/buttons/Buttons'))
// const ButtonGroups = React.lazy(() =>
//     import('./views/components/buttons/button-groups/ButtonGroups'),
// )
// const Dropdowns = React.lazy(() => import('./views/components/buttons/dropdowns/Dropdowns'))

// const ChecksRadios = React.lazy(() => import('./views/components/forms/checks-radios/ChecksRadios'))
// const FloatingLabels = React.lazy(() =>
//     import('./views/components/forms/floating-labels/FloatingLabels'),
// )
// const FormControl = React.lazy(() => import('./views/components/forms/form-control/FormControl'))
// const InputGroup = React.lazy(() => import('./views/components/forms/input-group/InputGroup'))
// const LayoutCus = React.lazy(() => import('./views/components/forms/layout/Layout'))
// const Range = React.lazy(() => import('./views/components/forms/range/Range'))
// const Select = React.lazy(() => import('./views/components/forms/select/Select'))
// const Validation = React.lazy(() => import('./views/components/forms/validation/Validation'))

// const CoreUIIcons = React.lazy(() => import('./views/components/icons/coreui-icons/CoreUIIcons'))
// const Flags = React.lazy(() => import('./views/components/icons/flags/Flags'))
// const Brands = React.lazy(() => import('./views/components/icons/brands/Brands'))

// const Alerts = React.lazy(() => import('./views/components/notifications/alerts/Alerts'))
// const Badges = React.lazy(() => import('./views/components/notifications/badges/Badges'))
// const Modals = React.lazy(() => import('./views/components/notifications/modals/Modals'))
// const Toasts = React.lazy(() => import('./views/components/notifications/toasts/Toasts'))

// const Login = React.lazy(() => import('./views/examples/pages/login/Login'))
// const Register = React.lazy(() => import('./views/examples/pages/register/Register'))
// const Page404 = React.lazy(() => import('./views/examples/pages/page404/Page404'))
// const Page500 = React.lazy(() => import('./views/examples/pages/page500/Page500'))

// const Widgets = React.lazy(() => import('./views/components/widgets/Widgets'))

// const Charts = React.lazy(() => import('./views/components/charts/Charts'))
const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))

let routes = [
    {
        path: '/',
        exact: true,
        layout: DefaultLayout,
        name: "Home",
        component: Home,
        isPrivate: true
    },
    {
        path: '/auth',
        layout: Layout,
        name: "Authentication",
        component: Auth,
        isPrivate: false
    },
    {
        path: "/password/reset/confirm/:uid/:token",
        layout: Layout,
        name: "Reset Password Confirm",
        component: ResetPasswordConfirm,
        isPrivate: false
    },
    {
        path: '/activate/:uid/:token',
        layout: Layout,
        name: "Activate Account",
        component: Activate,
        isPrivate: false
    },
    {
        path: 'reset-password',
        layout: Layout,
        name: "Reset Password",
        component: ResetPassword,
        isPrivate: false
    },
    {
        path: '/logout',
        layout: Layout,
        name: "Log Out",
        component: Logout,
        isPrivate: true
    },
    {
        path: '/loaders',
        layout: Layout,
        name: "Loaders",
        component: Loaders,
        isPrivate: true
    },
    {
        path: '/bill-payments',
        layout: DefaultLayout,
        name: "Pagos Facturas",
        component: BillKanbanStyleGrid,
        isPrivate: true
    },
    {
        path: '/billtesting',
        layout: DefaultLayout,
        name: "Bill Testing",
        component: Bill,
        isPrivate: true
    },
    {
        path: '/suppliertesting',
        layout: DefaultLayout,
        name: "Supplier Testing",
        component: Supplier,
        isPrivate: true
    },
    {
        path: '/suppliertesting1',
        layout: DefaultLayout,
        name: "Supplier Testing 1",
        component: SupplierTesting,
        isPrivate: true
    },
    {
        path: '/suppliers',
        layout: DefaultLayout,
        name: "Suppliers",
        component: SupplierMain,
        isPrivate: true
    },
    {
        path: '/suppliers-create',
        layout: DefaultLayout,
        name: "Crear Proveedor",
        component: SupplierCreate,
        isPrivate: true
    },
    {
        path: '/vertical-tabs-testing',
        layout: DefaultLayout,
        name: "Vertical Tabs Testing",
        component: VerticalTabs,
        isPrivate: true
    },
    {
        path: '/extra',
        exact: true,
        layout: DefaultLayout,
        name: "Extra",
        component: Extra,
        isPrivate: true
    },
    {
        path: '/extra/verify-rif',
        layout: DefaultLayout,
        name: "Extra - Verificar RIF",
        component: RifVerify,
        isPrivate: true
    },
    {
        path: '/extra/banks',
        layout: DefaultLayout,
        name: "Extra - Bancos",
        component: BankL,
        isPrivate: true
    },
    {
        path: '/extra/payment-methods',
        layout: DefaultLayout,
        name: "Extra - Métodos de Pago",
        component: PaymentMethodL,
        isPrivate: true
    },
    {
        path: '/extra/payment-status',
        layout: DefaultLayout,
        name: "Extra - Estados de Pago",
        component: PaymentStatusL,
        isPrivate: true
    },
    {
        path: '/extra/purchase-status',
        layout: DefaultLayout,
        name: "Extra - Estados de la Factura",
        component: PurchaseStatusL,
        isPrivate: true
    },
    {
        path: '/extra/currencies',
        layout: DefaultLayout,
        name: "Extra - Monedas",
        component: CurrencyL,
        isPrivate: true
    },
    {
        path: '/bill',
        layout: DefaultLayout,
        name: "Extra - Monedas",
        component: CurrencyL,
        isPrivate: true
    },
    {
        path: '/demo1',
        layout: DefaultLayout,
        name: "Demo - Elevated Card",
        component: ElevatedHeaderCardDemo,
        isPrivate: true
    },
    {
        path: '/demo2',
        layout: DefaultLayout,
        name: "Demo - Kanban Style Grid",
        component: BillKanbanStyleGrid,
        isPrivate: true
    },
    {
        path: '/demo3',
        layout: DefaultLayout,
        name: "Demo - Firebase Style Grid",
        component: BillFirebaseStyleGrid,
        isPrivate: true
    },
    {
        path: '/demo4',
        layout: DefaultLayout,
        name: "Demo - Nested List",
        component: NestedList,
        isPrivate: true
    },
    {
        path: '/user-profile',
        layout: DefaultLayout,
        name: "User Profile",
        component: UserProfile,
        isPrivate: true
    },
    {
        path: '/bill-client-submission',
        layout: DefaultLayout,
        name: "Solicitud de Facturación",
        component: BillClientSubmission,
        isPrivate: true
    },
    {
        path: '/bill-client-submission-history',
        layout: DefaultLayout,
        name: "Historial de Solicitudes de Facturación",
        component: BillClientSubmissionHistory,
        isPrivate: true
    },
    {
        path: '/apex-charts-testing',
        layout: DefaultLayout,
        name: "Gráficas de Apex Charts",
        component: ApexCharts,
        isPrivate: true
    },
    {
        path: '/purchase-bill-modify',
        layout: DefaultLayout,
        name: "Facturas por Procesar",
        component: PurchaseBillModifier,
        isPrivate: true,
        exact: true
    },
    {
        path: '/purchase-bill-pending',
        layout: DefaultLayout,
        name: "Facturas por Procesar",
        component: PurchaseBillList,
        isPrivate: true,
        exact: true
    },
    {
        path: '/product-new',
        layout: DefaultLayout,
        name: "Agregar Nuevo Producto",
        component: Product,
        isPrivate: true,
        exact: true
    },
    {
        path: '/bill-payment-detail-create',
        layout: DefaultLayout,
        name: 'Cargar Pago',
        component: BillPaymentDetailUpload,
        isPrivate: true,
    },
    {
        path: '/bill-payment-detail-approval',
        layout: DefaultLayout,
        name: 'Aprobar Pago',
        component: BillPaymentDetailApproval,
        isPrivate: true,
    },
    { path: '/dashboard', name: 'Dashboard', component: Dashboard, layout: DefaultLayout, isPrivate: true },
    // { path: '/theme', name: 'Theme', component: Colors, exact: true, layout: DefaultLayout },
    // { path: '/theme/colors', name: 'Colors', component: Colors, layout: DefaultLayout },
    // { path: '/theme/typography', name: 'Typography', component: Typography, layout: DefaultLayout },
    // { path: '/base', name: 'Base', component: Cards, exact: true, layout: DefaultLayout },
    // { path: '/base/accordion', name: 'Accordion', component: Accordion, layout: DefaultLayout },
    // { path: '/base/breadcrumbs', name: 'Breadcrumbs', component: Breadcrumbs },
    // { path: '/base/cards', name: 'Cards', component: Cards, layout: DefaultLayout },
    // { path: '/base/carousels', name: 'Carousel', component: Carousels, layout: DefaultLayout },
    // { path: '/base/collapses', name: 'Collapse', component: Collapses, layout: DefaultLayout },
    // { path: '/base/list-groups', name: 'List Groups', component: ListGroups, layout: DefaultLayout },
    // { path: '/base/navs', name: 'Navs', component: Navs, layout: DefaultLayout },
    // { path: '/base/paginations', name: 'Paginations', component: Paginations, layout: DefaultLayout },
    // { path: '/base/popovers', name: 'Popovers', component: Popovers, layout: DefaultLayout },
    // { path: '/base/progress', name: 'Progress', component: Progress, layout: DefaultLayout },
    // { path: '/base/spinners', name: 'Spinners', component: Spinners, layout: DefaultLayout },
    // { path: '/base/tables', name: 'Tables', component: Tables, layout: DefaultLayout },
    // { path: '/base/tooltips', name: 'Tooltips', component: Tooltips, layout: DefaultLayout },
    // { path: '/buttons', name: 'Buttons', component: Buttons, exact: true, layout: DefaultLayout },
    // { path: '/buttons/buttons', name: 'Buttons', component: Buttons, layout: DefaultLayout },
    // { path: '/buttons/dropdowns', name: 'Dropdowns', component: Dropdowns, layout: DefaultLayout },
    // { path: '/buttons/button-groups', name: 'Button Groups', component: ButtonGroups, layout: DefaultLayout },
    // { path: '/charts', name: 'Charts', component: Charts, layout: DefaultLayout },
    // { path: '/forms', name: 'Forms', component: FormControl, exact: true, layout: DefaultLayout },
    // { path: '/forms/form-control', name: 'Form Control', component: FormControl, layout: DefaultLayout },
    // { path: '/forms/select', name: 'Select', component: Select },
    // { path: '/forms/checks-radios', name: 'Checks & Radios', component: ChecksRadios, layout: DefaultLayout },
    // { path: '/forms/range', name: 'Range', component: Range, layout: DefaultLayout },
    // { path: '/forms/input-group', name: 'Input Group', component: InputGroup, layout: DefaultLayout },
    // { path: '/forms/floating-labels', name: 'Floating Labels', component: FloatingLabels, layout: DefaultLayout },
    // { path: '/forms/layout', name: 'Layout', component: LayoutCus, layout: DefaultLayout },
    // { path: '/forms/validation', name: 'Validation', component: Validation, layout: DefaultLayout },
    // { path: '/icons', exact: true, name: 'Icons', component: CoreUIIcons, layout: DefaultLayout },
    // { path: '/icons/coreui-icons', name: 'CoreUI Icons', component: CoreUIIcons, layout: DefaultLayout },
    // { path: '/icons/flags', name: 'Flags', component: Flags, layout: DefaultLayout },
    // { path: '/icons/brands', name: 'Brands', component: Brands, layout: DefaultLayout },
    // { path: '/notifications', name: 'Notifications', component: Alerts, exact: true, layout: DefaultLayout },
    // { path: '/notifications/alerts', name: 'Alerts', component: Alerts, layout: DefaultLayout },
    // { path: '/notifications/badges', name: 'Badges', component: Badges, layout: DefaultLayout },
    // { path: '/notifications/modals', name: 'Modals', component: Modals, layout: DefaultLayout },
    // { path: '/notifications/toasts', name: 'Toasts', component: Toasts, layout: DefaultLayout },
    // { path: '/login', name: 'Login', component: Login },
    // { path: '/register', name: 'Register', component: Register },
    // { path: '/404', name: '404', component: Page404 },
    // { path: '/500', name: '500', component: Page500 },
    // { path: '/widgets', name: 'Widgets', component: Widgets, layout: DefaultLayout },
];

export default routes;