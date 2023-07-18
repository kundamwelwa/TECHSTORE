import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import logo from '../assets/images/logo.png';
const Heading = () => {
  return (
    <View>
      <Image source={require('../assets/images/logo.png')}/>
    </View>
  )
}

export default Heading

const styles = StyleSheet.create({})