/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/


/**
 * 运行 vite-vue 项目的构建命令
 * @param {string} projectPath - vite-vue 项目的路径
 * @returns {Promise} - 返回一个 Promise，包含构建结果
 */
const { exec } = require('child_process');
const path = require('path');
const { src, dest } = require('gulp')
const task = require('./lib/task');

function buildViteProject(projectPath) {

}

function viteTask() {

	const rootPath = path.resolve(path.join(__dirname, '..'));
	const projectPath = path.join(rootPath, './vite-vue');
	const distPath = path.join(rootPath, './out-vscode/vs/code/electron-sandbox/dist');

	const task = new Promise((resolve, reject) => {
		// 确保路径是绝对路径
		const absolutePath = path.resolve(projectPath);

		// 执行 npm run build 命令
		const buildProcess = exec('npm run build', {
			cwd: projectPath
		});

		// 收集输出信息
		let output = '';
		let errorOutput = '';

		buildProcess.stdout.on('data', (data) => {
			output += data;
			console.log(data); // 实时输出构建信息
		});

		buildProcess.stderr.on('data', (data) => {
			errorOutput += data;
			console.error(data); // 实时输出错误信息
		});

		buildProcess.on('close', (code) => {
			if (code === 0) {
				src(`${path.join(projectPath, 'dist')}/**`).pipe(dest(distPath))
				resolve();
			} else {
				reject({
					success: false,
					code,
					output,
					errorOutput
				});
			}
		});
	});

	task.taskName = 'viteTask';

	return task
}

const viteBuildTask = task.define('vite-build-task', viteTask);

exports.viteBuildTask = viteBuildTask
