import { borderRadius, colors, spacing } from "@/shared/styles/design.system";
import { ILessonHeaderProps } from "@/shared/types/types";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { FC } from "react";
import { Platform, StyleSheet, TouchableOpacity, View } from "react-native";

export const LessonHeader: FC<ILessonHeaderProps> = ({ screenCount, totalScreens, isModalOpen, setIsModalOpen }) => {
    if(!totalScreens) return

    const router = useRouter();

    const handleBack = () => {
        if(isModalOpen){
            setIsModalOpen(false);
        }else {
            router.back();
        }
    }


    return (
        <View style={styles.header}>
            <TouchableOpacity onPress={handleBack} style={styles.backButton}>
                <Ionicons name="chevron-back" size={32} color={colors.primary} />
            </TouchableOpacity>
            <View style={styles.progressBar}>
                <View
                    style={[
                        styles.progressStatus,
                        { width: `${(screenCount / totalScreens) * 100}%` },
                    ]}
                />
            </View>
            <TouchableOpacity onPress={() => setIsModalOpen(!isModalOpen)} style={styles.pauseButton}>
                <Ionicons name="pause" size={32} color={colors.primary} />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        width: '100%',
        paddingTop: Platform.OS === 'ios' ? spacing.sm : spacing.lg,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        zIndex: 10,
        elevation: 10,
    },
    backButton: {
        flex: 1,
        alignSelf: 'flex-start',
    },
    progressBar: {
        flex: 4,
        height: 15,
        backgroundColor: colors.darkBackground,
        borderRadius: borderRadius.md,
        marginTop: 4,
    },
    progressStatus: {
        height: 15,
        backgroundColor: colors.primary,
        borderRadius: borderRadius.md,
    },
    pauseButton: {
        flex: 1,
        alignItems: 'flex-end'
    }
})