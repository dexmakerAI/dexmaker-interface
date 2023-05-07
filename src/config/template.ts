export const helpCommand = `
dex-cli v0.1.0
( this tool is in alpha, use at your own risk )

[NOTE]: all the commands below are case-sensitive.

help: shows this message.
buy: buy DXAI tokens
clear: clears the screen
help -a: shows advanced commands

[connect to dex-cli]
connect-wallet: Connects wallet to the CLI with available options.

[advance wallet connection]
connect-wallet-injected: Connects wallet to the CLI with injected provider.

connect-wallet-wallet-connect: Connects wallet to the CLI with WalletConnect feature.

[exchange commands]
create-v2-dex <name>: Creates a new v2 exchange with the specified name.

create-v3-dex <name>: Creates a new v3 exchange with the specified name.

[token commands]
create-erc20 --name <name> --symbol <symbol> --totalSupply <totalSupply>: Creates a new ERC20 token with the specified name, symbol and decimals.

[wallet commands]
create-new-wallet: Creates a new wallet.

`

export const advancedHelpCommand = `
dex-cli v0.1.0
advanced commands list ( some of these commands are not yet implemented )

help: shows simple help message.
buy: buy DXAI tokens
clear: clears the screen
help -a: shows this message

[tokens commands]
create-erc721 <name> <symbol>: Creates a new ERC721 token with the specified name and symbol.

create-erc1155 <name> <symbol>: Creates a new ERC1155 token with the specified name and symbol.

[bridge commands]
create-erc20-bridge <name> <symbol> <decimals> <bridgeAddress>: Creates a new ERC20 token with the specified name, symbol, decimals and bridge address.

create-erc721-bridge <name> <symbol> <bridgeAddress>: Creates a new ERC721 token with the specified name, symbol and bridge address.

create-erc1155-bridge <name> <symbol> <bridgeAddress>: Creates a new ERC1155 token with the specified name, symbol and bridge address.

[wallet commands]

create-new-wallet-with-private-key <privateKey>: Creates a new wallet with the specified private key.

create-new-wallet-with-mnemonic <mnemonic>: Creates a new wallet with the specified mnemonic.

get-private-key-from-mnemonic <mnemonic>: Gets the private key from the specified mnemonic.

create-multi-sig-wallet <owners> <requiredSignatures>: Creates a new multi-sig wallet with the specified owners and required signatures.

`