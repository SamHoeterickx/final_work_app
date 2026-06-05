import React from 'react';
import { Text } from 'react-native';

export const renderFormattedText = (text: string) => {
    if (!text || typeof text !== 'string') return null;

    const parts = text.split(/(\*\*\*[\s\S]*?\*\*\*)/g);

    return parts.map((part, index) => {
        if (part && part.startsWith('***') && part.endsWith('***')) {
            const cleanText = part.slice(3, -3);
            return (
                <Text key={index} style={{ fontWeight: 'bold', color: '#1A1A1A' }}>
                    {cleanText}
                </Text>
            );
        }

        return <Text key={index}>{part}</Text>;
    });
};
