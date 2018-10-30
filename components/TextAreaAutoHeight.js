import React, { Component } from 'react';
import { View, TextInput } from 'react-native';

export default class TextAreaAutoHeight extends Component {
    constructor(props) {
        super(props);
        this.state = { height: 0 };
    }

    render() {
        return (
            <View>
                <TextInput
                    placeholder={this.props.placeholder}
                    multiline={true}
                    value={this.props.value}
                    onContentSizeChange={(event) => {
                        this.setState({
                            height: event.nativeEvent.contentSize.height + 5
                        });
                    }}
                    onChangeText={(newValue) => {
                        this.props.onChangeText(newValue);
                    }}
                    style={[{
                        height: Math.max(35, this.state.height),
                        maxHeight: 150
                    },this.props.style]}
                />
            </View>
        );
    }
}