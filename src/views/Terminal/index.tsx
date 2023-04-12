import React, {useState, useEffect, useCallback, useRef} from 'react';
import styled from 'styled-components';
import figlet from 'figlet';
// @ts-ignore
import standard from 'figlet/importable-fonts/Standard';
import TerminalLoader from "../../components/Loader";
import {FooterComp} from "../../Footer";
import {useHelp} from "../../hooks/useHelp";
import {useCreateToken} from "../../hooks/useCreateToken";
import {divideArgsToKeyValue} from "../../utils/formatArgs";
import FlickerText from "../../components/Flicker";
import {formatLine} from "../../utils/formatLine";

interface TerminalProps {}

const TerminalContainer = styled.div`
    // background-color: #222;
    color: #fff;
    font-family: monospace;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    margin-bottom: 2.5rem;
  
    pre {
        font-size: 1rem;
    }
  
    @media (max-width: 768px) {
        pre {
            font-size: 0.5rem;
        }
    }
`;

const InputContainer = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.5rem;
`;

const InputContainerDiv = styled.div`
    display: flex;
    background-color: #000000de;
    
    justify-content: space-between;
    padding: 10px;
    position: fixed;
    bottom: 50px;
    left: 10px;
    right: 0;
    z-index: 9999;
`

const Prompt = styled.div`
  margin-right: 0.5rem;
`;

const InputField = styled.input`
  background-color: transparent;
  border: none;
  color: #fff;
  font-family: monospace;
  flex-grow: 1;

  &:focus {
    outline: none;
  }
`;

const FullPageContainer = styled.div`
  // background-color: #222;
  width: 100%;
  height: 100%;
`;

const FullPageContent = styled.div`
  position: relative;
  z-index: 1;
`;

interface OutputProps {
    output: string;
    isCode?: boolean;
}

const OutputContainer = styled.div`
  white-space: pre-wrap;
  overflow-y: hidden;
  flex-grow: 1;
  margin-bottom: 0.5rem;
  padding: 0.5rem;
`;

const PreviousCommandsContainer = styled.div`
    background-color: #00000078;
    border-radius: 10px;
    padding: 10px;
