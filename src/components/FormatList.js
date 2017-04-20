import React, { Component, PropTypes } from 'react';
import _ from 'lodash';
// import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';

function getAbr(format) {
  const abr = _.get(format, 'audioBitrate');

  if (!abr) {
    return '-';
  }
  return `${abr} kB/s`;
}

const columnStyle = {
  width: '40%'
};

export default class FormatList extends Component {
  constructor(props) {
    super(props);

    // this.getFormatRadioButtonList = this.getFormatRadioButtonList.bind(this);
    this.getFormatTable = this.getFormatTable.bind(this);
    this.handleFormatSelection = this.handleFormatSelection.bind(this);
  }

  /*getFormatRadioButtonList() {
    if (this.props.formats.length) {
      const radioButtons = this.props.formats.map(format => {
        const label = (<div>
          <div><strong>{format.format}</strong></div>
          <div>Extension: {format.ext}</div>
          <div>Bitrate: {getAbr(format)}</div>
          <div>Filesize: {getFilesize(format)}</div>
        </div>);
        return (<RadioButton key={format.format_id} value={format.format} label={label} />);
      });
      return (
        <RadioButtonGroup name="format">
          {radioButtons}
        </RadioButtonGroup>
      );
    }
    return null;
  }*/

  getFormatTable() {
    const rows = this.props.formats.map(format => {
      return (<TableRow key={format.itag}>
        <TableRowColumn style={columnStyle}>{format.type}</TableRowColumn>
        <TableRowColumn>{format.resolution || '-'}</TableRowColumn>
        <TableRowColumn>{getAbr(format)}</TableRowColumn>
        <TableRowColumn>{format.resolution || '-'}</TableRowColumn>
      </TableRow>);
    });

    return (<Table height="400px" onRowSelection={this.handleFormatSelection}>
      <TableHeader displaySelectAll={false} fixedHeader>
        <TableRow>
          <TableHeaderColumn style={columnStyle}>Format</TableHeaderColumn>
          <TableHeaderColumn>Resolution</TableHeaderColumn>
          <TableHeaderColumn>Audio Bitrate</TableHeaderColumn>
          <TableHeaderColumn>Resolution</TableHeaderColumn>
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows}
      </TableBody>
    </Table>);
  }

  handleFormatSelection(selectedIndex) {
    this.props.onFormatSelection(this.props.formats[selectedIndex]);
  }

  render() {
    // return this.getFormatRadioButtonList();
    return this.getFormatTable();
  }
}

FormatList.propTypes = {
  formats: PropTypes.arrayOf(Object).isRequired,
  onFormatSelection: PropTypes.func.isRequired
};
