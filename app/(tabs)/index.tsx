import React from 'react';
import { StyleSheet, Text, View, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { withExpoSnack, styled } from 'nativewind';
import NoteBar from '@/components/NoteBar';

const StyledView = styled(View);
const StyledText = styled(Text);

const TabOneScreen = () => {
  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <StyledView style={styles.container}>
        <StyledText className='text-white font-bold text-2xl p-5'>puno.lol</StyledText>
        <NoteBar/>
      </StyledView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default withExpoSnack(TabOneScreen);
