import React, {
  useRef,
  useEffect,
  useState,
  forwardRef,
  useImperativeHandle,
} from 'react';
import {StyleSheet} from 'react-native';
import {RNCamera} from 'react-native-camera';

const styles = StyleSheet.create({
  camera: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  cameraCropImage: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    opacity: 0.9,
  },
});

export const CameraTB = forwardRef(
  (
    {
      onBarCodeDetected,
      barCodeTypes = [
        RNCamera.Constants.BarCodeType.code39,
        RNCamera.Constants.BarCodeType.code39mod43,
        RNCamera.Constants.BarCodeType.code93,
        RNCamera.Constants.BarCodeType.code128,
        RNCamera.Constants.BarCodeType.ean8,
        RNCamera.Constants.BarCodeType.ean13,
      ],
      children,
    },
    ref,
  ) => {
    useImperativeHandle(ref, () => ({
      capture: (option = {}) => {
        if (_camera.current) {
          return _camera.current
            .takePictureAsync(option)
            .then(data => data)
            .catch(error => error);
        }
      },
    }));
    const _camera = useRef();
    const [mounted, setMounted] = useState(true);

    const _onBarCodeRead = barCodeData => {
      if (onBarCodeDetected) {
        onBarCodeDetected(barCodeData);
      }
    };

    useEffect(() => {
      return () => {
        setMounted(false);
      };
    }, []);

    return mounted ? (
      <RNCamera
        ref={_camera}
        style={[styles.camera]}
        captureAudio={false}
        type={RNCamera.Constants.Type.back}
        autoFocus={'on'}
        autoFocusPointOfInterest={{x: 0.5, y: 0.5}}
        whiteBalance={'auto'}
        flashMode={RNCamera.Constants.FlashMode.torch}
        barCodeTypes={[
          RNCamera.Constants.BarCodeType.code39,
          RNCamera.Constants.BarCodeType.code39mod43,
          RNCamera.Constants.BarCodeType.code93,
          RNCamera.Constants.BarCodeType.code128,
          RNCamera.Constants.BarCodeType.ean8,
          RNCamera.Constants.BarCodeType.ean13,
        ]}
        androidCameraPermissionOptions={{
          title: 'Permission to use camera',
          message: 'We need your permission to use your camera',
          buttonPositive: 'Ok',
          buttonNegative: 'Cancel',
        }}
        onBarCodeRead={_onBarCodeRead}>
        {children}
      </RNCamera>
    ) : null;
  },
);

export const CameraCropImage = forwardRef(
  (
    {
      onBarCodeDetected,
      barCodeTypes = [
        RNCamera.Constants.BarCodeType.code39,
        RNCamera.Constants.BarCodeType.code39mod43,
        RNCamera.Constants.BarCodeType.code93,
        RNCamera.Constants.BarCodeType.code128,
      ],
      children,
    },
    ref,
  ) => {
    useImperativeHandle(ref, () => ({
      capture: (option = {}) => {
        if (_camera.current) {
          return _camera.current
            .takePictureAsync(option)
            .then(data => data)
            .catch(error => error);
        }
      },
    }));
    const _camera = useRef();
    const [mounted, setMounted] = useState(true);

    const _onBarCodeRead = barCodeData => {
      if (onBarCodeDetected) {
        onBarCodeDetected(barCodeData);
      }
    };

    useEffect(() => {
      return () => {
        setMounted(false);
      };
    }, []);

    return mounted ? (
      <RNCamera
        ref={_camera}
        style={[styles.cameraCropImage]}
        captureAudio={false}
        type={RNCamera.Constants.Type.back}
        autoFocus={'on'}
        autoFocusPointOfInterest={{x: 0.5, y: 0.5}}
        whiteBalance={'auto'}
        flashMode={RNCamera.Constants.FlashMode.torch}
        barCodeTypes={[
          RNCamera.Constants.BarCodeType.code39,
          RNCamera.Constants.BarCodeType.code39mod43,
          RNCamera.Constants.BarCodeType.code93,
          RNCamera.Constants.BarCodeType.code128,
        ]}
        ratio={'4:4'}
        androidCameraPermissionOptions={{
          title: 'Permission to use camera',
          message: 'We need your permission to use your camera',
          buttonPositive: 'Ok',
          buttonNegative: 'Cancel',
        }}
        onBarCodeRead={_onBarCodeRead}>
        {children}
      </RNCamera>
    ) : null;
  },
);

export const CameraQrCode = forwardRef(
  (
    {
      onBarCodeDetected,
      barCodeTypes = [RNCamera.Constants.BarCodeType.qr],
      children,
    },
    ref,
  ) => {
    useImperativeHandle(ref, () => ({
      capture: (option = {}) => {
        if (_camera.current) {
          return _camera.current
            .takePictureAsync(option)
            .then(data => data)
            .catch(error => error);
        }
      },
    }));
    const _camera = useRef();
    const [mounted, setMounted] = useState(true);

    const _onBarCodeRead = barCodeData => {
      if (onBarCodeDetected) {
        onBarCodeDetected(barCodeData);
      }
    };

    useEffect(() => {
      return () => {
        setMounted(false);
      };
    }, []);

    return mounted ? (
      <RNCamera
        ref={_camera}
        style={[styles.camera]}
        captureAudio={false}
        type={RNCamera.Constants.Type.back}
        autoFocus={'on'}
        autoFocusPointOfInterest={{x: 0.5, y: 0.5}}
        whiteBalance={'auto'}
        flashMode={RNCamera.Constants.FlashMode.torch}
        barCodeTypes={[RNCamera.Constants.BarCodeType.qr]}
        androidCameraPermissionOptions={{
          title: 'Permission to use camera',
          message: 'We need your permission to use your camera',
          buttonPositive: 'Ok',
          buttonNegative: 'Cancel',
        }}
        onBarCodeRead={_onBarCodeRead}>
        {children}
      </RNCamera>
    ) : null;
  },
);
