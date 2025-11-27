import { Text, View, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { fetchAllCategories, fetchFeaturedProducts, fetchFeaturedProductsByCategory } from "@/api/product-service";
import CartIcon from "@/components/cart-icon";
import type { Product } from "@/types";
import { router, Stack } from "expo-router";
import CategoryPill from "@/components/category-pill";
import { HeaderTitle } from "@react-navigation/elements";



export default function Index() {
  const [loading, setLoading] = useState(true)
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<string[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [categoryProducts, setCategoryProducts] = useState<Product[]>([])

  const loadDate = async () => {
    try {
      setLoading(true)
      // Fetch Featured products from the API
      const products = await fetchFeaturedProducts(10)
      setFeaturedProducts(products)

      // Fetch all available categories from the API
      const categoryData = await fetchAllCategories()
      setCategories(categoryData)

      // Fetch Product by Category
      if (categoryData.length > 0) {
        const defaultCategory = categoryData[0]
        const categoryProductData = await fetchFeaturedProductsByCategory(defaultCategory)
        setCategoryProducts(categoryProductData)
        setSelectedCategory(defaultCategory)
      }

    } catch (error) {
      console.error("Error loading data on index page", error);

    }
    finally {
      setLoading(false)
    }
  }

  const handleCategorySelect = async (category: string | null) => {
    setSelectedCategory(category);
    if (!category) {
      // if All is selected
      setCategoryProducts(featuredProducts)
      return;
    }
    try {
      const products = await fetchFeaturedProductsByCategory(category)
      setCategoryProducts(products)

    } catch (error) {
      console.error("Error fetching products by category", error);
    }
  }

  useEffect(() => {
    loadDate()
  }, [])

  return (
    <>
      <Stack.Screen
        // name="Home"
        options={{
          headerTitle: "My Store",
          headerRight: () => <CartIcon />
        }}
      />
      <View
        style={styles.container}
      >
        <CategoryPill
          categories={categories}
          onSelectCategory={handleCategorySelect}
          selectedCategory={selectedCategory}
        />
      </View>
    </>
  );
}
const styles = StyleSheet.create({
  container: {

  },
});