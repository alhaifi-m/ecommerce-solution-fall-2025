import { Text, View } from "react-native";
import { fetchFeaturedProducts } from "@/api/product-service";



export default  function Index() {

  // Test fetching featured products


  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Welcome to the E-commerce Solution!</Text>
    </View>
  );
}
