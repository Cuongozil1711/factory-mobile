import React, {
  memo,
  useState,
  forwardRef,
  useImperativeHandle,
  useRef,
  useCallback,
} from 'react';
import {Modal, Radio, FormControl, Input, Button} from 'native-base';
import {useSelector} from 'react-redux';
import {getWareHouse} from '../../../screen/authorize/home/bottomHome/manager/redux/ManagerSlice';
import {Select, Center, CheckIcon, WarningOutlineIcon} from 'native-base';
import {APP_COLOR} from '../../../config';
import {getListReceiptImportWareHouse} from '../../../screen/authorize/home/warehouse/receiptImportWareHouse/redux/ReceiptImportWareHouseSlice';
export const ModalReceipt = forwardRef((props, ref) => {
  const [defaultData, setDetault] = useState();
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
  const listReceipt = useSelector(getListReceiptImportWareHouse);
  const [data, setData] = useState({
    idReceiptImport: null,
  });
  useImperativeHandle(ref, () => ({
    show: (onChange, times) => {
      setData({
        idReceiptImport: null,
      });
      setDetault(times);
      _callback.current = onChange;
      setIsVisible(true);
    },
  }));
  const _callback = useRef(null);

  const _onItemPress = useCallback(
    item => {
      if (typeof _callback.current === 'function') {
        _callback.current(item);
      }
      _hideModal();
    },
    [_hideModal],
  );

  const onSave = () => {
    if (data?.idReceiptImport) {
      setIsVisible(false);
      _onItemPress({
        ...data,
        name: listReceipt.find(x => x.id === data?.idReceiptImport)?.name,
      });
    }
  };

  const _hideModal = useCallback(() => {
    setIsVisible(false);
    _callback.current = null;
  }, []);

  const [isVisible, setIsVisible] = useState(false);

  return (
    <Modal
      isOpen={isVisible}
      onClose={() => setIsVisible(false)}
      initialFocusRef={initialRef}
      finalFocusRef={finalRef}>
      <Modal.Content>
        <Modal.CloseButton />
        <Modal.Header>Chọn phiếu nhập</Modal.Header>
        <Modal.Body>
          <Center>
            <FormControl isRequired isInvalid>
              <FormControl.Label>
                {defaultData === 1
                  ? 'Chọn phiếu nhập hàng'
                  : 'Chọn phiếu xuất hàng'}
              </FormControl.Label>
              <Select
                minWidth="200"
                accessibilityLabel="Chọn phiếu"
                placeholder="Chọn phiếu"
                _selectedItem={{
                  bg: 'teal.600',
                  endIcon: <CheckIcon size={5} />,
                }}
                selectedValue={data?.idReceiptImport}
                onValueChange={itemValue =>
                  setData({
                    ...data,
                    idReceiptImport: itemValue,
                  })
                }
                mt="1">
                {listReceipt
                  .filter(e => e.state !== 'COMPLETE')
                  .map(e => {
                    return <Select.Item label={e.name} value={e.id} />;
                  })}
              </Select>
              {!data?.idReceiptImport && (
                <FormControl.ErrorMessage
                  leftIcon={<WarningOutlineIcon size="xs" />}>
                  Vui lòng chọn phiếu!
                </FormControl.ErrorMessage>
              )}
            </FormControl>
          </Center>
        </Modal.Body>

        <Modal.Footer>
          <Button.Group space={2}>
            <Button
              variant="ghost"
              colorScheme="blueGray"
              onPress={() => {
                setIsVisible(false);
              }}>
              Hủy
            </Button>
            <Button
              style={{backgroundColor: APP_COLOR}}
              onPress={() => {
                onSave();
              }}>
              Lưu
            </Button>
          </Button.Group>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
});
