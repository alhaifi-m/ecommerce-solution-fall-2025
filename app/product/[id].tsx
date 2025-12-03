import { StyleSheet, Text, View, ScrollView, TouchableOpacity, ActivityIndicator, Alert, Dimensions, Image } from 'react-native'
import { useLocalSearchParams, useRouter, Stack } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import { fetchProductById } from '@/api/product-service'
import { useCart } from '@/context/cart-context'
import CartIcon from '@/components/cart-icon'
import type { Product } from '@/types'
import { useEffect, useState } from 'react'

import React from 'react'

const { width } = Dimensions.get("window")

const ProductDetailScreen = () => {


  const router = useRouter()
  // const params = useLocalSearchParams() as Record<string, string | undefined>
  // const { id, intialData } = params
  const params = useLocalSearchParams() as {
    id?: string
    initialData?: string
  }

  const { id, initialData } = params

  const parsedInitialData: Product | null = initialData ? JSON.parse(initialData) : null


  const { addItem } = useCart()
  const [product, setProduct] = useState<Product | null>(parsedInitialData)
  const [loading, setLoading] = useState(!parsedInitialData)
  const [quantity, setQuanity] = useState(1)

  // Load product
  useEffect(() => {
    const loadProduct = async (): Promise<void> => {
      if (!product && id) {
        try {
          setLoading(true)
          const productData = await fetchProductById(id)
          setProduct(productData)
          if (productData) {
            router.setParams({ title: productData.title })
          }
        } catch (error) {
          console.error("Error loading product", error)
        } finally {
          setLoading(false)
        }
      }
    }
    loadProduct()
  }, [id, product, router])

  const increaseQuantity = () => setQuanity((prev) => prev + 1)
  const decreaseQunatity = () => setQuanity((prev) => prev > 1 ? prev - 1 : 1)

  const handleAddToCart = () => {
    if (product) {
      addItem(product, quantity)
      Alert.alert("Success", `${product.title} added to cart`)
    }
  }

  if (loading) {
    return (
      <View>
        <ActivityIndicator size="large" color="#5B37B7" />
      </View>
    )
  }

  if (!product) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Product not found</Text>
        <TouchableOpacity onPress={() => router.back()} style={styles.goBackButton}>
          <Ionicons name="arrow-back" size={20} color="#5B37B7" />
          <Text style={styles.goBackButtonText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    )
  }
  return (
    <>
      <Stack.Screen
        options={{
          title:
            product.title.length > 20 ? product.title.substring(0, 20) + "..." : product.title,
          headerRight: () => <CartIcon />
        }}
      />
      <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.imageContainer}>
            <Image
              source={{ uri: product.image }}
              style={styles.image}
              resizeMode="contain"
            />
          </View>
          <View style={styles.detailsContainer}>
            <View style={styles.categoryBadge}>
              <Text style={styles.categoryText}>{product.category.charAt(0).toLocaleUpperCase() + product.category.slice(1)}</Text>
            </View>
            <Text style={styles.title}>{product.title}</Text>
            <View style={styles.stars}>
              {
                [...Array(5)].map((_, index) => (
                  <Ionicons
                    key={index}
                    name={index < Math.floor(product.rating?.rate ?? 0) ? "star" : "star-outline"}
                    size={20}
                    color="#FFD700"
                    style={styles.star}
                  />
                )
                )
              }
            </View>
          </View>
          <Text style={styles.price}>${product.price.toFixed(2)}</Text>
          <View style={styles.divider}/>
          <Text style={styles.descriptionTitle}>Description</Text>
          <Text style={styles.descriptionText}>{product.description}</Text>
          <View style={styles.quantityContainer}>
            <Text style={styles.quantityLabel}>Quantity</Text>
            <View style={styles.quantityControls}>
              <TouchableOpacity onPress={decreaseQunatity}>
                <Ionicons name="remove-circle-outline" size={24} color="#5B37B7" />
              </TouchableOpacity>
              <Text style={styles.quantityValue}>{quantity}</Text>
              <TouchableOpacity onPress={increaseQuantity}>
                <Ionicons name="add-circle-outline" size={24} color="#5B37B7" />
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
        <View style={styles.footer}>
          <TouchableOpacity style={styles.wishlistButton} >
            <Ionicons name="heart-outline" size={24} color="#333" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.addToCartButton} onPress={handleAddToCart}>
            <Text style={styles.addToCartButtonText}>Add to Cart - ${ (product.price * quantity).toFixed(2)}</Text>
          </TouchableOpacity>

        </View>
      </View>
    </>
  )
}

export default ProductDetailScreen

const styles = StyleSheet.create({
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    fontSize: 18,
    color: '#666',
    marginBottom: 16,
  },
  goBackButton: {
    backgroundColor: '#5B37B7',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  goBackButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    backgroundColor: '#f0f0f0',
    width: width,
    height: width,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: width * 0.7,
    height: width * 0.7,
  },
  detailsContainer: {
    padding: 16,
  },
  categoryText: {
    fontSize: 12,
    color: '#333'
  },
  categoryBadge: {
    alignSelf: 'flex-start',
    backgroundColor: '#E0E0E0',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    marginBottom: 12,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  star: { marginRight: 2 },
  stars: { flexDirection: 'row', marginBottom: 16, alignItems: 'center' },
  price: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#5B37B7',
    marginBottom: 16,
  },
  divider: {
    height: 1,
    backgroundColor: '#E0E0E0',
    marginVertical: 16,
  },
  descriptionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  descriptionText: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
    padding: 4,
  },
  quantityContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  quantityLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  quantityControls: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor:"#f0f0f0",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderWidth: 1,

  },
  quantityValue: {
    fontSize: 16,
    marginHorizontal: 12,
    color: '#333',
    fontWeight: '500',
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  wishlistButton: {
    display: 'flex',
    flexDirection: 'row',
    alignContent: 'center',
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    marginRight: 16,
  },
  addToCartButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#5B37B7',
    borderRadius: 8,
    height: 50,
  },
  addToCartButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
})