import { StyleSheet, Text, View, ScrollView, TouchableOpacity, ActivityIndicator, Alert, Dimensions, Image } from 'react-native'
import { useLocalSearchParams, useRouter, Stack } from 'expo-router'
import { Ionicons  } from '@expo/vector-icons'
import { fetchProductById } from '@/api/product-service'
import { useCart } from '@/context/cart-context'
import CartIcon from '@/components/cart-icon'
import type { Product } from '@/types'
import { useEffect, useState } from 'react'

import React from 'react'

const ProductDetailScreen = () => {
  return (
    <View>
      <Text>[id]</Text>
    </View>
  )
}

export default ProductDetailScreen

const styles = StyleSheet.create({})