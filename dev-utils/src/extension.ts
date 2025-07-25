import * as vscode from "vscode";

export function activate(context: vscode.ExtensionContext) {
  console.log("Please enter the frameworks you would like to auto run");

  const disposable = vscode.commands.registerCommand(
    "dev-utils.generate",
    async () => {
      const frameworks = ["Angular", "NestJs", "React"];
      const startUpOptions = ["Dev", "Prod"];

      const selectedFrameworks = await vscode.window.showQuickPick(frameworks, {
        canPickMany: true,
      });

      if (!selectedFrameworks || selectedFrameworks.length === 0) {
        vscode.window.showErrorMessage("No frameworks selected.");
        return;
      }

      const selectedStartUpOptions = await vscode.window.showQuickPick(
        startUpOptions,
        {
          canPickMany: true,
        }
      );

      if (!selectedStartUpOptions || selectedStartUpOptions.length === 0) {
        vscode.window.showErrorMessage("No startup options selected.");
        return;
      }

      const folderNames: string[] = [];
      for (const framework of selectedFrameworks) {
        const folderName = await vscode.window.showInputBox({
          prompt: `Enter folder name for ${framework} relative to root`,
        });
        folderNames.push(folderName || "");
      }

      let scripts: string[] = [];
      for (let i = 0; i < selectedFrameworks.length; i++) {
        const framework = selectedFrameworks[i];
        const folder = folderNames[i];
        selectedStartUpOptions.forEach((option) => {
          const startOption =
            option.toLowerCase() == "dev" ? "start:dev" : "start:prod";
          scripts.push(`start cmd /k "cd ${folder} && npm run ${startOption}"`);
        });
      }

      const workspaceFolders = vscode.workspace.workspaceFolders;
      if (workspaceFolders && workspaceFolders.length > 0) {
        const rootPath = workspaceFolders[0].uri.fsPath;
        const fs = require("fs");
        const path = require("path");
        const batchFilePath = path.join(rootPath, "run.bat");
        try {
          fs.writeFileSync(batchFilePath, scripts.join("\r\n"));
          vscode.window.showInformationMessage(
            `Batch file 'run.bat' generated at: ${batchFilePath}`
          );
        } catch (err) {
          vscode.window.showErrorMessage(`Failed to write batch file: ${err}`);
        }
      } else {
        vscode.window.showErrorMessage(
          "No workspace folder found. Cannot generate batch file."
        );
      }
    }
  );

  context.subscriptions.push(disposable);
}

export function deactivate() {}
