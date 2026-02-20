import React from 'react';
import { View, Text } from 'react-native';

const WebMapFallback = (props) => (
  <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
    <Text>Map not available on web</Text>
  </View>
);

export default WebMapFallback;