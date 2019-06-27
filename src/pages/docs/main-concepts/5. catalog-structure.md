---
path: "/main-concepts/catalog-structure"
date: 2017-07-12T17:12:33.962Z
title: "Catalog Structure"
---

To understand a catalog, we will begin by understanding the individual pieces.

## Categories

Categories are useful to present, sort, and further segment products in an organized way. Categories can have parent categories which enables the creation of a hierarchical structure of arbitrary depth.
![TODO:add-graphic-of-category-hierarchy]

## Catalogs

When a category is created it must be defined as part of a catalog. There is a direct parent/child relationship between any category and exactly one catalog.
![TODO:add-graphic-of-category-hierarchy-within-catalog]

## Product Assignments

Products don't really live inside categories or catalogs in the same way that categories live inside a catalog. They exist independent of both those entities but can be assigned to either, which allows the API to present the product as part of them (at least to the user).

![TODO:add-graphic-of-category-hierarchy-within-catalog-with-product-assignments-products-existing-outside]
Putting it all together we can say a catalog is a container for category hierarchies and all product assignments to either the catalog directly or the categories within it. 

Next, we'll discuss see the different ways that we can make visible all or part of the catalog.
