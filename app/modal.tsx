import React from 'react';
import { StyleSheet, Text, View, TouchableWithoutFeedback, Keyboard, TouchableOpacity } from 'react-native';
import { withExpoSnack, styled } from 'nativewind';
import { useNavigation } from '@react-navigation/native';

const StyledView = styled(View);
const StyledText = styled(Text);

const ModalScreen = () => {
  const navigation = useNavigation();

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <View style={styles.modalContainer}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <StyledText className="p-20" style={{ color: '#a855f6' }}>Back</StyledText>
        </TouchableOpacity>
        <StyledView className="flex items-center">
          <StyledText className='text-white text-2xl font-bold mb-5'>About</StyledText>
          <StyledText className='text-white text-lg p-5'>Search Engine for Life is an innovative platform designed to help individuals navigate life's complexities. With powerful search capabilities, it enables users to find answers, resources, and support for a wide range of topics including health, relationships, career, and personal growth.</StyledText>
        </StyledView>
      </View>
    </TouchableWithoutFeedback>
  );
}
export default withExpoSnack(ModalScreen);

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: '#010203',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButton: {
    position: 'absolute',
    top: 40, // Adjust the top position
    left: 20,
  },
});
