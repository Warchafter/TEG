import FetchBankListLoader from '../../Loaders/Bank/FetchBankListLoader';

import FetchCurrencyListLoader from '../../Loaders/Currency/FetchCurrencyListLoader';

import FetchPaymentMethodListLoader from '../../Loaders/PaymentMethod/FetchPaymentMethodListLoader';

import FetchPaymentStatusListLoader from '../../Loaders/PaymentStatus/FetchPaymentStatusListLoader';

import FetchPurchaseStatusListLoader from '../../Loaders/PurchaseStatus/FetchPurchaseStatusListLoader';

import CreateBillDetailLoader from '../../Loaders/BillDetail/CreateBillDetailLoader';
import ModifyBillDetailLoader from '../../Loaders/BillDetail/ModifyBillDetailLoader';
import DeleteBillDetailLoader from '../../Loaders/BillDetail/DeleteBillDetailLoader';
import FetchBillDetailLoader from '../../Loaders/BillDetail/FetchBillDetailLoader';
import FetchBillDetailListLoader from '../../Loaders/BillDetail/FetchBillDetailListLoader';

import CreateBillPaymentDetailLoader from '../../Loaders/BillPaymentDetail/CreateBillPaymentDetailLoader';
import ModifyBillPaymentDetailLoader from '../../Loaders/BillPaymentDetail/ModifyBillPaymentDetailLoader';
import FetchBillPaymentDetailLoader from '../../Loaders/BillPaymentDetail/FetchBillPaymentDetailLoader';
import FetchBillPaymentDetailListLoader from '../../Loaders/BillPaymentDetail/FetchBillPaymentDetailListLoader';

import CreateBillProductCharacteristicLoader from '../../Loaders/BillProductCharacteristic/CreateBillProductCharacteristicLoader';
import ModifyBillProductCharacteristicLoader from '../../Loaders/BillProductCharacteristic/ModifyBillProductCharacteristicLoader';
import DeleteBillProductCharacteristicLoader from '../../Loaders/BillProductCharacteristic/DeleteBillProductCharacteristicLoader';
import FetchBillProductCharacteristicLoader from '../../Loaders/BillProductCharacteristic/FetchBillProductCharacteristicLoader';
import FetchBillProductCharacteristicListLoader from '../../Loaders/BillProductCharacteristic/FetchBillProductCharacteristicListLoader';

import CreatePurchaseBillLoader from '../../Loaders/PurchaseBill/CreatePurchaseBillLoader';
import ModifyPurchaseBillLoader from '../../Loaders/PurchaseBill/ModifyPurchaseBillLoader';
import FetchPurchaseBillLoader from '../../Loaders/PurchaseBill/FetchPurchaseBillLoader';
import FetchPurchaseBillListLoader from '../../Loaders/PurchaseBill/FetchPurchaseBillListLoader';


export let bankButtonOptions = [
    {
        name: "Fetch List",
        component: <FetchBankListLoader />,
    }
]

export let currencyButtonOptions = [
    {
        name: "Fetch List",
        component: <FetchCurrencyListLoader />,
    }
]

export let paymentMethodButtonOptions = [
    {
        name: "Fetch List",
        component: <FetchPaymentMethodListLoader />,
    }
]

export let paymentStatusButtonOptions = [
    {
        name: "Fetch List",
        component: <FetchPaymentStatusListLoader />,
    }
]

export let purchaseStatusButtonOptions = [
    {
        name: "Fetch List",
        component: <FetchPurchaseStatusListLoader />,
    }
]

export let billDetailButtonOptions = [
    {
        name: "Create",
        component: <CreateBillDetailLoader />
    },
    {
        name: "Modify",
        component: <ModifyBillDetailLoader />
    },
    {
        name: "Delete",
        component: <DeleteBillDetailLoader />
    },
    {
        name: "Fetch Detail",
        component: <FetchBillDetailLoader />
    },
    {
        name: "Fetch List",
        component: <FetchBillDetailListLoader />
    }
]

export let billPaymentDetailButtonOptions = [
    {
        name: "Create",
        component: <CreateBillPaymentDetailLoader />
    },
    {
        name: "Modify",
        component: <ModifyBillPaymentDetailLoader />
    },
    {
        name: "Fetch Detail",
        component: <FetchBillPaymentDetailLoader />
    },
    {
        name: "Fetch List",
        component: <FetchBillPaymentDetailListLoader />
    }
]

export let billProductCharacteristicButtonOptions = [
    {
        name: "Create",
        component: <CreateBillProductCharacteristicLoader />
    },
    {
        name: "Modify",
        component: <ModifyBillProductCharacteristicLoader />
    },
    {
        name: "Delete",
        component: <DeleteBillProductCharacteristicLoader />
    },
    {
        name: "Fetch Detail",
        component: <FetchBillProductCharacteristicLoader />
    },
    {
        name: "Fetch List",
        component: <FetchBillProductCharacteristicListLoader />
    }
]

export let purchaseBillButtonOptions = [
    {
        name: "Create",
        component: <CreatePurchaseBillLoader />
    },
    {
        name: "Modify",
        component: <ModifyPurchaseBillLoader />
    },
    {
        name: "Fetch Detail",
        component: <FetchPurchaseBillLoader />
    },
    {
        name: "Fetch List",
        component: <FetchPurchaseBillListLoader />
    }
]