import React, { useState } from 'react';

interface AutoSuggestProps {
    value: string;
    suggestions: string[];
    onChange: (value: string) => void;
    onSubmit: () => void;
    style?: React.CSSProperties;
    suggestionStyle?: React.CSSProperties;
}

function AutoSuggest(props: AutoSuggestProps) {
    const { value, suggestions, onChange, onSubmit, style, suggestionStyle } = props;
    const [activeSuggestion, setActiveSuggestion] = useState(0);

    function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
        switch (event.key) {
            case 'Enter':
                onSubmit();
                setActiveSuggestion(0);
                break;
            case 'ArrowUp':
                setActiveSuggestion(activeSuggestion - 1);
                break;
            case 'ArrowDown':
                setActiveSuggestion(activeSuggestion + 1);
                break;
            default:
                break;
        }
    }

    function handleClick(index: number) {
        setActiveSuggestion(index);
        onChange(suggestions[index]);
    }

    return (
        <div style={{ position: 'relative', flexGrow: 1 }}>
            <input
                type="text"
                value={value}
                onChange={(event) => onChange(event.target.value)}
                onKeyDown={handleKeyDown}
                style={style}
            />
            {suggestions.length > 0 && (
                <div style={{ position: 'absolute', top: '100%', left: 0, right: 0, backgroundColor: '#000', padding: '0.5rem', zIndex: 1 }}>
                    {suggestions.map((suggestion, index) => (
                        <div
                            key={suggestion}
                            onClick={() => handleClick(index)}
                            style={{
                                ...suggestionStyle,
                                backgroundColor: activeSuggestion === index ? '#222' : 'transparent',
                            }}
                        >
                            {suggestion}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export { AutoSuggest };
