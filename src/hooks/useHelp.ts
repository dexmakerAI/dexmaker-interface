import {useMemo} from "react";
import {advancedHelpCommand, helpCommand} from "../config/template";

export const useHelp = () => {

    return useMemo(() => {
        return { helpCommand, advancedHelpCommand }
    }, []);
}