import {useCallback} from "react";
import {fetchData} from "../utils/fetchData";

function createError(message: string) {
    throw new Error("invalid parameter passed: " + message)
}

export const useCreateToken = () => {
    const createERC20 = useCallback(async({name, symbol, decimals, totalSupply, isMintable=false, isProxy=false}: {
        name: string,
        symbol: string,
        decimals: number,
        totalSupply: number,
        isMintable?: boolean,
        isProxy?: boolean
    }) => {
        let apiCallData = {
            name,
            symbol,
            decimals,
            totalSupply,
            isMintable,
            isProxy
        }
        if ( !name ) {
            createError("name")
        }
        if ( !symbol ) {
            createError("symbol")
        }
        if ( !decimals ) {
            apiCallData.decimals = 18
        }
        if ( !totalSupply ) {
            createError("totalSupply")
        }

        const response = await fetchData({
            payload: apiCallData,
            type: 'erc20'
        })

        return response.data
    }, [])

    return {
        createERC20
    }
}