/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 396:
/***/ ((module) => {

module.exports = eval("require")("@actions/core");


/***/ }),

/***/ 982:
/***/ ((module) => {

module.exports = eval("require")("@actions/exec");


/***/ }),

/***/ 444:
/***/ ((module) => {

module.exports = eval("require")("@actions/github");


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __nccwpck_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		var threw = true;
/******/ 		try {
/******/ 			__webpack_modules__[moduleId](module, module.exports, __nccwpck_require__);
/******/ 			threw = false;
/******/ 		} finally {
/******/ 			if(threw) delete __webpack_module_cache__[moduleId];
/******/ 		}
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat */
/******/ 	
/******/ 	if (typeof __nccwpck_require__ !== 'undefined') __nccwpck_require__.ab = __dirname + "/";
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
const core = __nccwpck_require__(396);
const github = __nccwpck_require__(444);
const { exec } = __nccwpck_require__(982);

async function run() {
    try {
        const token = core.getInput('token');
        const branch = core.getInput('branch');
        const base = core.getInput('base');
        const commitMessage = core.getInput('commit_message');
        const title = core.getInput('title');
        const body = core.getInput('body');
        
        const octokit = github.getOctokit(token);
        const { owner, repo } = github.context.repo;

        // Configure Git
        await exec('git', ['config', '--global', 'user.name', 'github-actions[bot]']);
        await exec('git', ['config', '--global', 'user.email', 'github-actions[bot]@users.noreply.github.com']);

        // Stage changes
        await exec('git', ['add', '.']);

        // Check if there are any changes
        let output = '';
        const options = {
            listeners: {
                stdout: (data) => {
                    output += data.toString();
                }
            }
        };
        await exec('git', ['status', '--porcelain'], options);
        if (!output.trim()) {
            console.log('No changes to commit');
            return;
        }

        // Commit changes
        await exec('git', ['commit', '-m', commitMessage]);

        // Push changes
        await exec('git', ['push', 'origin', branch]);

        // Create a pull request
        await octokit.rest.pulls.create({
            owner,
            repo,
            title,
            body,
            head: branch,
            base
        });

    } catch (error) {
        core.setFailed(error.message);
    }
}

run();
module.exports = __webpack_exports__;
/******/ })()
;