import { StyleSheet, Text, View, FlatList, RefreshControl, type ListRenderItem, ActivityIndicator } from 'react-native'
import { useLocalSearchParams, useRouter, Stack } from 'expo-router'
import ProductCard from '@/components/product-card'
import SearchBar from '@/components/search-bar'
import CartIcon from '@/components/cart-icon'
import { searchPorducts } from '@/api/product-service'
import type { Product } from '@/types'
import { useEffect, useState } from 'react'

import React from 'react'

const ProductListingScreen = () => {
  return (
    <View>
      <Text>product-listing</Text>
    </View>
  )
}

export default ProductListingScreen

const styles = StyleSheet.create({})