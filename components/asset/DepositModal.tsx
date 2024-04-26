import { useContext, forwardRef, useImperativeHandle } from 'react';
import { modalStyleContext } from './Asset';
import styled from '@emotion/styled';
import { Box, useColorModeValue, useTheme } from "@interchain-ui/react";

interface childInterface {
  handleOpenModal: () => void;
}

interface ImageProps {
  size?: string,
  marginRight?: string,
}

interface buttonPros {
  bgColor?: string,
  color?: string,
}

interface themeInterface {
  theme: string
}

const FromTo = styled.div`
  display: flex;
  align-items: flex-end;
  color: ${(props: themeInterface) => props.theme === 'dark' ? '#A7B4C2' : '#697584'};
  font-size: 14px;
  padding: 24px 0;

  & > div {
    flex: 1;

    & > div {
      display: flex;
      align-items: center;
      border: 1px solid #D1D6DD;
      border-radius: 6px;
      background: ${(props: themeInterface) => props.theme === 'dark' ? '#1D2024' : '#F5F7FB'};
      color: ${(props: themeInterface) => props.theme === 'dark' ? '#A7B4C2' : '#697584'};
      padding: 12px;
      margin-top: 12px;
    }
  }

  & > span {
    margin: 0 8px 20px;
  }
`

const Image = styled.img`
  width: ${(props:ImageProps) => props.size || '28px'};
  height: ${(props:ImageProps) => props.size || '28px'};
  margin-right: ${(props:ImageProps) => props.marginRight || '0'};
`

const SelectAmount = styled.div`
  & > div {
    display: flex;
    color: ${(props: themeInterface) => props.theme === 'dark' ? '#A7B4C2' : '#697584'};

    &:nth-child(1) {
      justify-content: space-between;

      & > label {
        font-size: 18px;
      }

      & > div {
        font-size: 14px;
      }
    }
    
    &:nth-child(2) {
      margin: 14px 0 10px 0;
      border: 1px solid #D1D6DD;
      border-radius: 6px;
      height: 100%;
      overflow: hidden;
      position: relative;

      & > div {
        border-right-width: 1px;
        border-right-style: solid;
        border-right-color: #D1D6DD;
        padding: 12px;
      }

      & > input {
        flex: 1;
        border: 0px;
        background: ${(props: themeInterface) => props.theme === 'dark' ? '#1D2024' : '#F5F7FB'};
      }

      & > p{
        position: absolute;
        right: 10px;
        top: 9px;
      }
    }

    &:nth-child(3) {
      justify-content: flex-end;
    }
  }
`

const AmountButton = styled.button`
  padding: 4px 8px;
  font-size: 12px;
  background: #efefef;
  color: #697584;
  border: none;
  border-radius: 2px;
  margin-left: 10px;
`

const TimeTip = styled.div`
  background: ${(props: themeInterface) => props.theme === 'dark' ? '#1D2024' : '#F5F7FB'};
  padding: 12px;
  font-size: 14px;
  color: ${(props: themeInterface) => props.theme === 'dark' ? '#EEF2F8' : '#2C3137'};
  border-radius: 6px;
  margin: 28px 0 20px 0;
`

const Button = styled.button`
  width: 100%;
  padding: 20px 24px;
  background: ${(props:buttonPros) => props.bgColor || 'none'};
  color: ${(props:buttonPros) => props.color || 'none'};
  border: none;
  border-radius: 6px;
`

export const DepositModal = forwardRef<childInterface>(function DepositModal(props, ref) {
  const { ModalContainer, ModalContent, ModalTitle } = useContext(modalStyleContext);
  const { themeClass, theme } = useTheme();

  const amountList = ['Max', '1/2', '1/3']

  useImperativeHandle(ref, () => ({
    handleOpenModal
  }));

  const handleOpenModal = () => {
    const element = document.getElementById('deposit_modal')!;
    element.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    document.body.style.height = '100%';
  }

  const handleCloseModal = () => {
    const element = document.getElementById('deposit_modal')!;
    element.style.display = 'none';
    document.body.style.overflow = 'visible';
  }

  return (
    <ModalContainer id='deposit_modal'>
      <Box
        className={themeClass}
        borderRadius="5px"
        backgroundColor={useColorModeValue("$white", "$background")}
      >
        <ModalContent>
          <ModalTitle theme={theme}>
            <h3>Deposit ATOM</h3>
            <div onClick={handleCloseModal}>X</div>
          </ModalTitle>
          <FromTo theme={theme}>
            <div>
              <span>From Cosmos Hub</span>
              <div>
                <Image size="28px" marginRight="10px" alt='Cosmos' src="https://raw.githubusercontent.com/cosmos/chain-registry/master/cosmoshub/images/atom.png" />
                <span>umee1l…xdaxk</span>
              </div>
            </div>
            <span>{"->"}</span>
            <div>
              <span>To Osmosis</span>
              <div>
                <Image size="28px" marginRight="10px" alt='Osmosis' src='https://raw.githubusercontent.com/cosmos/chain-registry/master/osmosis/images/osmo.svg' />
                <span>osmo1l…trj5k</span>
              </div>
            </div>
          </FromTo>
          <SelectAmount theme={theme}>
            <div>
              <label>Select amount</label>
              <div>Available <strong>2 ATOM</strong></div>
            </div>
            <div>
              <div><Image size='40px' alt='amount' src='https://raw.githubusercontent.com/cosmos/chain-registry/master/cosmoshub/images/atom.png' /></div>
              <input />
              <p><strong>ATOM</strong> ≈ $ 1,1013</p>
            </div>
            <div>
              {amountList.map((item, index) => (
                <AmountButton key={`amount_${index}`}>{item}</AmountButton>
              ))}
            </div>
          </SelectAmount>
          <TimeTip theme={theme}>
            Estimated time:<strong>20 seconds</strong>
          </TimeTip>
          <Button bgColor={theme === 'dark' ? '#EFEFEF' : '#27282b'} color={theme === 'dark' ? '#1D2024' : '#EFEFEF'}>Transfer</Button>
          <Button color='#697584'>Cancel</Button>
        </ModalContent>
      </Box>
    </ModalContainer>
  )
})