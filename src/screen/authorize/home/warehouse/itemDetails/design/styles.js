import {StyleSheet} from 'react-native';
import {APP_COLOR} from 'appConfig';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: APP_COLOR,
  },
  modal: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  wrapDialog: {
    width: '85%',
    backgroundColor: '#FFFFFF',
    borderRadius: 5,
    paddingHorizontal: 15,
    paddingVertical: 5,
    paddingBottom: 10,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  rowButton: {
    marginTop: 25,
    flexDirection: 'row',
    paddingHorizontal: 15,
    justifyContent: 'space-between',
  },
  textTitle: {
    fontSize: 15,
    paddingTop: 5,
    fontWeight: '700',
  },
  viewSpace: {
    flex: 1,
  },
  textMsg: {
    textAlign: 'center',
    color: '#333333',
  },
  columnText: {
    alignItems: 'center',
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'row',
    width: '25%',
  },
  columnText1: {
    width: '35%',
    justifyContent: 'flex-end',
  },
  columnText2: {
    justifyContent: 'flex-end',
    width: '20%',
  },
});
