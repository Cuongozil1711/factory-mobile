import {StyleSheet} from 'react-native';

const RADIUS = 8;
export const styles = StyleSheet.create({
  top: {
    borderWidth: 1,
    borderBottomWidth: 0,
  },
  middle: {
    borderWidth: 1,
    borderBottomWidth: 0,
  },
  bottom: {
    borderWidth: 1,
    borderBottomLeftRadius: RADIUS,
    borderBottomRightRadius: RADIUS,
  },
  soloRound: {
    borderWidth: 1,
    borderRadius: RADIUS,
  },
  soloStraight: {
    borderWidth: 1,
  },
  clear: {
    borderWidth: 1,
  },
});
