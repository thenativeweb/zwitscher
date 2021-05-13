import { assertEquals } from "https://deno.land/std@0.96.0/testing/asserts.ts";
import { getAccountNamesFromEnvironmentVariables } from "../lib/getAccountNamesFromEnvironmentVariables.ts";

Deno.test("returns an empty list if no accounts were configured.", (): void => {
  const accountNames = getAccountNamesFromEnvironmentVariables({
    environmentVariables: {
      PORT: "3000",
    },
  });

  assertEquals(accountNames, []);
});

Deno.test("returns a list with a single account name if one was configured.", (): void => {
  const accountNames = getAccountNamesFromEnvironmentVariables({
    environmentVariables: {
      PORT: "3000",
      TWITTER_THENATIVEWEB_CONSUMER_KEY: "consumer-key",
      TWITTER_THENATIVEWEB_CONSUMER_SECRET: "consumer-secret",
      TWITTER_THENATIVEWEB_ACCESS_TOKEN_KEY: "access-token-key",
      TWITTER_THENATIVEWEB_ACCESS_TOKEN_SECRET: "access-token-secret",
    },
  });

  assertEquals(accountNames, ["@thenativeweb"]);
});

Deno.test("returns a list with multiple account names if more than one was configured.", (): void => {
  const accountNames = getAccountNamesFromEnvironmentVariables({
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
  });

  assertEquals(accountNames, ["@goloroden", "@thenativeweb"]);
});

Deno.test("supports accounts with underscores in their names.", (): void => {
  const accountNames = getAccountNamesFromEnvironmentVariables({
    environmentVariables: {
      PORT: "3000",
      TWITTER_THE_NATIVE_WEB_CONSUMER_KEY: "consumer-key",
      TWITTER_THE_NATIVE_WEB_CONSUMER_SECRET: "consumer-secret",
      TWITTER_THE_NATIVE_WEB_ACCESS_TOKEN_KEY: "access-token-key",
      TWITTER_THE_NATIVE_WEB_ACCESS_TOKEN_SECRET: "access-token-secret",
    },
  });

  assertEquals(accountNames, ["@the_native_web"]);
});

Deno.test("sorts the list of account names alphabetically.", (): void => {
  const accountNames = getAccountNamesFromEnvironmentVariables({
    environmentVariables: {
      PORT: "3000",
      TWITTER_THENATIVEWEB_CONSUMER_KEY: "consumer-key",
      TWITTER_THENATIVEWEB_CONSUMER_SECRET: "consumer-secret",
      TWITTER_THENATIVEWEB_ACCESS_TOKEN_KEY: "access-token-key",
      TWITTER_THENATIVEWEB_ACCESS_TOKEN_SECRET: "access-token-secret",
      TWITTER_GOLORODEN_CONSUMER_KEY: "consumer-key",
      TWITTER_GOLORODEN_CONSUMER_SECRET: "consumer-secret",
      TWITTER_GOLORODEN_ACCESS_TOKEN_KEY: "access-token-key",
      TWITTER_GOLORODEN_ACCESS_TOKEN_SECRET: "access-token-secret",
    },
  });

  assertEquals(accountNames, ["@goloroden", "@thenativeweb"]);
});
