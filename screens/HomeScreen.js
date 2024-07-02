import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';

const products = [
  { id: '1', name: 'Product 1', price: '$10', image: require('../assets/Prod1.png') },
  { id: '2', name: 'Product 2', price: '$15', image: require('../assets/Prod2.png') },
  { id: '3', name: 'Product 3', price: '$20', image: require('../assets/Prod3.png') },
  { id: '4', name: 'Product 4', price: '$25', image: require('../assets/Prod4.png') },
];

const HomeScreen = () => {
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

  const addToCart = async (product) => {
    const productExists = cart.some((item) => item.id === product.id);
    if (!productExists) {
      const updatedCart = [...cart, product];
      setCart(updatedCart);
      await AsyncStorage.setItem('cart', JSON.stringify(updatedCart));
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Available Products</Text>
      <View style={styles.grid}>
        {products.map((item) => (
          <View key={item.id} style={styles.product}>
            <Image source={item.image} style={styles.image} />
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.price}>{item.price}</Text>
            <TouchableOpacity style={styles.addButton} onPress={() => addToCart(item)}>
              <Ionicons name="add-circle" size={30} color="green" />
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  product: {
    width: '48%',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: 100,
    resizeMode: 'cover',
  },
  name: {
    fontSize: 16,
    marginVertical: 5,
  },
  price: {
    fontSize: 14,
    color: 'gray',
  },
  addButton: {
    position: 'absolute',
    bottom: 10,
    right: 10,
  },
});

export default HomeScreen;
