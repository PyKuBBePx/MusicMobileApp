import React, {useState} from "react";
import {Modal, Pressable, Text, View} from "react-native";

export const CustomModal = ({ modalVisible, modalText, modalTitle, setModalVisible, pressEvent = null }) => {

  return (
    <Modal
      animationType={"slide"}
      visible={modalVisible}
      transparent={true}
    >
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            paddingHorizontal: 20,
            backgroundColor: '#f0f0f0',
            borderRadius: 20,
            borderColor: '#0f0f0f',
            borderWidth: 1
          }}
        >
          <Text
            style={{
              fontFamily: 'Montserrat-Regular',
              marginTop: 20,
              fontSize: 18,
              textAlign: 'center'
            }}
          >{modalTitle}</Text>
          <Text
            style={{
              fontFamily: 'Montserrat-Regular',
              marginTop: 10,
              fontSize: 16,
              textAlign: 'center'
            }}
          >{modalText}</Text>
          <Pressable
            style={{
              width: '100%',
              alignItems: 'center',
              backgroundColor: '#773A95',
              borderRadius: 10,
              marginTop: 20,
              marginBottom: 20,
            }}
            onPress={() => {
              setModalVisible(false)
              if (pressEvent) pressEvent();
            }}
          >
            <Text
              style={{
                color: '#FFF',
                fontFamily: 'Montserrat-Regular',
                marginVertical: 5,
                fontSize: 16,
              }}
            >Закрыть</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  )
}
