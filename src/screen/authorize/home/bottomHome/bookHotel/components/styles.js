import {Dimensions, StyleSheet} from 'react-native';
import {APP_COLOR} from 'appConfig';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  onTop: {
    position: 'absolute',
    width: 60,
    height: 60,
    borderRadius: 60 / 2,
    backgroundColor: APP_COLOR,
    alignItems: 'center',
    justifyContent: 'center',
    right: 10,
    bottom: 10,
  },
  arrow: {
    fontSize: 48,
  },
  viewSpace: {
    paddingVertical: 5,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  divide: {
    width: '100%',
    height: StyleSheet.hairlineWidth * 2,
    opacity: 0.8,
    backgroundColor: 'gray',
  },
  root: {
    flex: 1,
  },
  wrapHeaderLeft: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center',
    height: 50,
    marginBottom: 10,
  },
  fullParent: {
    flex: 1,
    flexDirection: 'row',
  },
  textHeader: {
    fontSize: 14,
    paddingHorizontal: 2,
    marginHorizontal: 2,
  },
  flatList: {
    width: '100%',
    paddingHorizontal: 15,
  },
});
