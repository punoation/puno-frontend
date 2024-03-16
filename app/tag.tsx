import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Button,
  Animated,
} from "react-native";
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
  const [fadeAnims, setFadeAnims] = useState<{ [key: number]: Animated.Value }>(
    {}
  );

  const router = useRouter();
  const handlePress = () => {
    router.push("/");
  };

  const handleDelete = async (id: number) => {
    try {
      // Optimistically remove todo from UI
      setData((prevData) => prevData.filter((todo) => todo.id !== id));
      // Start fade out animation for the specific todo
      fadeAnims[id].setValue(0);
      Animated.timing(fadeAnims[id], {
        toValue: 0,
        duration: 500, // Animation duration in milliseconds
        useNativeDriver: true, // Enable native driver for performance
      }).start();

      // Send delete request to the server
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
        // Initialize fade animations for each todo
        const initialFadeAnims = data.reduce((acc, todo) => {
          acc[todo.id] = new Animated.Value(1);
          return acc;
        }, {});
        setFadeAnims(initialFadeAnims);
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
        <StyledText className="text-white text-2xl pl-2">{item}</StyledText>
        <StyledView className="flex flex-col gap-2 mt-10">
          {data &&
            data.map((todo) => (
              <Animated.View
                className="space-x-2"
                key={todo.id}
                style={[
                  styles.todoContainer,
                  {
                    opacity: fadeAnims[todo.id], // Set opacity based on the fade animation
                  },
                ]}
              >
                <TouchableOpacity onPress={() => handleDelete(todo.id)}>
                  <Circle color="#ff6666" />
                </TouchableOpacity>
                <StyledText className="text-white text-xl pl-2">
                  {todo.content}
                </StyledText>
              </Animated.View>
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
