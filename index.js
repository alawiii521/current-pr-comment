const core = require("@actions/core");
const github = require("@actions/github");

async function run() {
	try {
		const payloadContext = github.context.payload;

		failIfMissing(payloadContext, "Can't find payload context");
		failIfMissing(payloadContext.repository, "Can't find repository");
		failIfMissing(payloadContext.repository.owner, "Can't find owner");
		failIfMissing(payloadContext.repository.owner.login, "Can't find owner");

		const owner = payloadContext.repository.owner.login;
		core.debug("owner: " + owner);

		const repo = payloadContext.repository.name;
		failIfMissing(repo, "Can't find repo");
		core.debug("repo: " + repo);

		failIfMissing(payloadContext.pull_request, "Can't find pull request");
		const issue_number = payloadContext.pull_request.number;
		core.debug("issue_number: " + issue_number);

		const GITHUB_TOKEN = core.getInput("GITHUB_TOKEN");

		failIfMissing(GITHUB_TOKEN, "Can't find GITHUB_TOKEN");

		const comment = core.getInput("comment");

		failIfMissing(comment, "Can't read comment");

		core.debug("comment: " + comment);

		const octokit = github.getOctokit(GITHUB_TOKEN);
		await octokit.issues.createComment({
			owner: owner,
			repo: repo,
			issue_number: issue_number,
			body: comment,
		});
	} catch (error) {
		core.setFailed(error.message);
	}
}

function failIfMissing(val, errorMessage){
	if(!val){
		throw new Error(errorMessage);
	}
}

run();
