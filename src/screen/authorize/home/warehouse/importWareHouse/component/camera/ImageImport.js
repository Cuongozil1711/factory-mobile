import * as React from 'react';
import {useCallback, useEffect, useRef, useState} from 'react';
import {Image, Platform, StyleSheet, View} from 'react-native';
import {ButtonCapture} from './buttonCapture';
import {useDispatch} from 'react-redux';
import {hideLoading} from '../../../../../../../until/dialogHolder';
import {CustomText} from '../../../../../../../library/components';
import {Block} from '../../../../../../../library/components/Block/Block';
import {translate} from '../../../../../../../common/i18n/translate';
import Header from '../../../../../../../components/Header';
import {APP_COLOR} from '../../../../../../../config';
import {APP_SCREEN} from '../../../../../../../common/screenType';
import DocumentScanner from '@woonivers/react-native-document-scanner';
import {getDetailsImport, uploadImage} from '../../redux/ImportWareHouseApi';
import {createFormDataWithPhoto} from './ImportOcrCode';
export const ImageImport = ({navigation, route}) => {
  const pdfScannerElement = useRef(null);
  const [data, setData] = useState({});
  const [allowed, setAllowed] = useState(false);
  const dispatch = useDispatch();
  //console.log('route?.params: ' + route?.params);

  useEffect(() => {
    async function requestCamera() {
      setAllowed(true);
    }
    requestCamera();
  }, []);

  function handleOnPressRetry() {
    setData({});
  }
  async function requestOcr() {
    const dataArray = new FormData();
    //console.log(data);
    const image = {
      filename: 'import.jpg',
      uri: data.croppedImage,
      type: 'image/jpeg',
    };
    // Tạo form data làm body
    const formData = createFormDataWithPhoto([image], {}, 'gifFile');
    // Dispatch action redux gọi OCR
    // dispatch(
    //   onPostLabel(
    //     API_POST_LABEL_MSA_0001,
    //     formData,
    //     onResultLabel,
    //     onRequestFailure,
    //   ),
    // );
    //console.log(formData);
    dispatch(uploadImage(route?.params, formData, onSucessGetITem));
  }

  const onSucessGetITem = response => {
    //console.log(response);
    hideLoading();
    navigation.navigate(APP_SCREEN.HOME.IMPORT_WAREHOUSE.MAIN);
  };

  function handleOnPress() {
    pdfScannerElement.current.capture();
  }
  if (!allowed) {
    //console.log('You must accept camera permission');
    return (
      <View style={styles.permissions}>
        <CustomText>You must accept camera permission</CustomText>
      </View>
    );
  }

  if (data.croppedImage) {
    return (
      <Block style={[styles.preview]}>
        <Image
          style={[styles.imgPreview]}
          source={{
            uri: data.croppedImage,
          }}
        />
        <ButtonCapture onPress={requestOcr} style={styles.button}>
          <CustomText style={styles.buttonText}>Retry</CustomText>
        </ButtonCapture>
      </Block>
    );
  }
  return (
    <React.Fragment>
      <Block block>
        <Header
          rightIcon={false}
          iconApp={true}
          navigation={navigation}
          title={translate('ctp:importWareHouse:title')}
        />
        <DocumentScanner
          ref={pdfScannerElement}
          style={styles.scanner}
          onPictureTaken={setData}
          overlayColor="rgba(255,130,0, 0.7)"
          enableTorch={false}
          quality={0.5}
          detectionCountBeforeCapture={5}
          detectionRefreshRateInMS={50}
        />
        <View style={{width: '100%', backgroundColor: APP_COLOR, height: 60}}>
          <ButtonCapture onPress={handleOnPress} style={styles.button}>
            <CustomText style={styles.buttonText}>Take picture</CustomText>
          </ButtonCapture>
        </View>
      </Block>
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  scanner: {
    flex: 1,
    aspectRatio: undefined,
  },
  button: {
    alignSelf: 'center',
    position: 'absolute',
    bottom: 32,
  },
  buttonText: {
    backgroundColor: 'rgba(245, 252, 255, 0.7)',
    fontSize: 32,
  },
  preview: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  imgPreview: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  permissions: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
