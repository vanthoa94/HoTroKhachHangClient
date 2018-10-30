import React from 'react';
import { Image } from 'react-native';
import { createBottomTabNavigator, createStackNavigator } from 'react-navigation';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import BookMarkScreen from './screens/BookMarkScreen';


const App = createBottomTabNavigator({
    Home: {
       screen: createStackNavigator({ HomeScreen }),
       navigationOptions: {
            title: "Liên Hệ",
            tabBarIcon: ({ focused }) => {
                if(focused == false)
                    return <Image source={require('./icons/contact.png')} />;
                return <Image source={require('./icons/contact-active.png')} />;     
            }
        },
    },
    Product: {
        screen: createStackNavigator({ ProductScreen }),
        navigationOptions: {
            title: "Sản Phẩm",
            tabBarIcon: ({ focused }) => {
                if(focused == false)
                    return <Image source={require('./icons/product.png')} />;
                return <Image source={require('./icons/product-active.png')} />;     
            },
        },
    },
    BookMark: {
        screen: createStackNavigator({ BookMarkScreen }),
        navigationOptions: {
            title: "Báo Giá",
            tabBarIcon: ({ focused }) => {
                if(focused == false)
                    return <Image source={require('./icons/mark.png')} />;
                return <Image source={require('./icons/mark-active.png')} />;     
            }
        },
    },
});

export default App;