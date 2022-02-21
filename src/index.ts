const inquirer = require("inquirer");
const path = require("path");
const { writeFile, readdir, readFile } = require("fs").promises;

const configFiles: any = {};
const configFolderPath = path.resolve(__dirname, "config");

(async () => {
	const files = await readdir(configFolderPath).catch(console.log);

	for (let i of files) {
		const fileName = i.split(".")[0];
		configFiles[fileName] = await readFile(
			path.resolve(configFolderPath, i)
		).catch(console.log);
	}

	const { language } = await inquirer.prompt([
		{
			type: "list",
			message: "Which License to Generate?",
			name: "language",
			choices: Object.keys(configFiles),
		},
	]);
	const folderPath = path.join(process.cwd(), "LICENSE");
	await writeFile(folderPath, configFiles[language]).catch(console.log);
	console.log("Your LICENSE has been Created 🎉");
})();
