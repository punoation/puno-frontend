import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native'; 
import { styled, withExpoSnack } from 'nativewind';

const StyledView = styled(View);
const StyledText = styled(Text);

interface NewPageProps {
  route: RouteProp<{ params: { item: string } }, 'params'>;
}

const NewPage: React.FC = () => {
  const route = useRoute<NewPageProps['route']>();
  const { item = '' } = route.params || {};

  console.log("route value :::: ", route);

  return (

    <StyledView className="flex mt-20 items-center justify-center">
      <StyledText className="text-white text-2xl">{item}</StyledText>
    </StyledView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tagText: {
    fontSize: 24,
  },
});

export default NewPage;
