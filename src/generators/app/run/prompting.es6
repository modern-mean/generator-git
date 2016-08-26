import * as prompts from '../prompts';
import * as shell from '../shell';
import * as github from '../github';

export function prompting(generator) {
  return generator.prompt(prompts.gitEmail(generator.config.git.email))
    .then(answers => {
      generator.config.git.email = answers.email;
      if(answers.save) {
        shell.saveEmail(answers.email);
      }
    })
    .then(() => generator.prompt(prompts.gitName(generator.config.git.name)))
    .then(answers => {
      generator.config.git.name = answers.name;
      if(answers.save) {
        shell.saveName(answers.name);
      }
      return ;
    })
    .then(() => generator.prompt(prompts.gitUsername(generator.config.github.username)))
    .then(answers => {
      generator.config.github.username = answers.username;
      if(answers.save) {
        shell.saveUsername(answers.username);
      }
    })
    .then(() => generator.prompt(prompts.authentication))
    .then(answers => {
      return generator.config.github.password = answers.password;
    })
    .then(() => github.authenticate(generator))
    .then(() => github.getAuthorization(generator))
    .then(() => github.deleteAuthorization(generator))
    .then(() => github.createAuthorization(generator))
    .then(() => github.getOrgs(generator))
    .then(() => {
      if (generator.config.github.orgs.length > 0) {
        return generator.prompt(prompts.orgs(generator.config.github.orgs))
          .then(answers => {
            generator.config.github.org = generator.config.github.orgs[answers.org];
          });
      }
    })
    .then(() => github.getRepos(generator))
    .then(() => generator.prompt(prompts.repoInfo))
    .then(answers => {
      return generator.config.github.repository = answers;
    })
    .then(() => github.checkRepo(generator))
    .then(() => generator.prompt(prompts.create(generator.config.github)))
    .then(answers => {
      generator.config.confirm = answers.create;
    })
    .then(() => generator.prompt(prompts.init(generator.config.github)))
    .then(answers => {
      generator.config.init = answers;
    });

}