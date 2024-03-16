import React from 'react';
import { StyleSheet, Text, View, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { withExpoSnack, styled } from 'nativewind';
import SearchBar from '@/components/SearchBar';

const StyledView = styled(View);
const StyledText = styled(Text);

const ModalScreen = () => {
  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <StyledView className="flex mt-10 items-center">
        <StyledText className='text-white text-2xl font-bold'>About</StyledText>
      </StyledView>
    </TouchableWithoutFeedback>
  );
}
export default withExpoSnack(ModalScreen);
