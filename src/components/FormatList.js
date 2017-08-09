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

    this.getFormatTable = this.getFormatTable.bind(this);
    this.handleFormatSelection = this.handleFormatSelection.bind(this);
  }

  getFormatTable() {
    const rows = this.props.formats.map(format => {
      return (<TableRow key={format.itag}>
        <TableRowColumn style={columnStyle}>{format.type}</TableRowColumn>
        <TableRowColumn>{getAbr(format)}</TableRowColumn>
      </TableRow>);
    });

    return (<Table onRowSelection={this.handleFormatSelection}>
      <TableHeader displaySelectAll={false} fixedHeader>
        <TableRow>
          <TableHeaderColumn style={columnStyle}>Format</TableHeaderColumn>
          <TableHeaderColumn>Audio Bitrate</TableHeaderColumn>
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
    return this.getFormatTable();
  }
}

FormatList.propTypes = {
  formats: PropTypes.arrayOf(Object).isRequired,
  onFormatSelection: PropTypes.func.isRequired
};
