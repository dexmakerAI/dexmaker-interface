import React from "react";
import {Button} from "../Button";

export const Header = ({figletText, callback}: {figletText: string, callback?: Function}) => {
    return (
        <>
            <pre style={{textAlign: 'center', marginBottom: '0.5rem', whiteSpace: 'pre-wrap'}}>
                {figletText}
            </pre>
            <span style={{textAlign: 'center', marginBottom: '0.5rem', whiteSpace: 'pre-wrap'}}>
                welcome to DexMaker v1.0, create and deploy your own decentralized exchange and any other smart contracts in minutes..
            </span>
            <span style={{textAlign: 'center', marginBottom: '0.5rem', whiteSpace: 'pre-wrap'}}>
                and best of all, it's free! you just need to hold some <b style={{color: "red"}}>dxai</b> tokens according to your required commands.
            </span>
            <span style={{textAlign: 'center', marginBottom: '0.5rem', whiteSpace: 'pre-wrap'}}>
                use this terminal to interact with the DexMaker CLI. type 'help' for a list of commands.
            </span>

            <div className={"head-buttons"}>
                <Button label={"create erc20 token"} onClick={() => callback && callback('create-erc20 --name [enter-name] --symbol [enter-symbol] --totalSupply [enter-totalSupply]')} />
                <Button label={"create v2 dex"} onClick={() => callback && callback('create-v2-dex --name [enter-name]')} />
                <Button label={"create v3 dex"} onClick={() => callback && callback('create-v3-dex --name [enter-name]')} />
            </div>
        </>
    )
}