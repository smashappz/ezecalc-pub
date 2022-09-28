import DateTimePicker from '@react-native-community/datetimepicker';
import {ActionCreatorWithPayload} from '@reduxjs/toolkit/dist/createAction';
import React, {Component} from 'react';
import {FlatList, Pressable, StyleSheet, View} from 'react-native';
import {Text, TextInput} from 'react-native-paper';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/Ionicons';
import MDIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {connect} from 'react-redux';
import {Loading} from '../../components/diary/loading';
import {PostItem} from '../../components/diary/postItem';
import {fetchPosts, posts} from '../../db/db';
import {Post} from '../../db/models';
import {DETOX} from '../../helpers/constants';
import i18n from '../../helpers/i18n';
import {ThemeContext} from '../../helpers/themes';
import {anal, getFont, setData, showSnackbar} from '../../helpers/utils';
import {RootState} from '../../redux';
import {setClear, setOutput} from '../../redux/calculator';
import {DiaryState, setPostCount, setRefresh} from '../../redux/diary';

type Props = DiaryState & {
  setClear: ActionCreatorWithPayload<unknown, string>;
  setOutput: ActionCreatorWithPayload<unknown, string>;
  setPostCount: ActionCreatorWithPayload<unknown, string>;
  setRefresh: ActionCreatorWithPayload<unknown, string>;
};

type State = {
  alarms: boolean;
  calendar: boolean;
  loadingPosts: boolean;
  phrase: string;
  post: Post | null;
  search: boolean;
  timestamp: number;
};

const renderPostItem =
  // eslint-disable-next-line @typescript-eslint/no-explicit-any


    (
      copyPost: (post: Post) => void,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      theme: any,
    ) =>
    // eslint-disable-next-line react/display-name
    ({item: post}: {item: Post}) =>
      <PostItem copyPost={() => copyPost(post)} post={post} theme={theme} />;

const mapStateToProps = (state: RootState) => ({
  ...state.diary,
});

const mapDispatchToProps = {
  setClear,
  setOutput,
  setPostCount,
  setRefresh,
};

const styles = StyleSheet.create({
  picker: {flex: 1, justifyContent: 'center'},
  refresh: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  search: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingRight: wp(2),
  },
  searchFind: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
});

