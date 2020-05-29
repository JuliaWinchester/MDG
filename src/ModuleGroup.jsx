import React from "react";
import _ from "lodash";
import RGL, { WidthProvider } from "react-grid-layout";
import Module from './Module';
import './App.css';

const ReactGridLayout = WidthProvider(RGL);

export default class ModuleGroup extends React.PureComponent {
  static defaultProps = {
    isDraggable: true,
    isResizable: false,
    margin: [10, 10],
    compactType: null,
    onLayoutChange: function() {},
  };

  generateDOM() {
    let self = this; 

    // Generate items with properties from the layout, rather than pass the layout directly
    return _.map(_.range(this.props.items.length), function(i) {
      return (
        <div key={i} data-grid={self.props.layout[i]} >
          <Module className='crt' key={i} number={i} item={self.props.items[i]} />
        </div>
      );
    });
  }

  onLayoutChange(layout) {
    this.props.onLayoutChange(layout);
  }

  render() {
    return (
      <ReactGridLayout onLayoutChange={this.onLayoutChange} cols={this.props.cols} rowHeight={this.props.rowHeight} {...this.props}>
        {this.generateDOM()}
      </ReactGridLayout>
    );
  }
}