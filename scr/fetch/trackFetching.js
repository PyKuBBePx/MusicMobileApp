import firestore from "@react-native-firebase/firestore";

const refTrack = firestore().collection('Tracks');

export const getAllTracks = async () => {
  return new Promise(async (resolve, reject) => {
    const list = []

    const querySnapshot = await refTrack
      .get();

    querySnapshot.forEach((doc) => {
      const { author, name, image, text, genre } = doc.data();

      list.push({
        id: doc.id,
        author,
        name,
        image,
        text,
        genre
      });
    });

    resolve(list)
  });
}
export const getTracks = async (track1) => {
  return new Promise(async (resolve, reject) => {
    const list = []

    const querySnapshot = await refTrack
      .where('name', '==', track1)
      .get();

    querySnapshot.forEach((doc) => {
      const { author, name, image, text, genre } = doc.data();

      list.push({ id: doc.id, author, name, image, text, genre});
    });

    resolve(list)
  });
}

export const getFavouriteTracks = async (favData = []) => {
  return new Promise((resolve, reject) => {
    refTrack.onSnapshot(querySnapshot => {
      const list = [];
      querySnapshot.forEach(doc => {
        const {
          author,
          name,
          image,
          text,
          genre
        } = doc.data();
        list.push({
          id: doc.id,
          author,
          name,
          image,
          text,
          genre
        });
      });
      resolve(list);
    }, (error) => {
      reject(error);
    });
  });
}

export const getFavGenreTracks = async (genre) => {
  return new Promise(async (resolve, reject) => {
    const list = []

    const querySnapshot = await refTrack
      .where('genre', '==', genre)
      .get();

    querySnapshot.forEach((doc) => {
      const { author, name, image, text, genre } = doc.data();

      list.push({
        id: doc.id,
        author,
        name,
        image,
        text,
        genre
      });
    });

    resolve(list)
  });
}
