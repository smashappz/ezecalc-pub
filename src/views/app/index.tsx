import analytics from '@react-native-firebase/analytics';
import {ActionCreatorWithPayload} from '@reduxjs/toolkit/dist/createAction';
import React, {useEffect, useState} from 'react';
import {StatusBar, StatusBarStyle, StyleSheet, View} from 'react-native';
import {BottomNavigation} from 'react-native-paper';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {connect} from 'react-redux';
import {Banner} from '../../components/ads/banner';
import {APP_NAME} from '../../helpers/constants';
import i18n from '../../helpers/i18n';
import {ThemeContext} from '../../helpers/themes';
import {anal} from '../../helpers/utils';
import {RootState} from '../../redux';
import {setRefresh as setCalcRefresh, setTab} from '../../redux/calculator';
import {setRefresh as setDiaryRefresh} from '../../redux/diary';
import {Calculator} from '../calculator';
import {Config} from '../config';
import {Diary} from '../diary';
import {Shop} from '../shop';
import {Themes} from '../themes';

const CalcRoute = () => <Calculator />;

const DiaryRoute = () => <Diary />;

const SettingsRoute = () => <Config />;

const ShopRoute = () => <Shop />;

const ThemesRoute = () => <Themes />;

const setRoutes = (color: string) => [
  {
    color,
    icon: 'calculator',
    key: 'calculator',
    testID: 'calculator-tab',
    title: i18n.t('app.tab_home'),
  },
  {
    color,
    icon: 'history',
    key: 'diary',
    testID: 'diary-tab',
    title: i18n.t('app.tab_history'),
  },
  {
    color,
    icon: 'cart',
    key: 'shop',
    testID: 'shop-tab',
    title: i18n.t('app.tab_shop'),
  },
  {
    color,
    icon: 'palette',
    key: 'themes',
    testID: 'themes-tab',
    title: i18n.t('app.tab_themes'),
  },
  {
    color,
    icon: 'cog',
    key: 'settings',
    testID: 'config-tab',
    title: i18n.t('app.tab_config'),
  },
];

type Props = {
  backgroundColor: string;
  calcRefresh: boolean;
  noAds: boolean;
  setCalcRefresh: ActionCreatorWithPayload<unknown, string>;
  setDiaryRefresh: ActionCreatorWithPayload<unknown, string>;
  setTab: ActionCreatorWithPayload<unknown, string>;
};

const mapStateToProps = (state: RootState) => ({
  calcRefresh: state.calculator.refresh,
  noAds: state.purchases.noAds,
});

const mapDispatchToProps = {setCalcRefresh, setDiaryRefresh, setTab};

const styles = StyleSheet.create({
  banner: {minHeight: hp(8)},
});

export const App = connect(
  mapStateToProps,
  mapDispatchToProps,
)((props: Props) => {
  const {
    backgroundColor,
    calcRefresh,
    noAds,
    setCalcRefresh,
    setDiaryRefresh,
    setTab,
  } = props;

  const [routesState, setRoutesState] = useState({
    index: 0,
    routes: setRoutes(backgroundColor),
  });

  const onHandleIndexChange = async (index: number) => {
    setRoutesState({...routesState, index});
    setTab(index);

    let tab = '';

    switch (index) {
      case 0:
        tab = 'calculator';
        break;

      case 1:
        tab = 'diary';

        if (calcRefresh) {
          setCalcRefresh(false);
          setDiaryRefresh(true);
        }
        break;

      case 2:
        tab = 'shop';
        break;

      case 3:
        tab = 'themes';
        break;

      case 4:
        tab = 'settings';
        break;

      default:
    }

    if (tab) {
      const screen = `${APP_NAME}_view_${tab}`;

      anal(screen);

      await analytics().logScreenView({
        screen_name: screen,
        screen_class: screen,
      });
    }
  };

  useEffect(() => {
    if (backgroundColor !== routesState.routes[0].color) {
      setRoutesState({
        ...routesState,
        routes: setRoutes(backgroundColor),
      });
    }
  }, [backgroundColor]);

  return (
    <ThemeContext.Consumer>
      {({theme}) => {
        const {barStyle, backgroundColor, disabled, highlight, primary} = theme;

        return (
          <>
            <StatusBar
              backgroundColor={backgroundColor}
              barStyle={barStyle as StatusBarStyle}
            />
            {!noAds && (
              <View style={styles.banner}>
                <Banner />
              </View>
            )}
            <BottomNavigation
              activeColor={primary}
              barStyle={{backgroundColor: highlight}}
              navigationState={routesState}
              inactiveColor={disabled}
              onIndexChange={onHandleIndexChange}
              renderScene={BottomNavigation.SceneMap({
                calculator: CalcRoute,
                diary: DiaryRoute,
                shop: ShopRoute,
                settings: SettingsRoute,
                themes: ThemesRoute,
              })}
            />
          </>
        );
      }}
    </ThemeContext.Consumer>
  );
});