`

function Output(props: OutputProps) {

    return <OutputContainer>
        { props.isCode && <FlickerText output={props.output} /> }
        {!props.isCode && ( props.output === "loading" ? <TerminalLoader /> : props.output.split('\n').map((line, i) => {
            return <div key={i} style={{marginBottom: '10px'}} >{formatLine(line)}</div>
        }))}
    </OutputContainer>
}

const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

function Terminal(props: TerminalProps) {
    const [input, setInput] = useState('');
    const [figletText, setFigletText] = useState('');

    const [prompts, setPrompts] = useState<string[]>([]);
    const [outputs, setOutputs] = useState<OutputProps[]>([]);
    const [currentCommandExecuted, setCurrentCommandExecuted] = useState(true);

    const messagesEndRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    // command hooks
    const { helpCommand, advancedHelpCommand } = useHelp()
    const { createERC20 } = useCreateToken()

    useEffect(() => {
        const handleFocus = () => {
            if (inputRef.current) {
                inputRef.current.focus();
            }
        };
        document.addEventListener('click', handleFocus);
        return () => {
            document.removeEventListener('click', handleFocus);
        };
    }, []);

    const handleCommand = useCallback(async () => {
        // TODO: Implement command handling logic
        if (input === 'clear') {
            setOutputs([]);
            setPrompts([]);
            setInput('')
            return;
        }

        const cmd = input.trim().split(' ')[0];
        const args = input.trim().split(' ').slice(1).join(' ');
        setCurrentCommandExecuted(false)
        setPrompts(prompts => [...prompts, input]);
        setOutputs(outputs => [...outputs, {output: "loading"}]);

        // console.log("cmd", cmd, "args", args)

        let key = outputs.length;
        try {

            switch (cmd) {
                case "help":
                    await delay(500)
                    if ( args === "-a" ) {
                        setOutputs(outputs => [...outputs.slice(0, key), {output: advancedHelpCommand}]);
                        setCurrentCommandExecuted(true)
                    } else {
                        setOutputs(outputs => [...outputs.slice(0, key), {output: helpCommand, isCode: true}]);
                        setCurrentCommandExecuted(true)
                    }
                    break;
                case "connect":
                    await delay(500)
                    setOutputs(outputs => [...outputs.slice(0, key), {output: 'connecting to wallet...', isCode: true}]);
                    setCurrentCommandExecuted(true)
                    break;
                case "create-erc20":
                    const argv = divideArgsToKeyValue(args)
                    const outputContent = await createERC20({
                        name: argv.name,
                        symbol: argv.symbol,
                        decimals: Number(argv.decimals),
                        totalSupply: Number(argv.totalSupply)
                    })
                    setOutputs(outputs => [...outputs.slice(0, key), {output: outputContent, isCode: true}]);
                    setCurrentCommandExecuted(true)
                    break;
                default:
                    await delay(500)
                    setOutputs(outputs => [...outputs.slice(0, key), {output: 'invalid command', isCode: true}]);
                    setCurrentCommandExecuted(true)
                    break;
            }
        } catch (e: any) {
            setOutputs(outputs => [...outputs.slice(0, key), {output: 'error while executing command: ' +e.message, isCode: true}]);
            setCurrentCommandExecuted(true)
        }
        // setOutput(output + input + '\n');
        setInput('');
    }, [input, outputs, advancedHelpCommand, helpCommand, createERC20]);

    useEffect(() => {
        window.scrollTo({
            top: document.documentElement.scrollHeight,
            behavior: 'smooth'
        });
    }, [outputs]);

    function handleInputChange(value: string) {
        setInput(value);
    }


    useEffect(() => {
        figlet.parseFont('Standard', standard);
        figlet.text('DexMaker v1.0', {
            font: 'Standard',
            horizontalLayout: 'default',
            verticalLayout: 'default',
        }, (err, data) => {
            if (err) {
                console.error(err);
                setFigletText('Error generating ASCII art');
                return;
            }
            setFigletText(data || '');
        });
    }, []);

    return (
        <FullPageContainer>
            {/*<div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: '#222', zIndex: 0 }}></div>*/}
            <FullPageContent>
                <TerminalContainer>
                    <pre style={{ textAlign: 'center', marginBottom: '0.5rem', whiteSpace: 'pre-wrap' }}>
                        {figletText}
                    </pre>
                    <span style={{ textAlign: 'center', marginBottom: '0.5rem', whiteSpace: 'pre-wrap' }}>
                        welcome to DexMaker v1.0, create and deploy your own decentralized exchange and any other smart contracts in minutes..
                    </span>
                    <span style={{ textAlign: 'center', marginBottom: '0.5rem', whiteSpace: 'pre-wrap' }}>
                        and best of all, it's free! you just need to hold some <b style={{color: "red"}}>dxai</b> tokens according to your required commands.
                    </span>
                    <span style={{ textAlign: 'center', marginBottom: '0.5rem', whiteSpace: 'pre-wrap' }}>
                        use this terminal to interact with the DexMaker CLI. type 'help' for a list of commands.
                    </span>
                    <hr style={{ color: '#fff', width: '100%', backgroundColor: '#fff', height: 1, border: 'none', marginBottom: '1rem' }} />
                    {
                        prompts.length > 0 && <PreviousCommandsContainer>
                            {prompts.map((prompt, index) => (
                                <div key={index} style={{marginBottom: "16px"}}>
                                    <InputContainer>
                                        <Prompt>{`user@dexmaker:~$ ${prompt}`}</Prompt>
                                    </InputContainer>
                                    <Output output={outputs[index].output} isCode={outputs[index].isCode} />
                                </div>
                            ))}
                        </PreviousCommandsContainer>
                    }
                    { currentCommandExecuted && (
                        <InputContainerDiv>
                            <Prompt>user@dexmaker:~$</Prompt>
                            <InputField
                                placeholder={'enter command'}
                                autoFocus
                                type="text"
                                ref={inputRef}
                                value={input}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInputChange(e.target.value)}
                                onKeyPress={(e: React.KeyboardEvent<HTMLInputElement>) => {
                                    if (e.key === 'Enter') {
                                        handleCommand();
                                    }
                                }}
                            />
                        </InputContainerDiv>
                    )}
                </TerminalContainer>
                <div ref={messagesEndRef} />
                <FooterComp />
            </FullPageContent>
        </FullPageContainer>
    );
}

export default Terminal;
