import { View, ScrollView, Image, Text, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "@/constants";
import FormField from "@/components/FormField";
import CustomButton from "@/components/CustomButton";
import { Link, router } from "expo-router";
import { getCurrentUser, signIn } from "@/lib/appwite";
import { AppwriteException } from "react-native-appwrite";
import { useGlobalContext } from "@/context/GlobalProvider";

const SignIn = () => {
    const [form, setForm] = useState({
        email: "",
        password: "",
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const { setUser, setIsLoggedIn, user, isLoggedIn } = useGlobalContext();
    const handleSubmit = async () => {
        if (form.email === "" || form.password === "") {
            Alert.alert("Error", "Please fill in all the details");
        }
        setIsSubmitting(true);
        console.log("submitting", isSubmitting);

        try {
            await signIn(form.email, form.password);
            const result = (await getCurrentUser()) || null;
            setUser(result);
            setIsLoggedIn(true);
            router.replace("/home");
        } catch (e: unknown) {
            if (e instanceof AppwriteException) {
                Alert.alert("Error", e.message);
            } else {
                Alert.alert("Error", "An unexpected error occurred.");
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <SafeAreaView className="bg-primary h-full">
            <ScrollView>
                <View className="w-full justify-center min-h-[83vh] px-4 my-6">
                    <Image
                        source={images.logo}
                        className="w-[115px] h-[35px]"
                        resizeMode="contain"
                    />
                    <Text className="text-2xl text-white text-semibold mt-10 font-psemibold">
                        Sign in
                    </Text>
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
                        handlePress={handleSubmit}
                        containerStyles="w-full mt-7"
                    />

                    <View className="pt-5 gap-2 flex-row justify-center">
                        <Text className="text-lg text-gray-100 font-pregular">
                            Don't have an account?
                        </Text>
                        <Link
                            className="text-lg text-secondary font-psemibold"
                            href={"/sign-up"}
                        >
                            Sign up
                        </Link>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default SignIn;
