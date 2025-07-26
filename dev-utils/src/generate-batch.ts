import inquirer from "inquirer";
import * as fs from "fs";
import * as path from "path";

async function main() {
  const frameworks = ["Angular", "NestJs", "React"];
  const startUpOptions = ["Dev", "Prod"];

  const { selectedFrameworks } = await inquirer.prompt([
    {
      type: "checkbox",
      name: "selectedFrameworks",
      message: "Select frameworks to auto run:",
      choices: frameworks,
    },
  ]);

  if (!selectedFrameworks || selectedFrameworks.length === 0) {
    console.error("No frameworks selected.");
    process.exit(1);
  }

  const { selectedStartUpOptions } = await inquirer.prompt([
    {
      type: "checkbox",
      name: "selectedStartUpOptions",
      message: "Select startup options:",
      choices: startUpOptions,
    },
  ]);

  if (!selectedStartUpOptions || selectedStartUpOptions.length === 0) {
    console.error("No startup options selected.");
    process.exit(1);
  }

  const folderNames: string[] = [];
  for (const framework of selectedFrameworks) {
    const { folderName } = await inquirer.prompt([
      {
        type: "input",
        name: "folderName",
        message: `Enter folder name for ${framework} relative to root:`,
      },
    ]);
    folderNames.push(folderName || "");
  }

  let scripts: string[] = [];
  for (let i = 0; i < selectedFrameworks.length; i++) {
    const framework = selectedFrameworks[i];
    const folder = folderNames[i];
    selectedStartUpOptions.forEach((option: string) => {
      const startOption =
        option.toLowerCase() === "dev" ? "start:dev" : "start:prod";
      scripts.push(`start cmd /k "cd ${folder} && npm run ${startOption}"`);
    });
  }

  const batchFilePath = path.join(process.cwd(), "run.bat");
  try {
    fs.writeFileSync(batchFilePath, scripts.join("\r\n"));
    console.log(`Batch file 'run.bat' generated at: ${batchFilePath}`);
  } catch (err) {
    console.error(`Failed to write batch file: ${err}`);
  }
}

main();
