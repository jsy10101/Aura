import { Text, TouchableOpacity, Vibration } from "react-native";
import React from "react";

type CustomButtonProps = {
    title: string;
    handlePress: () => void;
    containerStyles: string;
    textStyles?: string;
    isLoading?: boolean;
};

const CustomButton = ({
    title,
    handlePress,
    containerStyles,
    textStyles = "",
    isLoading = false,
}: CustomButtonProps) => {
    return (
        <TouchableOpacity
            className={`bg-secondary min-h-[62px] justify-center items-center rounded-xl ${containerStyles} ${
                isLoading ? "opacity-50" : ""
            }`}
            disabled={isLoading}
            onPress={handlePress}
        >
            <Text
                className={`text-primary font-psemibold font-lg ${textStyles}`}
            >
                {title}
            </Text>
        </TouchableOpacity>
    );
};

export default CustomButton;
