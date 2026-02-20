import React, { useContext } from "react";
import { View } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import Constants from "expo-constants";
import { useFonts } from "expo-font";

import { useTheme } from "./utils/ThemeContext";
import { customDarkTheme, customLightTheme } from "./utils/themes";
import { AuthContext } from "./context/AuthContext";
import { navigationRef } from "./RootNavigation";
// screens
import StartScreen from "./screens/StartScreen";
import LoginScreen from "./screens/LoginScreen";
import HomeScreen from "./screens/HomeScreen";
import UserScreen from "./screens/UserScreen";
import UserEditScreen from "./screens/UserEditScreen";
import TrashPointScreen from "./screens/TrashPointScreen";
import ForgotPasswordScreen from "./screens/ForgotPasswordScreen";
import MapScreen from "./screens/MapScreen";
import SettingsScreen from "./screens/SettingsScreen";
import ModalScreen from "./screens/ModalScreen";

const Stack = createNativeStackNavigator();

const ScreenWithGreenBottom = ({ children }) => {
  const { colors } = useTheme();
  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          flex: 1,
          paddingTop: Constants.statusBarHeight,
          backgroundColor: colors.white,
        }}
      >
        {children}
      </View>
      <SafeAreaView
        style={{ backgroundColor: colors.green }}
        edges={["bottom"]}
      />
    </View>
  );
};

export default function AppNavigator() {
  const { isDark } = useTheme();
  const { token, loading } = useContext(AuthContext);

  const [fontsLoaded] = useFonts({
    Shrikhand: require("./assets/fonts/Shrikhand-Regular.ttf"),
    RopaSans: require("./assets/fonts/RopaSans-Regular.ttf"),
    Urbanist: require("./assets/fonts/Urbanist-VariableFont_wght.ttf"),
  });

  if (!fontsLoaded || loading) return null;

  return (
    <NavigationContainer
      theme={isDark ? customDarkTheme : customLightTheme}
      ref={navigationRef}
    >
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {token ? (
          <>
            <Stack.Screen name="Start" component={StartScreen} />
            <Stack.Screen name="Home">
              {(props) => (
                <ScreenWithGreenBottom>
                  <HomeScreen {...props} />
                </ScreenWithGreenBottom>
              )}
            </Stack.Screen>
            <Stack.Screen name="User">
              {(props) => (
                <ScreenWithGreenBottom>
                  <UserScreen {...props} />
                </ScreenWithGreenBottom>
              )}
            </Stack.Screen>
            <Stack.Screen name="UserEditScreen">
              {(props) => (
                <ScreenWithGreenBottom>
                  <UserEditScreen {...props} />
                </ScreenWithGreenBottom>
              )}
            </Stack.Screen>
            <Stack.Screen name="TrashPoint">
              {(props) => (
                <ScreenWithGreenBottom>
                  <TrashPointScreen {...props} />
                </ScreenWithGreenBottom>
              )}
            </Stack.Screen>
            <Stack.Screen name="Map">
              {(props) => (
                <ScreenWithGreenBottom>
                  <MapScreen {...props} />
                </ScreenWithGreenBottom>
              )}
            </Stack.Screen>
            <Stack.Screen name="Settings">
              {(props) => (
                <ScreenWithGreenBottom>
                  <SettingsScreen {...props} />
                </ScreenWithGreenBottom>
              )}
            </Stack.Screen>
            <Stack.Group
              screenOptions={{
                presentation: "transparentModal",
                contentStyle: { backgroundColor: "rgba(0,0,0,0.5)" },
              }}
            >
              <Stack.Screen
                name="NotificationsList"
                component={ModalScreen}
                options={{
                  headerShown: false,
                  animation: "fade",
                }}
              />
            </Stack.Group>
          </>
        ) : (
          <>
            <Stack.Screen name="Start" component={StartScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen
              name="ForgotPassword"
              component={ForgotPasswordScreen}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
