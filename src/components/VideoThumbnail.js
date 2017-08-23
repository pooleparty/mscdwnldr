import React, { PropTypes } from 'react';

export default function VideoThumbnail(props) {
  let thumbnail;
  if (!props.thumbnails) {
    thumbnail = {
      url: 'https://www.youtube.com/yts/img/no_thumbnail-vfl4t3-4R.jpg',
      height: 90,
      width: 120
    };
  } else {
    thumbnail = props.thumbnails.default;
  }
  return (
    <img
      src={thumbnail.url}
      height={thumbnail.height}
      width={thumbnail.width}
      alt={thumbnail.url}
    />
  );
}

VideoThumbnail.propTypes = {
  thumbnails: PropTypes.shape({
    default: PropTypes.shape()
  })
};

VideoThumbnail.defaultProps = {
  thumbnails: undefined
};
