export default class NavigatorUtil {

  static goPage(param,page){
      const navigation = NavigatorUtil.navigation;
      if (!navigation) {
          console.error("navigation can not be undefined");
          return;
      }
      navigation.navigate(page,{
          ...param
      });
  }

  static goBack(navigation){
      navigation.goBack();
  }
  static reloadHome(navigation){
      navigation.navigate('Main');
  }
}