import { StyleSheet, Text, View } from 'react-native'
import React, {useState, useEffect} from 'react'
import * as Animatable from 'react-native-animatable';
const Buy = () => {

  const [text, setText] = useState('');
  const originalText = 'Hello, world! This is a typewriter effect.';
  const delay = 50; // change the delay to control the speed of the typewriter effect
  let currentIndex = 0;

  useEffect(() => {
    const interval = setInterval(() => {
      if (currentIndex < originalText.length) {
        setText(originalText.slice(0, currentIndex + 1));
        currentIndex++;
      } else {
        clearInterval(interval);
      }
    }, delay);

    return () => clearInterval(interval);
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>{text}</Text>
    </View>
  )
}

export default Buy

const styles = StyleSheet.create({})