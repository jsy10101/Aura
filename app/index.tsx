import { Text } from "react-native";
import React from "react";
import { Link } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

const App = () => {
    return (
        <SafeAreaView className="bg-primary flex-1 items-center justify-center">
            <Text className="text-3xl font-pblack text-secondary">Aura!</Text>
            <Link className="text-white font-plight" href="/home">
                link to home
            </Link>
        </SafeAreaView>
    );
};

export default App;
