import {Image, Pressable, TextInput, View, Text, FlatList} from "react-native";
import {LinearGradient} from "expo-linear-gradient";
import React, {useState} from "react";
import {TrackComponent} from "../../components/TrackComponent/TrackComponent";
import {useIsFocused, useNavigation} from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {getFavGenreTracks, getTracks} from "../../fetch/trackFetching";
import {SearchModal} from "../../components/SearchModal/SearcModal";

export const MainScreen = () => {
  const isFocused = useIsFocused();
  const navigation = useNavigation()
  const [recentlyTracks, setRecentlyTracks] = useState([])
  const [favouriteTracks, setFavouriteTracks] = useState([])
  const [value, setValue] = useState()

  const [modalVisible, setModalVisible] = useState(false)

  React.useEffect(() => {
    const recentlyTracks = async () => {
      const list = [];
      const recent1 = await AsyncStorage.getItem('rec1')
      const recent2 = await AsyncStorage.getItem('rec2')
      const recent3 = await AsyncStorage.getItem('rec3')

      if (recent1) {
        getTracks(recent1)
          .then((res) => {
            list.push(...res)
            if (recent2) {
              getTracks(recent2)
                .then((res) => {
                  if(recent2 !== recent1){
                    list.push(...res)
                  }
                  if (recent3) {
                    getTracks(recent3)
                      .then((res) => {
                        if (recent3 !== recent1 || recent3 !== recent2 ) {
                          list.push(...res)
                        }
                        setRecentlyTracks(list)
                      })
                  }
                })
            }
          })
      }
    }

    const genreTracks = async () => {
      setFavouriteTracks([])
      setRecentlyTracks([])
      const favGenre = await AsyncStorage.getItem('favGenre') ?? 'панк'

      getFavGenreTracks(favGenre)
        .then((res) => {
          const list = !res.length
            ? null
            : [
                res[Math.floor(Math.random()*res.length)],
                res[Math.floor(Math.random()*res.length)],
                res[Math.floor(Math.random()*res.length)],
            ]
          setFavouriteTracks(list)
        })
    }

    recentlyTracks();
    genreTracks();
  }, [isFocused])

  return (
    <LinearGradient
      colors={['#773c90', '#0d0625']}
      style={{
        width: '100%',
        height: '100%',
        paddingHorizontal: 20,
        paddingTop: 15
      }}
    >
      <SearchModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        value={value}
        setValue={setValue}
        navigation={navigation}
      />
      <View
        style={{
          width: '100%',
          justifyContent: 'space-between',
          flexDirection: 'row',
          alignItems: 'center'
        }}
      >
        <Pressable
          style={{
            width: 50,
            height: 50
          }}
          onPress={() => navigation.navigate('ProfileStack')}
        >
          <Image
            style={{flex: 1, height: undefined, width: undefined}}
            source={require('../../assets/profile-icon.png')}
          />
        </Pressable>
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
            value={value}
            placeholder="Найти песню"
            placeholderTextColor="#FFF"
            onPress={() => {
              setModalVisible(true)
            }}
            onChangeText={el => {
              setValue(el)
              setModalVisible(true)
            }}
            style={{
              fontSize: 12,
              fontFamily: 'Montserrat-Regular',
              color: '#FFF'
            }}
          />
        </Pressable>
      </View>
      <View
        style={{
          width: '100%',
          paddingTop: 42,
          gap: 33,
          minHeight: '45%'
        }}
      >
        <Text
          style={{
            fontSize: 16,
            fontFamily: 'Montserrat-Bold',
            color: '#fff'
          }}
        >Вы недавно искали:</Text>
        <FlatList
          data={recentlyTracks}
          renderItem={(el => {
            return <TrackComponent data={el.item} navigation={navigation} />
          })}
          keyExtractor={item => item.id}
        />
      </View>
      <View
        style={{
          width: '100%',
          gap: 33
        }}
      >
        <View
          style={{gap: 5}}
        >
          <Text
            style={{
              fontSize: 16,
              fontFamily: 'Montserrat-Bold',
              color: '#fff'
            }}
          >По вашим предпочтениям</Text>
          <Text
            style={{
              fontSize: 12,
              fontFamily: 'Montserrat-Medium',
              color: '#fff'
            }}
          >Рекомендации на основе твоих поисков</Text>
        </View>
        <FlatList
          data={favouriteTracks}
          renderItem={(el => {
            return <TrackComponent data={el.item} navigation={navigation} />
          })}
          keyExtractor={item => item.id}
        />
      </View>
    </LinearGradient>
  )
}
