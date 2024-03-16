import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View, Button } from "react-native";
import { RouteProp, useRoute, useNavigation } from "@react-navigation/native";
import { styled, withExpoSnack } from "nativewind";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { ArrowLeft, Circle } from "lucide-react-native"; // Import ArrowLeft icon from react-native-lucide

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

  const handleDelete = async (id: number) => {
    try {
      const response = await fetch("https://api.puno.lol/todos/delete", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });
      if (!response.ok) {
        throw new Error(
          "Network request failed - Server responded with an error"
        );
      }
      // Update UI optimistically
      setData((prevData) => prevData.filter((todo) => todo.id !== id));
    } catch (error) {
      console.error("Error deleting todo:", error);
      // Handle error
    }
  };

  useEffect(() => {
    const fetchData = async () => {
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
    };
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
        <StyledView className="flex flex-col gap-2 mt-10">
          {data &&
            data.map((todo) => (
              <StyledView
                className="space-x-2"
                key={todo.id}
                style={styles.todoContainer}
              >
                <Circle
                  onPress={() => handleDelete(todo.id)}
                  color="#ff6666" // Set a distinct color for the delete button
                />
                <StyledText className="text-white text-xl">
                  {todo.content}
                </StyledText>
              </StyledView>
            ))}
        </StyledView>
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
  todoContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  todoText: {
    color: "white",
    flex: 1,
  },
});

export default withExpoSnack(Tag);
