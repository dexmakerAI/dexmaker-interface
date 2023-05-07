import React from "react";

export const Button = ({label, onClick}: {label: string, onClick?: any}) => {
    return (
        <button onClick={onClick}>
            <span>
                {label}
            </span>
        </button>
    )
}