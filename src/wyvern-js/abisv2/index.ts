export { ERC20 } from './erc20';
export { ERC721 } from './erc721';
export { MULTISIG } from './multisig';
export { AUTHENTICATED_PROXY } from './authenticated_proxy';
export { OWNABLE_DELEGATE_PROXY } from './ownable_delegate_proxy';
export { WYVERN_ATOMICIZER } from './wyvern_atomicizer';
export { WYVERN_PROXY_REGISTRY } from './wyvern_proxy_registry';
export { WYVERN_TOKEN_TRANSFER_PROXY } from './wyvern_token_transfer_proxy';
import { ERC20 } from './erc20';
import { ERC721 } from './erc721';
import { AUTHENTICATED_PROXY } from './authenticated_proxy';
import { OWNABLE_DELEGATE_PROXY } from './ownable_delegate_proxy';
import { WYVERN_ATOMICIZER } from './wyvern_atomicizer';
import { WYVERN_PROXY_REGISTRY } from './wyvern_proxy_registry';
import { WYVERN_TOKEN_TRANSFER_PROXY } from './wyvern_token_transfer_proxy';

export const  abis: { [key: string]: any } = { "auth": AUTHENTICATED_PROXY, "delegate": OWNABLE_DELEGATE_PROXY, "atom": WYVERN_ATOMICIZER, "registry": WYVERN_PROXY_REGISTRY, "token": WYVERN_TOKEN_TRANSFER_PROXY, "erc20": ERC20, "erc721": ERC721 };

