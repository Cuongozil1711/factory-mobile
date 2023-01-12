import {configureStore} from '@reduxjs/toolkit';
import orderShopSlice from '../screen/authorize/home/bottomHome/bookHotel/redux/orderShopSlice';
import appReducers from '../screen/unAuthorize/login/redux/appReducers';
import itemReducers from '../screen/authorize/home/bottomHome/item/redux/itemReducers';
import homeShopSlice from '../screen/authorize/home/bottomHome/home/redux/homeShopSlice';
import importWareHouseSlice from '../screen/authorize/home/warehouse/importWareHouse/redux/ImportWareHouseSlice';
import receiptImportWareHouseSlice from '../screen/authorize/home/warehouse/receiptImportWareHouse/redux/ReceiptImportWareHouseSlice';
import exportWareHouseSlice from '../screen/authorize/home/warehouse/exportWareHouse/redux/ExportWareHouseSlice';
import receiptExportWareHouseSlice from '../screen/authorize/home/warehouse/receiptExportWareHouse/redux/ReceiptExportWareHouseSlice';
import managerSlice from '../screen/authorize/home/bottomHome/manager/redux/ManagerSlice';
import promotionSlice from '../screen/authorize/home/warehouse/promotion/redux/PromotionSlice';
import customerSlice from '../screen/authorize/home/warehouse/customer/redux/CustomerSlice';
import employeeSlice from '../screen/authorize/home/warehouse/employee/redux/EmployeeSlice';
import debitSlice from '../screen/authorize/home/warehouse/debit/redux/DebitSlice';
import profileSlice from '../screen/authorize/home/bottomHome/profile/redux/ProfileSlice';

export const store = configureStore({
  reducer: {
    app: appReducers,
    orderShop: orderShopSlice,
    item: itemReducers,
    home: homeShopSlice,
    importWareHouse: importWareHouseSlice,
    receiptImportWareHouse: receiptImportWareHouseSlice,
    receiptExportWareHouse: receiptExportWareHouseSlice,
    exportWareHouse: exportWareHouseSlice,
    manager: managerSlice,
    promotion: promotionSlice,
    customer: customerSlice,
    employee: employeeSlice,
    debit: debitSlice,
    profile: profileSlice,
  },
});
