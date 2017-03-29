import React, { Component, PropTypes } from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

const buttonStyle = {
  margin: 12,
  fontSize: '1em'
};

const style = {
  display: 'flex'
};

export default class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: this.props.search || ''
    };

    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSearchChange(event) {
    this.setState({
      search: event.target.value
    });
  }

  handleSubmit() {
    this.props.onSubmit(this.state.search);
  }

  render() {
    return (<div style={style}>
      <div style={{ flexGrow: 2 }}>
        <TextField
          id="fieldTitle"
          floatingLabelText="Search"
          value={this.state.search}
          onChange={this.handleSearchChange}
          fullWidth
        />
      </div>
      <div style={{ textAlign: 'right' }}>
        <RaisedButton
          style={buttonStyle}
          label="Search"
          primary
          onClick={this.handleSubmit}
        />
      </div>
    </div>);
  }
}

SearchBar.propTypes = {
  search: PropTypes.string,
  onSubmit: PropTypes.func.isRequired
};

SearchBar.defaultProps = {
  search: 'https://www.youtube.com/watch?v=Cp6it3JRQr8'
};
