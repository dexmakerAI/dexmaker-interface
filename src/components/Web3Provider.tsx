import {PropsWithChildren} from "react";
import { EthereumClient, w3mConnectors, w3mProvider } from '@web3modal/ethereum'
import { Web3Modal } from '@web3modal/react'
import { configureChains, createClient, WagmiConfig } from 'wagmi'
import { arbitrum, mainnet, polygon } from 'wagmi/chains'
import {projectId} from "../config";

const chains = [arbitrum, mainnet, polygon]

const { provider } = configureChains(chains, [w3mProvider({ projectId: projectId })])
const wagmiClient = createClient({
    autoConnect: true,
    connectors: w3mConnectors({ projectId, version: 1, chains }),
    provider
})
const ethereumClient = new EthereumClient(wagmiClient, chains)


export const Web3ProviderComp = (props: PropsWithChildren) => {
    const { children } = props

    return (
        <>
            <WagmiConfig client={wagmiClient}>
                {children}
            </WagmiConfig>
            <Web3Modal projectId={projectId} ethereumClient={ethereumClient} />
        </>
    )

}