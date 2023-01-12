import React, {
  memo,
  useState,
  forwardRef,
  useImperativeHandle,
  useRef,
  useCallback,
} from 'react';
import {Modal, Radio, FormControl} from 'native-base';
import {APP_COLOR} from '../../../config';
export const ModalSucceeded = forwardRef((props, ref) => {
  const [defaultData, setDetault] = useState();
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
  useImperativeHandle(ref, () => ({
    show: (onChange, times) => {
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
        <Modal.Header>Thời gian</Modal.Header>
        <Modal.Body>
          <FormControl>
            <Radio.Group
              defaultValue={defaultData}
              name="exampleGroup"
              onChange={value => _onItemPress(value)}
              accessibilityLabel="favorite colorscheme">
              <Radio colorScheme="blue" value="now" my={1}>
                Hôm nay
              </Radio>
              <Radio colorScheme="blue" value="week" my={1}>
                Tuần trước
              </Radio>
              <Radio colorScheme="blue" value="month" my={1}>
                Tháng trước
              </Radio>
              <Radio colorScheme="blue" value="all" my={1}>
                Tất cả
              </Radio>
            </Radio.Group>
          </FormControl>
        </Modal.Body>
      </Modal.Content>
    </Modal>
  );
});
