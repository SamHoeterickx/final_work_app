import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// COMPONENTS

// STORE
import { useOnboardingStore } from '@/shared/context/onboardingStore.context';

// STYLES
import { baseStyles, borderRadius, colors, spacing } from '@/shared/styles/design.system';

// TYPES
import { IQuestionProps } from '@/shared/types/types';

const getImageSource = (imageName: string) => {
    switch (imageName) {
        case 'espresso_machine':
            return require('../../../assets/images/onboarding/espresso_machine.png');
        case 'pour_over':
            return require('../../../assets/images/onboarding/pour_over.png');
        case 'moka_pot':
            return require('../../../assets/images/onboarding/moka_pot.png');
        case 'aero_press':
            return require('../../../assets/images/onboarding/immersion.png');
        case 'french_press':
            return require('../../../assets/images/onboarding/french_press.png');
        case 'bean_mill':
            return require('../../../assets/images/onboarding/coffee_grinder.png');
        case 'gooseneck_kettle':
            return require('../../../assets/images/onboarding/gooseneck_kettle.png');
        case 'puck_prep':
            return require('../../../assets/images/onboarding/puck_prep.png');
        case 'ground_coffee':
            return require('../../../assets/images/onboarding/ground_coffee.png');
        case 'whole_beans':
            return require('../../../assets/images/onboarding/whole_beans.png');
        case 'milk_foamer':
            return require('../../../assets/images/onboarding/milk_foamer.png');
        case 'coffee_shop':
            return require('../../../assets/images/onboarding/coffee_shop.png');
        case 'precision_scale':
            return require('../../../assets/images/onboarding/precision_scale.png');
        case 'cup_machine':
            return require('../../../assets/images/onboarding/cup_machine.png');
        default:
            return;
    }
};

export const MultipleChoiceTilesQuestion: FC<IQuestionProps> = ({ options, questionIndex }) => {
    const { answers, toggleMultipleChoiceAnswer } = useOnboardingStore();
    const { t } = useTranslation();

    const currentAnswers = answers[questionIndex] || [];

    const handleOnPress = (index: number) => {
        toggleMultipleChoiceAnswer(questionIndex, index);
    };

    const renderOptions = () => {
        return options.map((option, index) => (
            <TouchableOpacity
                key={index}
                style={[styles.tileOption, currentAnswers.includes(index) && { opacity: 1 }]}
                onPress={() => handleOnPress(index)}
            >
                {/* {option.image && <SvgIcon name={option.image} width={60} height={60} />} */}
                {option.image && (
                    <Image
                        source={getImageSource(option.image)}
                        style={{ width: 80, height: 80 }}
                        resizeMode="cover"
                    />
                )}
                <Text style={[baseStyles.h4, styles.label]}>{t(option.label)}</Text>
            </TouchableOpacity>
        ));
    };

    return <View style={styles.container}>{options && renderOptions()}</View>;
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: spacing.md,
    },
    tileOption: {
        width: '47.5%',
        height: '33%',
        borderRadius: borderRadius.md,
        alignItems: 'center',
        justifyContent: 'center',
        gap: spacing.sm,

        borderWidth: 2,
        borderColor: colors.primary,

        paddingHorizontal: spacing.md,
        paddingVertical: spacing.md,

        opacity: 0.4,
    },
    label: {
        textAlign: 'center',
    },
});
