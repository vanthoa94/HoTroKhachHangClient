import firebase from 'firebase';

class Database {
    init() {
        if(this.isInit != null)
            return;

        this.isInit = true;

        // var config = {
        //     apiKey: "AIzaSyC9aEEMi3G4_1kmD0FDjz_ZdwYeIInc6Ks",
        //     authDomain: "vtth-1038b.firebaseapp.com",
        //     databaseURL: "https://vtth-1038b.firebaseio.com",
        //     projectId: "vtth-1038b",
        //     storageBucket: "vtth-1038b.appspot.com",
        //     messagingSenderId: "1093673526952"
        // };

        var config = {
            apiKey: "AIzaSyBQP_huHuCQdKqlK64iJlymg9_lRM2Rlp0",
            authDomain: "reactnativeapp-3b673.firebaseapp.com",
            databaseURL: "https://reactnativeapp-3b673.firebaseio.com",
            projectId: "reactnativeapp-3b673",
            storageBucket: "reactnativeapp-3b673.appspot.com",
            messagingSenderId: "628664096853"
        };

        firebase.initializeApp(config);
    }

    loadAllData(tableName, callback) {
        firebase.database().ref(tableName).once('value').then((snapshot) => {
            snapshot.forEach(function (childSnapshot) {
                var childData = childSnapshot.val();
                callback(childData, childSnapshot.key);
            });
        });
    }

    insert(tableName, insertData, callback) {
        var newData = firebase.database().ref().child(tableName).push();
        newData.set(insertData).then(() => {
            callback(true);
        }).catch((error) => {
            if(typeof error == 'object' && error.error) {
                callback(error);
            } else {
                callback(true);
            }
        });
    }

    update(tableName, id, updateData, callback) {
        firebase.database().ref(tableName + "/" + id).update(updateData).then(() => {
            callback(true);
        }).catch((error) => {
            callback(error);
        });
    }
}

const database = new Database();
export default database;