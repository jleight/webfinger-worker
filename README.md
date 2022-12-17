# webfinger-worker

Cloudflare Worker for generating Mastodon-compatible webfinger responses.

## Usage

Here's a quick guide on how to get this working on your own domains:

1. Clone this repository.
2. Modify `aliases` in `src/index.ts` to point to meet your needs.
3. Run `npm deploy` to deploy your worker.
4. Open the Cloudflare dashboard and set up an alias for your worker to match on `your-domain.tld/.well-known/webfinger*`.
5. Make sure the worker is working properly by visiting `https://your-domain.tld/.well-known/webfinger?resource=acct:me@your-domain.tld`.

You can now be found on Mastodon by searching for the account aliases you've defined!
