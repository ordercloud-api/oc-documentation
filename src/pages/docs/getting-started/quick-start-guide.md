---
path: "/getting-started/quick-start-guide"
title: "Getting Started with OrderCloud"
section: "Getting Started"
priority: 1
hidden: false
---

## Getting Started with OrderCloud.io

OrderCloud.io is a RESTful API that enables you to create complex, custom B2B eCommerce solutions.

This guide is meant to get you started with OrderCloud.io as quickly as possible. In order to accomplish this, we’ve stripped away some of the detail, so keep an eye out for links to relevant guides that provide much more in-depth explanations.

## Creating an Account

The first thing you will need to do is [create an account](https://developer.ordercloud.io/register). Registration is free and gives you access to the entire OrderCloud.io platform.

After you submit your email address, you will be sent a verification code which will be required to complete the registration process.

## Your First Seller Organization

Now that you have an OrderCloud.io account you can navigate to your [dashboard](https://dashboard.ordercloud.io) and access your first <a ui-sref="platform-guides({sectionID:'getting-started',guideID:'introduction-to-ordercloud',detailID:'SupportsComplexCommerce'})">seller organization</a>. `TODO - fix link`

It is the highest level container that encompasses everything else in OrderCloud.io (applications, products, pricing, users, etc.). You can have multiple Seller Organizations; however, data is not shared between them.

Newly created Seller Organizations come with a "default access" application giving you immediate access to the API however you can also create your own. To do this first click on the seller applications pane on the left and then click the "New" button located in the upper right hand corner.

Using the API Console is the simplest way to start exploring OrderCloud.io; however, understanding the fundamentals of how to access and use the API on it's own is extremely important for any OrderCloud.io developer.

## Authentication

Before you are able to interact with the OrderCloud.io API you will need to get an `access_token` from the auth server. The following sections will include raw request and response examples to the OAuth API.

The first thing you need is the `ClientID`. This unique identifier represents a single application on OrderCloud.io. Feel free to use the ClientID from the "Seller App" API Client that was automatically created on your first Seller Organization.

![API Settings](../_images/api-settings.png)

The second thing you will need is a list of roles, or in OAuth terms, scope. For this example you are authenticating as the Initial Seller user, which has "FullAccess".

Being the owners of this Organization it's safe to say we can access and change any data related to it. Giving real users "FullAccess" is highly discouraged, a subset of roles helps protect your application from malicious attacks or oblivious users.

Using your ClientID, roles list, and Seller username/password (created with a new Seller Organization),request an access token following the example below:

Request

```
POST https://auth.ordercloud.io/oauth/token HTTP/1.1
client_id=7F119ECD-1890-415C-B321-C252658DE5F0&grant_type=password&username=exampleuser&password=
examplepass&scope=FullAccess
```

Response
```
HTTP/1.1 200 OK
content-type: application/json;

{
"access_token":"eyJ0eXAiOiJKV1QiLCJhbGciOiJ",
"token_type":"bearer",
"expires_in": 35999,
"refresh_token": "878ca890-af6a-48b6-98a2-1e1cf4a..."
}
```

## Subsequent Requests

Using the access_token from the OAuth response make your first `GET` request to the UserPerspecive → Me → <a ui-sref="api-reference({sectionID: 'MeAndMyStuff', resourceID:'Me', endpointID: 'Get'})">Get</a> endpoint. This will return the details for the currently authenticated user. (In this case, you will appear as the default user because we authenticated as a developer). Make sure you put your `access_token` in the Authentication header before making the request.

Request

```
GET https://api.ordercloud.io/v1/me HTTP/1.1
Authentication: Bearer put_access_token_here
Content-Type: application/json; charset=UTF-8
```

Response

```
HTTP/1.1 200 OK
content-type: application/json;

{
    "ID":"424DCA0B-3A82-4A43-9491-70643C042B19",
    "Username":"08AEBA55-1379-4A4B-9148-DE844B522631",
    "FirstName": null,
    "LastName": null,
    "Email": null,
    "Phone": null,
    "TermsAccepted": "2016-02-22T20:03:52.923_00:00"
    "Active": true,
    "xp": null,
    "SecurityProfileID": null
}
```

## Conclusion

![TODO:need-conclusion]
