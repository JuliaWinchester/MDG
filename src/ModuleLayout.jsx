import _ from "lodash";

export default class ModuleLayout {
	constructor(n) {
    this.moduleNumber = n;
		this.generateLayout();
	}

  generateLayout() {
    this.layout = [];
    for (var i = 0; i < this.moduleNumber; i++) {
      if (i === 0) {
        let initialPosition = {
          x: 5 + Math.floor(Math.random() * 2),
          y: 2,
          w: 1,
          h: 1,
          i: i.toString()
        };
        // console.log(initialPosition);
        this.layout.push(initialPosition);
      } else {
        // console.log('Placing for node: ' + i);
        this.addNewPosition(i);
      }
    }
  }

  addNewPosition(idx) {
    let self = this; 

    // Choose existing module
    let node = this.layout[Math.floor(Math.random() * this.layout.length)];

    // console.log('Starting node:');
    // console.log(node);

    // Does node have any empty sides?
    let possibleSides = [{x: 0, y: 1}, {x: 1, y: 0}, {x: 0, y: -1}, {x: -1, y: 0}];
    let positions = _.map(possibleSides, function(side) {
      if (
        ( (node.x + side.x) >= 0 && (node.x + side.x) <= 10 ) &&
        ( (node.y + side.y) >= 0 && (node.y + side.y) <= 10 ) &&
        (!self.hasPosition(node.x + side.x, node.y + side.y))
      ) {
        // console.log('New position at x:' + (node.x + side.x) + ' y: ' + (node.y + side.y))
        return {
          x: node.x + side.x,
          y: node.y + side.y,
          w: 1,
          h: 1,
          i: idx.toString()
        };
      } else {
        return false;
      }
    });
    positions = _.compact(positions);

    if (positions.length > 0) {
      // Preferentially sort for positions with 1 neighbor
      // console.log('Sorting through possible positions');
      // console.log(positions);
      positions = _.map(positions, function(p) {
        p.neighbors = self.numberOfNeighbors(p.x, p.y);
        // console.log('possibility');
        // console.log(p);
        // console.log(p.neighbors);
        return p;
      })

      let lonely = _.filter(positions, function(p) { return p.neighbors === 1; });
      let crowded = _.filter(positions, function(p) { return p.neighbors > 1; });

      if (lonely.length > 0 && crowded.length > 0) {
        let tunnelRatio = 1.0;
        let rand = Math.random();
        positions = rand < tunnelRatio ? lonely : crowded;
        // console.log('Choosing ' + (rand < tunnelRatio ? 'lonely' : 'crowded') );
      }

      let chosen = positions[Math.floor(Math.random() * positions.length)]
      // console.log('Chosen:');
      // console.log(chosen);
      this.layout.push(chosen);
    } else {
      this.addNewPosition(idx);
    }
  }

  hasPosition(x, y) {
    // console.log(layout);
    let matchingPositions = _.filter(this.layout, function(p) {
      return (p.x === x && p.y === y)
    });
    if (matchingPositions.length > 0) {
      return true;
    } else {
      return false;
    }
  }

  numberOfNeighbors(x, y) {
    let self = this; 

    return _.filter(self.layout, function(p) {
      return self.areTouching(p, {x: x, y: y});
    }).length;
  }

  areTouching(p1, p2) {
    return (
      (p1.x === p2.x && Math.abs(p1.y - p2.y) === 1) || 
      (p1.y === p2.y && Math.abs(p1.x - p2.x) === 1)
    )
  }
}