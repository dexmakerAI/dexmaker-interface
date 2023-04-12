import React, { useEffect, useState } from 'react';
import styled from "styled-components";
import {formatLine} from "../../utils/formatLine";

interface OutputProps {
    output: string;
}

const OutputContainer = styled.div`
  white-space: pre-wrap;
  overflow-y: hidden;
  flex-grow: 1;
`;

function FlickerText({ output }: OutputProps) {
    const [displayedOutput, setDisplayedOutput] = useState('');
    const [outputIndex, setOutputIndex] = useState(0);

    useEffect(() => {
        const intervalId = setInterval(() => {
            if (outputIndex < output.length) {
                setDisplayedOutput(output.slice(0, outputIndex + 1));
                setOutputIndex(outputIndex + 1);
            } else {
                clearInterval(intervalId);
            }
        }, 1);

        return () => clearInterval(intervalId);
    }, [output, outputIndex]);

    useEffect(() => {
        window.scrollTo({
            top: document.documentElement.scrollHeight,
            behavior: 'smooth'
        });
    }, [displayedOutput]);

    return (
        <OutputContainer>
            {
                displayedOutput.split('\n').map((line, i) => {
                    return <div key={i} style={{marginBottom: '10px'}} >{formatLine(line)}</div>
                })
            }
        </OutputContainer>
    );
}

export default FlickerText;