import AsyncStorage from "@react-native-async-storage/async-storage";
import firestore from "@react-native-firebase/firestore";

const refUser = firestore().collection('User');
export const addFavouriteTracks = async (email, login, uid) => {
  refUser
    .add({
      avatar: '',
      email,
      login,
      uid
    })
    .then(() => console.log('user added'))
}
