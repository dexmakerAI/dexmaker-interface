import React from "react";
import {getWordColor} from "../../utils/getWordColor";

export const OutputModified = ({line, index}: { line:string, index: number }) => {
    const words = line.substring(index + 1).split(' ');
    return words.map((word, index) => {
        const color = getWordColor(word);
        return (
            <span key={index} style={{color}}>
                {word}
                {index < words.length - 1 ? ' ' : ''}
            </span>
        );
    });
}