import React from 'react';
import { StyleSheet, Text, View, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { withExpoSnack, styled } from 'nativewind';
import SearchBar from '@/components/SearchBar';

const StyledView = styled(View);
const StyledText = styled(Text);

const SearchPage = () => {
  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <StyledView className="flex mt-10 items-center">
          <StyledText className='text-white font-bold text-[100rem] p-5'>P</StyledText>
        <SearchBar />
      </StyledView>

    </TouchableWithoutFeedback>
  );
}
export default withExpoSnack(SearchPage);
