import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  TouchableWithoutFeedback,
  Keyboard,
  ActivityIndicator,
} from "react-native";
import { withExpoSnack, styled } from "nativewind";
import { Forward } from "lucide-react-native";
import { RichText, useEditorBridge } from "@10play/tentap-editor";
import { SafeAreaView } from "react-native-safe-area-context";

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTextInput = styled(TextInput);
const StyledTouchableOpacity = styled(TouchableOpacity);
const StyledSafeAreaView = styled(SafeAreaView);

const NoteBar: React.FC = () => {
  const editor = useEditorBridge({
    autofocus: true,
    avoidIosKeyboard: true,
  });

  const [query, setQuery] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  async function handleSend() {
    setLoading(true); // Start loading

    try {
      const response = await fetch("https://api.puno.lol/entries/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: query,
          userId: "shoubhit",
        }),
      });

      if (!response.ok) {
        console.log(response.status);
        console.log(response.statusText);
        throw new Error("Failed to send data");
      }

      const data = await response.json();
      console.log("Success:", data);

      // Clear input field after successful post
      setQuery("");
    } catch (error) {
      console.error("Error:", error);
      // Handle error here
    } finally {
      setLoading(false); // Stop loading
    }
  }

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <StyledView>
        <StyledView className="justify-center mx-10">
          <StyledView className="flex-col items-center">
            <StyledTextInput
              multiline={true}
              className="p-2 w-80 h-20 border-2 border-slate-600 rounded-md text-white"
              placeholder="Whats going on? "
              onChangeText={(text: string) => setQuery(text)}
              value={query}
            />
            <StyledText className="text-slate-600 text-sm">
              *Markdown is supported
            </StyledText>
            <StyledTouchableOpacity
              className="mt-5"
              onPress={async () => await handleSend()}
            >
              {loading ? (
                <ActivityIndicator color="#ffffff" />
              ) : (
                <StyledView className="bg-purple-500 p-2 rounded-md ml-2">
                  <StyledText className="text-white">
                    POST <Forward color="white" size={15} />
                  </StyledText>
                </StyledView>
              )}
            </StyledTouchableOpacity>
          </StyledView>
        </StyledView>
      </StyledView>
    </TouchableWithoutFeedback>
  );
};

export default withExpoSnack(NoteBar);
