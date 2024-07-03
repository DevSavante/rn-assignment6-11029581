Product Display Layout:

Home Screen: The home screen displays products in a grid format, showing two products per row. Each product is represented with an image, name, price, and an "Add to Cart" button.
Cart Screen: The cart screen lists the items added to the cart. Each item shows the product image on the left, with the product name, price, and a "Remove from Cart" button on the right. The total price of all items in the cart is displayed at the bottom of the screen.

Navigation:

Bottom Tab Navigator: Users can switch between the home screen and the cart screen using a bottom tab navigator. Icons are used to represent each tab (home and cart), and the tab names are hidden from the top of the screen for a cleaner look.

Data Storage Implementation
AsyncStorage:
Purpose: AsyncStorage is used to store the cart data locally on the device. It allows persisting the cart items even if the app is closed and reopened.

How it Works:
Adding to Cart: When a user taps the "Add to Cart" button, the product is added to the cart array. This updated array is then saved to AsyncStorage.
Removing from Cart: When a user taps the "Remove from Cart" button, the product is removed from the cart array. This updated array is saved back to AsyncStorage.
Loading Cart Data: On the cart screen, the stored cart data is loaded from AsyncStorage when the screen is first rendered.

By using AsyncStorage, the app ensures that the user's cart data is saved and retrieved efficiently, providing a seamless shopping experience. The design choices for layout and navigation help create a user-friendly interface for viewing products and managing the cart.

