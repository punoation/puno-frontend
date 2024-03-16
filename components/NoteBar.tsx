import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { withExpoSnack, styled } from 'nativewind';
import { Forward } from 'lucide-react-native';
import { RichText, useEditorBridge } from '@10play/tentap-editor';
import { SafeAreaView } from 'react-native-safe-area-context';

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

  const [query, setQuery] = useState<string>(''); 

  function handleSend() {
    console.log("hello world1");
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
            />
            <StyledText className="text-slate-600 text-sm">*Markdown is supported</StyledText>
            <StyledTouchableOpacity className="mt-5" onPress={handleSend}>
              <StyledView className="bg-purple-500 p-2 rounded-md ml-2">
                <StyledText className="text-white">
                  POST <Forward color="white" size={15}/> 
                </StyledText>
              </StyledView>
            </StyledTouchableOpacity>
          </StyledView>
        </StyledView>
      </StyledView>
    </TouchableWithoutFeedback>
  );
}

export default withExpoSnack(NoteBar);
