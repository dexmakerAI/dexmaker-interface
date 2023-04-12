export function getWordColor(word: string) {
    const colors: Record<string, string[]> = {
        lightgreen: ['create', 'creates', 'exchange', 'ok'],
        yellow: ['wallet', 'commands', 'fail', 'failed'],
        pink: ['connect', 'debug'],
        red: ['dxai', 'invalid']
    };

    for (const color in colors) {
        if (colors[color].includes(word.toLowerCase())) {
            return color;
        }
    }

    return '#fff';
}