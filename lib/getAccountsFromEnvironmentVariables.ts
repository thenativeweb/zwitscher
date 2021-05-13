import { Credentials } from "./Credentials.ts";

const getAccountsFromEnvironmentVariables = function (
  { environmentVariables, accountNames }: {
    environmentVariables: Record<string, string>;
    accountNames: string[];
  },
): Record<string, Credentials> {
  const accounts: Record<string, Credentials> = {};

  for (const accountName of accountNames) {
    const transformedAccountName = accountName.slice(1).toUpperCase();

    accounts[accountName] = {
      consumerKey:
        environmentVariables[`TWITTER_${transformedAccountName}_CONSUMER_KEY`],
      consumerSecret: environmentVariables[
        `TWITTER_${transformedAccountName}_CONSUMER_SECRET`
      ],
      accessTokenKey: environmentVariables[
        `TWITTER_${transformedAccountName}_ACCESS_TOKEN_KEY`
      ],
      accessTokenSecret: environmentVariables[
        `TWITTER_${transformedAccountName}_ACCESS_TOKEN_SECRET`
      ],
    };
  }

  return accounts;
};

export { getAccountsFromEnvironmentVariables };
