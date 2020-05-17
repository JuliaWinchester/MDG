// Collection of useful utility functions

export function roll(sides = undefined, quantity = undefined) {
  return Math.floor(Math.random() * Math.floor(sides));
}

export function rollOn(tableObj) {
	const tableRoll = roll(tableObj.dice);
  const table = tableObj.table;

	let tableEntry = {};
	for (const entry in table) {
		if (tableRoll >= table[entry]['rng'][0] && 
			  tableRoll <= table[entry]['rng'][1]
		) {
			tableEntry = { 'title': entry, 'content': table[entry] };
		}
	}

  console.log(tableRoll);
  console.log(tableEntry);
  return tableEntry;
}