import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';

const CartScreen = ({ route }) => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const loadCart = async () => {
      const storedCart = await AsyncStorage.getItem('cart');
      if (storedCart) {
        setCart(JSON.parse(storedCart));
      }
    };
    loadCart();
  }, []);

  useEffect(() => {
    if (route.params?.cart) {
      setCart(route.params.cart);
    }
  }, [route.params?.cart]);

  const removeFromCart = async (product) => {
    const updatedCart = cart.filter((item) => item.id !== product.id);
    setCart(updatedCart);
    await AsyncStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + parseFloat(item.price.slice(1)), 0).toFixed(2);
  };

  return (
    <View style={styles.container}>
       <Text style={styles.title}>C h e c k o u t</Text>
      <FlatList
        data={cart}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.product}>
            <Image source={item.image} style={styles.image} />
            <View style={styles.details}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.price}>{item.price}</Text>
              <TouchableOpacity style={styles.removeButton} onPress={() => removeFromCart(item)}>
                <Ionicons name="remove-circle" size={30} color="red" />
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
      <View style={styles.totalContainer}>
        <Text style={styles.totalText}>E s t Total: ${getTotalPrice()}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingTop: 80, 
    backgroundColor: 'white',
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
  },
  product: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: 'white',
  },
  image: {
    width: 150,
    height: 200,
    resizeMode: 'cover',
  },
  details: {
    flex: 1,
    marginLeft: 10,
  },
  name: {
    fontSize: 16,
  },
  price: {
    fontSize: 14,
    color: 'gray',
  },
  removeButton: {
    marginTop: 5,
  },
  totalContainer: {
    borderTopWidth: 1,
    borderColor: 'white',
    paddingTop: 10,
    alignItems: 'center',
  },
  totalText: {
    fontSize: 18,
    
  },
});

export default CartScreen;
