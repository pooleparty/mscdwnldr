import React, { PropTypes } from 'react';
import PlaylistItem from './PlaylistItem';

export default function Playlist(props) {
  const playlistItems = props.info.items.map(({ snippet }) => (
    <PlaylistItem item={snippet} key={snippet.resourceId.videoId} />
  ));
  return (<div>
    <h1>playlist</h1>
    {playlistItems}
  </div>);
}

Playlist.propTypes = {
  info: PropTypes.shape({
    items: PropTypes.arrayOf(PropTypes.shape({
      item: PropTypes.object
    }))
  })
};

Playlist.defaultProps = {
  info: { items: [] }
};
