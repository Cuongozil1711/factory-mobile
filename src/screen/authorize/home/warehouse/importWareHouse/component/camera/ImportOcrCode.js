import * as React from 'react';
import {useCallback, useRef, useState} from 'react';
import {Image, StyleSheet} from 'react-native';
import {ButtonCapture} from './buttonCapture';
import {CropImageToText} from '../../../../../../../nativeModule/CropImageModule';
import {APP_COLOR} from '../../../../../../../config';
import {
  hideLoading,
  showLoading,
} from '../../../../../../../until/dialogHolder';
import {Block} from '../../../../../../../library/components/Block/Block';
import {View} from 'native-base';
import {useDispatch} from 'react-redux';
import {CameraCropImage, Screen} from '../../../../../../../library/components';
import {BarcodeMask} from '@nartc/react-native-barcode-mask';
import {useIsFocused} from '@react-navigation/native';
import {getDetailsExportByCode} from '../../../exportWareHouse/redux/ExportWareHouseApi';
import {APP_SCREEN} from '../../../../../../../common/screenType';

export const OPTION_CAPTURE_CAMERA = {
  quality: 0.75,
  orientation: 'portrait',
  width: 320,
  height: 50,
  forceUpOrientation: true,
  fixOrientation: true,
  pauseAfterCapture: true,
  // fixOrientation: true,
};

const createFormDataWithPhoto = (photo, body, keyPhoto = 'gifFile') => {
  const data = new FormData();
  if (Array.isArray(photo)) {
    photo.forEach(element => {
      data.append(keyPhoto, {
        name: element.filename,
        uri: element.uri,
        type: element.type,
      });
    });
  }

  Object.keys(body).forEach(key => {
    data.append(key, body[key]);
  });
  return data;
};

export const styles = StyleSheet.create({
  content: {
    flex: 1,
    paddingTop: 1,
  },
  wrapHeader: {
    width: '100%',
    paddingVertical: 5,
    paddingHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'flex-start',
    backgroundColor: APP_COLOR,
  },
  titleHeader: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  preview: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    backgroundColor: 'red',
  },
  imgPreview: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  shotView: {
    position: 'absolute',
    overflow: 'hidden',
    width: 300,
    height: 300,
    borderWidth: 1,
    borderColor: 'red',
    alignSelf: 'center',
  },
});

export {createFormDataWithPhoto};

