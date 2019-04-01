export default class NavigatorUtil {

  static goPage(page){
      const navigation = NavigatorUtil.navigation;
      if (!navigation) {
          console.error("navigation can not be undefined");
          return;
      }
      navigation.navigate(page);
  }

  static goBack(navigation){
      navigation.goBack();
  }
  static reloadHome(navigation){
      navigation.navigate('Main');
  }
}