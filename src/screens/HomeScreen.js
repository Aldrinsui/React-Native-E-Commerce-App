import React, { useEffect } from 'react';
import { View, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { Card, Text, Button, ActivityIndicator } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../store/productsSlice';
import { Image } from 'expo-image';

export default function HomeScreen({ navigation }) {
  const dispatch = useDispatch();
  const { items, loading } = useSelector((state) => state.products);
  const cartItems = useSelector((state) => state.cart.items);

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  const renderProduct = ({ item }) => (
    <TouchableOpacity 
      onPress={() => navigation.navigate('ProductDetail', { product: item })}
      style={styles.cardContainer}
    >
      <Card style={styles.card}>
        <Image 
          source={{ uri: item.image }} 
          style={styles.image}
          contentFit="contain"
        />
        <Card.Content>
          <Text variant="titleMedium" numberOfLines={2}>{item.title}</Text>
          <Text variant="headlineSmall" style={styles.price}>${item.price}</Text>
        </Card.Content>
      </Card>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={items}
        renderItem={renderProduct}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        contentContainerStyle={styles.list}
      />
      <Button 
        mode="contained" 
        onPress={() => navigation.navigate('Cart')}
        style={styles.cartButton}
        icon="cart"
      >
        Cart ({cartItems.length})
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  list: {
    padding: 8,
  },
  cardContainer: {
    flex: 1,
    margin: 8,
  },
  card: {
    flex: 1,
  },
  image: {
    height: 150,
    width: '100%',
  },
  price: {
    color: '#2196F3',
    fontWeight: 'bold',
    marginTop: 8,
  },
  cartButton: {
    margin: 16,
  },
});
