import {ActionCreatorWithPayload} from '@reduxjs/toolkit/dist/createAction';
import React, {useState} from 'react';
import {Pressable, StyleSheet, View} from 'react-native';
import {
  Button,
  Dialog,
  Paragraph,
  Portal,
  Text,
  Title,
} from 'react-native-paper';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import MDIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {connect} from 'react-redux';
import {deleteAllPosts} from '../../db/db';
import i18n from '../../helpers/i18n';
import {ThemeContext} from '../../helpers/themes';
import {anal, getFont, showSnackbar} from '../../helpers/utils';
import {RootState} from '../../redux';
import {setRefresh as setCalcRefresh} from '../../redux/calculator';
import {ConfigState} from '../../redux/config';

type Props = ConfigState & {
  setCalcRefresh: ActionCreatorWithPayload<unknown, string>;
};

const mapStateToProps = (state: RootState) => ({
  ...state.config,
});

const mapDispatchToProps = {
  setCalcRefresh,
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

export const Data = connect(
  mapStateToProps,
  mapDispatchToProps,
)(function (props: Props) {
  const {setCalcRefresh} = props;

  const [historyDeleting, setHistoryDeleting] = useState<boolean>(false);
  const [historyWarnDialog, setHistoryWarnDialog] = useState<boolean>(false);

  const historyWarnCancel = () => {
    anal(`config_history_warn_cancel`);
    setHistoryWarnDialog(false);
  };

  const historyWarnOK = () => {
    function hideDialog() {
      setHistoryDeleting(false);
      setHistoryWarnDialog(false);
      showSnackbar(i18n.t('dialog.descHistoryProblem'));
    }

    anal(`config_history_warn_ok`);

    if (historyDeleting) {
      return;
    }

    setHistoryDeleting(true);

    try {
      deleteAllPosts()
        .then(success => {
          if (success) {
            setHistoryDeleting(false);
            setHistoryWarnDialog(false);

            setCalcRefresh(true);
            showSnackbar(i18n.t('dialog.descHistory'));
          } else {
            hideDialog();
          }
        })
        .catch(() => {
          hideDialog();
        });
    } catch (e) {
      hideDialog();
    }
  };

  return (
    <ThemeContext.Consumer>
      {({theme}) => {
        const {backgroundColor3, color, iconColor, modal, primary} = theme;

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
                  paddingTop: wp(2),
                  paddingBottom: 0,
                }}
                testID="your_data">
                {i18n.t('config.title_data')}
              </Title>
              <Pressable
                onPress={() => {
                  anal(`config_history_warn`);
                  setHistoryWarnDialog(true);
                }}
                style={({pressed}) => [
                  {
                    backgroundColor: pressed ? modal : backgroundColor3,
                  },
                ]}
                testID="history_warn">
                {() => (
                  <View style={styles.switchView}>
                    <View style={styles.switchLeft}>
                      <View
                        style={{
                          alignItems: 'center',
                          flex: 1,
                          flexDirection: 'row',
                        }}>
                        <View style={styles.rowLeft}>
                          <MDIcon
                            name="history"
                            size={wp(6)}
                            style={{color: iconColor}}
                          />
                        </View>
                        <View style={styles.rowRight}>
                          <Text style={{color, fontFamily: fontFamilyBold}}>
                            {i18n.t('config.history')}
                          </Text>
                        </View>
                      </View>
                    </View>
                    <View style={styles.switchRight}></View>
                  </View>
                )}
              </Pressable>
            </View>
            <Portal>
              <Dialog visible={historyWarnDialog} onDismiss={historyWarnCancel}>
                {/* 
                  // @ts-ignore */}
                <Dialog.Title style={{fontFamily}}>
                  {i18n.t('dialog.titleUndone')}
                </Dialog.Title>
                <Dialog.Content>
                  <Paragraph style={{fontFamily}}>
                    {i18n.t('dialog.descHistoryWarn')}
                  </Paragraph>
                </Dialog.Content>
                <Dialog.Actions>
                  <Button
                    onPress={() => {
                      anal(`config_history_cancel`);
                      historyWarnCancel();
                    }}>
                    {i18n.t('dialog.btnCancel')}
                  </Button>
                  <Button
                    onPress={() => {
                      anal(`config_history_ok`);
                      historyWarnOK();
                    }}>
                    {i18n.t('dialog.btnOk')}
                  </Button>
                </Dialog.Actions>
              </Dialog>
            </Portal>
          </>
        );
      }}
    </ThemeContext.Consumer>
  );
});
