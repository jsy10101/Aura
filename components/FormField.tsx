import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import React, { useState } from "react";
import { icons } from "@/constants";

type FormFieldProps = {
    title: string;
    value: string;
    placeholder?: string;
    handleChangeText: (e: string) => void;
    otherStyles?: string;
    keyboardType?: "email-address";
};

const FormField = ({
    title,
    value,
    placeholder = "",
    handleChangeText,
    otherStyles,
    keyboardType,
}: FormFieldProps) => {
    const [showPassword, setShowPassword] = useState(false);

    // TODO: fix on focus event not working
    return (
        <View className={`gap-y-2 ${otherStyles}`}>
            <Text className="font-pmedium text-base text-gray-100">
                {title}
            </Text>
            <View className="w-full h-16 px-4 bg-black-100 border-2 border-black-200 focus:border-secondary rounded-2xl items-center flex-row">
                <TextInput
                    className="flex-1 text-white font-psemibold text-base"
                    value={value}
                    placeholder={placeholder}
                    placeholderTextColor="#7B7B8B"
                    keyboardType={keyboardType}
                    onChangeText={handleChangeText}
                    secureTextEntry={title === "Password" && !showPassword}
                />
                {title === "Password" && (
                    <TouchableOpacity
                        onPress={() => setShowPassword(!showPassword)}
                    >
                        <Image
                            source={!showPassword ? icons.eye : icons.eyeHide}
                            className="w-6 h-6"
                            resizeMode="contain"
                        />
                    </TouchableOpacity>
                )}
            </View>
        </View>
    );
};

export default FormField;
