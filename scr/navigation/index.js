import React from 'react'
import {View} from "react-native";
import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {InitScreen} from "../screen/Authtoriation/InitialScreen";
import {AuthRegScreen} from "../screen/Authtoriation/AuthRegScreen";
import {MainScreen} from "../screen/Main/MainScreen";
import {TrackScreen} from "../screen/Main/TrackScreen";
import {ProfileScreen} from "../screen/Profile/ProfileScreen";
import {FavouriteScreen} from "../screen/Profile/FavoriteScreen";
import {AboutScreen} from "../screen/Profile/AboutScreen";

const Stack = createNativeStackNavigator();

const MainStack = () => {
  return (
    <Stack.Navigator initialRouteName="MainScreen" screenOptions={{headerShown: false}}>
      <Stack.Screen name="MainScreen" component={MainScreen} />
      <Stack.Screen name="TrackScreen" component={TrackScreen} />
    </Stack.Navigator>
  )
}

const ProfileStack = () => {
  return (
    <Stack.Navigator initialRouteName="ProfileScreen" screenOptions={{headerShown: false}}>
      <Stack.Screen
        name="ProfileScreen"
        component={ProfileScreen}
      />
      <Stack.Screen
        name="FavoriteScreen"
        component={FavouriteScreen}
      />
      <Stack.Screen
        name="AboutScreen"
        component={AboutScreen}
      />
    </Stack.Navigator>
  )
}

const AuthStack = () => {
  return (
    <Stack.Navigator initialRouteName={'InitScreen'} screenOptions={{headerShown: false}}>
      <Stack.Screen name="InitScreen" component={InitScreen} />
      <Stack.Screen name="AuthRegScreen" component={AuthRegScreen} />
    </Stack.Navigator>
  )
}

export const AppNavigation = () => {
  return (
    <View style={{ flex: 1, width: '100%', height: '100%' }}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName={'AuthStack'}
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen
            name="AuthStack"
            component={AuthStack}
          />
          <Stack.Screen
            name="MainStack"
            component={MainStack}
          />
          <Stack.Screen
            name="ProfileStack"
            component={ProfileStack}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  )
}
