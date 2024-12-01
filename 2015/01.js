/**
 * The URL for fetching the input data
 * @constant {string}
 */
const INPUT_URL = "https://adventofcode.com/2015/day/1/input";

/**
 * @param {string} url
 * @returns {Promise<string>}
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
 * @param {string} input
 * @returns {number}
 */
function calculateFinalFloor(input) {
	let floor = 0;
	for (const char of input) {
		if (char === '(') {
			floor++;
		} else if (char === ')') {
			floor--;
		}
	}
	return floor;
}

/**
 * @param {string} input
 * @returns {number}
 */
function findBasementEnterPosition(input) {
	for (let i = 0, floor = 0; i < input.length; i++) {
		const char = input[i];
		if (char === '(') {
			floor++;
		} else if (char === ')') {
			floor--;
		}
		if (floor === -1) {
			return i + 1;
		}
	}
	return -1;
}

/**
 * @returns {void}
 */
function main() {
	fetchInputData(INPUT_URL).then(input => {
		input = input.trim()
		const finalFloor = calculateFinalFloor(input);
		const basementPosition = findBasementEnterPosition(input);
		console.log("Part 1: Final floor Santa reaches:", finalFloor);
		console.log("Part 2: Position of the first character that enters the basement:", basementPosition);
	}).catch(error => {
		console.error(error);
	});
}

main();
