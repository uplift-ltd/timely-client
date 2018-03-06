# timely-client

> A node.js helper for Timely App API.

## Installation

    npm install --save timely-client

or

    yarn add timely-client

## Usage

```js
import TimelyClient from 'timely-client'

const client = new TimelyClient({
  accessToken: 'abc123',
  apiUrl: 'https://api.timelyapp.com/1.1', // <- defaults to this
})

client
  .getAccounts()
  .then(({ data }) => {
    console.log(data) // [{ "id":1, "name":"Timely", ... }]
  })
  .catch(err => {
    if (err.data) {
      // Received response with error status code (not between 200-400)
      console.log(err.status)
    } else {
      // Something threw (possibly your code in .then())
      console.log(err.message)
    }
  })
```

For a full list of methods check out [the code](./src/index.js).

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

## Accounts

Account instances have the same methods as the client, except they are scoped to the account (you don't have to provide the account ID).

```js
import first from 'lodash/first'

client
  .getAccounts()
  .then(({ data }) => {
    const account = first(data)
    return account.getProjects()
  })
  .then(({ data }) => {
    console.log(data) // projects
  })
  .catch(err => {
    // ...
  })
```

vs

```js
import first from 'lodash/first'

client
  .getAccounts()
  .then(({ data }) => {
    const account = first(data)
    return client.getProjects(account.id)
  })
  .then(({ data }) => {
    console.log(data) // projects
  })
  .catch(err => {
    // ...
  })
```

## License

Copyright (c) 2018 Marius Craciunoiu. Licensed under the MIT license.
