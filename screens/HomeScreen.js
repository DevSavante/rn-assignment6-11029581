import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';

const products = [
  { id: '1', name: 'Office wear reversible angora cardigan', price: '$120', image: require('../assets/Prod1.png') },
  { id: '2', name: 'reversible angora cardigan black', price: '$120', image: require('../assets/Prod2.png') },
  { id: '3', name: 'Church Wear Lamerei reversible angora cardigan', price: '$120', image: require('../assets/Prod3.png') },
  { id: '4', name: 'Reversible angora cardigan', price: '$120', image: require('../assets/Prod4.png') },
  { id: '5', name: '21WN Reversible angora cardigan', price: '$120', image: require('../assets/Prod5.png') },
  { id: '6', name: 'Lopo Reversible angora cardigan', price: '$120', image: require('../assets/Prod6.png') },
  { id: '7', name: '21WN Reversible angora cardigan', price: '$120', image: require('../assets/Prod7.png') },
  { id: '8', name: 'Lame', price: '$120', image: require('../assets/Prod8.png') },
  
];

const HomeScreen = ({ navigation }) => {
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
      navigation.navigate('Cart', { cart: updatedCart }); // Navigate to Cart with updated cart
    }
  };

  return (
    <ScrollView style={styles.container}>
       <Text style={styles.title}>O U R S t o r e</Text>
      <View style={styles.grid}>
        {products.map((item) => (
          <View key={item.id} style={styles.product}>
            <Image source={item.image} style={styles.image} />
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.price}>{item.price}</Text>
            <TouchableOpacity style={styles.addButton} onPress={() => addToCart(item)}>
              <Ionicons name="add-circle" size={30} color="black" />
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
    paddingTop: 70,
    backgroundColor: 'white',
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
    height: 200, 
    marginBottom: 100,
    borderWidth: 1,
    borderColor: 'white',
    padding: 10,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: 200,
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
    bottom: -10,
    right: 10,
  },
});

export default HomeScreen;
