import {useCallback} from "react";
import {fetchData} from "../utils/fetchData";

function createError(message: string) {
    throw new Error("invalid parameter passed: " + message)
}

export const useCreateToken = () => {
    const createToken = useCallback(async({name, symbol, decimals, totalSupply, isMintable=false, isProxy=false, type="erc20"}: {
        name: string,
        symbol: string,
        decimals: number,
        totalSupply: number,
        isMintable?: boolean,
        isProxy?: boolean,
        type?: string
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
            apiCallData.totalSupply = 21_000_000
        }

        const response = await fetchData({
            payload: apiCallData,
            type
        })

        return response.data
    }, [])

    return {
        createToken
    }
}