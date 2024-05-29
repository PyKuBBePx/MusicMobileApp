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
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 15,
          }}
        >
          <Pressable
            style={{
              width: 250,
              borderRadius: 10,
              borderWidth: 1,
              borderColor: '#fff',
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              paddingLeft: 11,
              paddingVertical: 5
            }}
          >
            <TextInput
              placeholder="Найти песню"
              placeholderTextColor="#FFF"
              style={{
                fontSize: 12,
                fontFamily: 'Montserrat-Regular',
                color: '#FFF'
              }}
              onChangeText={() => {
                setVisibility(true)
              }}
            />
          </Pressable>
          {
            visibility &&
            <Pressable

            >
              <Text
                style={{
                  fontSize: 14,
                  fontFamily: 'Montserrat-Medium',
                  color: '#FFF'
                }}
              >
                Отменить
              </Text>
            </Pressable>
          }
        </View>
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
