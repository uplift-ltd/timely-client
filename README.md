# timely-client

> A node.js helper for Timely App API.

## Installation

    npm install --save timely-client

or

    yarn add timely-client

## Usage

```js
import TimelyClient from "timely-client";

const client = new TimelyClient({
  accessToken: "abc123",
  apiUrl: "https://api.timelyapp.com/1.1", // <- defaults to this
});

const { data: accounts } = await client.getAccounts();
```

For a full list of methods check out [the code](./src/client.ts).

All methods return a promise that resolve to a response-like object that looks like this:

```js
{
  status: 200,
  statusText: 'OK',
  ok: true,
  data: [{ ... }]
}
```

Note: The client does not help with the OAuth flow. It expects an access token only. PRs welcome.

## License

Copyright (c) 2018 Marius Craciunoiu. Licensed under the MIT license.
