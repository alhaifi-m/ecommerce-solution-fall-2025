import { StyleSheet, Text, View, FlatList, TouchableOpacity, Image, Alert } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import { useCart } from '@/context/cart-context'
import { CartItem } from '@/types'

const CartScreen = () => {
  return (
    <View>
      <Text>Cart</Text>
    </View>
  )
}

export default CartScreen
const styles = StyleSheet.create({})