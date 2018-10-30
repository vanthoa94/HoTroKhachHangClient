import React, { Component } from 'react';
import { View, Text } from 'react-native';

export default class BookMarkScreen extends Component {
    render() {
        return (
            <View>
                <Text>Book Mark Screen</Text>
            </View>
        );
    }
}

BookMarkScreen.navigationOptions = {
    title: 'Báo Giá'
};