import firestore from "@react-native-firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";

const refUser = firestore().collection('User');

export const getUserInfo = async () => {
  const userId = await AsyncStorage.getItem('uid')

  return new Promise((resolve, reject) => {
    refUser.onSnapshot((querySnapshot) => {
      const list = [];
      querySnapshot.forEach((doc) => {
        const {avatar, email, login, uid} = doc.data();
        if (uid === userId) {
          list.push({avatar, email, login});
        }
      });
      resolve(list);
    }, (error) => {
      reject(error);
    });
  });
}
