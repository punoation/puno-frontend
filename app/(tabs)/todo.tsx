import React, { useEffect, useState, useCallback } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Animated,
  ActivityIndicator,
} from "react-native";
import { RouteProp, useRoute, useNavigation, useIsFocused } from "@react-navigation/native";
import { styled, withExpoSnack } from "nativewind";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Circle } from "lucide-react-native";

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);

interface TagProps {
  route: RouteProp<{ params: { item: string } }, "params">;
}

const Todo: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute<TagProps["route"]>();
  const { item = "" } = route.params || {};

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [fadeAnims, setFadeAnims] = useState<{ [key: number]: Animated.Value }>(
    {}
  );

  const router = useRouter();
  const handlePress = () => {
    router.push("/");
  };

  const isFocused = useIsFocused();

  const fetchData = useCallback(async () => {
    try {
      const response = await fetch(
        "https://api.puno.lol/todos/getAll?userId=shoubhit"
      );
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
    } finally {
      setLoading(false); // Set loading to false after fetching data
    }
  }, []);

  useEffect(() => {
    if (isFocused) {
      fetchData();
    }
  }, [isFocused, fetchData]);

  const handleDelete = async (id: number) => {
    try {
      // Optimistically remove todo from UI
      setData((prevData) => prevData.filter((todo) => todo.id !== id));
      // Start fade out animation for the specific todo
      fadeAnims[id].setValue(0);
      Animated.timing(fadeAnims[id], {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
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
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#010203" }}>
      <StyledView className="flex mt-20 items-center justify-center">
        <StyledText className="text-white text-2xl pl-2">{item}</StyledText>
        <StyledView className="flex flex-col gap-2 mt-10">
          {loading ? ( // Render loader if loading is true
            <ActivityIndicator size="large" color="#ffffff" />
          ) : (
            data &&
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
                  <Circle color="#a855f6" />
                </TouchableOpacity>
                <StyledText className="text-white text-xl pl-2">
                  {todo.content}
                </StyledText>
              </Animated.View>
            ))
          )}
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

export default withExpoSnack(Todo);
