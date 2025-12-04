/**
 * The URL for fetching the input data
 * @constant {String}
 */
const INPUT_URL = "https://adventofcode.com/2025/day/3/input";

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
 * @returns {Array<Array<Number>>}
 */
function parseInput(input) {
	const banks = input.trim().split("\n").map(line => line.split("").map(Number));
	return banks;
}

/**
 * @param {Array<Number>} bank
 * @param {Number} digits
 * @returns {Number}
 */
function solveBank(bank, digits) {
	let joltage = new Array(digits).fill(-1);
	const length = bank.length;
	for (const [index, digit] of bank.entries()) {
		for (let j = Math.max(0, digits - (length - index)); j < digits; j++) {
			if (digit > joltage[j]) {
				joltage[j] = digit;
				for (let k = j + 1; k < digits; k++) {
					joltage[k] = -1;
				}
				break;
			}
		}
	}
	return Number(joltage.join(""));
}

/**
 * @param {Array<Array<Number>>} banks
 * @param {Number} digits
 * @returns {Number}
 */
function calculateTotalJoltage(banks, digits) {
	let totalJoltage = 0;
	for (const bank of banks) {
		totalJoltage += solveBank(bank, digits);
	}
	return totalJoltage;
}

/**
 * @returns {void}
 */
function main() {
	fetchInputData(INPUT_URL).then(input => {
		const banks = parseInput(input);
		const totalJoltage = calculateTotalJoltage(banks, 2);
		const overclockedJoltage = calculateTotalJoltage(banks, 12);
		console.log("The total output joltage is:", totalJoltage);
		console.log("The overclocked total output joltage is:", overclockedJoltage);
	}).catch(error => {
		console.error(error);
	});
}

main();
