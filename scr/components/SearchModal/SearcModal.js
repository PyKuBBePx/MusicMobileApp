import React, {useState} from "react";
import {FlatList, Modal, Pressable, Text, TextInput, View} from "react-native";
import {LinearGradient} from "expo-linear-gradient";
import {TrackComponent} from "../TrackComponent/TrackComponent";
import {getAllTracks} from "../../fetch/trackFetching";

export const SearchModal = ({ modalVisible, setModalVisible, value, setValue, navigation }) => {
  const [allTracks, setAllTracks] = useState([]);
  const [tracks, setTracks] = useState([]);
  const [cancelVisible, setCancelVisible] = useState(true)

  React.useEffect(() => {
    getAllTracks()
      .then((res) => {
        console.log('res',res)
        setAllTracks(res)
      })
  }, [])

  const searchTracks = () => {
    const list = []
    console.log('allTracks',allTracks)
    allTracks.map(el => {
      if (el.text.toLowerCase().includes(value.toLowerCase())) {
        list.push(el)
      }
    })
    console.log('list',list)
    setTracks(list)
  }

  React.useEffect(() => {
    setCancelVisible(true)
    searchTracks()
  }, [value])

  return(
    <Modal
      animationType={"fade"}
      visible={modalVisible}
    >
      <LinearGradient
        colors={['#773c90', '#0d0625']}
        style={{
          width: '100%',
          height: '100%',
          paddingHorizontal: 20,
          paddingTop: 15
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
              value={value}
              style={{
                fontSize: 12,
                fontFamily: 'Montserrat-Regular',
                color: '#FFF'
              }}
              onChangeText={(el) => {
                setValue(el)
                setCancelVisible(true)
              }}
            />
          </Pressable>
          {
            cancelVisible &&
            <Pressable
              onPress={() => {
                setValue('')
                setCancelVisible(false)
                setModalVisible(false)
              }}
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
        <FlatList
          data={tracks}
          renderItem={(el => {
            return <TrackComponent data={el.item} navigation={navigation} setModal={setModalVisible} />
          })}
          keyExtractor={item => item.id}
          style={{
            marginTop: 35
          }}
        />
      </LinearGradient>
    </Modal>
  )
}
