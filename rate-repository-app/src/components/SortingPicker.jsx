import React from 'react';
import { Picker } from '@react-native-picker/picker';

const SortingPicker = ({ sorting, setSorting }) => {
  return (
    <Picker
      selectedValue={sorting}
      onValueChange={(value) => setSorting(value)}
      style={{ width: '100%' }}
    >
      <Picker.Item label="Latest repositories" value="latest" />
      <Picker.Item label="Highest rated repositories" value="highest" />
      <Picker.Item label="Lowest rated repositories" value="lowest" />
    </Picker>
  );
};

export default SortingPicker;