import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Find } from "../screens/Find";
import { New } from "../screens/New";
import { Pools } from "../screens/Pools";
import { SignIn } from "../screens/SignIn";

const {Navigator, Screen} = createBottomTabNavigator()

export function AppRoutes(){
  return(
    <Navigator>
      <Screen
        name="new"
        component={New}
      />

      <Screen
        name="pools"
        component={Pools}
      />

      <Screen
        name="find"
        component={Find}
      />

      <Screen
        name="signin"
        component={SignIn}
      />
    </Navigator>
  )
}