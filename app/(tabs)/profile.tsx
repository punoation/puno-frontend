import React, { useState } from "react";
import { View, TextInput, Button, Text, StyleSheet, TouchableWithoutFeedback, Keyboard } from "react-native";
import { useUser, useAuth } from "@clerk/clerk-expo";

import { withExpoSnack, styled } from "nativewind";
const StyledView = styled(View);
const StyledText = styled(Text);

const Profile = () => {
  const { user } = useUser();
  const { signOut, isSignedIn } = useAuth();
  const [firstName, setFirstName] = useState(user?.firstName || "");
  const [lastName, setLastName] = useState(user?.lastName || "");

  const onSaveUser = async () => {
    try {
      // Update user's first name and last name with the values in the state
      const result = await user?.update({
        firstName: firstName,
        lastName: lastName,
      });
      // console.log('onSaveUser ~ result:', result);
    } catch (e) {
      console.log("onSaveUser ~ e", JSON.stringify(e));
    }
  };

  const onLogout = () => {
    signOut();
  };

  if (!isSignedIn) {
    return (
      <View style={styles.container}>
        <Text style={styles.greeting}>You are logged out</Text>
      </View>
    );
  }

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };
  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
    <View style={styles.container}>
      <Text style={styles.greeting}>
        Hello {user?.firstName} 👋
      </Text>
      <StyledView className="flex flex-row space-x-10">
        <TextInput
          placeholder={firstName}
          // value={firstName}
          onChangeText={setFirstName}
          style={styles.inputField}

        />
        <TextInput
          placeholder={lastName}
          onChangeText={setLastName}
          style={styles.inputField}
        />
      </StyledView>
      <Button onPress={onSaveUser} title="Update account" color={"#a855f6"} />

      <View style={styles.logoutButton}>
        <Button onPress={onLogout} title="Logout" color={"#a855f6"} />
      </View>
    </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#000000", // Background color changed to full black
  },
  greeting: {
    color: "#fff", // Text color similar to the Login page
    textAlign: "center",
    marginBottom: 20,
    fontSize: 18,
  },
  inputField: {
    width: "40%",
    marginVertical: 10,
    height: 50,
    borderWidth: 1,
    borderColor: "#a855f6", // Border color similar to the Login page
    borderRadius: 4,
    paddingHorizontal: 10,
    backgroundColor: "#000000", // Background color changed to full black
    color: "#fff", // Text color similar to the Login page
  },
  logoutButton: {
    marginTop: 20,
  },
});

export default Profile;
