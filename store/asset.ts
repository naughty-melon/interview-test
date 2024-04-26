import { create } from 'zustand';
import { assets } from 'chain-registry';
import { AssetList, Asset } from '@chain-registry/types';

const assetList = assets.find(({chain_name}) => chain_name === 'osmosis');

interface AssetState {
  selectedChain: AssetList | undefined;
  selectedAssetList: Asset[];
  selectedAsset: Asset | undefined;
  addAsset: (selectedItem: string) => void;
}

const useAssetStore = create<AssetState>((set) => ({
  selectedChain: assetList,
  selectedAssetList: assetList?.assets.slice(0,3) || [],
  selectedAsset: undefined,
  addAsset: (selectedItem: string) => set((state) => {
    const selectedValue = assetList?.assets.filter(item => item.symbol === selectedItem);
    return { selectedAssetList: (selectedValue || []).concat(state.selectedAssetList) }
  }),
}))

export default useAssetStore;