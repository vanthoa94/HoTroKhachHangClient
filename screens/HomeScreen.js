import React, { Component } from 'react';
import { View, Button, Text, TextInput, StyleSheet, Alert, ScrollView } from 'react-native';
import TextAreaAutoHeight from './../components/TextAreaAutoHeight';
import database from './../database';

export default class HomeScreen extends Component {
    constructor(props) {
        super(props);

        this.contactInfo = {
            name: "",
            address: "",
            content: "",
            phone: "",
            status: false
        };

        this.state = {
            content: "",
            disableSendButton: false
        };

        this.deviceTokenList = null;
    }

    componentDidMount() {
        database.init();
    }

    isValid() {
        let errorObject = {};
        let hasError = false;
        if (this.contactInfo.content.trim() == "") {
            errorObject["error_content"] = "Vui lòng nhập nội dung cần trợ giúp!";
            hasError = true;
        }

        if (this.contactInfo.name.trim() == "") {
            errorObject["error_name"] = "Vui lòng nhập họ tên của bạn!";
            hasError = true;
        }

        if (this.contactInfo.phone.trim() == "") {
            errorObject["error_phone"] = "Vui lòng nhập số điện thoại của bạn!";
            hasError = true;
        }

        if (hasError === true) {
            this.setState(errorObject);
            return false;
        }

        return true;
    }

    async sendToOtherServer(deviceToken) {
        let res = await fetch('https://fcm.googleapis.com/fcm/send', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "key=AAAAkl9M2FU:APA91bH29TFSL7SDt8IUmvZl29-2OQW-0KLJZvz9Y7f51JpT03t8la6gXkQ-cLVt0fyxWawomJoNNmuy63T31VyuFC0mf7kFB46LXSDzfU0sjXQF47eaPDlg5bKSTGylo_vj9wxjHvIb"
            },
            body: JSON.stringify({
                to: deviceToken,
                notification: {
                    title: this.contactInfo.name + " - " + this.contactInfo.phone,
                    body: this.contactInfo.content,
                    priority: "high",
                    show_in_foreground: true,
                    targetScreen: "detail",
                    sound: "default",
                    icon: "ic_launcher"
                },
                priority: 10
            })
        });
    }

    async sendToServer() {
        try {

            if(this.contactInfo.content.length > 100) {
                this.contactInfo.content = this.contactInfo.content.substr(0, 100) + "...";
            }

            if(this.deviceTokenList != null) {
                for(let deviceToken in this.deviceTokenList) {
                    this.sendToOtherServer(deviceToken);
                }
            } else {
                this.deviceTokenList = [];
                database.loadAllData('DeviceToken', function(data, key) {
                    if(key) {
                        this.deviceTokenList[key] = true;
                        this.sendToOtherServer(key);
                    }
                }.bind(this));
            }

        } catch (err) {
            
        }
    }

    sendContentRet(ret) {
        if (ret === true) {
            this.sendToServer();

            this.setState({
                content: "",
                disableSendButton: false
            });

            Alert.alert(
                'Thông Báo',
                'Gửi thành công liên hệ!. Sẽ có nhân viên cửa hàng gọi điện cho bạn trong thời gian sớm nhất',
                [
                    { text: 'OK', onPress: () => { } },
                ],
                { cancelable: false }
            );
        } else {
            this.setState({
                disableSendButton: false
            });

            Alert.alert(
                'Thông Báo',
                'Gửi liên hệ thất bại!. Vui lòng kiểm tra lại internet.',
                [
                    { text: 'OK', onPress: () => { } },
                ],
                { cancelable: false }
            );
        }
    }

    sendContact() {
        if (this.isValid()) {

            this.setState({
                disableSendButton: true
            });

            database.insert('Contracts', this.contactInfo, this.sendContentRet.bind(this));
        }
    }

    changeText(key, newValue) {
        this.contactInfo[key] = newValue;

        //clear error message
        let errorKey = `error_${key}`;
        if (this.state[errorKey] != null && this.state[errorKey] != "") {
            this.setState({
                [errorKey]: ""
            });
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <ScrollView>
                    <View style={styles.row}>
                        <Text style={styles.label}>Tên</Text>
                        <TextInput
                            placeholder="Họ và tên"
                            style={styles.inputStyle}
                            maxLength={50}
                            editable={true}
                            onChangeText={(newValue) => {
                                this.changeText("name", newValue);
                            }}
                        />
                        <Text style={styles.errorMessage}>{this.state.error_name}</Text>
                    </View>

                    <View style={styles.row}>
                        <Text style={styles.label}>Số điện thoại</Text>
                        <TextInput
                            placeholder="Nhập vào số điện thoại của bạn"
                            style={styles.inputStyle}
                            maxLength={13}
                            keyboardType="phone-pad"
                            onChangeText={(newValue) => {
                                this.changeText("phone", newValue);
                            }}
                        />
                        <Text style={styles.errorMessage}>{this.state.error_phone}</Text>
                    </View>

                    <View style={styles.row}>
                        <Text style={styles.label}>Địa chỉ</Text>
                        <TextInput
                            placeholder="Nhập vào địa chỉ nhà của bạn"
                            style={styles.inputStyle}
                            onChangeText={(newValue) => {
                                this.changeText("address", newValue);
                            }}
                        />
                        <Text style={styles.errorMessage}>{this.state.error_address}</Text>
                    </View>

                    <View style={styles.row}>
                        <Text style={styles.label}>Nội dung</Text>
                        <TextAreaAutoHeight
                            placeholder="Nhập vào nội dung, tình trạng máy tính"
                            style={styles.inputStyle}
                            value={this.state.content}
                            onChangeText={(newValue) => {
                                this.changeText("content", newValue);
                                this.setState({
                                    content: newValue
                                });
                            }}
                        />
                        <Text style={styles.errorMessage}>{this.state.error_content}</Text>
                    </View>
                    <Text />
                    <Button
                        title="Gửi Liên Hệ"
                        disabled={this.state.disableSendButton}
                        onPress={this.sendContact.bind(this)} />
                </ScrollView>
            </View>
        );
    }
}

HomeScreen.navigationOptions = {
    title: 'Liên Hệ'
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 12,
        paddingTop: 20,
        backgroundColor: 'white'
    },
    label: {
        margin: 3,
        color: '#555555',
        fontWeight: 'bold',
        fontSize: 15
    },
    row: {
        marginBottom: 5
    },
    inputStyle: {
        borderBottomColor: '#555555',
        fontSize: 14,
        borderBottomWidth: 1
    },
    errorMessage: {
        color: 'red',
        fontSize: 12,
        marginLeft: 3
    }
});