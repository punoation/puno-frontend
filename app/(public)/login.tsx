import { useSignIn } from "@clerk/clerk-expo";
import { Link } from "expo-router";
import React, { useState } from "react";
import {
  View,
  TextInput,
  Button,
  Pressable,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";

import { withExpoSnack, styled } from "nativewind";

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTextInput = styled(TextInput);
const StyledPressable = styled(Pressable);

const Login = () => {
  const { signIn, setActive, isLoaded } = useSignIn();

  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const onSignInPress = async () => {
    if (!isLoaded) {
      return;
    }
    setLoading(true);
    try {
      const completeSignIn = await signIn.create({
        identifier: emailAddress,
        password,
      });

      // This indicates the user is signed in
      await setActive({ session: completeSignIn.createdSessionId });
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
        <StyledView className="p-4">
          <StyledText className="text-white font-bold text-[100rem] p-5">
            P
          </StyledText>

          <StyledTextInput
            autoCapitalize="none"
            placeholder="yourname@gmail.com"
            value={emailAddress}
            onChangeText={setEmailAddress}
            className="p-2 w-70 border-2 border-slate-600 rounded-md text-white"
          />
          <StyledTextInput
            placeholder="password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            className="p-2 w-70 mt-5 border-2 border-slate-600 rounded-md text-white"
          />

          <Button onPress={onSignInPress} title="Login" color={"#a855f6"} />
          <StyledView className="flex flex-row space-x-10">
            <Link href="/reset" asChild>
              <StyledPressable className="m-1 items-center">
                <StyledText className="text-violet-300 p-1">
                  Forgot password?
                </StyledText>
              </StyledPressable>
            </Link>
            <Link href="/register" asChild>
              <StyledPressable className="m-1 items-center">
                <StyledText className="text-black bg-violet-300 p-1 rounded-md">
                  Create Account
                </StyledText>
              </StyledPressable>
            </Link>
          </StyledView>
        </StyledView>
      </StyledView>
    </TouchableWithoutFeedback>
  );
};

export default withExpoSnack(Login);
