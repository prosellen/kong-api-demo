# Kong API Demo

## Kong Configuration

Kong provides a [JWT plugin](https://docs.konghq.com/hub/kong-inc/jwt/) to handle the verification of JWTs. Once configured, only access tokens signed by the authentication server are allowed to access a certain route.

The plugin needs to pieces of information that are not obvious to configure: a `rsa_public_key` (aka the "signing certificate") and a `key` (aka the identifier of the "signing certificate"). Both information are provided by the authentication platform in their [JSON Web Key Set](https://www.rfc-editor.org/rfc/rfc7517#section-5). The location of the JWKS depends on the provider and is often published in the `.well-known/openid-configuration` endpoint. In our example (auth0), the location is `https://<TENANT_NAME>.<REGION_ID>.auth0.com/.well-known/jwks.json`.

### Configuration for auth0

auth0 provides access to both the `key` and the `rsa_public_key` in their dashboard under ["Settings" > "Signing Keys"](https://manage.auth0.com/dashboard/eu/kong-api-demo/tenant/signing_keys). Under "List of Valid Keys", find the "Currently used" key. The "Key ID" is the value we are going to use as `key`. Click on the three dots on the right and "Download Signing Certificate".

### Convert the signing certificate

The signing certificate is most likely a "x509 certificate" from which we need to extract the public key, first.

> _Hint_: the following example works on Linux and macOS - Windows users might need to install `openssl` separately.

```bash
# Extract the public keys to a new file
openssl x509 -pubkey -noout -in <SIGNING_CERTIFICATE>.pem > pubkey.pem
```

Then, copy the public key to the Kong configuration.

> **Important**: Make sure the key itself is in one line without any newlines and the indentation is correct. Otherwise, Kong will throw an error.

```yaml
# .docker/kong/declarative/api_gateway.yml
---
jwt_secrets:
  - consumer: auth0
    secret: this-is-a-dummy-value
    algorithm: RS256
    key: dqVeGigzuTz-IF0V63ZmB
    rsa_public_key: |
      -----BEGIN PUBLIC KEY-----
      MIIBIj...AQAB
      -----END PUBLIC KEY-----
```

## Troubleshooting

### How to get the `key` and `rsa_public_key` for other plattforms

1. Find the "Open ID Configuration" for the provider.  
   For example, Azure publishes these at https://login.microsoftonline.com/common/v2.0/.well-known/openid-configuration.

1. Find the "jwks_uri" in the "Open ID Configuration".  
   In the example above, that is https://login.microsoftonline.com/common/discovery/v2.0/keys.

1. The response will most likely contain more than one key. Look for the "Key ID" or "KID" of your application. Find the corresponding entry under "x5c". This string is your "signing certificate".

1. Either copy the certificate to a file and use `openssl` as described above or copy it to a pem-to-jwk convert (e.g., https://irrte.ch/jwt-js-decode/pem2jwk.html) to extract the public key

1. Use the result as described above
