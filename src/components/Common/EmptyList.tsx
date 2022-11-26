import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Colors from '../../constants/Colors';
import { IEmptyList } from '../../Interface/FormComponents';

const EmptyList: React.FC<IEmptyList> = ({ title = 'List' }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>No {title} Available</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    color: Colors.TEXT.LIGHT_GRAY,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default EmptyList;
