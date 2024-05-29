import React, {useState} from 'react'
import {LinearGradient} from "expo-linear-gradient";
import {useNavigation, useRoute} from "@react-navigation/native";
import {Header} from "../../components/Header/Header";
import {FlatList, Image, Pressable, Text, View} from "react-native";
import {useMemo} from "react";
import {addFavouriteTracks, includeFavouriteUserTracks, removeFavouriteTracks} from "../../fetch/favouriteFetch";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const TrackScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const [favouriteTracks, setFavouriteTracks] = useState(null)
  const data = useMemo(() => route?.params?.data, [route?.params?.data])

  React.useEffect(() => {
    includeFavouriteUserTracks(data.name)
      .then(res => setFavouriteTracks(res))

    const recentlyTracks = async () => {
      const recent1 = await AsyncStorage.getItem('rec1')
      const recent2 = await AsyncStorage.getItem('rec2')

      await AsyncStorage.setItem('rec3', recent2)
      await AsyncStorage.setItem('rec2', recent1)
      await AsyncStorage.setItem('rec1', data.name)
    }

    recentlyTracks();
  }, [])

  return (
    <LinearGradient
      colors={['#773c90', '#0d0625']}
      style={{
        width: '100%',
        height: '100%',
      }}
    >
      <Header navigation={navigation} titleScreen={''} />
      <View
        style={{
          width: '100%',
          height: '100%',
          paddingHorizontal: 20,
          paddingTop: 20,
          alignItems: 'center'
        }}
      >
        <View
          style={{
            flexDirection: 'row'
          }}
        >
          <View
            style={{
              width: 200,
              height: 200,
              justifyContent: 'center'
            }}
          >
            <Image
              style={{flex: 1, height: undefined, width: undefined, borderRadius: 7,}}
              resizeMode="contain"
              source={
                data.image
                  ? {uri: data.image}
                  : require('../../assets/image-placeholder-100.png')
              }
            />
          </View>
          <Pressable
            style={{
              position: 'absolute',
              top: 0,
              right: '-20',
              width: 40,
              height: 40
            }}
            onPress={() => {
              favouriteTracks
                ? (
                  removeFavouriteTracks(data.name)
                    .then(() => setFavouriteTracks(false))
                ) : (
                  addFavouriteTracks(data.name)
                    .then(() => setFavouriteTracks(true))
                )
            }}
          >
            <Image
              style={{flex: 1, height: undefined, width: undefined}}
              source={
                favouriteTracks
                  ? require('../../assets/favorite-active-icon.png')
                  : require('../../assets/favorite-icon.png')
              }
            />
          </Pressable>
        </View>
        <View
          style={{
            gap: 10,
            marginTop: 35,
            alignItems: 'center',
          }}
        >
          <Text
            style={{
              fontSize: 16,
              fontFamily: 'Montserrat-Medium',
              color: '#fff'
            }}
          >{data.name}</Text>
          <Text
            style={{
              fontSize: 14,
              fontFamily: 'Montserrat-Light',
              color: '#fff'
            }}
          >{data.author}</Text>
        </View>
        <View
          style={{
            marginTop: 30,
            flex: 1,
            paddingBottom: 50
          }}
        >
          <FlatList
            data={data.text.split('\\n')}
            renderItem={(item) => {
              console.log(item)
              return (
                <Text
                  style={{
                    fontSize: 16,
                    fontFamily: 'Montserrat-Medium',
                    color: '#fff',
                    textAlign: 'center'
                  }}
                >
                  {item.item}
                </Text>
              )
            }}
          />
        </View>
      </View>
    </LinearGradient>
  )
}
