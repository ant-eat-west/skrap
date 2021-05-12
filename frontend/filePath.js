const path = require('path');

const { name } = require('./package.json');
const moduleData = require('./static/conf/module.json');
const RootDir = process.cwd();

const alias = {};

for (let module of moduleData) {
	alias[module] = path.resolve(RootDir, module)
}

const webName = 'src';
const webRoot = path.resolve(RootDir, webName);
const webSrc = path.resolve(webRoot, '');
const webDist = path.resolve(RootDir, 'dist');
const deployName = 'deploy';
const deployRoot = path.resolve(RootDir, 'deploy');
const deploySrc = path.resolve(deployRoot, 'src');

alias[webName] = webRoot;
alias[deployName] = deployRoot;

module.exports = {
	name,
	RootDir,
	webName,
	webRoot,
	webSrc,
	webDist,
	deployName,
	deployRoot,
	deploySrc,
	alias
};
