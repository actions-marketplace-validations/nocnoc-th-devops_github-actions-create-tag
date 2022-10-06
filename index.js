const core = require('@actions/core');
const github = require('@actions/github');

(async() => {
    try {
        const token = core.getInput('token');
        const name = core.getInput('name');
        console.log(`Creating ${name}`);

        const octokit = github.getOctokit(token);
        const context = github.context;
        const {owner, repo} = context.repo;
        const message = `Creating tag ${name}`;
        const object = context.sha;
        const type = 'commit';
        const tagger = {name: owner, email: owner};
        const tagResp = await octokit.rest.git.createTag({owner, repo, name, message, object, type, tagger});
        if (tagResp.status === 201) {
            const refResp = await octokit.rest.git.createRef({owner, repo, ref: `refs/tags/${name}`, sha: context.sha});
            if (refResp.status === 201) {
                core.info(`Tagged ${tagResp.data.sha} as ${name}`);
            }
        }
    } catch (error) {
        core.setFailed(error.message);
    }
})