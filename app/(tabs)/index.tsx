import React from 'react';
import { StyleSheet, Text, View, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { withExpoSnack, styled } from 'nativewind';
import NoteBar from '@/components/NoteBar';
import { useEditorBridge } from '@10play/tentap-editor';
import { SafeAreaView } from 'react-native-safe-area-context';

const StyledView = styled(View);
const StyledText = styled(Text);
const TabOneScreen = () => {
  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };
  const editor = useEditorBridge({
    autofocus: true,
    avoidIosKeyboard: true,
  });

  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
        <StyledView className="mt-20" style={styles.container}>
          <StyledText className='text-2xl text-white mb-10 font-bold'>What's up?</StyledText>
            <NoteBar/>
          </StyledView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    // justifyContent: 'center',
    backgroundColor: '#010203',
  },
});

export default withExpoSnack(TabOneScreen);
