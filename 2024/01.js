/**
 * The URL for fetching the input data
 * @constant {string}
 */
const INPUT_URL = "https://adventofcode.com/2024/day/1/input";

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
 * @returns {{leftList: Number[], rightList: Number[]}}
 */
function parseAndSortInput(input) {
	const lines = input.trim().split("\n");
	const leftList = [];
	const rightList = [];
	for (const line of lines) {
		const [left, right] = line.split(/\s+/).map(Number);
		leftList.push(left);
		rightList.push(right);
	}
	leftList.sort((a, b) => a - b);
	rightList.sort((a, b) => a - b);
	return {
		leftList,
		rightList
	};
}

/**
 * @param {Number[]} leftList
 * @param {Number[]} rightList
 * @returns {Number}
 */
function calculateTotalDistance(leftList, rightList) {
	let totalDistance = 0;
	for (let i = 0; i < leftList.length; i++) {
		totalDistance += Math.abs(leftList[i] - rightList[i]);
	}
	return totalDistance;
}

/**
 * @param {Number[]} leftList
 * @param {Number[]} rightList
 * @returns {Number}
 */
function calculateSimilarityScore(leftList, rightList) {
	const rightCountMap = new Map();
	for (const num of rightList) {
		rightCountMap.set(num, (rightCountMap.get(num) || 0) + 1);
	}
	let similarityScore = 0;
	for (const num of leftList) {
		similarityScore += num * (rightCountMap.get(num) || 0);
	}
	return similarityScore;
}

/**
 * @returns {void}
 */
function main() {
	fetchInputData(INPUT_URL).then(input => {
		const {
			leftList,
			rightList
		} = parseAndSortInput(input);
		const totalDistance = calculateTotalDistance(leftList, rightList);
		const similarityScore = calculateSimilarityScore(leftList, rightList);
		console.log("Part 1: Total distance between lists:", totalDistance);
		console.log("Part 2: Similarity score:", similarityScore);
	}).catch(error => {
		console.error(error);
	});
}

main();
