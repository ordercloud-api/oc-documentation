---
path: "/http-methods"
date: 2017-07-12T17:12:33.962Z
title: "Http Methods"
---
<!--- Might move as part of "Conventions", keeping here for now  --->

## Overview

A resource is a set of endpoints used to interact with an object of that same name. OrderCloud.io adheres to RESTful conventions in its usage of HTTP verbs. You can expect a subset of the following methods to exist on every Resource.

## HTTP Methods

|OrderCloud.io Verb|HTTP Verb|Meaning|Example|
|---|---|---|---|
|GET|GET|Returns a specific item|Get a single address|
|SAVE|PUT|Create or replace an item, you provide a unique ID|Create address ABC, overwriting it if it already exists|
|UPDATE|PATCH|Use it for updating items|Update the name on an address by providing the new name|
|LIST|GET|Returns a list of items|Get a list of addresses|
|CREATE|POST|Creates a new item, we generate a unique ID if no ID is provided|Create a new address|
|DELETE|DELETE|Deletes an item|Delete address ABC from the database|
