import { getAccountsFromEnvironmentVariables } from "./lib/getAccountsFromEnvironmentVariables.ts";
import { getAccountNamesFromEnvironmentVariables } from "./lib/getAccountNamesFromEnvironmentVariables.ts";
import InputLoop from "https://deno.land/x/input@2.0.2/index.ts";
// import SimpleTwitter from "https://deno.land/x/simple_twitter_deno@0.05/simple_twitter_deno.ts";
import { TwitterApi } from "https://deno.land/x/deno_twitter_api@v1.1.0/mod.ts";

const environmentVariables: Record<string, string> = Deno.env.toObject();

const accountNames = getAccountNamesFromEnvironmentVariables({
  environmentVariables,
});
const accounts = getAccountsFromEnvironmentVariables({
  environmentVariables,
  accountNames,
});

let selectedAccountNames;
do {
  const input = new InputLoop();

  selectedAccountNames = await input.choose(accountNames);
} while (!selectedAccountNames.includes(true));

const selectedAccountNameIndex: number = selectedAccountNames.findIndex((
  accountName,
): boolean => accountName);

const selectedAccountName = accountNames[selectedAccountNameIndex];
const account = accounts[selectedAccountName];

const twitter = new TwitterApi({
  consumerApiKey: account.consumerKey,
  consumerApiSecret: account.consumerSecret,
  accessToken: account.accessTokenKey,
  accessTokenSecret: account.accessTokenSecret,
});

try {
  const result = await twitter.post("statuses/update.json", {
    status: "Yay, geschafft – ein Tweet aus Deno 🦕",
  });

  console.log(result);
} catch (ex) {
  console.log(ex);
}
