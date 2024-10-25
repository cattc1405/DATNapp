import { StyleSheet, View, Text } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import Payment1 from './Payment1'
import Payment4 from './Payment4'
import Payment5 from './Payment5'

const Stack = createStackNavigator()

const PaymentNavigation = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Payment1" component={Payment1} />
      <Stack.Screen name="Payment4" component={Payment4} />
      <Stack.Screen name="Payment5" component={Payment5} />
    </Stack.Navigator>
  )
}

export default PaymentNavigation

const styles = StyleSheet.create({})
