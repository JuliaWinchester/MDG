import React from "react";
import _ from "lodash";
import RGL from "react-grid-layout";
import './App.css';

const ReactGridLayout = RGL;

export default class ShipProfile extends React.PureComponent {
  static defaultProps = {
    isDraggable: false,
    isResizable: false,
    margin: [2, 2],
    compactType: null,
    onLayoutChange: function() {},
  };

  generateLayout() {
    if (this.props.view === 'front') {
      return this.generateFrontLayout();
    } else if (this.props.view === 'side') {
      return this.generateSideLayout();
    }
  }

  generateSideLayout() {
    let self = this;
    let layout = [];

    _.forEach(_.range(self.props.levels.length), function(z) {
      let ys = _.uniq(_.map(self.props.levels[z].layout, function(p) { return p.y; }));
      _.forEach(ys, function(y) {
        layout.push({
          x: y,
          y: z,
          w: 1,
          h: 1
        });
      });
    });

    layout = _.map(layout, function(l, idx) {
      l.i = idx.toString();
      return l;
    });

    return layout;
  }

  generateFrontLayout() {
    let self = this;
    let layout = [];

    _.forEach(_.range(self.props.levels.length), function(z) {
      let xs = _.uniq(_.map(self.props.levels[z].layout, function(p) { return p.x; }));
      _.forEach(xs, function(x) {
        layout.push({
          x: x,
          y: z,
          w: 1,
          h: 1
        });
      });
    });

    layout = _.map(layout, function(l, idx) {
      l.i = idx.toString();
      return l;
    });

    return layout;
  }

  generateDOM(layout) {
    // Generate items with properties from the layout, rather than pass the layout directly
    let tempVar = _.map(_.range(layout.length), function(i) {
      return (
        <div className='crt profile-block' key={i}>
        </div>
      );
    });
    return tempVar;
  }

  onLayoutChange(layout) {
    this.props.onLayoutChange(layout);
  }

  render() {
    let layout = this.generateLayout();

    return (
      <div style={{ width: '100%' }}>
        <p><b>SHIP PROFILE: { this.props.view === 'front' ? 'Front' : 'Side' }</b></p>
        <div className='profile-view'>
          <ReactGridLayout width={1200} layout={layout} onLayoutChange={this.onLayoutChange} cols={this.props.cols} rowHeight={40} {...this.props} style={{'border': '1px solid limegreen', 'maxWidth': '100%'}}>
            {this.generateDOM(layout)}
          </ReactGridLayout>
        </div>
      </div>
    );
  }
}