# zwitscher

zwitscher is a Twitter CLI.

## Installation

As zwitscher is run using `npx`, there is nothing to install.

## Quick start

First, you need to [setup a Twitter application](https://apps.twitter.com/) for each account you want to use. Then add the following code to your `~/.profile` file:

```shell
export TWITTER_<account>_CONSUMER_KEY="<consumer_key>"
export TWITTER_<account>_CONSUMER_SECRET="<consumer_secret>"
export TWITTER_<account>_ACCESS_TOKEN_KEY="<access_token_key>"
export TWITTER_<account>_ACCESS_TOKEN_SECRET="<access_token_secret>"
```

*Please note that currently, zwitscher does not support Twitter accounts with an `_` in their name.*

Then, to tweet, run the following command:

```shell
$ npx zwitscher
```

## Running the build

To build this module use [roboter](https://www.npmjs.com/package/roboter).

```shell
$ npx roboter
```

## License

The MIT License (MIT)
Copyright (c) 2018 the native web.

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
