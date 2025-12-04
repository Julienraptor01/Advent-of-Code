/**
 * The URL for fetching the input data
 * @constant {String}
 */
const INPUT_URL = "https://adventofcode.com/2025/day/4/input";

/**
 * @param {String} url
 * @returns {Promise<String>}
 * @throws
 */
async function fetchInputData(url) {
	const response = await fetch(url, {
		credentials: "include"
	});
	if (!response.ok) {
		throw new Error(`Failed to fetch input data: ${response.status} ${response.statusText}`);
	}
	return await response.text();
}

/**
 * @param {String} input
 * @returns {Array<Array<Boolean>>}
 */
function parseInput(input) {
	const grid = input.trim().split("\n").map(line => line.split("").map(char => char === '@'));
	return grid;
}

/**
 * @param {Array<Array<Boolean>>} grid
 * @param {{row: Number, col: Number}} position
 * @returns {Number}
 */
function checkNeighbors(grid, position) {
	let neighbors = 0;
	const { row, col } = position;
	for (let rowOffset = -1; rowOffset <= 1; rowOffset++) {
		for (let colOffset = -1; colOffset <= 1; colOffset++) {
			if (rowOffset === 0 && colOffset === 0) continue;
			const neighborRow = row + rowOffset;
			const neighborCol = col + colOffset;
			if (neighborRow < 0 || neighborRow >= grid.length || neighborCol < 0 || neighborCol >= grid[0].length) {
				continue;
			}
			neighbors += grid[neighborRow][neighborCol];
		}
	}
	return neighbors;
}

/**
 * @param {Array<Array<Boolean>>} grid
 * @param {Boolean} removeIfAccessible
 * @returns {Number}
 */
function countAccessibleRolls(grid, removeIfAccessible) {
	let count = 0;
	const height = grid.length;
	const width = grid[0].length;

	for (let row = 0; row < height; row++) {
		for (let col = 0; col < width; col++) {
			if (!grid[row][col]) continue;
			if (checkNeighbors(grid, { row, col }) < 4) {
				count++;
				if (removeIfAccessible) {
					grid[row][col] = false;
				}
			}
		}
	}

	return count;
}

/**
 * @param {Array<Array<Boolean>>} grid
 * @returns {Number}
 */
function countTotalAccessibleRolls(grid) {
	let totalRemoved = 0;
	let currentRemoved = 0;
	do {
		currentRemoved = countAccessibleRolls(grid, true);
		totalRemoved += currentRemoved;
	} while (currentRemoved > 0);
	return totalRemoved;
}

/**
 * @returns {void}
 */
function main() {
	fetchInputData(INPUT_URL).then(input => {
		const grid = parseInput(input);
		const accessibleCount = countAccessibleRolls(grid, false);
		const totalRemoved = countTotalAccessibleRolls(grid);
		console.log("The number of accessible paper rolls is:", accessibleCount);
		console.log("The total number of removed paper rolls is:", totalRemoved);
	}).catch(error => {
		console.error(error);
	});
}

main();
