import React from "react";

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
        </>
    )
}