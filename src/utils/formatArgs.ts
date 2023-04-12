interface Args {
    [key: string]: string;
}

export function divideArgsToKeyValue(argString: string): Args {
    const args = argString.split(' ');
    const result: Args = {};
    for (let i = 0; i < args.length; i += 2) {
        const key = args[i].slice(2);
        result[key] = args[i + 1];
    }
    return result;
}
