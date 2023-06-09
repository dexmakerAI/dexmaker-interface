import {useCallback} from "react";
import {fetchData} from "../utils/fetchData";

function createError(message: string) {
    throw new Error("invalid parameter passed: " + message)
}

export const useCreateDex = () => {
    const createV2Dex = useCallback(async({name}: {
        name: string,
    }) => {
        let apiCallData = {
            name
        }
        if ( !name ) {
            createError("name")
        }

        const response = await fetchData({
            payload: apiCallData,
            type: 'v2-dex'
        })

        return response.data
    }, [])


    const createStaticSwap = useCallback(async({name, totalTokens}: {
        name: string,
        totalTokens: string
    }) => {
        let apiCallData = {
            name,
            totalTokens
        }
        if ( !name ) {
            createError("name")
        }

        const response = await fetchData({
            payload: apiCallData,
            type: 'static-swap'
        })

        return response.data
    }, [])

    return {
        createV2Dex,
        createStaticSwap
    }
}