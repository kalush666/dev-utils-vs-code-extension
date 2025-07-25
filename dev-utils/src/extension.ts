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

      const folderNames = [];
      selectedFrameworks.forEach(async (framework) => {
        const folderName = await vscode.window.showInputBox({
          prompt: `Enter folder name for ${framework} relative to root`,
        });
        folderNames.push(folderName);
      });

      vscode.window.showInformationMessage(
        `Selected frameworks: ${selectedFrameworks.join(", ")}`
      );
    }
  );

  context.subscriptions.push(disposable);
}

export function deactivate() {}
