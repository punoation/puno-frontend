import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { RouteProp, useRoute, useNavigation } from "@react-navigation/native";
import { styled, withExpoSnack } from "nativewind";

import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { ArrowLeft } from "lucide-react-native"; // Import ArrowLeft icon from react-native-lucide

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);

interface TagProps {
  route: RouteProp<{ params: { item: string } }, "params">;
}

const Tag: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute<TagProps["route"]>();
  const { item = "" } = route.params || {};

  const [data, setData] = useState(null);

  const router = useRouter();
  const handlePress = () => {
    router.push("/");
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("https://api.puno.lol/todos/getAll");
        if (!response.ok) {
          throw new Error(
            "Network request failed - Server responded with an error"
          );
        }
        const data = await response.json();
        setData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
        // Handle the error, e.g., show a message to the user
      }
    }
    fetchData();
  }, []);

  console.log("route value :::: ", route);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#010203" }}>
      <StyledView className="mt-10 absolute top-5 left-5 p-2 bg-purple-800 rounded-full">
        <StyledTouchableOpacity
          onPress={handlePress}
          className="justify-center items-center"
        >
          <ArrowLeft color="white" size={24} />
        </StyledTouchableOpacity>
      </StyledView>

      <StyledView className="flex mt-20 items-center justify-center">
        <StyledText className="text-white text-2xl">{item}</StyledText>
        <StyledText>
          {data &&
            data.map((todo) => (
              <StyledText
                key={todo.id}
                className={
                  todo.state === "completed" ? "text-green-500" : "text-red-500"
                }
              >
                {todo.content}
              </StyledText>
            ))}
        </StyledText>
      </StyledView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  tagText: {
    fontSize: 24,
  },
});

export default withExpoSnack(Tag);
