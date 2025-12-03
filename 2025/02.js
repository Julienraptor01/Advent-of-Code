/**
 * The URL for fetching the input data
 * @constant {string}
 */
const INPUT_URL = "https://adventofcode.com/2025/day/2/input";

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
 * @returns {Array<{min: Number, max: Number}>}
 */
function parseAndSortInput(input) {
	const ranges = input.trim().split(",").map(range => range.split("-")).map(([min, max]) => ({min: Number(min), max: Number(max)})).sort((a, b) => (a.min - b.min) || (a.max - b.max));
	return ranges;
}

/**
 * @param {string} halfString
 * @param {Number} halfLength
 * @param {boolean} isMin
 * @returns {Number}
 */
function calculateHalfEven(halfString, halfLength, isMin) {
	const upperHalf = Number(halfString.substring(0, halfLength));
	const lowerHalf = Number(halfString.substring(halfLength));
	const half = isMin ? (upperHalf + Number(lowerHalf > upperHalf)) : (upperHalf - Number(lowerHalf < upperHalf));
	return half;
}

/**
 * @param {Number} length
 * @returns {Number}
 */
function calculateHalfOdd(length) {
	return Math.pow(10, Math.floor(length / 2));
}

/**
 * @param {Array<{min: Number, max: Number}>} ranges
 * @returns {Number}
 */
function calculateInvalidIdsSum(ranges) {
	let totalSum = 0;
	for (let range of ranges) {
		const {minString, maxString} = {minString: String(range.min), maxString: String(range.max)};
		const {minLength, maxLength} = {minLength: minString.length, maxLength: maxString.length};
		const {halfMin, halfMax} = {
			halfMin: !(minLength % 2) ? calculateHalfEven(minString, minLength / 2, true) : calculateHalfOdd(minLength),
			halfMax: !(maxLength % 2) ? calculateHalfEven(maxString, maxLength / 2, false) : calculateHalfOdd(maxLength) - 1
		};
		if (halfMax < halfMin) {
			continue;
		}
		for (let half = halfMin; half <= halfMax; half++) {
			totalSum += Number(String(half).repeat(2));
		}
	}
	return totalSum;
}

/**
 * @param {Array<{min: Number, max: Number}>} ranges
 * @returns {Number}
 */
function calculateMoreInvalidIdsSum(ranges) {
	const regex = /^(\d+)\1+$/;
	let totalSum = 0;
	for (let range of ranges) {
		for (let id = range.min; id <= range.max; id++) {
			if (regex.test(String(id))) {
				totalSum += id;
			}
		}
	}
	return totalSum;
}

/**
 * @returns {void}
 */
function main() {
	fetchInputData(INPUT_URL).then(input => {
		const ranges = parseAndSortInput(input);
		const totalSum = calculateInvalidIdsSum(ranges);
		const moreTotalSum = calculateMoreInvalidIdsSum(ranges);
		console.log("The invalid IDs sum is:", totalSum);
		console.log("The more invalid IDs sum is:", moreTotalSum);
	}).catch(error => {
		console.error(error);
	});
}

main();
