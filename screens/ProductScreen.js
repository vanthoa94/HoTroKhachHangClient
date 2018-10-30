import React, { Component } from 'react';
import { View, Text } from 'react-native';

export default class ProductScreen extends Component {
    render() {
        return (
            <View>
                <Text>Product Screen</Text>
            </View>
        );
    }
}

ProductScreen.navigationOptions = {
    title: 'Sản Phẩm'
};