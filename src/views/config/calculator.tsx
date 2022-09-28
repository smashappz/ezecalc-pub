import {ActionCreatorWithPayload} from '@reduxjs/toolkit/dist/createAction';
import React, {useState} from 'react';
import {Pressable, ScrollView, StyleSheet, View} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import RCModal from 'react-native-modal';
import {
  Button,
  Caption,
  RadioButton,
  Subheading,
  Switch,
  Text,
  TextInput,
  Title,
} from 'react-native-paper';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/Ionicons';
import MDIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {connect} from 'react-redux';
import {
  createCalculator,
  fetchCalculators,
  updateCalculator,
} from '../../db/db';
import {Calculator} from '../../db/models';
import i18n from '../../helpers/i18n';
import {
  decSepOptions,
  getDecSep,
  getDecSepDesc,
  getShape,
  getShapeDesc,
  getThouSep,
  getThouSepDesc,
  thouOptions,
} from '../../helpers/pickers';
import {ThemeContext} from '../../helpers/themes';
import {anal, getFont, setData, showSnackbar} from '../../helpers/utils';
import {RootState} from '../../redux';
import {setUpdatePic} from '../../redux/calculator';
import {
  ConfigState,
  setDecSep,
  setFreqTotal,
  setInplace,
  setNegRed,
  setPalette,
  setPrecision,
  setRadians,
  setShape,
  setSpeech,
  setSubtotal,
  setThouSep,
  setVibrate,
} from '../../redux/config';

type PickerImage = {
  data: string | null | undefined;
  height: number;
  mime: string;
  width: number;
};

type Props = ConfigState & {
  setDecSep: ActionCreatorWithPayload<unknown, string>;
  setFreqTotal: ActionCreatorWithPayload<unknown, string>;
  setInplace: ActionCreatorWithPayload<unknown, string>;
  setNegRed: ActionCreatorWithPayload<unknown, string>;
  setPalette: ActionCreatorWithPayload<unknown, string>;
  setPrecision: ActionCreatorWithPayload<unknown, string>;
  setRadians: ActionCreatorWithPayload<unknown, string>;
  setShape: ActionCreatorWithPayload<unknown, string>;
  setSpeech: ActionCreatorWithPayload<unknown, string>;
  setSubtotal: ActionCreatorWithPayload<unknown, string>;
  setThouSep: ActionCreatorWithPayload<unknown, string>;
  setUpdatePic: ActionCreatorWithPayload<unknown, string>;
  setVibrate: ActionCreatorWithPayload<unknown, string>;
};

const mapStateToProps = (state: RootState) => ({
  ...state.config,
});

const mapDispatchToProps = {
  setDecSep,
  setFreqTotal,
  setInplace,
  setNegRed,
  setPrecision,
  setPalette,
  setRadians,
  setShape,
  setSpeech,
  setSubtotal,
  setThouSep,
  setUpdatePic,
  setVibrate,
};

const styles = StyleSheet.create({
  row: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
  },
  rowLeft: {justifyContent: 'center', width: '20%'},
  rowRight: {justifyContent: 'center', width: '80%'},
  switchLeft: {
    alignItems: 'flex-start',
    flex: 3,
  },
  switchRight: {
    alignItems: 'flex-end',
    flex: 1,
  },
  switchView: {
    alignItems: 'center',
    flexDirection: 'row',
    padding: wp(4),
  },
});

