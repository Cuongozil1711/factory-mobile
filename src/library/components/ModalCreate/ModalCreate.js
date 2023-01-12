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
import {
  getCompany,
  getSupplier,
  getWareHouseTo,
} from '../../../screen/authorize/home/warehouse/receiptExportWareHouse/redux/ReceiptExportWareHouseSlice';
import {getUid} from '../../../screen/unAuthorize/login/redux/appReducers';
export const ModalCreate = forwardRef((props, ref) => {
  const [defaultData, setDetault] = useState();
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
  const listWareHouse = useSelector(getWareHouse);
  const wareHouseTo = useSelector(getWareHouseTo) ?? [];
  const company = useSelector(getCompany) ?? [];
  const supplier = useSelector(getSupplier) ?? [];
  const cid = useSelector(getUid);
  //console.log(wareHouseTo);

  const [data, setData] = useState({
    name: '',
    idWareHouse: null,
    companyIdTo: null,
    idWareHouseTo: null,
    idSupplier: null,
  });
  useImperativeHandle(ref, () => ({
    show: (onChange, times) => {
      setData({
        name: '',
        idWareHouse: null,
        companyIdTo: null,
        idWareHouseTo: null,
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
    if (data?.idWareHouse && data?.name.length > 0) {
      setIsVisible(false);
      _onItemPress(data);
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
      <Modal.Content style={{width: 300}}>
        <Modal.CloseButton />
        <Modal.Header>Nhập thông tin phiếu</Modal.Header>
        <Modal.Body>
          <Center>
            <FormControl isRequired isInvalid>
              <FormControl.Label>
                {defaultData === 1 ? 'Tên phiếu nhập' : 'Tên phiếu xuất'}
              </FormControl.Label>
              <Input
                value={data?.name}
                onChangeText={e =>
                  setData({
                    ...data,
                    name: e,
                  })
                }
                focusOutlineColor={APP_COLOR}
              />
              {data?.name.length === 0 && (
                <FormControl.ErrorMessage
                  leftIcon={<WarningOutlineIcon size="xs" />}>
                  Vui lòng nhập tên phiếu!
                </FormControl.ErrorMessage>
              )}
            </FormControl>

            <FormControl isRequired isInvalid>
              <FormControl.Label>
                {defaultData === 1
                  ? 'Chọn kho nhập hàng'
                  : 'Chọn kho xuất hàng'}
              </FormControl.Label>
              <Select
                minWidth="200"
                accessibilityLabel="Chọn kho hàng"
                placeholder="Chọn kho hàng"
                _selectedItem={{
                  bg: 'teal.600',
                  endIcon: <CheckIcon size={5} />,
                }}
                selectedValue={data?.idWareHouse}
                onValueChange={itemValue =>
                  setData({
                    ...data,
                    idWareHouse: itemValue,
                  })
                }
                mt="1">
                {listWareHouse.map(e => {
                  return <Select.Item label={e.name} value={e.id} />;
                })}
              </Select>
              {!data?.idWareHouse && (
                <FormControl.ErrorMessage
                  leftIcon={<WarningOutlineIcon size="xs" />}>
                  Vui lòng chọn kho hàng!
                </FormControl.ErrorMessage>
              )}
            </FormControl>

            {defaultData === 1 && (
              <FormControl isRequired isInvalid>
                <FormControl.Label>Chọn nhà cung cấp</FormControl.Label>
                <Select
                  minWidth="200"
                  accessibilityLabel="Chọn nhà cung cấp"
                  placeholder="Chọn nhà cung cấp"
                  _selectedItem={{
                    bg: 'teal.600',
                    endIcon: <CheckIcon size={5} />,
                  }}
                  selectedValue={data?.idSupplier}
                  onValueChange={itemValue =>
                    setData({
                      ...data,
                      idSupplier: itemValue,
                    })
                  }
                  mt="1">
                  {supplier
                    .filter(x => x.id !== cid)
                    .map(e => {
                      return <Select.Item label={e.name} value={e.id} />;
                    })}
                </Select>
              </FormControl>
            )}

            {defaultData !== 1 && (
              <FormControl isRequired isInvalid>
                <FormControl.Label>Chọn chi nhánh</FormControl.Label>
                <Select
                  minWidth="200"
                  accessibilityLabel="Chọn chi nhánh"
                  placeholder="Chọn chi nhánh"
                  _selectedItem={{
                    bg: 'teal.600',
                    endIcon: <CheckIcon size={5} />,
                  }}
                  selectedValue={data?.companyIdTo}
                  onValueChange={itemValue =>
                    setData({
                      ...data,
                      companyIdTo: itemValue,
                    })
                  }
                  mt="1">
                  {company
                    .filter(x => x.id !== cid)
                    .map(e => {
                      return <Select.Item label={e.name} value={e.id} />;
                    })}
                </Select>
                {!data?.companyIdTo && (
                  <FormControl.ErrorMessage
                    leftIcon={<WarningOutlineIcon size="xs" />}>
                    Vui lòng chọn chi nhánh!
                  </FormControl.ErrorMessage>
                )}
              </FormControl>
            )}

            {defaultData !== 1 && (
              <FormControl isRequired isInvalid>
                <FormControl.Label>Chọn kho điểm đến</FormControl.Label>
                <Select
                  minWidth="200"
                  accessibilityLabel="Chọn kho điểm đến"
                  placeholder="Chọn kho điểm đến"
                  _selectedItem={{
                    bg: 'teal.600',
                    endIcon: <CheckIcon size={5} />,
                  }}
                  selectedValue={data?.idWareHouseTo}
                  onValueChange={itemValue =>
                    setData({
                      ...data,
                      idWareHouseTo: itemValue,
                    })
                  }
                  mt="1">
                  {wareHouseTo
                    .filter(x => x.companyId === data.companyIdTo)
                    .map(e => {
                      return <Select.Item label={e.name} value={e.id} />;
                    })}
                </Select>
                {!data?.idWareHouseTo && (
                  <FormControl.ErrorMessage
                    leftIcon={<WarningOutlineIcon size="xs" />}>
                    Vui lòng chọn kho điểm đến!
                  </FormControl.ErrorMessage>
                )}
              </FormControl>
            )}
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
