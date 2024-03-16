import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableWithoutFeedback, Keyboard, FlatList, Dimensions, TouchableOpacity } from 'react-native';
import { withExpoSnack, styled } from 'nativewind';
import { useNavigation } from '@react-navigation/native'; // Import navigation hook

const StyledView = styled(View);
const StyledText = styled(Text);
// const Card = styled(View);

interface TagCardProps {
  item: string;
}

const TabOneScreen: React.FC = () => {
  const navigation = useNavigation(); // Get navigation object
  const [tags, setTags] = useState<string[]>(['Productivity', 'Code', 'Memories', 'Important']);
  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  const renderTagCard = ({ item }: { item: string }) => {
    return (
      //@ts-ignore
      <TouchableOpacity onPress={() => navigation.navigate('tag', {item})}>
        <StyledView style={styles.tagCard}>
          <StyledText className="text-white font-bold">{item}</StyledText>
        </StyledView>
      </TouchableOpacity>
    );
  };

  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <StyledView className="flex items-center justify-center">
        <StyledText className='text-white font-bold text-2xl p-5'>Tags</StyledText>
        <FlatList
          data={tags}
          renderItem={renderTagCard}
          numColumns={2}
          keyExtractor={(item, index) => index.toString()} 
          contentContainerStyle={styles.tagContainer}
        />
      </StyledView>
    </TouchableWithoutFeedback>
  );
}

const windowWidth = Dimensions.get('window').width;
const cardWidth = (windowWidth - 40) / 2; 

const styles = StyleSheet.create({
  tagContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
  },
  tagCard: {
    width: cardWidth,
    height: cardWidth,
    borderRadius: 10,
    padding: 15,
    margin: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
});

export default withExpoSnack(TabOneScreen);
