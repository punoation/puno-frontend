import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableWithoutFeedback, Keyboard, FlatList, Dimensions, TouchableOpacity } from 'react-native';
import { withExpoSnack, styled } from 'nativewind';
import { useNavigation } from '@react-navigation/native'; // Import navigation hook

const StyledView = styled(View);
const StyledText = styled(Text);
const Card = styled(View);

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
      <TouchableOpacity onPress={() => navigation.navigate('NewPage', {item})}>
        <Card style={styles.tagCard}>
          <StyledText style={styles.tagText}>{item}</StyledText>
        </Card>
      </TouchableOpacity>
    );
  };

  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <StyledView style={styles.container}>
        <StyledText className='text-white font-bold text-2xl p-5'>Tags</StyledText>
        <FlatList
          data={tags}
          renderItem={renderTagCard}
          numColumns={2}
          keyExtractor={(item, index) => index.toString()} // Ensure keyExtractor returns a string
          contentContainerStyle={styles.tagContainer}
        />
      </StyledView>
    </TouchableWithoutFeedback>
  );
}

const windowWidth = Dimensions.get('window').width;
const cardWidth = (windowWidth - 40) / 2; // Considering 20 margin on each side

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tagContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
  },
  tagCard: {
    width: cardWidth,
    height: cardWidth,
    backgroundColor: 'lightgray',
    borderRadius: 8,
    padding: 20,
    margin: 10,
    alignItems: 'center',
    justifyContent: 'center', // Center horizontally and vertically
  },
  tagText: {
    textAlign: 'center', // Center text within the card
  },
});

export default withExpoSnack(TabOneScreen);
