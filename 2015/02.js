/**
 * The URL for fetching the input data
 * @constant {String}
 */
const INPUT_URL = "https://adventofcode.com/2015/day/2/input";

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
	const presents = input.trim().split("\n").map(line => line.split("x").map(Number));
	return presents;
}

/**
 * @param {Array<Array<Number>>} presents
 * @returns {Number}
 */
function calculateTotalWrappingPaper(presents) {
	let totalPaper = 0;
	for (const [l, w, h] of presents) {
		const [lw, wh, hl] = [l * w, w * h, h * l];
		const surfaceArea = 2 * (lw + wh + hl);
		const smallestSide = Math.min(lw, wh, hl);
		totalPaper += surfaceArea + smallestSide;
	}
	return totalPaper;
}

/**
 * @param {Array<Array<Number>>} presents
 * @returns {Number}
 */
function calculateTotalRibbon(presents) {
	let totalRibbon = 0;
	for (const [l, w, h] of presents) {
		const perimeters = [2 * (l + w), 2 * (w + h), 2 * (h + l)];
		const smallestPerimeter = Math.min(...perimeters);
		const volume = l * w * h;
		totalRibbon += smallestPerimeter + volume;
	}
	return totalRibbon;
}

/**
 * @returns {void}
 */
function main() {
	fetchInputData(INPUT_URL).then(input => {
		const presents = parseInput(input);
		const totalWrappingPaper = calculateTotalWrappingPaper(presents);
		const totalRibbon = calculateTotalRibbon(presents);
		console.log("Part 1: Total square feet of wrapping paper required:", totalWrappingPaper);
		console.log("Part 2: Total feet of ribbon required:", totalRibbon);
	}).catch(error => {
		console.error(error);
	});
}

main();
