import React, {useEffect, useState} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {APP_SCREEN} from '../../common/screenType';
import {HomeHouseScreen} from './warehouse';
import {FooterTabScreen} from './warehouse/FooterTab';
import {useSelector} from 'react-redux';
import {getToken} from '../../screen/unAuthorize/login/redux/appReducers';
import {ItemDetails} from '../../screen/authorize/home/warehouse/itemDetails/ItemDetails';
import {ItemScanner} from '../../screen/authorize/home/warehouse/itemDetails/itemScanner/ItemScanner';
import {ItemOrder} from '../../screen/authorize/home/warehouse/itemOrder';
import {ImportWareHouse} from '../../screen/authorize/home/warehouse/importWareHouse';
import {ItemImportWareHouse} from '../../screen/authorize/home/warehouse/importWareHouse/component/ItemImportWareHouse';
import {ReceiptImportWareHouse} from '../../screen/authorize/home/warehouse/receiptImportWareHouse';
import {ExportWareHouse} from '../../screen/authorize/home/warehouse/exportWareHouse/ExportWareHouse';
import {ReceiptExportWareHouse} from '../../screen/authorize/home/warehouse/receiptExportWareHouse';
import {ImportWareHouseQrCode} from '../../screen/authorize/home/warehouse/importWareHouse/component/camera/ImportWareHouseQrCode';
import {ExportWareHouseQrCode} from '../../screen/authorize/home/warehouse/exportWareHouse/component/camera/ExportWareHouseQrCode';
import {Promotion} from '../../screen/authorize/home/warehouse/promotion/Promotion';
import {Customer} from '../../screen/authorize/home/warehouse/customer/Customer';
import {ItemByCustomer} from '../../screen/authorize/home/warehouse/customer/component/ItemByCustomer';
import {Employee} from '../../screen/authorize/home/warehouse/employee/Employee';
import {ItemByEmployee} from '../../screen/authorize/home/warehouse/employee/component/ItemByEmployee';
import {ItemExportWareHouse} from '../../screen/authorize/home/warehouse/exportWareHouse/ItemExportWareHouse';
import {Debit} from '../../screen/authorize/home/warehouse/debit/Debit';
import ProfileEdit from '../../screen/authorize/home/bottomHome/profile/component/ProfileEdit';
import {ImportWareHouseQrCodeQuickLy} from '../../screen/authorize/home/warehouse/importWareHouse/component/camera/ImportWareHouseQrCodeQuickLy';
import Splash from 'react-native-splash-screen';
import messaging from '@react-native-firebase/messaging';
import notifee from '@notifee/react-native';
import {saveString} from '../../until/storage';
import {ImportOcrCode} from '../../screen/authorize/home/warehouse/importWareHouse/component/camera/ImportOcrCode';
import {ItemOcrResponse} from '../../screen/authorize/home/warehouse/importWareHouse/component/camera/ItemOcrResponse';
import {ImageImport} from '../../screen/authorize/home/warehouse/importWareHouse/component/camera/ImageImport';
import {OrderDetail} from '../../screen/authorize/home/bottomHome/bookHotel/components/OrderDetail';
import {ImportQuickLy} from '../../screen/authorize/home/warehouse/importWareHouse/component/importQuickLy/ImportQuickLy';
const RootStack = createStackNavigator();
export const RootNavigation = () => {
  const token = useSelector(getToken);

  useEffect(() => {
    Splash.hide();
  }, []);

  useEffect(() => {
    getFCMToken();
    requestPermission();
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      //console.log('remoteMessage', JSON.stringify(remoteMessage));
      DisplayNotification(remoteMessage);
      // Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });
    return unsubscribe;
  }, []);

  const getFCMToken = () => {
    messaging()
      .getToken()
      .then(async token => {
        //console.log('token ===> :' + token);
        await saveString('tokenFirebase', token);
      });
  };

  const requestPermission = async () => {
    await notifee.requestPermission();
    const authStatus = await messaging().requestPermission();
    //console.log(authStatus);
  };

  async function DisplayNotification(remoteMessage) {
    // Create a channel
    const channelId = await notifee.createChannel({
      id: 'default',
      name: 'Default Channel',
    });

    // Display a notification
    await notifee.displayNotification({
      title: remoteMessage.notification.title,
      showTimestamp: 100,
      showChronometer: true,
      badgeCount: 5,
      body: remoteMessage.notification.body,
      android: {
        channelId,
        smallIcon: 'ic_launcher', // optional, defaults to 'ic_launcher'.
        // pressAction is needed if you want the notification to open the app when pressed
        pressAction: {
          id: 'default',
        },
      },
    });
  }

  async function localDisplayNotification() {
    // Create a channel
    const channelId = await notifee.createChannel({
      id: 'default',
      name: 'Default Channel',
    });

    // Display a notification
    notifee.displayNotification({
      title:
        '<p style="color: #4caf50;"><b>Styled HTMLTitle</span></p></b></p> &#128576;',
      subtitle: '&#129395;',
      body: 'The <p style="text-decoration: line-through">body can</p> also be <p style="color: #ffffff; background-color: #9c27b0"><i>styled too</i></p> &#127881;!',
      android: {
        channelId,
        color: '#4caf50',
        actions: [
          {
            title: '<b>Dance</b> &#128111;',
            pressAction: {id: 'dance'},
          },
          {
            title: '<p style="color: #f44336;"><b>Cry</b> &#128557;</p>',
            pressAction: {id: 'cry'},
          },
        ],
      },
    });
  }

  return (
    <RootStack.Navigator
      screenOptions={{
        headerMode: 'none',
        cardShadowEnabled: true,
      }}>
      {!token ? (
        <RootStack.Screen
          options={{gestureEnabled: false}}
          name={APP_SCREEN.UN_AUTHORIZE.ROOT}
          component={HomeHouseScreen}
        />
      ) : (
        <RootStack.Group>
          <RootStack.Screen
            options={{gestureEnabled: false}}
            name={APP_SCREEN.AUTHORIZE.ROOT}
            component={FooterTabScreen}
          />
          <RootStack.Screen
            options={{
              gestureEnabled: false,
              headerMode: 'none',
            }}
            name={APP_SCREEN.HOME.FOOTER_BOTTOM.ITEM.ITEM_DETAILS}
            component={ItemDetails}
          />
          <RootStack.Screen
            options={{
              gestureEnabled: false,
              headerMode: 'none',
            }}
            name={APP_SCREEN.HOME.FOOTER_BOTTOM.ITEM.ITEM_SCANNER}
            component={ItemScanner}
          />
          <RootStack.Screen
            options={{
              gestureEnabled: false,
              headerMode: 'none',
            }}
            name={APP_SCREEN.HOME.FOOTER_BOTTOM.ORDER.ITEM_ORDER}
            component={ItemOrder}
          />
          <RootStack.Screen
            options={{
              gestureEnabled: false,
              headerMode: 'none',
            }}
            name={APP_SCREEN.HOME.FOOTER_BOTTOM.ORDER.SEARCH_ORDER}
            component={OrderDetail}
          />
          <RootStack.Screen
            options={{
              gestureEnabled: false,
              headerMode: 'none',
            }}
            name={APP_SCREEN.HOME.IMPORT_WAREHOUSE.MAIN}
            component={ImportWareHouse}
          />
          <RootStack.Screen
            options={{
              gestureEnabled: false,
              headerMode: 'none',
            }}
            name={APP_SCREEN.HOME.EXPORT_WAREHOUSE.MAIN}
            component={ExportWareHouse}
          />

          <RootStack.Screen
            options={{
              gestureEnabled: false,
              headerMode: 'none',
            }}
            name={APP_SCREEN.HOME.IMPORT_WAREHOUSE.CAMERA}
            component={ImportWareHouseQrCode}
          />
          <RootStack.Screen
            options={{
              gestureEnabled: false,
              headerMode: 'none',
            }}
            name={APP_SCREEN.HOME.IMPORT_WAREHOUSE.CAMERA_QUICKLY}
            component={ImportWareHouseQrCodeQuickLy}
          />
          <RootStack.Screen
            options={{
              gestureEnabled: false,
              headerMode: 'none',
            }}
            name={APP_SCREEN.HOME.IMPORT_WAREHOUSE.IMPORT_QUICKLY}
            component={ImportQuickLy}
          />
          <RootStack.Screen
            options={{
              gestureEnabled: false,
              headerMode: 'none',
            }}
            name={APP_SCREEN.HOME.IMPORT_WAREHOUSE.CAMERA_OCR}
            component={ImportOcrCode}
          />
          <RootStack.Screen
            options={{
              gestureEnabled: false,
              headerMode: 'none',
            }}
            name={APP_SCREEN.HOME.IMPORT_WAREHOUSE.DETAIL_ITEM_IMAGE}
            component={ImageImport}
          />
          <RootStack.Screen
            options={{
              gestureEnabled: false,
              headerMode: 'none',
            }}
            name={APP_SCREEN.HOME.EXPORT_WAREHOUSE.CAMERA}
            component={ExportWareHouseQrCode}
          />
          <RootStack.Screen
            options={{
              gestureEnabled: false,
              headerMode: 'none',
            }}
            name={APP_SCREEN.HOME.IMPORT_WAREHOUSE.DETAIL}
            component={ItemImportWareHouse}
          />
          <RootStack.Screen
            options={{
              gestureEnabled: false,
              headerMode: 'none',
            }}
            name={APP_SCREEN.HOME.RECEIPT_IMPORT_WAREHOUSE.MAIN}
            component={ReceiptImportWareHouse}
          />
          <RootStack.Screen
            options={{
              gestureEnabled: false,
              headerMode: 'none',
            }}
            name={APP_SCREEN.HOME.EXPORT_WAREHOUSE.DETAIL}
            component={ItemExportWareHouse}
          />
          <RootStack.Screen
            options={{
              gestureEnabled: false,
              headerMode: 'none',
            }}
            name={APP_SCREEN.HOME.IMPORT_WAREHOUSE.DETAIL_OCR}
            component={ItemOcrResponse}
          />
          <RootStack.Screen
            options={{
              gestureEnabled: false,
              headerMode: 'none',
            }}
            name={APP_SCREEN.HOME.RECEIPT_EXPORT_WAREHOUSE.MAIN}
            component={ReceiptExportWareHouse}
          />
          <RootStack.Screen
            options={{
              gestureEnabled: false,
              headerMode: 'none',
            }}
            name={APP_SCREEN.HOME.PROMOTION.MAIN}
            component={Promotion}
          />
          <RootStack.Screen
            options={{
              gestureEnabled: false,
              headerMode: 'none',
            }}
            name={APP_SCREEN.HOME.CUSTOMER.MAIN}
            component={Customer}
          />
          <RootStack.Screen
            options={{
              gestureEnabled: false,
              headerMode: 'none',
            }}
            name={APP_SCREEN.HOME.CUSTOMER.ORDER}
            component={ItemByCustomer}
          />
          <RootStack.Screen
            options={{
              gestureEnabled: false,
              headerMode: 'none',
            }}
            name={APP_SCREEN.HOME.EMPLOYEE.MAIN}
            component={Employee}
          />
          <RootStack.Screen
            options={{
              gestureEnabled: false,
              headerMode: 'none',
            }}
            name={APP_SCREEN.HOME.EMPLOYEE.ORDER}
            component={ItemByEmployee}
          />
          <RootStack.Screen
            options={{
              gestureEnabled: false,
              headerMode: 'none',
            }}
            name={APP_SCREEN.HOME.DEBIT.MAIN}
            component={Debit}
          />
          <RootStack.Screen
            options={{
              gestureEnabled: false,
              headerMode: 'none',
            }}
            name={APP_SCREEN.HOME.PROFILE_EDIT}
            component={ProfileEdit}
          />
        </RootStack.Group>
      )}
    </RootStack.Navigator>
  );
};
