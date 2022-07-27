import { createContext, useState, useEffect} from "react";

const addCartItem = (cartItems, productToAdd) => {
    const existingCartItem = cartItems.find((cartItem) => cartItem.id === productToAdd.id);

    // for existing Cart Item
    if(existingCartItem){
        return cartItems.map((cartItem) => cartItem.id === productToAdd.id 
        ? {...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem);
    }

    // for new product
    return [...cartItems, {...productToAdd, quantity: 1}];
    
}
const removeCatItem = (cartItems, cartItemToRemove) => {
    const existingCartItem = cartItems.find((cartItem) => cartItemToRemove.id === cartItemToRemove.id);

    if(existingCartItem.quantity === 1){
        return cartItems.filter(cartItem => cartItem.id !== cartItemToRemove.id);
    }
        return cartItems.map((cartItem) => cartItem.id === cartItemToRemove.id 
        ? {...cartItem, quantity: cartItem.quantity - 1 }
        : cartItem);
    
}

const clearCatItem = (cartItems, carItemToClear) => cartItems.filter(cartItem => cartItem.id !== carItemToClear.id);


export const CartContext = createContext({
    osCartOpen: false,
    setIsCarOpen: () => {},
    cartItems: [],
    addItemToCart: () => {},
    cartCount: 0,
    removeItemFromCart: () => {},
    clearItemFromCart: () => {},
    cartTotal: 0,
})

export const CartProvider = ({children}) => {
const [isCartOpen, setIsCartOpen] = useState(false);
const [cartItems, setCartItems] = useState([]);
const [cartCount, setCartCount] = useState(0);
const [cartTotal, setTotal] = useState(0);

useEffect(() => {
    const newCartCount = cartItems.reduce((cartCount, cartItem) => cartCount + cartItem.quantity, 0)
    setCartCount(newCartCount);
},[cartItems]);

useEffect(() => {
    const newCartTotal = cartItems.reduce((cartTotal, cartItem) => cartTotal + cartItem.quantity * cartItem.price, 0)
    setTotal(newCartTotal);
},[cartItems]);

const addItemToCart = (productToAdd) => {
    setCartItems(addCartItem(cartItems, productToAdd));
}

const removeItemFromCart = (cartItemToRemove) => {
    setCartItems(removeCatItem(cartItems, cartItemToRemove))
}

const clearItemFromCart = (cartItemToClear) => {
    setCartItems(clearCatItem(cartItems, cartItemToClear))
}

const value = {
    isCartOpen, 
    setIsCartOpen, 
    addItemToCart, 
    cartItems, 
    cartCount,
    removeItemFromCart,
    clearItemFromCart,
    cartTotal,}


    return (
        <CartContext.Provider value={value}>{children}</CartContext.Provider>
    )
}