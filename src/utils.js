// Collection of useful utility functions

export function roll(sides) {
  return Math.floor(Math.random() * Math.floor(sides));
}

export function diceRoll(diceStr) {
	if (Number.isInteger(diceStr) || diceStr.toLowerCase().indexOf('d') === -1) {
		return diceStr;
	} else {
    let diceProps = diceStr.toLowerCase().split('d');
    let diceResults = [];
    for (var i = 0; i < diceProps[0]; i++) {
      diceResults.push(roll(diceProps[1]) + 1);
    }
    return diceResults.reduce((a, b) => a + b, 0);
	}
}

export function rollOn(tableObj) {
  const tableRoll = roll(tableObj.dice);
  const table = tableObj.table;

	let tableEntry = {};
	for (const entry in table) {
		if (tableRoll >= table[entry]['rng'][0] && 
			  tableRoll <= table[entry]['rng'][1]
		) {
			tableEntry = Object.assign({ 'title': entry }, table[entry] );
		}
	}

  return tableEntry;
}

export function numberOfExtraLevels(nth, count) {
  if (Math.random() < 0.5/nth) {
    count = numberOfExtraLevels(nth + 1, count + 1);
  }
  return count;
}

