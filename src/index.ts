#!/usr/bin/env node
const inquirer = require("inquirer");
const path = require("path");
const { writeFile, readdir, readFile } = require("fs").promises;

const configFiles: any = {};
const configFolderPath = path.resolve(__dirname, "config");

(async () => {
	const files = await readdir(configFolderPath).catch(console.log);

	for (let i of files) {
		const licenseName = i.split(".")[0];
		configFiles[licenseName] = path.join(configFolderPath, i);
	}

	const { LICENSE } = await inquirer.prompt([
		{
			type: "list",
			message: "Which LICENSE do you want to generate?",
			name: "license",
			choices: Object.keys(configFiles),
		},
	]);
})();
