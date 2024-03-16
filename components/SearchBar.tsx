// searchbar.tsx
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View, ActivityIndicator } from 'react-native';
import { withExpoSnack, styled } from 'nativewind';
import { Search } from 'lucide-react-native';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTextInput = styled(TextInput);

const SearchBar: React.FC = () => {
  const [query, setQuery] = useState<string>(''); 
  const [answer, setAnswer] = useState<string>(''); // State to hold the answer
  const [loading, setLoading] = useState<boolean>(false); // State to track loading status
  const [typedAnswer, setTypedAnswer] = useState<string>(''); // State to hold typed answer

  useEffect(() => {
    // Simulate typing effect when the answer changes
    if (answer) {
      setLoading(true);
      const delay = 50; // Adjust typing speed
      let index = 0;
      const interval = setInterval(() => {
        setTypedAnswer(answer.substring(0, index));
        index++;
        if (index > answer.length) {
          setLoading(false);
          clearInterval(interval);
        }
      }, delay);
    }
  }, [answer]);

  async function handleSend() {
    setLoading(true); // Set loading state to true
    try {
      const response = await fetch(`https://api.puno.lol/entries/search?query=${query}&userId=shoubhit`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      const data = await response.json();
      setAnswer(data.answer); // Set the answer received from the API
    } catch (error) {
      console.error("Error:", error);
      // Handle error
    } finally {
      setLoading(false); // Set loading state to false after fetching data
    }
  }

  return (
    <StyledView>
      <StyledView className="justify-center mx-10"> 
        <StyledView className="flex-row items-center">
          <StyledTextInput
            style={styles.input}
            placeholder='Query your life...'
            onChangeText={(text: string) => setQuery(text)} 
          />
          <TouchableOpacity onPress={handleSend}>
            <StyledView style={styles.searchButton}>
              {loading ? ( // Render loader if loading state is true
                <ActivityIndicator color="white" size="small" />
              ) : (
                <StyledText>
                  <Search color="white" size={20} />
                </StyledText>
              )}
            </StyledView>
          </TouchableOpacity>
        </StyledView>
      </StyledView>
      {typedAnswer && (
        <StyledView style={styles.answerContainer}>
          <StyledText style={styles.answerText}>{typedAnswer}</StyledText>
        </StyledView>
      )}
    </StyledView>
  );
}

const styles = StyleSheet.create({
  input: {
    paddingHorizontal: 10,
    paddingVertical: 8,
    width: '70%',
    backgroundColor: '#333',
    color: 'white',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#777',
  },
  searchButton: {
    backgroundColor: '#a855f6',
    padding: 10,
    borderRadius: 5,
    marginLeft: 10,
  },
  answerContainer: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#1f1f1f', // Change background color
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#a855f6', // Change border color
  },
  answerText: {
    color: 'white',
  },
});

export default withExpoSnack(SearchBar);
