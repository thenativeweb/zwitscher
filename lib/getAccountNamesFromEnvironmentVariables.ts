const getAccountNamesFromEnvironmentVariables = function (
  { environmentVariables }: {
    environmentVariables: Record<string, string>;
  },
): string[] {
  const accountNames: string[] = [];

  for (const environmentVariableName of Object.keys(environmentVariables)) {
    const matches = environmentVariableName.match(
      /^TWITTER_(.+)_(CONSUMER_KEY|CONSUMER_SECRET|ACCESS_TOKEN_KEY|ACCESS_TOKEN_SECRET)$/,
    );

    if (!matches) {
      continue;
    }

    const accountName = `@${matches[1].toLowerCase()}`;

    if (accountNames.includes(accountName)) {
      continue;
    }

    accountNames.push(accountName);
  }

  return accountNames.sort();
};

export { getAccountNamesFromEnvironmentVariables };
