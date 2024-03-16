import React, { useState } from "react";
import { View, TextInput, Button, Text, StyleSheet } from "react-native";
import { useUser, useAuth } from "@clerk/clerk-expo";

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

  return (
    <View style={styles.container}>
      <Text style={styles.greeting}>
        Good morning {user?.firstName} {user?.lastName}!
      </Text>

      <TextInput
        placeholder="First Name"
        value={firstName}
        onChangeText={setFirstName}
        style={styles.inputField}
      />
      <TextInput
        placeholder="Last Name"
        value={lastName}
        onChangeText={setLastName}
        style={styles.inputField}
      />
      <Button onPress={onSaveUser} title="Update account" color={"#a855f6"} />

      <Button
        onPress={onLogout}
        title="Logout"
        color={"#a855f6"}
        style={styles.logoutButton}
      />
    </View>
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
    width: "100%",
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
