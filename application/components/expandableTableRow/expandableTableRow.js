import React from 'react';

class ExpandableTableRow extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      expanded: false,
    };
  }

  toggleExpand() {
    this.setState({
      expanded: !this.state.expanded,
    });
  }

  render() {
    return (
      <tbody>
        <tr onClick={this.toggleExpand.bind(this)}>
          { this.props.items.map((value, index) =>
            <td key={index}>{value}</td>
          )}
        </tr>
        { this.state.expanded ?
          <tr>
            <td style={{ background: '#FFF !important' }} colSpan={this.props.items.length}>
              {this.props.expandableContent}
            </td>
          </tr>
          :
          null
        }
      </tbody>
    );
  }

}

export default ExpandableTableRow;
