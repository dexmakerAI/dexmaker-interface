import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import {atomDark} from "react-syntax-highlighter/dist/cjs/styles/prism";

export const CodeBlock = ({
    value,
    language
} : {
    value: string,
    language: string
}) => {
    return (
        <SyntaxHighlighter language={language} style={atomDark} PreTag="div" customStyle={{
            backgroundColor: "inherit"
        }}>
            {value}
        </SyntaxHighlighter>
    )
}