import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { withExpoSnack, styled } from 'nativewind';
import { Search } from 'lucide-react-native';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTextInput = styled(TextInput);
const StyledTouchableOpacity = styled(TouchableOpacity);

const SearchBar: React.FC = () => {
  const [query, setQuery] = useState<string>(''); 

  function handleSend() {
    console.log("hello world");
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
              className="p-2 w-80 border-2 border-slate-600 rounded-md text-white"
              placeholder="Whats going on? "
              onChangeText={(text: string) => setQuery(text)} 
            />
            <StyledTouchableOpacity className="mt-5" onPress={handleSend}>
              <StyledView className="bg-blue-500 p-2 rounded-md ml-2">
                <StyledText className="text-white">
                  POST 
                </StyledText>
              </StyledView>
            </StyledTouchableOpacity>
          </StyledView>
        </StyledView>
      </StyledView>
    </TouchableWithoutFeedback>
  );
}

export default withExpoSnack(SearchBar);