export const Diary = connect(
  mapStateToProps,
  mapDispatchToProps,
)(
  class _ extends Component<Props, State> {
    constructor(props: Props) {
      super(props);

      this.state = {
        alarms: false,
        calendar: false,
        loadingPosts: false,
        phrase: '',
        post: null,
        search: false,
        timestamp: 0,
      };

      _.contextType = ThemeContext;
    }

    async componentDidMount() {
      this.getPosts();
    }

    componentDidUpdate(prevProps: Props, prevState: State) {
      const {refresh, setRefresh} = this.props;
      const {phrase, timestamp} = this.state;

      const load = () =>
        this.setState(
          {
            loadingPosts: true,
          },
          this.getPosts,
        );

      if (prevProps.refresh !== refresh && refresh) {
        load();
      } else if (
        prevState.phrase !== phrase ||
        prevState.timestamp !== timestamp
      ) {
        setRefresh(true);
      }
    }

    copyPost = (post: Post) => {
      const {setClear, setOutput} = this.props;
      const {calculation} = post;

      setClear(true);
      setOutput(calculation);
      setData('calc_output', calculation);

      showSnackbar(i18n.t('diary.copy', {calculation}), 0);
    };

    async getPosts() {
      const {refresh, setRefresh} = this.props;
      const {phrase, timestamp} = this.state;
      const searchPhrase = phrase && phrase.length > 0;

      if (!refresh || (phrase && !searchPhrase)) {
        return;
      }

      const {setPostCount} = this.props;
      const searchTs = timestamp > 0;

      posts.length = 0;
      setPostCount(0);

      let sql = `SELECT * FROM posts`;

      if (searchPhrase) {
        sql += ` WHERE calculation LIKE '%${phrase}%' OR result LIKE '%${phrase}%'`;
      } else if (searchTs) {
        sql += ` WHERE created_at < ${timestamp}`;
      }

      sql += ` ORDER BY created_at DESC`;
      const fetched = (await fetchPosts(sql)) as Array<Post>;

      if (fetched && fetched.length) {
        fetched.forEach(p => posts.push(p));
        setPostCount(fetched.length);
      }

      setRefresh(false);

      this.setState({
        loadingPosts: false,
      });
    }

    onRefresh = () => {
      anal(`diary_refresh`);

      this.setState({
        phrase: '',
        search: false,
        timestamp: 0,
      });
    };

    onSearch = () => {
      const search = !this.state.search;
      anal(`diary_search`);

      this.setState({
        search,
      });
    };

    render() {
      const {postCount} = this.props;

      const {calendar, loadingPosts, phrase, search, timestamp} = this.state;

      const {theme} = this.context;
      const {backgroundColor3, color, modal, placeholder} = theme;

      const hasPosts = postCount > 0;
      const noFilters = phrase === '' && timestamp === 0;

      return (
        <>
          <View
            style={{backgroundColor: backgroundColor3, flex: 1}}
            testID="diary-view">
            <View
              style={{
                alignItems: 'center',
                backgroundColor: backgroundColor3,
                flexDirection: 'row',
                paddingHorizontal: wp(6),
                paddingVertical: wp(1),
              }}>
              {!loadingPosts && !noFilters && (
                <View style={styles.refresh}>
                  <Pressable
                    onPress={this.onRefresh}
                    style={({pressed}) => [
                      {
                        backgroundColor: pressed ? modal : backgroundColor3,
                      },
                    ]}
                    testID="refresh">
                    {() => (
                      <MDIcon name="arrow-left" size={wp(6)} color={color} />
                    )}
                  </Pressable>
                </View>
              )}
              {hasPosts && noFilters && (
                <View style={styles.search}>
                  <>
                    <View style={{paddingHorizontal: wp(3)}} />
                    <Pressable
                      onPress={this.onSearch}
                      style={({pressed}) => [
                        {
                          backgroundColor: pressed ? modal : backgroundColor3,
                        },
                      ]}
                      testID="search">
                      {() => (
                        <Icon name="md-search" size={wp(6)} color={color} />
                      )}
                    </Pressable>
                  </>
                </View>
              )}
            </View>
            {search && (
              <>
                <View style={styles.searchFind}>
                  <Text
                    style={{
                      color,
                      fontFamily: getFont(true),
                      fontSize: wp(4),
                      paddingRight: wp(3),
                    }}>
                    {i18n.t('app.find')}
                  </Text>
                  <Pressable
                    onPress={() => {
                      anal(`diary_calendar_show`);
                      this.setState({
                        calendar: true,
                        phrase: '',
                      });
                    }}
                    style={({pressed}) => [
                      {
                        backgroundColor: pressed ? modal : backgroundColor3,
                      },
                    ]}
                    testID="calendar">
                    {() => (
                      <Icon name="md-calendar" size={wp(7.8)} color={color} />
                    )}
                  </Pressable>
                </View>
                <View
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    paddingBottom: wp(3),
                    paddingTop: wp(1.6),
                  }}>
                  <TextInput
                    autoFocus={true}
                    keyboardType="number-pad"
                    maxLength={32}
                    onChangeText={(phrase: string) => {
                      this.setState({phrase, timestamp: 0});
                    }}
                    placeholder={i18n.t('diary.search_input')}
                    style={{
                      backgroundColor: backgroundColor3,
                      color: placeholder,
                      height: wp(8.8),
                      width: '70%',
                    }}
                    testID="phrase"
                    value={phrase}
                  />
                </View>
              </>
            )}
            <Loading
              imagePresent={false}
              itemCount={postCount}
              loading={loadingPosts}
            />
            {hasPosts && (
              <FlatList
                data={posts}
                extraData={this.context}
                initialNumToRender={8}
                keyExtractor={item => item.id}
                maxToRenderPerBatch={16}
                removeClippedSubviews={true}
                renderItem={renderPostItem(this.copyPost, theme)}
                testID="posts"
                updateCellsBatchingPeriod={128}
                windowSize={8}
              />
            )}
          </View>
          {calendar && (
            <View style={styles.picker}>
              <DateTimePicker
                maximumDate={new Date()}
                minimumDate={new Date(2020, 7, 1)}
                onChange={(event: Event, date: Date | undefined) => {
                  this.setState({
                    calendar: false,
                  });

                  if (!date) {
                    return;
                  }

                  anal(`diary_calendar_date`);

                  this.setState({
                    search: false,
                    timestamp:
                      date.getTime() + (DETOX ? 60 * 60 * 24 * 1000 : 0),
                  });
                }}
                testID="calendar"
                value={new Date()}
              />
            </View>
          )}
        </>
      );
    }
  },
);
