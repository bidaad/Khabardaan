import { createMaterialTopTabNavigator } from "react-navigation";

import PageA from "../../views/Home/PageA";
import PageB from "../../views/Home/PageB";
import NewsByCatCode from "../../views/NewsByCatCode";

const NewsTabNavigator = createMaterialTopTabNavigator(
  {
    NewsByCatCode: {
      navigationOptions: {
        tabBarLabel: "جدیدترین"
      },
      screen: NewsByCatCode
    },
    PageB: {
      navigationOptions: {
        tabBarLabel: "پربازدیدترین"
      },
      screen: PageB
    }
  },
  {
    tabBarPosition: "top"
  }
);

export default NewsTabNavigator;
