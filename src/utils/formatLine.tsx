import React from "react";
import {OutputModified} from "../components/OutputModified";

export const formatLine = (line: string) => {
    const index = line.indexOf(':');
    if (index > 0) {
        return (
        <React.Fragment>
            <span style={{ textDecoration: 'underline', marginRight: '2px' }}>
                {line.substring(0, index + 1)}
            </span>
            {
                OutputModified({line, index: index+1})
            }
        </React.Fragment>
    );
    } else {
        return OutputModified({line, index: -2})
    }
}