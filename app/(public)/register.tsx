import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { useSignUp } from '@clerk/clerk-expo';
import Spinner from 'react-native-loading-spinner-overlay';
import { Stack } from 'expo-router';


import { withExpoSnack, styled } from 'nativewind';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTextInput = styled(TextInput);

const Register = () => {
  const { isLoaded, signUp, setActive } = useSignUp();

  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');
  const [pendingVerification, setPendingVerification] = useState(false);
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);

  // Create the user and send the verification email
  const onSignUpPress = async () => {
    if (!isLoaded) {
      return;
    }
    setLoading(true);

    try {
      // Create the user on Clerk
      await signUp.create({
        emailAddress,
        password,
      });

      // Send verification Email
      await signUp.prepareEmailAddressVerification({ strategy: 'email_code' });

      // change the UI to verify the email address
      setPendingVerification(true);
    } catch (err: any) {
      alert(err.errors[0].message);
    } finally {
      setLoading(false);
    }
  };

  // Verify the email address
  const onPressVerify = async () => {
    if (!isLoaded) {
      return;
    }
    setLoading(true);

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      });

      await setActive({ session: completeSignUp.createdSessionId });
    } catch (err: any) {
      alert(err.errors[0].message);
    } finally {
      setLoading(false);
    }
  };

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <StyledView className="flex-1 items-center bg-black">
        <Stack.Screen options={{ headerBackVisible: !pendingVerification }} />
        <Spinner visible={loading} />

        {!pendingVerification && (
          <>
            <StyledTextInput className="p-2 mt-10 w-60 border-2 border-slate-600 rounded-md text-white"
   autoCapitalize="none" placeholder="yourname@gmail.com" value={emailAddress} onChangeText={setEmailAddress} style={styles.inputField} />
            <StyledTextInput className="p-2 mt-3 w-60 border-2 border-slate-600 rounded-md text-white" placeholder="password" value={password} onChangeText={setPassword} secureTextEntry style={styles.inputField} />

            <Button onPress={onSignUpPress} title="Sign up" color={'#a855f6'} />
          </>
        )}

        {pendingVerification && (
          <>
            <View>
              <TextInput value={code} placeholder="Code..." style={styles.inputField} onChangeText={setCode} />
            </View>
            <Button onPress={onPressVerify} title="Verify Email" color={'#a855f6'} />
          </>
        )}
      </StyledView>
    </TouchableWithoutFeedback> 
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#010203',
  },
  inputField: {
    marginVertical: 4,
    height: 50,
    borderWidth: 1,
    borderColor: '#a855f6',
    borderRadius: 4,
    padding: 10,
    backgroundColor: '#010203',
    color: '#fff',
  },
});

export default withExpoSnack(Register);
