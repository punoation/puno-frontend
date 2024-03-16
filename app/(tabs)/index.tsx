import React, { useState } from "react";
import {
  Text,
  View,
  TouchableWithoutFeedback,
  Keyboard,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { withExpoSnack, styled } from "nativewind";
import SearchBar from "@/components/SearchBar";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "expo-router";

import { Folder } from "lucide-react-native";

const StyledView = styled(View);
const StyledText = styled(Text);

interface TagCardProps {
  item: string;
}

const TabOneScreen = () => {
  const navigation = useNavigation(); 
  const [folder, setFolder] = useState<string[]>(["Quick Notes", "Todos"]);
  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  const renderCard = ({ item } : { item: string }) => {
    return (
      //@ts-ignore
      <TouchableOpacity onPress={() => navigation.navigate("tag", { item })}>
        <StyledView className="flex flex-row space-x-2 mt-5">
          <Folder color="white" size={15} />
          <StyledText className="text-white font-bold">{item}</StyledText>
        </StyledView>
      </TouchableOpacity>
    )
  }

  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <SafeAreaView style={{ flex: 1, backgroundColor: "#010203" }}>
        <StyledView
          style={{ backgroundColor: "#000000" }}
          className="flex mt-10 items-center"
        >
          <StyledText className="text-white font-bold text-[100rem] p-5">
            P
          </StyledText>
          <SearchBar />
          <StyledView className="mt-5">
            <FlatList
              data={folder}
              renderItem={renderCard}
              numColumns={1}
              keyExtractor={(item, index) => index.toString()}
            />
          </StyledView>
        </StyledView>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default withExpoSnack(TabOneScreen);
