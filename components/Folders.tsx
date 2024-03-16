import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  Keyboard,
  FlatList,
  Dimensions,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { withExpoSnack, styled } from "nativewind";
import { useNavigation } from "@react-navigation/native"; // Import navigation hook
import { SafeAreaView } from "react-native-safe-area-context";
import { ViewStyle } from "react-native"; // Import ViewStyle
import { Folder } from "lucide-react-native";

const StyledView = styled(View);
const StyledText = styled(Text);
// const Card = styled(View);

interface TagCardProps {
  item: string;
}

const Folders: React.FC = () => {
  const navigation = useNavigation(); // Get navigation object
  const [tags, setTags] = useState<string[]>(["Quick Notes", "Todos"]);
  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  const renderTagCard = ({ item }: { item: string }) => {
    return (
      //@ts-ignore
      <TouchableOpacity onPress={() => navigation.navigate(item === "Quick Notes" ? "quicknotes" : "tags", { item })}>
        <StyledView className="flex flex-row space-x-2" style={styles.tagCard}>
          <Folder color="white" size={15} />
          <StyledText className="text-white font-bold">{item}</StyledText>
        </StyledView>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#010203" }}>
      <TouchableWithoutFeedback onPress={dismissKeyboard}>
        <StyledView
          style={styles.container as ViewStyle} // Cast to ViewStyle
        >
          <FlatList
            data={tags}
            renderItem={renderTagCard}
            numColumns={1}
            keyExtractor={(item, index) => index.toString()}
            contentContainerStyle={styles.tagContainer}
          />
        </StyledView>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

const windowWidth = Dimensions.get("window").width - 50;
const cardWidth = (windowWidth - 40) / 2;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
  },
  tagContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 20,
  },
  tagCard: {
    // width: cardWidth,
    height: 50,
    borderRadius: 10,
    margin: 10,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#E0E0E0",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
    backgroundColor: "#121212", // Darker card background for contrast
    width: windowWidth,
  },
  textInput: {
    height: 200,
    borderColor: "#ccc",
    borderWidth: 1,
    padding: 15,
    color: "#333",
    backgroundColor: "#f9f9f9",
    marginBottom: 20,
  },
});

export default withExpoSnack(Folders);
