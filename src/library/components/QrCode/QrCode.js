import React, {useMemo, memo} from 'react';
import Svg, {Defs, G, Path, Rect, LinearGradient, Stop} from 'react-native-svg';
import genMatrix from './genMatrix';
import transformMatrixIntoPath from './transformMatrixIntoPath';

const QRCodeComponent = ({
  value = 'this is a QR code',
  size = 100,
  color = 'black',
  backgroundColor = 'white',
  quietZone = 0,
  enableLinearGradient = false,
  gradientDirection = ['0%', '0%', '100%', '100%'],
  linearGradient = ['rgb(255,0,0)', 'rgb(0,255,255)'],
  ecl = 'M',
  version = 9,
  getRef,
  onError,
}) => {
  const result = useMemo(() => {
    try {
      return transformMatrixIntoPath(genMatrix(value, ecl, version), size);
    } catch (error) {
      if (onError && typeof onError === 'function') {
        onError(error);
      } else {
        // Pass the error when no handler presented
        throw error;
      }
    }
  }, [value, size, ecl, version, onError]);

  if (!result) {
    return null;
  }

  const {path, cellSize} = result;

  return (
    <Svg
      ref={getRef}
      viewBox={[
        -quietZone,
        -quietZone,
        size + quietZone * 2,
        size + quietZone * 2,
      ].join(' ')}
      width={size}
      height={size}>
      <Defs>
        <LinearGradient
          id="grad"
          x1={gradientDirection[0]}
          y1={gradientDirection[1]}
          x2={gradientDirection[2]}
          y2={gradientDirection[3]}>
          <Stop offset="0" stopColor={linearGradient[0]} stopOpacity="1" />
          <Stop offset="1" stopColor={linearGradient[1]} stopOpacity="1" />
        </LinearGradient>
      </Defs>
      <G>
        <Rect
          x={-quietZone}
          y={-quietZone}
          width={size + quietZone * 2}
          height={size + quietZone * 2}
          fill={backgroundColor}
        />
      </G>
      <G>
        <Path
          d={path}
          stroke={enableLinearGradient ? 'url(#grad)' : color}
          strokeWidth={cellSize}
        />
      </G>
    </Svg>
  );
};

export const QRCode = memo(QRCodeComponent);
