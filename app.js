'use strict';

const buntstift = require('buntstift'),
      { camelCase } = require('lodash'),
      inquirer = require('inquirer'),
      processenv = require('processenv'),
      Twitter = require('twitter');

(async () => {
  const accounts = {};

  const environmentVariables = processenv();

  for (const [ key, value ] of Object.entries(environmentVariables)) {
    const matches = key.match(/^TWITTER_(.+)_(CONSUMER_KEY|CONSUMER_SECRET|ACCESS_TOKEN_KEY|ACCESS_TOKEN_SECRET)$/);

    if (!matches) {
      continue;
    }

    const accountName = `@${matches[1].toLowerCase()}`;

    if (accountName.includes('_')) {
      continue;
    }

    const secretType = camelCase(matches[2]);

    accounts[accountName] = accounts[accountName] || {};
    accounts[accountName][secretType] = value;
  }

  const accountNames = Object.keys(accounts);

  const { selectedAccountName } = await inquirer.prompt([
    {
      type: 'list',
      name: 'selectedAccountName',
      message: 'Select Twitter account:',
      choices: accountNames
    }
  ]);

  const twitter = new Twitter({
    /* eslint-disable camelcase */
    consumer_key: accounts[selectedAccountName].consumerKey,
    consumer_secret: accounts[selectedAccountName].consumerSecret,
    access_token_key: accounts[selectedAccountName].accessTokenKey,
    access_token_secret: accounts[selectedAccountName].accessTokenSecret
    /* eslint-enable camelcase */
  });

  const { tweet } = await inquirer.prompt([
    {
      type: 'input',
      name: 'tweet',
      message: 'Tweet:'
    }
  ]);

  if (!tweet) {
    return buntstift.error('Aborting.');
  }

  const stop = buntstift.wait();

  await twitter.post('statuses/update', { status: tweet });

  stop();
})();
