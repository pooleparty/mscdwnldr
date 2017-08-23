import React, { PropTypes } from 'react';
import VideoThumbnail from './VideoThumbnail';

const playlistItemStyle = {
  display: 'flex',
  marginBottom: 10
};

export default function PlaylistItem(props) {
  return (<div style={playlistItemStyle}>
    <VideoThumbnail thumbnails={props.item.thumbnails} />
    <h2>{props.item.title}</h2>
    {/* <pre>{JSON.stringify(props.item, null, 2)}</pre> */}
  </div>);
}

PlaylistItem.propTypes = {
  item: PropTypes.shape({
    thumbnails: PropTypes.shape(),
    title: PropTypes.string
  }).isRequired
};
