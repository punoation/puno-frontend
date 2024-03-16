import React from "react";
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

  const router = useRouter();
  const handlePress = () => {
    router.push("/");
  };

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
