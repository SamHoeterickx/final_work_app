import React from 'react';
import { Text } from 'react-native';

export const renderFormattedText = (text: string) => {
    const parts = text.split(/(\*\*.*?\*\*)/g);
    
    return parts.map((part, index) => {
        if (part.startsWith('**') && part.endsWith('**')) {
            const cleanText = part.slice(2, -2);
            return (
                <Text 
                    key={index} 
                    style={{ fontWeight: 'bold', color: '#1A1A1A' }} 
                >
                    {cleanText}
                </Text>
            );
        }
        
        return <Text key={index}>{part}</Text>;
    });
};