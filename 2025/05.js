/**
 * The URL for fetching the input data
 * @constant {String}
 */
const INPUT_URL = "https://adventofcode.com/2025/day/5/input";

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
 * @returns {{ranges: Array<{start: Number, end: Number}>, ingredients: Array<Number>}}
 */
function parseAndSortInput(input) {
	const [rangeSection, idSection] = input.trim().split("\n\n");
	const ranges = rangeSection.trim().split("\n").map(line => {
		const [start, end] = line.split("-");
		return { start: Number(start), end: Number(end) };
	})
	.sort((a, b) => (a.start - b.start) || (a.end - b.end));
	const ingredients = idSection.trim().split("\n").map(Number).sort((a, b) => a - b);
	return { ranges, ingredients };
}

/**
 * @param {Array<Any>} array
 * @param {Any} target
 * @param {Function} comparator
 * @returns {Number}
 */
function binarySearch(array, target, comparator) {
	let left = 0;
	let right = array.length - 1;
	while (left <= right) {
		const mid = Math.floor((left + right) / 2);
		switch (Math.sign(comparator(array[mid], target))) {
			case 0:
				return mid;
			case -1:
				left = mid + 1;
				break;
			case 1:
				right = mid - 1;
				break;
		}
	}
	return array[right] === undefined ? left : right;
}

/**
 * @param {Array<{start: Number, end: Number}>} ranges
 * @returns {Array<{start: Number, end: Number}>}
 */
function mergeRanges(ranges) {
	const merged = [ranges[0]];
	for (let i = 1; i < ranges.length; i++) {
		const range = ranges[i];
		const last = merged[merged.length - 1];
		if (range.start <= last.end) {
			last.end = Math.max(last.end, range.end);
		} else {
			merged.push(range);
		}
	}
	return merged;
}

/**
 * @param {Array<Number>} ingredients
 * @param {Array<{start: Number, end: Number}>} ranges
 * @returns {Number}
 */
function countFreshIngredients(ingredients, ranges) {
	let count = 0;
	for (const id of ingredients) {
		const found = ranges[(binarySearch(ranges, id, (range, targetId) => range.start - targetId))];
		if (id >= found.start && id <= found.end) {
			count++;
		}
	}
	return count;
}

/**
 * @param {Array<{start: Number, end: Number}>} ranges
 * @returns {Number}
 */
function calculateTotalFreshIngredients(ranges) {
	let count = 0;
	for (const range of ranges) {
		count += (range.end - range.start + 1);
	}
	return count;
}

/**
 * @returns {void}
 */
function main() {
	fetchInputData(INPUT_URL).then(input => {
		const { ranges, ingredients } = parseAndSortInput(input);
		const mergedRanges = mergeRanges(ranges);
		const fresh = countFreshIngredients(ingredients, mergedRanges);
		const total = calculateTotalFreshIngredients(mergedRanges);
		console.log("The count of fresh ingredients is:", fresh);
		console.log("The total count of fresh ingredients is:", total);
	}).catch(error => {
		console.error(error);
	});
}

main();
