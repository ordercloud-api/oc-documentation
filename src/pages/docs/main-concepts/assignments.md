---
path: "/assignments"
date: 2019-06-24T22:09:49.849Z
title: "Assignments"
---

## Overview

Now that we have an understanding of where the various ordercloud parties (usergroups, buyers, sellers) exist in relation to each other within the hierarchy we can begin to talk about assignments. You can think of assignments as the glue between parties and resources (ordercloud "things" such as products, categories, addresses etc ). When you are saving an assignment you are creating a relationship between the resource and the party which provides that party access to that resource.

There are basic principles around how assignments work that are critical to understanding our data model and more importantly how the data model can be applied to solve the most complex ordering scenarios efficiently:

- Assignments are inclusive
- Assignments can be made at different levels
- Assignments cascade down higher levels to the individual user
- Assignments are many to many

## Assignments are inclusive
When a user is created they exist in a vacuum. The user will not have access to any objects until an assignment is made to them directly, or indirectly through a higher level party assignment.

## Assignments can be made at different levels
Assignments can be made to the following levels (depending on the resource):
- seller organization
- buyer organization
- usergroups within a seller organization or buyer organization

## Assignments Cascade Down Higher Levels to the Individual User
When the API is looking for what a given user has access to, it is checking for assignments. If that user is a member of a usergroup, buyer organization or seller organization  that has an assignment to that object, then that user also has access to that object. Regardless of where an assignment is saved, all of these objects are presented to the user seamlessly and in a very flat structure.

## Assignments are Many to Many
Resources can be assigned to many different parties. Those parties can be assigned to many other resources. For example, one user can be assigned to multiple address while one address can be assigned to multiple users.
