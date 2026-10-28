# ECO-TOO auth.md

## Audience and public access

This document is for AI agents reading public information about ECO-TOO at
https://eco-too.opole.pl. Public pages and discovery documents can be read using
GET or HEAD without an account, API key, bearer token, or registration.
Page requests may use `Accept: text/markdown` for a Markdown representation.
Access does not grant permission for every use of the content; respect the
[robots.txt content signals](https://eco-too.opole.pl/robots.txt).

## Agent registration and provisioning

Agent registration is not supported. There are no registration or provisioning
endpoints, no supported registration methods, and no credentials are issued.
Unauthenticated public reading is not an anonymous registration flow.
Do not attempt POST requests to guessed registration endpoints such as
`/agent/auth`.

## Authentication and credential use

This service does not operate an OAuth authorization server or a protected
resource requiring OAuth. OAuth discovery metadata and agent credential flows
(ID-JAG, verified email, and anonymous credential issuance) are not available.
Do not send Authorization headers, API keys, passwords, or other credentials
when reading public content.

## Contact API

The only API is `POST /api/contact`, used by the
[website contact form](https://eco-too.opole.pl/kontakt#formularz).
It sends an enquiry; it does not register agents, provision accounts, or issue
credentials. Submission requires the user's consent and a valid Google
reCAPTCHA v3 token for the `contact` action with a score of at least 0.5.
The reCAPTCHA token is an anti-spam check, not an API access credential.
Agents must not bypass reCAPTCHA or submit unsolicited messages.
Do not submit forms during passive discovery scans.

## API discovery

- [API catalog](https://eco-too.opole.pl/.well-known/api-catalog)
- [OpenAPI specification](https://eco-too.opole.pl/openapi.json)
- [API documentation](https://eco-too.opole.pl/dokumentacja-api)
- [Privacy policy](https://eco-too.opole.pl/polityka-prywatnosci)
