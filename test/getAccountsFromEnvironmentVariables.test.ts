import { assertEquals } from "https://deno.land/std@0.96.0/testing/asserts.ts";
import { getAccountsFromEnvironmentVariables } from "../lib/getAccountsFromEnvironmentVariables.ts";

Deno.test("returns an empty list if no accounts were configured.", (): void => {
  const accounts = getAccountsFromEnvironmentVariables({
    environmentVariables: {
      PORT: "3000",
    },
    accountNames: [],
  });

  assertEquals(accounts, {});
});

Deno.test("returns a list with a single account if one was configured.", (): void => {
  const accounts = getAccountsFromEnvironmentVariables({
    environmentVariables: {
      PORT: "3000",
      TWITTER_THENATIVEWEB_CONSUMER_KEY: "consumer-key",
      TWITTER_THENATIVEWEB_CONSUMER_SECRET: "consumer-secret",
      TWITTER_THENATIVEWEB_ACCESS_TOKEN_KEY: "access-token-key",
      TWITTER_THENATIVEWEB_ACCESS_TOKEN_SECRET: "access-token-secret",
    },
    accountNames: ["@thenativeweb"],
  });

  assertEquals(accounts, {
    "@thenativeweb": {
      consumerKey: "consumer-key",
      consumerSecret: "consumer-secret",
      accessTokenKey: "access-token-key",
      accessTokenSecret: "access-token-secret",
    },
  });
});

Deno.test("returns a list with multiple accounts if more than one was configured.", (): void => {
  const accounts = getAccountsFromEnvironmentVariables({
    environmentVariables: {
      PORT: "3000",
      TWITTER_GOLORODEN_CONSUMER_KEY: "consumer-key",
      TWITTER_GOLORODEN_CONSUMER_SECRET: "consumer-secret",
      TWITTER_GOLORODEN_ACCESS_TOKEN_KEY: "access-token-key",
      TWITTER_GOLORODEN_ACCESS_TOKEN_SECRET: "access-token-secret",
      TWITTER_THENATIVEWEB_CONSUMER_KEY: "consumer-key",
      TWITTER_THENATIVEWEB_CONSUMER_SECRET: "consumer-secret",
      TWITTER_THENATIVEWEB_ACCESS_TOKEN_KEY: "access-token-key",
      TWITTER_THENATIVEWEB_ACCESS_TOKEN_SECRET: "access-token-secret",
    },
    accountNames: ["@goloroden", "@thenativeweb"],
  });

  assertEquals(accounts, {
    "@goloroden": {
      consumerKey: "consumer-key",
      consumerSecret: "consumer-secret",
      accessTokenKey: "access-token-key",
      accessTokenSecret: "access-token-secret",
    },
    "@thenativeweb": {
      consumerKey: "consumer-key",
      consumerSecret: "consumer-secret",
      accessTokenKey: "access-token-key",
      accessTokenSecret: "access-token-secret",
    },
  });
});