export const CalculatorConfig = connect(
  mapStateToProps,
  mapDispatchToProps,
)(function (props: Props) {
  const {
    decSep,
    freqTotal,
    inplace,
    negRed,
    palette,
    precision,
    radians,
    subtotal,
    shape,
    speech,
    thouSep,
    vibrate,
    setDecSep,
    setFreqTotal,
    setInplace,
    setNegRed,
    setPalette,
    setPrecision,
    setRadians,
    setShape,
    setSpeech,
    setSubtotal,
    setThouSep,
    setUpdatePic,
    setVibrate,
  } = props;

  const [modalDecSepVisible, setModalDecSepVisible] = useState<boolean>(false);
  const [modalThouSepVisible, setModalThouSepVisible] =
    useState<boolean>(false);
  const [modalShapeVisible, setModalShapeVisible] = useState<boolean>(false);

  const onChangeImage = () => {
    try {
      ImagePicker.openPicker({
        cropping: true,
        height: 640,
        includeBase64: true,
        mediaType: 'photo',
        width: 480,
      })
        .then(async (img: Partial<PickerImage>) => {
          if (!img || !img.data || img.height === 0 || img.width === 0) {
            return;
          }

          const {height, width} = img;
          const image = `data:${img.mime};base64,${img.data}`;

          const sql = `SELECT * FROM calculators`;
          const fetched = (await fetchCalculators(sql)) as Array<Calculator>;

          const updated = () => {
            setUpdatePic(true);
            showSnackbar(i18n.t('dialog.descImage'));
          };
          if (fetched && fetched.length) {
            updateCalculator(fetched[0], image, height || 0, width || 0).then(
              success => {
                if (success) {
                  updated();
                }
              },
            );
          } else {
            createCalculator(image, height || 0, width || 0).then(success => {
              if (success) {
                updated();
              }
            });
          }
        })
        .catch(err => console.log(err));
    } catch (e) {
      console.log(e);
    }
  };

  const onClearImage = async () => {
    const sql = `SELECT * FROM calculators`;
    const fetched = (await fetchCalculators(sql)) as Array<Calculator>;

    if (fetched && fetched.length) {
      updateCalculator(fetched[0], '', 0, 0).then(success => {
        if (success) {
          setUpdatePic(true);
          showSnackbar(i18n.t('dialog.descImage2'), 0);
        }
      });
    }
  };

  const onChangeDecSep = (decSep: string) => {
    const decSep2 = getDecSep(decSep);
    anal(`config_decSep_${decSep2}`);

    switch (decSep2) {
      case ',':
        if (thouSep === decSep2) {
          setThouSep('.');
          setData('set_thouSep', '.');
        }
        break;
      case '.':
        if (thouSep === decSep2) {
          setThouSep(',');
          setData('set_thouSep', ',');
        }
        break;
      default:
    }

    setDecSep(decSep2);
    setData('set_decSep', decSep2);
  };

  const onChangeInplace = () => {
    const newState = !inplace;
    anal(`config_inplace_${newState.toString()}`);

    setInplace(newState);
    setData('set_inplace', newState.toString());
  };

  const onChangeNegRed = () => {
    const newState = !negRed;
    anal(`config_negRed_${newState.toString()}`);

    setNegRed(newState);
    setData('set_negRed', newState.toString());
  };

  const onChangePalette = () => {
    const newState = !palette;
    anal(`config_palette_${newState.toString()}`);

    setPalette(newState);
    setData('set_palette', newState.toString());
  };

  const onChangeRadians = () => {
    const newState = !radians;
    anal(`config_radians_${newState.toString()}`);

    setRadians(newState);
    setData('set_radians', newState.toString());
  };

  const onChangeShape = (shape: string) => {
    const shape2 = getShape(shape);
    anal(`config_shape_${shape2.toString()}`);

    setShape(shape2);
    setData('set_shape', shape2.toString());
  };

  const onChangeSpeech = () => {
    const newState = !speech;
    anal(`config_speech_${newState.toString()}`);

    setSpeech(newState);
    setData('set_speech', newState.toString());
  };

  const onChangeSubtotal = () => {
    const newState = !subtotal;
    anal(`config_subtotal_${newState.toString()}`);

    setSubtotal(newState);
    setData('set_subtotal', newState.toString());
  };

  const onChangeThouSep = (thouSep: string) => {
    const thouSep2 = getThouSep(thouSep);
    anal(`config_thouSep_${thouSep2}`);

    switch (thouSep2) {
      case ',':
        if (decSep === thouSep2) {
          setDecSep('.');
          setData('set_decSep', '.');
        }
        break;
      case '.':
        if (decSep === thouSep2) {
          setDecSep(',');
          setData('set_decSep', ',');
        }
        break;
      default:
    }

    setThouSep(thouSep2);
    setData('set_thouSep', thouSep2);
  };

  const onChangeVibrate = () => {
    const newState = !vibrate;
    anal(`config_vibrate_${newState.toString()}`);

    setVibrate(newState);
    setData('set_vibrate', newState.toString());
  };

  return (
    <ThemeContext.Consumer>
      {({theme}) => {
        const {backgroundColor3, color, iconColor, modal, primary} = theme;

        const decSepDesc = getDecSepDesc(decSep);
        const shapeDesc = getShapeDesc(shape);
        const thouSepDesc = getThouSepDesc(thouSep);

        const fontFamily = getFont();
        const fontFamilyBold = getFont(true);

        return (
          <>
            <View
              style={{
                paddingHorizontal: wp(3),
              }}>
              <Title
                style={{
                  color: primary,
                  fontFamily: fontFamilyBold,
                  paddingHorizontal: wp(1),
                  paddingTop: wp(4),
                }}
                testID="your_calc">
                {i18n.t('config.title_calc')}
              </Title>
              <View style={[styles.switchView, {paddingBottom: wp(3)}]}>
                <View style={styles.switchLeft}>
                  <View style={styles.row}>
                    <View style={styles.rowLeft}>
                      <MDIcon
                        name="image"
                        size={wp(6)}
                        style={{color: iconColor}}
                      />
                    </View>
                    <View style={{justifyContent: 'flex-start', width: '80%'}}>
                      <Text
                        style={{color, fontFamily: fontFamilyBold}}
                        testID="image">
                        {i18n.t('config.image')}
                      </Text>
                    </View>
                  </View>
                </View>
                <View style={styles.switchRight}></View>
              </View>
              <View
                style={{
                  alignItems: 'center',
                  flex: 1,
                  flexDirection: 'row',
                  justifyContent: 'space-evenly',
                  paddingBottom: wp(4),
                }}>
                <Button
                  compact={true}
                  mode="contained"
                  onPress={() => {
                    anal(`config_change_image`);
                    onChangeImage();
                  }}
                  testID="image-sel-btn"
                  uppercase={false}>
                  {i18n.t('config.image_sel')}
                </Button>
                <Button
                  compact={true}
                  mode="contained"
                  onPress={() => {
                    anal(`config_clear_image`);
                    onClearImage();
                  }}
                  testID="image-clr-btn"
                  uppercase={false}>
                  {i18n.t('config.image_clr')}
                </Button>
              </View>
              <Pressable
                onPress={() => {
                  anal(`config_menu_btn_shape`);
                  setModalShapeVisible(true);
                }}
                style={({pressed}) => [
                  {
                    backgroundColor: pressed ? modal : backgroundColor3,
                  },
                ]}
                testID="shape-picker">
                {() => (
                  <View style={styles.switchView}>
                    <View style={styles.switchLeft}>
                      <View
                        style={{
                          alignItems: 'center',
                          flexDirection: 'row',
                        }}>
                        <View style={styles.rowLeft}>
                          <MDIcon
                            name="shape"
                            size={wp(6)}
                            style={{color: iconColor}}
                          />
                        </View>
                        <View style={styles.rowRight}>
                          <Caption>{i18n.t('config.shape')}</Caption>
                          <Text style={{color, fontFamily: fontFamilyBold}}>
                            {shapeDesc}
                          </Text>
                        </View>
                      </View>
                    </View>
                    <View style={styles.switchRight}></View>
                  </View>
                )}
              </Pressable>
              <Pressable
                onPress={() => {
                  anal(`config_menu_btn_decSep`);
                  setModalDecSepVisible(true);
                }}
                style={({pressed}) => [
                  {
                    backgroundColor: pressed ? modal : backgroundColor3,
                  },
                ]}
                testID="decSep-picker">
                {() => (
                  <View style={styles.switchView}>
                    <View style={styles.switchLeft}>
                      <View
                        style={{
                          alignItems: 'center',
                          flexDirection: 'row',
                        }}>
                        <View style={styles.rowLeft}>
                          <MDIcon
                            name="circle-small"
                            size={wp(6)}
                            style={{color: iconColor}}
                          />
                        </View>
                        <View style={styles.rowRight}>
                          <Caption>{i18n.t('config.decSep')}</Caption>
                          <Text style={{color, fontFamily: fontFamilyBold}}>
                            {decSepDesc}
                          </Text>
                        </View>
                      </View>
                    </View>
                    <View style={styles.switchRight}></View>
                  </View>
                )}
              </Pressable>
              <Pressable
                onPress={() => {
                  anal(`config_menu_btn_thouSep`);
                  setModalThouSepVisible(true);
                }}
                style={({pressed}) => [
                  {
                    backgroundColor: pressed ? modal : backgroundColor3,
                  },
                ]}
                testID="thouSep-picker">
                {() => (
                  <View style={styles.switchView}>
                    <View style={styles.switchLeft}>
                      <View
                        style={{
                          alignItems: 'center',
                          flexDirection: 'row',
                        }}>
                        <View style={styles.rowLeft}>
                          <MDIcon
                            name="comma"
                            size={wp(6)}
                            style={{color: iconColor}}
                          />
                        </View>
                        <View style={styles.rowRight}>
                          <Caption>{i18n.t('config.thouSep')}</Caption>
                          <Text style={{color, fontFamily: fontFamilyBold}}>
                            {thouSepDesc}
                          </Text>
                        </View>
                      </View>
                    </View>
                    <View style={styles.switchRight}></View>
                  </View>
                )}
              </Pressable>
              <View style={styles.switchView}>
                <View style={styles.switchLeft}>
                  <View
                    style={{
                      alignItems: 'center',
                      flexDirection: 'row',
                    }}>
                    <View style={styles.rowLeft}>
                      <MDIcon
                        name="decimal"
                        size={wp(6)}
                        style={{color: iconColor}}
                      />
                    </View>
                    <View style={styles.rowRight}>
                      <Caption>{i18n.t('config.dp')}</Caption>
                      <TextInput
                        defaultValue={precision.toString()}
                        keyboardType="numeric"
                        maxLength={2}
                        onChangeText={(precision: string) => {
                          if (!precision) {
                            return;
                          }

                          const p = Math.trunc(Number(precision));

                          if (p > 0 && p < 17) {
                            setPrecision(p);
                            setData('set_precision', precision);
                          }
                        }}
                        style={{
                          backgroundColor: backgroundColor3,
                          height: wp(5.5),
                          width: wp(13),
                        }}
                        testID="precision"
                      />
                    </View>
                  </View>
                </View>
                <View style={styles.switchRight}></View>
              </View>
              <View style={styles.switchView}>
                <View style={styles.switchLeft}>
                  <View
                    style={{
                      alignItems: 'center',
                      flexDirection: 'row',
                    }}>
                    <View style={styles.rowLeft}>
                      <MDIcon
                        name="fire"
                        size={wp(6)}
                        style={{color: iconColor}}
                      />
                    </View>
                    <View style={styles.rowRight}>
                      <Caption>{i18n.t('config.freq')}</Caption>
                      <TextInput
                        defaultValue={freqTotal.toString()}
                        keyboardType="numeric"
                        maxLength={2}
                        onChangeText={(freq: string) => {
                          if (!freq) {
                            return;
                          }

                          const f = Math.trunc(Number(freq));

                          if (f >= 0 && f < 11) {
                            setFreqTotal(f);
                            setData('set_freqTotal', freq);
                          }
                        }}
                        style={{
                          backgroundColor: backgroundColor3,
                          height: wp(5.5),
                          width: wp(13),
                        }}
                        testID="freq"
                      />
                    </View>
                  </View>
                </View>
                <View style={styles.switchRight}></View>
              </View>
              <View style={styles.switchView}>
                <View style={styles.switchLeft}>
                  <View style={styles.row}>
                    <View style={styles.rowLeft}>
                      <MDIcon
                        name="function-variant"
                        size={wp(6)}
                        style={{color: iconColor}}
                      />
                    </View>
                    <View style={styles.rowRight}>
                      <Text style={{color, fontFamily: fontFamilyBold}}>
                        {i18n.t('config.inplace')}
                      </Text>
                    </View>
                  </View>
                </View>
                <View style={styles.switchRight}>
                  <Switch
                    color={iconColor}
                    onValueChange={onChangeInplace}
                    testID="inplace"
                    value={inplace}
                  />
                </View>
              </View>
              <View style={styles.switchView}>
                <View style={styles.switchLeft}>
                  <View style={styles.row}>
                    <View style={styles.rowLeft}>
                      <MDIcon
                        name="palette"
                        size={wp(6)}
                        style={{color: iconColor}}
                      />
                    </View>
                    <View style={styles.rowRight}>
                      <Text style={{color, fontFamily: fontFamilyBold}}>
                        {i18n.t('config.multi')}
                      </Text>
                    </View>
                  </View>
                </View>
                <View style={styles.switchRight}>
                  <Switch
                    color={iconColor}
                    onValueChange={onChangePalette}
                    testID="palette"
                    value={palette}
                  />
                </View>
              </View>
              <View style={styles.switchView}>
                <View style={styles.switchLeft}>
                  <View style={styles.row}>
                    <View style={styles.rowLeft}>
                      <MDIcon
                        name="numeric-negative-1"
                        size={wp(6)}
                        style={{color: iconColor}}
                      />
                    </View>
                    <View style={styles.rowRight}>
                      <Text style={{color, fontFamily: fontFamilyBold}}>
                        {i18n.t('config.negative')}
                      </Text>
                    </View>
                  </View>
                </View>
                <View style={styles.switchRight}>
                  <Switch
                    color={iconColor}
                    onValueChange={onChangeNegRed}
                    testID="negRed"
                    value={negRed}
                  />
                </View>
              </View>
              <View style={styles.switchView}>
                <View style={styles.switchLeft}>
                  <View style={styles.row}>
                    <View style={styles.rowLeft}>
                      <MDIcon
                        name="account-voice"
                        size={wp(6)}
                        style={{color: iconColor}}
                      />
                    </View>
                    <View style={styles.rowRight}>
                      <Text style={{color, fontFamily: fontFamilyBold}}>
                        {i18n.t('config.speech')}
                      </Text>
                    </View>
                  </View>
                </View>
                <View style={styles.switchRight}>
                  <Switch
                    color={iconColor}
                    onValueChange={onChangeSpeech}
                    testID="speech"
                    value={speech}
                  />
                </View>
              </View>
              <View style={styles.switchView}>
                <View style={styles.switchLeft}>
                  <View style={styles.row}>
                    <View style={styles.rowLeft}>
                      <MDIcon
                        name="sigma"
                        size={wp(6)}
                        style={{color: iconColor}}
                      />
                    </View>
                    <View style={styles.rowRight}>
                      <Text style={{color, fontFamily: fontFamilyBold}}>
                        {i18n.t('config.subtotal')}
                      </Text>
                    </View>
                  </View>
                </View>
                <View style={styles.switchRight}>
                  <Switch
                    color={iconColor}
                    onValueChange={onChangeSubtotal}
                    testID="subtotal"
                    value={subtotal}
                  />
                </View>
              </View>
              <View style={styles.switchView}>
                <View style={styles.switchLeft}>
                  <View style={styles.row}>
                    <View style={styles.rowLeft}>
                      <MDIcon
                        name="triangle"
                        size={wp(6)}
                        style={{color: iconColor}}
                      />
                    </View>
                    <View style={styles.rowRight}>
                      <Text style={{color, fontFamily: fontFamilyBold}}>
                        {i18n.t('config.radians')}
                      </Text>
                    </View>
                  </View>
                </View>
                <View style={styles.switchRight}>
                  <Switch
                    color={iconColor}
                    onValueChange={onChangeRadians}
                    testID="radians"
                    value={radians}
                  />
                </View>
              </View>
              <View style={styles.switchView}>
                <View style={styles.switchLeft}>
                  <View style={styles.row}>
                    <View style={styles.rowLeft}>
                      <Icon
                        name="md-radio-outline"
                        size={wp(6)}
                        style={{color: iconColor}}
                      />
                    </View>
                    <View style={styles.rowRight}>
                      <Text style={{color, fontFamily: fontFamilyBold}}>
                        {i18n.t('config.vibrate')}
                      </Text>
                    </View>
                  </View>
                </View>
                <View style={styles.switchRight}>
                  <Switch
                    color={iconColor}
                    onValueChange={onChangeVibrate}
                    testID="vibrate"
                    value={vibrate}
                  />
                </View>
              </View>
            </View>
            <RCModal
              isVisible={modalDecSepVisible}
              onBackButtonPress={() => {
                setModalDecSepVisible(false);
              }}
              onBackdropPress={() => {
                setModalDecSepVisible(false);
              }}>
              <ScrollView
                contentContainerStyle={{
                  backgroundColor: modal,
                  justifyContent: 'center',
                  padding: wp(5),
                }}>
                <Subheading
                  style={{
                    color: primary,
                    fontFamily,
                    paddingBottom: wp(2),
                  }}>
                  {i18n.t('config.decSep')}
                </Subheading>
                <RadioButton.Group
                  onValueChange={decSep => {
                    onChangeDecSep(decSep);
                    setModalDecSepVisible(false);
                  }}
                  value={decSepDesc}>
                  {decSepOptions.map((t: string) => (
                    <View
                      key={t}
                      style={{flexDirection: 'row', paddingBottom: wp(1)}}>
                      {/* 
            // @ts-ignore */}
                      <RadioButton.Android
                        color={color}
                        status="unchecked"
                        style={{alignContent: 'center'}}
                        value={t}
                      />
                      <Text
                        style={{
                          color,
                          fontFamily,
                          paddingTop: wp(1.8),
                        }}>
                        {t}
                      </Text>
                    </View>
                  ))}
                </RadioButton.Group>
                <View
                  style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
                  {/* 
              // @ts-ignore */}
                  <Button
                    compact={true}
                    onPress={() => {
                      anal(`config_decSep_close`);
                      setModalDecSepVisible(false);
                    }}
                    testID="cancel-decSep"
                    uppercase={false}>
                    {i18n.t('dialog.btnCancel')}
                  </Button>
                </View>
              </ScrollView>
            </RCModal>
            <RCModal
              isVisible={modalThouSepVisible}
              onBackButtonPress={() => {
                setModalThouSepVisible(false);
              }}
              onBackdropPress={() => {
                setModalThouSepVisible(false);
              }}>
              <ScrollView
                contentContainerStyle={{
                  backgroundColor: modal,
                  justifyContent: 'center',
                  padding: wp(5),
                }}>
                <Subheading
                  style={{
                    color: primary,
                    fontFamily,
                    paddingBottom: wp(2),
                  }}>
                  {i18n.t('config.thouSep')}
                </Subheading>
                <RadioButton.Group
                  onValueChange={thouSep => {
                    onChangeThouSep(thouSep);
                    setModalThouSepVisible(false);
                  }}
                  value={thouSepDesc}>
                  {thouOptions.map((t: string) => (
                    <View
                      key={t}
                      style={{flexDirection: 'row', paddingBottom: wp(1)}}>
                      {/* 
            // @ts-ignore */}
                      <RadioButton.Android
                        color={color}
                        status="unchecked"
                        style={{alignContent: 'center'}}
                        value={t}
                      />
                      <Text
                        style={{
                          color,
                          fontFamily,
                          paddingTop: wp(1.8),
                        }}>
                        {t}
                      </Text>
                    </View>
                  ))}
                </RadioButton.Group>
                <View
                  style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
                  {/* 
              // @ts-ignore */}
                  <Button
                    compact={true}
                    onPress={() => {
                      anal(`config_thouSep_close`);
                      setModalThouSepVisible(false);
                    }}
                    testID="cancel-thouSep"
                    uppercase={false}>
                    {i18n.t('dialog.btnCancel')}
                  </Button>
                </View>
              </ScrollView>
            </RCModal>
            <RCModal
              isVisible={modalShapeVisible}
              onBackButtonPress={() => {
                setModalShapeVisible(false);
              }}
              onBackdropPress={() => {
                setModalShapeVisible(false);
              }}>
              <ScrollView
                contentContainerStyle={{
                  backgroundColor: modal,
                  justifyContent: 'center',
                  padding: wp(5),
                }}>
                <Subheading
                  style={{
                    color: primary,
                    fontFamily,
                    paddingBottom: wp(2),
                  }}>
                  {i18n.t('config.shape')}
                </Subheading>
                <RadioButton.Group
                  onValueChange={shape => {
                    onChangeShape(shape);
                    setModalShapeVisible(false);
                  }}
                  value={shapeDesc}>
                  {[
                    i18n.t('config.shape0'),
                    i18n.t('config.shape1'),
                    i18n.t('config.shape2'),
                  ].map((t: string) => (
                    <View
                      key={t}
                      style={{flexDirection: 'row', paddingBottom: wp(1)}}>
                      {/* 
            // @ts-ignore */}
                      <RadioButton.Android
                        color={color}
                        status="unchecked"
                        style={{alignContent: 'center'}}
                        value={t}
                      />
                      <Text
                        style={{
                          color,
                          fontFamily,
                          paddingTop: wp(1.8),
                        }}>
                        {t}
                      </Text>
                    </View>
                  ))}
                </RadioButton.Group>
                <View
                  style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
                  {/* 
              // @ts-ignore */}
                  <Button
                    compact={true}
                    onPress={() => {
                      anal(`config_shape_close`);
                      setModalShapeVisible(false);
                    }}
                    testID="cancel-shape"
                    uppercase={false}>
                    {i18n.t('dialog.btnCancel')}
                  </Button>
                </View>
              </ScrollView>
            </RCModal>
          </>
        );
      }}
    </ThemeContext.Consumer>
  );
});
