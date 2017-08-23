import React, { PropTypes } from 'react';
import _ from 'lodash';
import Avatar from 'material-ui/Avatar';

export default function VideoAuthorAvatar(props) {
  const avatar = _.get(props, 'video.author.avatar');

  if (avatar) {
    return (<Avatar src={avatar} />);
  }
  return null;
}

VideoAuthorAvatar.propTypes = {
  video: PropTypes.shape({
    author: PropTypes.shape({
      avatar: PropTypes.string
    })
  })
};

VideoAuthorAvatar.defaultProps = {
  video: {}
};
