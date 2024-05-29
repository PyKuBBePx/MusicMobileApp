import React from "react";
import {Pressable, TextInput, View, Text, FlatList} from "react-native";
import {LinearGradient} from "expo-linear-gradient";
import {Header} from "../../components/Header/Header";
import {useNavigation} from "@react-navigation/native";
import {getFavouriteUserTracks} from "../../fetch/favouriteFetch";
import {namingCountTrack} from "../../function/namingOfCount";
import {TrackComponent} from "../../components/TrackComponent/TrackComponent";
import {getFavouriteTracks} from "../../fetch/trackFetching";

export const FavouriteScreen = () => {
  const navigation = useNavigation()

  const [visibility, setVisibility] = React.useState(false)
  const [dataFavourite, setDataFavourite] = React.useState([])
  const [count, setCount] = React.useState(null)

  React.useEffect(() => {
    getFavouriteUserTracks()
      .then(res => {
        setCount(res.length)
        getFavouriteTracks(res)
          .then(res => {
            setDataFavourite(res)
          })
      });
  }, [])

  return (
    <LinearGradient
      colors={['#773c90', '#0d0625']}
      style={{
        width: '100%',
        height: '100%',
      }}
    >
      <Header titleScreen={'Избранное'} navigation={navigation} />
      <View
        style={{
          paddingHorizontal: 20,
          paddingTop: 22,
          gap: 40
        }}
      >
        <View
          style={{
            gap: 40
          }}
        >
          <Text
            style={{
              fontFamily: 'Montserrat-Light',
              fontSize: 14,
              color: '#FFF'
            }}
          >{namingCountTrack(count)}</Text>
          <FlatList
            data={dataFavourite}
            renderItem={(el => {
              return <TrackComponent data={el.item} navigation={navigation} />
            })}
            keyExtractor={item => item.id}
          />
        </View>
      </View>
    </LinearGradient>
  )
}
