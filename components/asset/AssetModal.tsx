import { useRef, useContext, forwardRef, useImperativeHandle } from 'react';
import useAssetStore from '@/store/asset';
import { modalStyleContext } from './Asset';
import styled from '@emotion/styled';
import { Box, useColorModeValue, useTheme } from "@interchain-ui/react";

interface childInterface {
  handleOpenModal: () => void;
}

interface ButtonProps {
  bgColor?: string,
}

interface themeInterface {
  theme: string
}

const OperateButton = styled.button`
  background: ${(props:ButtonProps) => props.bgColor || '#F5F7FB'};
  color: ${props => props.color || '#697584'};
  border: none;
  border-radius: 7px;
  padding: 8px 12px;
  margin-right: 10px;
  cursor: pointer;
`

const Select = styled.select`
  width: 250px;
  height: 32px;
  border: 1px solid #D1D6DD;
  border-radius: 6px;
  margin: 20px 20px 20px 0;
  background: ${(props: themeInterface) => props.theme === 'dark' ? '#1D2024' : '#F5F7FB'};
  color: ${(props: themeInterface) => props.theme === 'dark' ? '#EEF2F8' : '#2C3137'};

  & > option {
    background: #fff;
  }
`

export const AssetModal = forwardRef<childInterface>(function AssetModal(props, ref) {
  const selectRef = useRef<any>();
  const { selectedChain, addAsset } = useAssetStore();
  const { ModalContainer, ModalContent, ModalTitle } = useContext(modalStyleContext);
  const { themeClass, theme } = useTheme();

  useImperativeHandle(ref, () => ({
    handleOpenModal
  }));

  const handleOpenModal = () => {
    const element = document.getElementById('add_modal')!;
    element.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    document.body.style.height = '100%';
  }

  const handleConfirm = () => {
    const selectedValue = selectRef.current?.value;
    addAsset(selectedValue);
    handleCancel();
  }

  const handleCancel = () => {
    const element = document.getElementById('add_modal')!;
    element.style.display = 'none';
    document.body.style.overflow = 'visible';
  }

  return (
    <ModalContainer id='add_modal'>
      <Box
        className={themeClass}
        borderRadius="5px"
        backgroundColor={useColorModeValue("$white", "$background")}
      >
        <ModalContent>
          <ModalTitle theme={theme}>
            <h3>Add Asset</h3>
            <div onClick={handleCancel}>X</div>
          </ModalTitle>
          <Select ref={selectRef} theme={theme}>
              {selectedChain?.assets.map((item, index) => (
                <option key={`option_${index}`} value={item.symbol}>{item.name}</option>
              ))}
          </Select>
          <OperateButton bgColor="#2539c9" color='#fff' onClick={handleConfirm}>confirm</OperateButton>
          <OperateButton bgColor={theme === 'dark' ? '#1D2024' : '#F5F7FB'} color={theme === 'dark' ? '#A7B4C2' : '#697584'} onClick={handleCancel}>cancel</OperateButton>
        </ModalContent>
      </Box>
    </ModalContainer>
  )
})