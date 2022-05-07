import { defineStore } from 'pinia'
import { ethers } from 'ethers'

import config from '~/config'

declare global {
  interface Window {
    ethereum?: ethers.providers.ExternalProvider;
  }
}

export const useWallet = defineStore('wallet', () => {
  const provider = ref(null as ethers.providers.JsonRpcProvider | null);
  const address = ref('');

  async function connect() {
    if (!window?.ethereum) {
      throw new Error('No ethereum provider detected');
    }

    const _provider = new ethers.providers.Web3Provider(window.ethereum);

    const accounts = await _provider.listAccounts();
    if (!accounts.length) {
      throw new Error('No accounts found');
    }

    const signer = _provider.getSigner();
    address.value = await signer.getAddress();

    const network = await _provider.getNetwork();
    if (network.name !== config.ETHEREUM.NETWORK_NAME) {
      throw new Error(`You are connected to the ${network.name} instead of the ${config.ETHEREUM.NETWORK_NAME} network`);
    }

    // https://github.com/vuejs/core/issues/3024
    provider.value = markRaw(_provider);
  }

  return {
    provider,
    address,
    connect,
  }
})
