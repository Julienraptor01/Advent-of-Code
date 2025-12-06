/**
 * The URL for fetching the input data
 * @constant {String}
 */
const INPUT_URL = "https://adventofcode.com/2025/day/6/input";

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
 * @returns {Array<{operand: String, numbers: Array<Number>}>}
 */
function parseAndSortInput(input) {
	const rows = input.trim().split("\n").map(line => line.trim().replace(/ {2,}/g, " ").split(" "));
	const operands = rows.pop();
	const problems = operands.map((operand, column) => {
		const numbers = rows.map(row => Number(row[column])).sort((a, b) => a - b);
		return {
			operand: operand,
			numbers: numbers
		};
	});
	return problems;
}

/**
 * @param {String} input
 * @returns {Array<{operand: String, numbers: Array<Number>}>}
 */
function parseInput(input) {
	const rows = input.trimEnd().split("\n");
	const operands = rows.pop().trimStart().replace(/ {2,}/g, " ").split(" ");
	const numbers = Array.from({ length: rows[0].length }, (_, x) => rows.map(line => line[x]).join("")).map(col => col.trim()).join("|").split("||").map(group => group.split("|").map(Number));
	const problems = operands.map((operand, column) => ({
		operand: operand,
		numbers: numbers[column]
	}));
	return problems;
}

/**
 * @param {String} operand
 * @param {Array<Number>} numbers
 * @returns {Number}
 */
function solveProblem(operand, numbers) {
	let result = numbers[0];
	for (let i = 1; i < numbers.length; i++) {
		const number = numbers[i];
		switch (operand) {
			case "+":
				result += number;
				break;
			case "*":
				result *= number;
				break;
		}
	}
	return result;
}

/**
 * @param {Array<{operand: String, numbers: Array<Number>}>} problems
 * @returns {Number}
 */
function sumProblems(problems) {
	let total = 0;
	for (const problem of problems) {
		total += solveProblem(problem.operand, problem.numbers);
	}
	return total;
}

/**
 * @param {Array<{operand: String, numbers: Array<Number>}>} problems
 * @returns {Number}
 */
function solveEval(problems) {
	const expressions = [];
	for (const problem of problems) {
		expressions.push(problem.numbers.join(`${problem.operand}`));
	}
	return eval(expressions.join("+"));
}

/**
 * @returns {void}
 */
function main() {
	fetchInputData(INPUT_URL).then(input => {
		const problems = parseAndSortInput(input);
		const totalFine = sumProblems(problems);
		const totalEval = solveEval(problems);
		const problemsCursed = parseInput(input);
		const totalCursedFine = sumProblems(problemsCursed);
		const totalCursedEval = solveEval(problemsCursed);
		console.log("The sum is (fine):", totalFine);
		console.log("The sum is (eval):", totalEval);
		console.log("The cursed sum is (fine):", totalCursedFine);
		console.log("The cursed sum is (eval):", totalCursedEval);
	}).catch(error => {
		console.error(error);
	});
}

main();
