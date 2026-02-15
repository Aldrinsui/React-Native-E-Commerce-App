import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { Card, Text, Button } from 'react-native-paper';
import { useDispatch } from 'react-redux';
import { addToCart } from '../store/cartSlice';
import { Image } from 'expo-image';

export default function ProductDetailScreen({ route, navigation }) {
  const { product } = route.params;
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart(product));
    navigation.navigate('Cart');
  };

  return (
    <ScrollView style={styles.container}>
      <Card>
        <Image 
          source={{ uri: product.image }} 
          style={styles.image}
          contentFit="contain"
        />
        <Card.Content>
          <Text variant="headlineSmall" style={styles.title}>{product.title}</Text>
          <Text variant="headlineMedium" style={styles.price}>${product.price}</Text>
          <Text variant="bodyMedium" style={styles.description}>{product.description}</Text>
          <Text variant="bodySmall" style={styles.category}>Category: {product.category}</Text>
        </Card.Content>
        <Card.Actions>
          <Button mode="contained" onPress={handleAddToCart} style={styles.button}>
            Add to Cart
          </Button>
        </Card.Actions>
      </Card>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  image: {
    height: 300,
    width: '100%',
  },
  title: {
    marginTop: 16,
    marginBottom: 8,
  },
  price: {
    color: '#2196F3',
    fontWeight: 'bold',
    marginBottom: 16,
  },
  description: {
    marginBottom: 16,
    lineHeight: 22,
  },
  category: {
    color: '#666',
    marginBottom: 16,
  },
  button: {
    flex: 1,
    margin: 8,
  },
});
