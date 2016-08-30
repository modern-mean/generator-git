import { checkRemote } from '../shared/shell';

export function git(config) {
  let choices = Object.keys(config.repository).map(function(item) { return config.repository[item] });

  return [
    {
      name    : 'remote',
      message : 'Remote Name',
      default : config.remote || 'origin',
      validate: (input) => { return checkRemote(input).then(result => { return result; }); }
    },
    {
      when    : (answers) => { return choices.length === 0; },
      name    : 'url',
      message : 'Remote Url',
      default : config.url
    },
    {
      when    : (answers) => { return choices.length > 0; },
      type    : 'list',
      name    : 'url',
      choices : choices,
      message : 'Remote Url',
      default : config.url
    },
    {
      type    : 'confirm',
      name    : 'pull',
      message : 'Pull Repository?',
      default : 'Y'
    },
    {
      type    : 'confirm',
      name    : 'commit',
      message : 'Initial Commit?',
      default : 'Y'
    },
    {
      when    : (answers) => { return answers.commit },
      name    : 'message',
      message : 'Commit Message',
      default : 'Initial Commit',
    },
    {
      when    : (answers) => { return answers.commit },
      type    : 'confirm',
      name    : 'push',
      message : 'Push Repository?',
      default : 'Y'
    }
  ]
}