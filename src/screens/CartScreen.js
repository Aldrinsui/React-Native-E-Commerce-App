import React from 'react';
import { View, FlatList, StyleSheet, Alert } from 'react-native';
import { Card, Text, Button, IconButton, Divider } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromCart, updateQuantity, clearCart } from '../store/cartSlice';
import { Image } from 'expo-image';

export default function CartScreen() {
  const dispatch = useDispatch();
  const { items, total } = useSelector((state) => state.cart);

  const handleCheckout = () => {
    Alert.alert(
      'Order Confirmed',
      `Total: $${total.toFixed(2)}\nThank you for your purchase!`,
      [
        {
          text: 'OK',
          onPress: () => dispatch(clearCart()),
        },
      ]
    );
  };

  const renderCartItem = ({ item }) => (
    <Card style={styles.card}>
      <View style={styles.itemContainer}>
        <Image 
          source={{ uri: item.image }} 
          style={styles.image}
          contentFit="contain"
        />
        <View style={styles.details}>
          <Text variant="titleSmall" numberOfLines={2}>{item.title}</Text>
          <Text variant="bodyLarge" style={styles.price}>${item.price}</Text>
          <View style={styles.quantityContainer}>
            <IconButton
              icon="minus"
              size={20}
              onPress={() => {
                if (item.quantity > 1) {
                  dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }));
                }
              }}
            />
            <Text variant="bodyLarge">{item.quantity}</Text>
            <IconButton
              icon="plus"
              size={20}
              onPress={() => {
                dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }));
              }}
            />
          </View>
        </View>
        <IconButton
          icon="delete"
          size={24}
          onPress={() => dispatch(removeFromCart(item.id))}
        />
      </View>
    </Card>
  );

  if (items.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text variant="headlineSmall">Your cart is empty</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={items}
        renderItem={renderCartItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.list}
      />
      <View style={styles.footer}>
        <Divider />
        <View style={styles.totalContainer}>
          <Text variant="headlineSmall">Total:</Text>
          <Text variant="headlineSmall" style={styles.total}>${total.toFixed(2)}</Text>
        </View>
        <Button mode="contained" onPress={handleCheckout} style={styles.checkoutButton}>
          Checkout
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  list: {
    padding: 8,
  },
  card: {
    marginVertical: 8,
  },
  itemContainer: {
    flexDirection: 'row',
    padding: 12,
    alignItems: 'center',
  },
  image: {
    width: 80,
    height: 80,
  },
  details: {
    flex: 1,
    marginLeft: 12,
  },
  price: {
    color: '#2196F3',
    fontWeight: 'bold',
    marginVertical: 4,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  footer: {
    backgroundColor: 'white',
    padding: 16,
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 16,
  },
  total: {
    color: '#2196F3',
    fontWeight: 'bold',
  },
  checkoutButton: {
    marginTop: 8,
  },
});