export const ImportOcrCode = ({navigation, route}) => {
  /**
   * Lấy dữ liệu redux
   */
  /**
   * Dispatcher redux
   */
  const dispatch = useDispatch();
  /**
   * Reference camera => chụp ảnh
   */
  const _camera = useRef();
  /**
   * Kiểm tra màn hình có đang được focus
   */
  const IsFocused = useIsFocused();
  /**
   * Đường dẫn ảnh preview (vừa được chụp)
   */
  const [uri, setUri] = useState(null);
  /**
   * Sau khi render, set lại biến để lấy kích trước màn hình trừ phần header
   */
  const [layoutView, setLayoutView] = useState({width: 0, height: 0});
  /**
   * Xóa đường dẫn preview
   */
  const _removeUri = useCallback(() => {
    setUri(null);
  }, []);

  const cropImageScreen = uri => {
    // //console.log(
    //   'layoutView?.width: ' + layoutView?.width + ' ' + layoutView?.height,
    // );
    CropImageToText(uri, responseCropImage);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const responseCropImage = useCallback(textCrop => {
    hideLoading();
    _removeUri();
    onViewItem('RX1667698019929');
  });

  /**
   * Chụp ảnh, đẩy lên server detect OCR
   */
  const onCapture = async () => {
    try {
      //console.log('onCapture');
      if (_camera.current) {
        showLoading();
        // Sync capture camera
        const dataCapture = await _camera.current.capture(
          OPTION_CAPTURE_CAMERA,
        );
        //console.log('uri:  + ' + dataCapture.uri);
        // Set đường dẫn preview
        setUri(dataCapture.uri);
        await cropImageScreen(dataCapture.uri);
      }
    } catch (e) {
      hideLoading();
    }
  };
  /**
   * Lấy thông số view to nhất màn hình
   */
  const _onLayout = useCallback(
    ({
      nativeEvent: {
        layout: {height, width},
      },
    }) => {
      setLayoutView({width: width, height: height});
    },
    [],
  );

  const onLayoutMeasuredHandler = event => {
    //console.log('Event: ' + JSON.stringify(event));
  };

  const onSucessGetITem = response => {
    //console.log(response);
    navigation.navigate(APP_SCREEN.HOME.IMPORT_WAREHOUSE.DETAIL_OCR, {
      ...response,
    });
  };

  const onViewItem = code => {
    dispatch(getDetailsExportByCode(code, onSucessGetITem));
  };

  return (
    <Screen>
      <Block block onLayout={_onLayout}>
        {uri === null && IsFocused && (
          <CameraCropImage ref={_camera}>
            <BarcodeMask
              width={320}
              height={50}
              showAnimatedLine={false}
              backgroundColor="black"
              maskOpacity={0.2}
              animatedLineColor={'#00FF19'}
              edgeColor={'#00FF19'}
              edgeRadius={5}
              outerMaskOpacity={0.8}
              onLayoutMeasured={onLayoutMeasuredHandler}
            />
          </CameraCropImage>
        )}
        {uri === null && IsFocused && (
          <View style={{width: '100%', backgroundColor: APP_COLOR, height: 60}}>
            <ButtonCapture onPress={onCapture} />
          </View>
        )}
        {uri && (
          <Block style={[styles.preview]}>
            <Image
              style={[styles.imgPreview]}
              source={{
                uri: uri,
              }}
            />
          </Block>
        )}
      </Block>
    </Screen>
  );
};

// export const ImportOcrCode = ({navigation, route}) => {
//   const pdfScannerElement = useRef(null);
//   const [data, setData] = useState({});
//   const [allowed, setAllowed] = useState(false);
//   const dispatch = useDispatch();
//
//   useEffect(() => {
//     async function requestCamera() {
//       const result = await Permissions.request(
//         Platform.OS === 'android'
//           ? 'android.permission.CAMERA'
//           : 'ios.permission.CAMERA',
//       );
//       if (result === 'granted') {
//         setAllowed(true);
//       }
//     }
//     requestCamera();
//   }, []);
//
//   function handleOnPressRetry() {
//     setData({});
//   }
//   async function requestOcr() {
//     await cropImageScreen(data.croppedImage);
//   }
//
//   const cropImageScreen = uri => {
//     CropImageToText(uri, responseCropImage);
//   };
//
//   // eslint-disable-next-line react-hooks/exhaustive-deps
//   const responseCropImage = useCallback(textCrop => {
//     hideLoading();
//     let detect = textCrop.split('(/[\\r\\n]+/)');
//     let dataSplit = [];
//     //console.log(textCrop);
//     //console.log(detect);
//     // navigate(APP_SCREEN.AUTHORIZE.JISEKI_004.RESULT_CROP, {
//     //   itemZaiSozaino: textCrop,
//     // }),
//     //   [textCrop];
//     onViewItem('RX1668090174669');
//   });
//
//   const onSucessGetITem = response => {
//     //console.log(response);
//     navigation.navigate(APP_SCREEN.HOME.EXPORT_WAREHOUSE.DETAIL, {
//       ...response,
//     });
//   };
//
//   const onViewItem = code => {
//     dispatch(getDetailsExportByCode(code, onSucessGetITem));
//   };
//
//   function handleOnPress() {
//     pdfScannerElement.current.capture();
//   }
//   if (!allowed) {
//     //console.log('You must accept camera permission');
//     return (
//       <View style={styles.permissions}>
//         <Text>You must accept camera permission</Text>
//       </View>
//     );
//   }
//
//   if (data.croppedImage) {
//     return (
//       <React.Fragment>
//         <Image source={{uri: data.croppedImage}} style={styles.preview} />
//         <ButtonCapture onPress={requestOcr} style={styles.button}>
//           <Text style={styles.buttonText}>Retry</Text>
//         </ButtonCapture>
//       </React.Fragment>
//     );
//   }
//   return (
//     <React.Fragment>
//       <Block block>
//         <Header
//           rightIcon={false}
//           iconApp={true}
//           navigation={navigation}
//           title={translate('ctp:importWareHouse:title')}
//         />
//         <DocumentScanner
//           ref={pdfScannerElement}
//           style={styles.scanner}
//           onPictureTaken={setData}
//           overlayColor="rgba(255,130,0, 0.7)"
//           enableTorch={false}
//           quality={0.5}
//         />
//         <View style={{width: '100%', backgroundColor: APP_COLOR, height: 60}}>
//           <ButtonCapture onPress={handleOnPress} style={styles.button}>
//             <Text style={styles.buttonText}>Take picture</Text>
//           </ButtonCapture>
//         </View>
//       </Block>
//     </React.Fragment>
//   );
// };
//
// const styles = StyleSheet.create({
//   scanner: {
//     flex: 1,
//     aspectRatio: undefined,
//   },
//   button: {
//     alignSelf: 'center',
//     position: 'absolute',
//     bottom: 32,
//   },
//   buttonText: {
//     backgroundColor: 'rgba(245, 252, 255, 0.7)',
//     fontSize: 32,
//   },
//   preview: {
//     flex: 1,
//     width: '100%',
//     resizeMode: 'cover',
//   },
//   permissions: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
// });
