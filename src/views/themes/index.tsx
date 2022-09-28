import {ActionCreatorWithPayload} from '@reduxjs/toolkit/dist/createAction';
import React from 'react';
import {FlatList, Pressable, StyleSheet, View} from 'react-native';
import {Text} from 'react-native-paper';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {connect} from 'react-redux';
import {Digits} from '../../components/general/digits';
import {Display} from '../../components/general/display';
import i18n from '../../helpers/i18n';
import {getCalcTheme, ThemeContext} from '../../helpers/themes';
import {anal, getFont, setData, showSnackbar} from '../../helpers/utils';
import {RootState} from '../../redux';
import {setTheme} from '../../redux/config';

type Props = {
  ctheme: number;
  setTheme: ActionCreatorWithPayload<unknown, string>;
};

const renderItem =
  (
    ctheme: number,
    result: string,
    theme: Record<string, string>,
    updateTheme: (index: number) => void,
  ) =>
  // eslint-disable-next-line react/display-name
  ({item, index}: {item: any; index: number}) => {
    const {backgroundColor} = getCalcTheme(index);

    return (
      <Pressable
        onPress={() => {
          updateTheme(index);
        }}
        testID="theme-picker">
        {() => (
          <View
            style={{
              backgroundColor,
              borderColor:
                ctheme === index ? theme.accent : theme.backgroundColor,
              borderWidth: 8,
            }}>
            <Display
              memory="12345"
              onImagePress={() => {
                updateTheme(index);
              }}
              output={result}
              subtotal="0"
              theme={item}
            />
            <Digits
              imageOnly={false}
              onMenuPress={() => undefined}
              onPress={() => updateTheme(index)}
              theme={item}
            />
            <View style={{padding: wp(3)}}></View>
          </View>
        )}
      </Pressable>
    );
  };

const mapStateToProps = (state: RootState) => ({
  ctheme: state.config.theme,
});

const mapDispatchToProps = {setTheme};

const styles = StyleSheet.create({
  container: {alignItems: 'center', flex: 1, justifyContent: 'center'},
  separator: {paddingVertical: wp(4)},
  text: {
    fontSize: wp(4),
  },
});

export const Themes = connect(
  mapStateToProps,
  mapDispatchToProps,
)(function (props: Props) {
  const {ctheme, setTheme} = props;
  const result = '3141592.6';

  const updateTheme = (theme: number) => {
    anal('theme_update');

    setTheme(theme);

    setData('set_theme', theme.toString());
    showSnackbar(i18n.t('theme.set'), 0);
  };

  return (
    <ThemeContext.Consumer>
      {({theme}) => {
        const {backgroundColor, color} = theme;
        const fontFamilyBold = getFont(true);

        return (
          <View style={[styles.container, {backgroundColor}]}>
            <View style={{marginVertical: wp(5)}}>
              <Text style={{color, fontFamily: fontFamilyBold}}>
                {i18n.t('theme.intro')}
              </Text>
            </View>
            <FlatList
              data={[...Array(10).keys()]}
              extraData={theme.context}
              initialNumToRender={3}
              getItemLayout={(_, index) => ({
                length: hp(91),
                offset: hp(91) * index,
                index,
              })}
              ItemSeparatorComponent={() => <View style={styles.separator} />}
              keyExtractor={item => item.toString()}
              maxToRenderPerBatch={8}
              removeClippedSubviews={true}
              renderItem={renderItem(ctheme, result, theme, updateTheme)}
              testID="themes"
              updateCellsBatchingPeriod={75}
              windowSize={8}
            />
          </View>
        );
      }}
    </ThemeContext.Consumer>
  );
});
