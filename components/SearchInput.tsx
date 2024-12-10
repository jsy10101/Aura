import { View, TextInput, TouchableOpacity, Image } from "react-native";
import React from "react";
import { icons } from "@/constants";

type SearchInputProps = {
    value?: string;
    handleChangeText: (e: string) => void;
    otherStyles?: string;
};

const SearchInput = ({ value = "", handleChangeText }: SearchInputProps) => {
    return (
        <View className="w-full h-16 px-4 bg-black-100 border-2 border-black-200 focus:border-secondary rounded-2xl items-center flex-row space-x-4">
            <TextInput
                className="text-base mt-0.5 text-white flex-1 font-pregular"
                value={value}
                placeholder="Search for a video topic"
                placeholderTextColor="#7B7B8B"
                onChangeText={handleChangeText}
            />
            <TouchableOpacity>
                <Image
                    source={icons.search}
                    className="w-5 h-5"
                    resizeMode="contain"
                />
            </TouchableOpacity>
        </View>
    );
};

export default SearchInput;
