---
path: "/main-concepts/authentication"
title: Authentication
section: "Main Concepts"
priority: 2
hidden: false
---

## OrderCloud Workflows

OrderCloud's authentication system is built on top of an open authorization standard called [OAuth2](https://oauth.net/2/) which is increasingly becoming an industry standard for security and permission-based application experiences. OAuth2 provides five different workflows (ways of getting an access token). Additionally, OrderCloud provides support for OpenID Connect which is an authorization standard built on top of OAuth2 that enables secure single sign on experiences. This, combined with OAuth2's workflows provides a total of six different ways you can get an access token in OrderCloud.

## Understanding Access Tokens

Access tokens are what gives you *access* to parts of the API and must be appended to every request. Encrypted in the token are the identity of the user as well as the roles that the user has access to. Once validated, the ordercloud API has enough information from this token to determine which endpoints and data a user can read and/or write.

## API Client

Every authentication request is done through an [API Client](TODO:add-link-to-api-client). If your organization is a house think of an API Client as one of the doors to your house where each door can be configured to allow up to three different types of users from entering: buyers, sellers, and suppliers.

You'll probably have an API Client for your buyer application that only lets buyer users sign in, another one for your seller application that only lets seller users in and possibly one for your integration user which only allows that seller user in.

In general, an API Client is another way defining access to your organization.

## 1. Password Workflow

This is the most common workflow you'll see. A user is providing their username/password and is logging in to an application.

| Parameter  | Definition                    |
|------------|-------------------------------|
| client_id  | the api client's id           |
| username   | the user's username           |
| password   | the user's password           |
| grant_type | value must be `password`      |

```http
POST https://auth.ordercloud.io/oauth/token HTTP/1.1
Content-Type: text/html; charset=UTF-8

client_id=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx&username=xxxxxxxx&password=xxxxxxxx&grant_type=password
```

## 2. Client Credentials Workflow

This workflow is best suited for where you need a way for your integration to get a token. Instead of a username and password you're essentially authenticating directly through that client using a ClientID and a ClientSecret.

To use this workflow you'll need to set the ClientSecret on the API Client in the [Console](TODO:link-to-console)

| Parameter     | Definition                                    |
|---------------|-----------------------------------------------|
| client_id     | the api client's id                           |
| client_secret | the api client secret defined in the console  |
| grant_type    | value must be `client_credentials`            |

```http
POST https://auth.ordercloud.io/oauth/token HTTP/1.1
Content-Type: text/html; charset=UTF-8

client_id=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx&client_secret=xxxxxxxxxxxxx&grant_type=client_credentials
```

## 3. Anonymous Shopping or Guest Checkout Workflow

You might want to enable visitors to browse a catalog of products and/or checkout without registering themselves. We call this [Anonymous Shopping](TODO:add-link-to-anon-shopping-guide) or Guest Checkout.

Before you can make a request to get a token via this workflow you must ensure that your API client has a template user defined by setting the user in the [Console](TODO:-add-link-to-console). Without a template user the API has no context for determining data the anonymous user has access to, like product and pricing information.

| Parameter  | Definition                         |
|------------|------------------------------------|
| client_id  | the api client's id                |
| grant_type | value must be `client_credentials` |

```http
POST https://auth.ordercloud.io/oauth/token HTTP/1.1
Content-Type: text/html; charset=UTF-8

client_id=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx&grant_type=client_credentials
```

## 4. Refresh Workflow

Access tokens will expire after some pre-determined time (set on the API Client in the console) after which you will need to get another access token in order to continue interacting with the API. Without a refresh token a user might have to re-enter their username and password to get a new token however if you have enabled refresh tokens you will receive a refresh token on your initial authentication request which you can save and then use to get another access token when your initial access token expires.

>Refresh tokens are disabled by default. To enable refresh tokens you'll need to set the expiration time on refresh tokens to be greater than zero. This expiration time is defined on the API client and can be set in the console.

| Parameter     | Definition                                                    |
|---------------|---------------------------------------------------------------|
| client_id     | the ID of the api client                                      |
| refresh_token | the refresh_token property from initial access token response |
| grant_type    | value must be `refresh_token`                                 |

```http
POST https://auth.ordercloud.io/oauth/token HTTP/1.1
Content-Type: text/html; charset=UTF-8

client_id=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx&refresh_token=xxxxxxxx-xxxxxxxx-xxxx-xxxxxxx&grant_type=refresh_token
```

## 5. Elevated Password Workflow

This final workflow is the same as the Password Grant Type except that it has an additional requirement of Client Secret. This type of workflow can be used to add an additional layer of security.

To use this workflow you'll need to set the ClientSecret on the API Client in the [Console](TODO:-link-to-console)

| Parameter     | Definition                                   |
|---------------|----------------------------------------------|
| client_id     | the api client's id                          |
| username      | the user's username                          |
| password      | the user's password                          |
| client_secret | the api client secret defined in the console |
| grant_type    | value must be `client_credentials`           |

```http
POST https://auth.ordercloud.io/oauth/token HTTP/1.1
Content-Type: text/html; charset=UTF-8

client_id=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx&username=xxxxxxxx&password=xxxxxxxx&client_secret=xxxxxxxxxxxxx&grant_type=client_credentials
```

## 6 Single Sign On Workflow

OrderCloud enables single sign on via OpenID Connect which is yet another standard built on top of OAuth2. 

At a high level OrderCloud allows your users to log into the OrderCloud API by logging into any identity provider you trust such as Facebook, Google, or even an ERP system you own. It prevents your users the hassle of having to manage one more set of credentials.

A detailed guide for using OpenID Connect with OrderCloud can be found [here](TODO:-link-to-OpenID-connect-guide)

### Overview

As you can see there are many different ways that you can obtain an access token, all designed to cater to your specific use case. In the next section we'll be talking about how product visibility works at a high level.
