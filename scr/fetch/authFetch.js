import firestore from "@react-native-firebase/firestore";

const refUser = firestore().collection('User');
export const addUser = async (email, login, uid) => {
  refUser
    .add({
      avatar: '',
      email,
      login,
      uid
    })
    .then(() => console.log('user added'))
}
