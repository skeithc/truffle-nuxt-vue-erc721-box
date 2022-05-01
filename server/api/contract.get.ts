import config from '../../config';
import * as magicToken from '../../build/contracts/MagicToken.json';

export default defineEventHandler(
  () => ({
    name: magicToken.contractName,
    abi: magicToken.abi,
    address: magicToken.networks[config.ETHEREUM.NETWORK_ID].address,
  })
)
