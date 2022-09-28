import withObservables from '@nozbe/with-observables';
import date from 'date-and-time';
import React, {PureComponent} from 'react';
import {Pressable, StyleSheet, View} from 'react-native';
import {
  Divider,
  Paragraph,
  Subheading,
  Surface,
  Text,
} from 'react-native-paper';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import MDIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Post} from '../../db/models';
import {anal, getFont} from '../../helpers/utils';

export type Props = {
  copyPost: () => void;
  post: Post;
  theme: Record<string, string>;
};

const styles = StyleSheet.create({
  actionIcon: {
    marginHorizontal: wp(2.8),
    width: wp(8.3),
  },
  container: {paddingHorizontal: wp(5), paddingVertical: wp(3)},
  date: {paddingTop: wp(2)},
  header: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: wp(4),
  },
  item: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: wp(4),
  },
  rightAction: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  share: {alignItems: 'flex-end', flex: 1},
  surface: {
    elevation: 4,
    paddingHorizontal: wp(6),
    paddingVertical: wp(3),
  },
});

export const PostItem = withObservables(['post'], ({post}) => ({
  post,
}))(
  class _ extends PureComponent<Props> {
    shouldComponentUpdate(nextProps: Props) {
      return nextProps.theme.name !== this.props.theme.name;
    }

    render() {
      const {copyPost, post, theme} = this.props;
      const {backgroundColor2, color, color2, modal, primary} = theme;
      const {calculation, id, result} = post;

      const fontFamily = getFont();
      const fontFamilyBold = getFont(true);

      return (
        <View key={id} style={styles.container} testID="post-item">
          <Surface style={[styles.surface, {backgroundColor: modal}]}>
            <View style={styles.share}>
              <Pressable
                onPress={() => {
                  anal('post_copy');
                  copyPost();
                }}
                style={({pressed}) => [
                  {
                    backgroundColor: pressed ? backgroundColor2 : modal,
                  },
                ]}
                testID={`post-copy-${id}`}>
                {() => (
                  <MDIcon name="content-copy" size={wp(5)} color={primary} />
                )}
              </Pressable>
            </View>
            <Subheading
              style={{
                color,
                fontFamily: fontFamilyBold,
                paddingBottom: wp(3),
              }}
              testID={`post-calc-${id}`}>
              {calculation}
            </Subheading>
            <Divider />
            <Paragraph
              style={{color, fontFamily, paddingTop: wp(3)}}
              testID={`post-result-${id}`}>
              {result}
            </Paragraph>
            <Text
              style={[styles.date, {color: color2, fontFamily}]}
              testID={`post-date-${id}`}>
              {date.format(new Date(post.createdAt), 'dddd D MMM YYYY h:mm A')}
            </Text>
          </Surface>
        </View>
      );
    }
  },
);
