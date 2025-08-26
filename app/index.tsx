import { Link } from "expo-router";
import { Text, View } from "react-native";

export default function Index() {
  return (
    <View className="flex-1 justify-center items-center">
      <View className="items-center">
        <Text className="text-3xl text-dark-200 font-bold">
          Welcome to the Project.
        </Text>
        <Link href="/onboarding" className="text-blue-600 text-lg underline">
          Onboarding
        </Link>
        <Link href="/movie/avenger" className="text-dark-200 text-lg underline">
          Avenger Movie
        </Link>
      </View>
    </View>
  );
}
