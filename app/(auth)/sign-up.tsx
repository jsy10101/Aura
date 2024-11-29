import { View, ScrollView, Image, Text } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "@/constants";
import FormField from "@/components/FormField";
import CustomButton from "@/components/CustomButton";
import { Link } from "expo-router";

const SignUp = () => {
    const [form, setForm] = useState({
        username: "",
        email: "",
        password: "",
    });

    return (
        <SafeAreaView className="bg-primary h-full">
            <ScrollView>
                <View className="w-full justify-center h-[83vh] px-4 my-6">
                    <Image
                        source={images.logo}
                        className="w-[115px] h-[35px]"
                        resizeMode="contain"
                    />
                    <Text className="text-2xl text-white text-semibold mt-10 font-psemibold">
                        Sign Up
                    </Text>
                    <FormField
                        title="Username"
                        value={form.username}
                        placeholder="johndoe"
                        handleChangeText={(e: string) =>
                            setForm({ ...form, username: e })
                        }
                        otherStyles="mt-10"
                    />
                    <FormField
                        title="Email"
                        value={form.email}
                        placeholder="johndoe@abc.com"
                        handleChangeText={(e: string) =>
                            setForm({ ...form, email: e })
                        }
                        otherStyles="mt-7"
                        keyboardType="email-address"
                    />
                    <FormField
                        title="Password"
                        value={form.password}
                        placeholder="password"
                        handleChangeText={(e: string) =>
                            setForm({ ...form, password: e })
                        }
                        otherStyles="mt-7"
                    />

                    <CustomButton
                        title="Log in"
                        handlePress={() => {}}
                        containerStyles="w-full mt-7"
                    />

                    <View className="pt-5 gap-2 flex-row justify-center">
                        <Text className="text-lg text-gray-100 font-pregular">
                            Already have an account?
                        </Text>
                        <Link
                            className="text-lg text-secondary font-psemibold"
                            href={"/sign-in"}
                        >
                            Log in
                        </Link>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default SignUp;
