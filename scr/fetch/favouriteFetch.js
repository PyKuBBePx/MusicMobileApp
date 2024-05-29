import firestore from "@react-native-firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";

const refFavourite = firestore().collection('Favourite');

export const getFavouriteUserTracks = async () => {
  const userId =  await AsyncStorage.getItem('uid')

  return new Promise((resolve, reject) => {
    refFavourite
      .where('user', '==', userId)
      .onSnapshot((querySnapshot) => {
      const list = [];
      querySnapshot.forEach((doc) => {
        const {track_name} = doc.data();

        list.push({id: doc.id, track_name});
      });
      resolve(list);
    }, (error) => {
      reject(error);
    });
  });
}

export const includeFavouriteUserTracks = async (track) => {
  const userId =  await AsyncStorage.getItem('uid')

  return new Promise((resolve, reject) => {
    refFavourite
      .where('user', '==', userId)
      .onSnapshot((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        const {track_name} = doc.data();

        if (track_name === track) {
          resolve(true)
        }
      });
      resolve(false);
    }, (error) => {
      reject(error);
    });
  });
}

export const addFavouriteTracks = async (track_name) => {
  const userId =  await AsyncStorage.getItem('uid')

  refFavourite
    .add({
      user: userId,
      track_name
    })
    .then(() => console.log('Track added to favourite!'))
}

export const removeFavouriteTracks = async (track_name) => {
  try {
    const userId =  await AsyncStorage.getItem('uid')

    const batch = firestore().batch();

    const querySnapshot = await refFavourite
      .where('user', '==', userId)
      .where('track_name', '==', track_name)
      .get();

    querySnapshot.forEach((doc) => {
      batch.delete(doc.ref);
    });

    await batch.commit();
  } catch (error) {
    console.error('Error removing track from favourites: ', error);
  }
}
