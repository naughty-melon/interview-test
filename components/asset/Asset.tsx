import { useRef, createContext, RefObject } from 'react';
import useAssetStore from '@/store/asset';
import styled from '@emotion/styled';
import { AssetModal } from './AssetModal';
import { DepositModal } from './DepositModal';
import { useTheme } from "@interchain-ui/react";

interface childInterface {
  handleOpenModal: () => void;
}

interface modalStyleInterface {
  ModalContainer:  any,
  ModalContent: any,
  ModalTitle: any,
}

interface themeInterface {
  theme: string
}

const AddButton = styled.button`
  background: #2539c9;
  padding: 10px 20px;
  color: #fff;
  font-size: 16px;
  border: none;
  border-radius: 8px;
  margin-left: 40px;
  cursor: pointer;
`

const Table = styled.table`
  margin: 50px 0;
  text-align: center;
  width: 100%;
`

const TableTitle = styled.th`
  font-size: 14px;
  padding: 8px 10px;
  width: 150px;
  color: ${(props: themeInterface) => props.theme === 'dark' ? '#a7b4c2' : '#697584'};
`

const TableContent = styled.td`
  font-size: 14px;
  padding: 15px 10px;
  color: ${(props: themeInterface) => props.theme === 'dark' ? '#eef2f8' : '#2c3137'};
`

const OperateButton = styled.button`
  background: ${(props: themeInterface) => props.theme === 'dark' ? '#1D2024' : '#F5F7FB'};
  border: none;
  border-radius: 7px;
  padding: 8px 12px;
  margin-right: 10px;
  cursor: pointer;
  color: ${(props: themeInterface) => props.theme === 'dark' ? '#A7B4C2' : '#697584'};
`

const Image = styled.img`
  width: 30px;
  height: 30px;
`

const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: none;
  justify-content: center;
  align-items: center;
`

const ModalContent = styled.div`
  padding: 20px;
  width: 500px;
`

const ModalTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: ${(props: themeInterface) => props.theme === 'dark' ? '#eef2f8' : '#2c3137'};

  & > div {
    width: 20px;
    height: 20px;
    background: '#F5F7FB';
    cursor: pointer;
  }
`

export const modalStyleContext = createContext<modalStyleInterface>({
  ModalContainer: <></>,
  ModalContent: <></>,
  ModalTitle: <></>,
});

export function Asset() {
  const { selectedAssetList } = useAssetStore();
  const assetModalRef = useRef<childInterface>(null);
  const depositModalRef = useRef<childInterface>(null);
  const { theme } = useTheme();

  const handleOpenModal = (type = 'asset') => {
    let modalRef: RefObject<childInterface> | undefined;
    switch(type) {
      case 'asset':
        modalRef = assetModalRef;
        break;
      case 'deposit':
        modalRef = depositModalRef;
        break;
    }
    if (modalRef?.current) {
      modalRef.current.handleOpenModal();
    }
  }

  return (
    <>
      <AddButton onClick={() => handleOpenModal('asset')}>Add Asset</AddButton>
      <Table>
        <thead>
          <tr>
            <th scope="col"></th>
            <TableTitle scope="col" theme={theme}>Asset</TableTitle>
            <TableTitle scope="col" theme={theme}>Balance</TableTitle>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {selectedAssetList.map((item, index) => (
            <tr key={`row_${index}`}>
              <th scope="row"><Image alt="logo" src={item?.logo_URIs?.png} /></th>
              <TableContent theme={theme}>{item?.name}</TableContent>
              <TableContent theme={theme}>{item?.display}</TableContent>
              <td>
                <OperateButton theme={theme} onClick={() => handleOpenModal('deposit')}>Deposit</OperateButton>
                <OperateButton theme={theme}>Withdraw</OperateButton>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <modalStyleContext.Provider
        value={{
          ModalContainer,
          ModalContent,
          ModalTitle,
        }}
      >
        <AssetModal ref={assetModalRef} />
        <DepositModal ref={depositModalRef} />
      </modalStyleContext.Provider>
    </>
  )
}
