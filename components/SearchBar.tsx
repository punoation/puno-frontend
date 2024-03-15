import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { withExpoSnack, styled } from 'nativewind';
import { ArrowUpRight, FileSearch } from 'lucide-react-native';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTextInput = styled(TextInput);

const SearchBar: React.FC = () => {
  const [query, setQuery] = useState<string>(''); 

  function handleSend() {
    console.log("hello world");
  }

  return (
    <StyledView>
      <StyledView className="justify-center mx-10"> 
        <StyledView className="flex-row items-center">
          <StyledTextInput
            className="p-2 w-60 border-2 border-slate-600 rounded-md text-white"
            placeholder='Query your life...'
            onChangeText={(text: string) => setQuery(text)} 
          />
          <TouchableOpacity onPress={handleSend}>
            <StyledView className="bg-purple-500 p-2 rounded-md ml-2">
              <StyledText>
                <ArrowUpRight color="white"/>
              </StyledText>
            </StyledView>
          </TouchableOpacity>
        </StyledView>
      </StyledView>
    </StyledView>
  );
}

export default withExpoSnack(SearchBar);
