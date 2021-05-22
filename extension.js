// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');
const fs = require('fs');
const path = require('path');

var gcodes;

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "gcode-helper" is now active!');

	fs.readFile(path.join(__dirname, 'snippets/gcode2.json'), (err, data) => {
		if (err)
		{
			console.log("something went wrong parsing gcode list")
		}
		else
		{
			gcodes = JSON.parse(data);
		}
	});

	let disposable = vscode.commands.registerCommand('gcode-helper.helloWorld', function () {
		// The code you place here will be executed every time your command is executed

		// Display a message box to the user
		vscode.window.showInformationMessage('Hello World from gcode_helper!');
	});

	context.subscriptions.push(disposable);

	
	disposable = vscode.languages.registerHoverProvider('gcode', {
        provideHover(document, position, token) {
            const range = document.getWordRangeAtPosition(position);
            const word = document.getText(range).toUpperCase();

			let res = gcodes[word];
            if (res) {
                return new vscode.Hover(gcodes[word]["description"]);
            }
        }
    });
	
	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
