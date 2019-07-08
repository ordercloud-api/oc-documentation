---
path: "/main-concepts/security-profiles"
title: "Security Profiles"
section: "Main Concepts"
priority: 2
hidden: false
---

## Overview

Security profiles are a seller level resource made up of a group of roles (permissions) that grant a user access to specific endpoints in the ordercloud API when assigned. If a request is made by a user without sufficient roles, they will receive a 403 Forbidden response.

## Roles

Most Ordercloud roles fall into one of two categories: Admin and Reader. An **Admin** role allows read and write access to a resource while a **Reader** role allows only read access.

For example, a user that is assigned a security profile that has the role `PromotionReader` will be able to Get or List Promotions but will not be able to call write endpoints such as Save, Patch, Delete or make any kind of assignments. In order to do that they would need to be assigned `PromotionAdmin` which has the same read abilities **plus** write abilities.

All of our resources are protected at minimum by Admin and Reader roles. By defining access at this granular level we enable you to build an application that adheres to the principle of least privelege, giving your users access to only the endpoints they absolutely need access to.

## Conclusion

We've purposely kept the information here at a high level but if you want to dive a little deeper into security profiles and their roles, check out our [feature guide](TODO:link-tosecurityprofiles-feature). Otherwise, let's keep on moving and dive into authentication
