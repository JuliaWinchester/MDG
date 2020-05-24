import _ from "lodash";

// 5 + Math.floor(Math.random() * 2
export function generateModuleLayout(items) {
  let layout = [];
  for (var i = 0; i < items; i++) {
    if (i === 0) {
      let initialPosition = {
        x: 5 + Math.floor(Math.random() * 2),
        y: 2,
        w: 1,
        h: 1,
        i: i.toString()
      };
      // console.log(initialPosition);
      layout.push(initialPosition);
    } else {
      // console.log('Placing for node: ' + i);
      let newPosition = addNewPosition(layout, i);
      layout.push(newPosition);
    }
  }
  return layout;
}

export function addNewPosition(layout, idx) {
  // Choose existing module
  let node = layout[Math.floor(Math.random() * layout.length)];

  // console.log('Starting node:');
  // console.log(node);

  // Does node have any empty sides?
  let possibleSides = [{x: 0, y: 1}, {x: 1, y: 0}, {x: 0, y: -1}, {x: -1, y: 0}];
  let positions = _.map(possibleSides, function(side) {
    if (
      ( (node.x + side.x) >= 0 && (node.x + side.x) <= 10 ) &&
      ( (node.y + side.y) >= 0 && (node.y + side.y) <= 10 ) &&
      (!hasPosition(layout, node.x + side.x, node.y + side.y))
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
      p.neighbors = numberOfNeighbors(layout, p.x, p.y);
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
    return chosen;
  } else {
    return addNewPosition(layout, idx);
  }
}

export function hasPosition(layout, x, y) {
  // console.log(layout);
  let matchingPositions = _.filter(layout, function(p) {
    return (p.x === x && p.y === y)
  });
  if (matchingPositions.length > 0) {
    return true;
  } else {
    return false;
  }
}

export function numberOfNeighbors(layout, x, y) {
  return _.filter(layout, function(p) {
    return areTouching(p, {x: x, y: y});
  }).length;
}

export function areTouching(p1, p2) {
  return (
    (p1.x === p2.x && Math.abs(p1.y - p2.y) === 1) || 
    (p1.y === p2.y && Math.abs(p1.x - p2.x) === 1)
  )
}