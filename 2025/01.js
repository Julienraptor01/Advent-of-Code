/**
 * The URL for fetching the input data
 * @constant {string}
 */
const INPUT_URL = "https://adventofcode.com/2025/day/1/input";

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
 * @returns {Array<Number>}
 */
function parseInput(input) {
	const numbers = input.trim().split("\n").map(line => line.replace('L', '-').replace('R', '+')).map(Number);
	return numbers;
}

/**
 * @param {Array<Number>} rotationSequence
 * @returns {{password: Number, actualPassword: Number}}
 */
function calculatePasswords(rotationSequence) {
	let position = 50;
	let password = 0;
	let actualPassword = 0;
	for (let rotation of rotationSequence) {
		actualPassword += Math.floor(Math.abs(rotation) / 100);
		rotation %= 100;
		const oldPosition = position;
		position += rotation;
		if (oldPosition !== 0 && (position < 1 || position > 99)) {
			actualPassword++;
		}
		position += 100;
		position %= 100;
		if (position === 0) {
			password++;
		}
	}
	return {
		password,
		actualPassword
	};
}

/**
 * @returns {void}
 */
function main() {
	fetchInputData(INPUT_URL).then(input => {
		const rotationSequence = parseInput(input);
		const {
			password,
			actualPassword
		} = calculatePasswords(rotationSequence);
		console.log("The password is:", password);
		console.log("The actual password is:", actualPassword);
	}).catch(error => {
		console.error(error);
	});
}

main();
