# Providers

**Updated By: Miles Breman**

**Updated On: 9/23/2024**

## Overview

By default, we include Keycloak, but you're free to adjust the `PROVIDER` entitled environment variables to leverage additional providers such as EAMS-A or others.

## EAMS-A

### Variables

When configuring EAMS-A as your authentication provider, ensure your environment variables are set up as follows:

```txt
NODE_TLS_REJECT_UNAUTHORIZED=0 # Temporary fix for self-signed certificates; add their cert to your trust chain
PROVIDER_NAME="EAMS-A"
PROVIDER_ID="eams-a"
PROVIDER_CLIENT_ID=<your-property-hostname>
PROVIDER_CLIENT_SECRET=<your-client-secret-or-""-if-not-set>
PROVIDER_ISSUER="https://federation.eams.army.mil/oidc/<your-property-hostname>"
PROVIDER_LOGOUT_URL="https://federation.eams.army.mil/pool/sso/oidc/logout"
```

**Security Consideration**
You should keep the authentication credentials for EAMS-A (or any provider) secret. Never commit these credentials to your source code. Instead, inject them into your application using environment variables. This ensures your credentials remain secure and are not exposed publicly.

### Setting Up EAMS-A

Additional information about integrating eams-a can be found at the [GCDS Portal](https://control.akamai.csd.disa.mil/). To get started with EAMS-A, follow these steps:

1. Request Access to GCDS: You can do this by visiting the GCDS Portal.

2. Configure Your Redirect URI: Ensure your redirect URI is properly set up in your application and in the GCDS portal.

3. Expose Claims: Use the provided claims from GCDS to authenticate users. At a minimum, your claims table in GCDS should include:

| IDP Attribute     | Claim Name |
| ----------------- | ---------- |
| givenname         | name       |
| mail (armyeemail) | email      |

This is because Primus requires `name` and `email` to be provided during the SSO exchange.
