import React from "react";
import { Text, View, TouchableWithoutFeedback, Keyboard } from "react-native";
import { withExpoSnack, styled } from "nativewind";
import SearchBar from "@/components/SearchBar";
import { SafeAreaView } from "react-native-safe-area-context";

const StyledView = styled(View);
const StyledText = styled(Text);

const TabOneScreen = () => {
  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#010203" }}>
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <StyledView
        style={{ backgroundColor: "#000000" }}
        className="flex mt-10 items-center"
      >
        <StyledText className="text-white font-bold text-[100rem] p-5">
          P
        </StyledText>
        <SearchBar />
      </StyledView>
    </TouchableWithoutFeedback>
  </SafeAreaView>
  );
};

export default withExpoSnack(TabOneScreen);
