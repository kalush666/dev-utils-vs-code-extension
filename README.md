# dev-utils

A Visual Studio Code extension to quickly generate a batch file (`run.bat`) for running multiple frameworks with selected startup options in separate command windows.

## Features

- Select one or more frameworks (Angular, NestJs, React) to auto run.
- Choose startup options (Dev, Prod) for each framework.
- Enter a folder name for each selected framework (relative to the workspace root).
- Generates a `run.bat` file in the workspace root that opens a new command window for each selected framework and option.
- The batch file uses `start cmd /k` to run each command independently.

## Usage

### In VS Code (Extension)

1. Open the Command Palette (`Ctrl+Shift+P`).
2. Run the command: `Generate Dev Utils`.
3. Select the frameworks you want to run.
4. Select the startup options (Dev or Prod).
5. Enter the folder name for each framework.
6. The extension will generate a `run.bat` file in your workspace root.
7. Double-click `run.bat` to run all selected scripts in separate windows.

### From the Terminal (CLI)

1. Open a terminal and navigate to the `dev-utils` folder.
2. Run the CLI script:
   - If using TypeScript directly: `npx ts-node src/generate-batch.ts`
   - If compiled to JavaScript: `node dist/generate-batch.js`
3. Follow the prompts to select frameworks, options, and folder names.
4. The script will generate a `run.bat` file in your current directory.
5. Double-click `run.bat` to run all selected scripts in separate windows.

## Example

If you select Angular and React, choose both Dev and Prod, and enter `frontend/angular` and `frontend/react` as folder names, the generated `run.bat` will look like:

```
start cmd /k "cd frontend/angular && npm run start:dev"
start cmd /k "cd frontend/angular && npm run start:prod"
start cmd /k "cd frontend/react && npm run start:dev"
start cmd /k "cd frontend/react && npm run start:prod"
```

## Requirements

- Node.js and npm installed for running scripts.
- The selected folders must exist and contain the appropriate npm scripts.

## Extension Settings

No custom settings are required.

## Known Issues

- The extension does not validate if the entered folder exists or if the npm scripts are defined.
- Only works in Windows environments (uses batch file and `cmd`).

## Release Notes

### 0.0.1

- Initial release with batch file generation for selected frameworks and options.

---

**Enjoy using dev-utils!**
