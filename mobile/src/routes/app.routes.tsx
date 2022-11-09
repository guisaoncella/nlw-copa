import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Find } from "../screens/Find";
import { New } from "../screens/New";
import { Pools } from "../screens/Pools";
import { useTheme } from "native-base";

import { PlusCircle, SoccerBall } from "phosphor-react-native";
import { Platform } from "react-native";

const {Navigator, Screen} = createBottomTabNavigator()

export function AppRoutes(){
  const {colors, sizes} = useTheme()
  const iconSize = sizes[6]

  return(
    <Navigator screenOptions={{
      tabBarLabelPosition: "beside-icon",
      headerShown: false,
      tabBarActiveTintColor: colors.yellow[500],
      tabBarInactiveTintColor: colors.gray[300],
      tabBarStyle: {
        position: 'absolute',
        height: sizes[22],
        borderTopWidth: 0,
        backgroundColor: colors.gray[800]
      },
      tabBarItemStyle: {
        position: 'relative',
        top: Platform.OS === 'android' ? -10 : 0   
      }
    }}>
      <Screen
        name="new"
        component={New}
        options={{
          tabBarIcon: ({color}) => <PlusCircle color={color} size={iconSize}/>,
          tabBarLabel: 'Novo'
        }}
      />

      <Screen
        name="pools"
        component={Pools}
        options={{
          tabBarIcon: ({color}) => <SoccerBall color={color} size={iconSize}/>,
          tabBarLabel: 'Meus bolões'
        }}
      />

      <Screen
        name="find"
        component={Find}
        options={{
          tabBarButton: () => null
        }}
      />
    </Navigator>
  )
}