# Contributing to OrderCloud Documentation Content

## Structure
Each folder within `root/content` has a unique purpose and configuration that needs to be applied in order to work properly.

Configuration of a page is called `frontmatter` and is implemented between two lines containing `---`. For example, frontmatter containing a `title` property might look like this:

```mdx
---
title: Example Page Title
---

Content
```

### Discover 
Location: `root/content/discover`

Discover content is managed and approved by @jhookom at Four51. It is a flat folder full of `.mdx` files that need the following `frontmatter`.

| Property | Type | Required | Description |
| ----------- | ----------- | ----------- | ---------- |
| title | `string` | `true` | The title of the page, it will appear as the first `H1` tag in the content of the page as well as the page `<title>` element (suffixed with ` \| Sitecore OrderCloud`) |
| description | `string` | `true` | A short description of the page, this will be used in `meta[name="description]` tag for SEO purposes |
| priority | `number` | `true` | The list order of the page, controls the order of the right hand menu when viewing discovery content |

### Documents
Location: `root/content/documents`

The documents folder controls **Knowledge base** content and is managed and approved by contributors at Four51. It is a flat folder full of `.mdx` files that need the following `frontmatter`.

| Property | Type | Required | Description |
| ----------- | ----------- | ----------- | ---------- |
| type | `enum` | `true` | Allows us to differentiate between articles and tutorials in the knowledge base, possible values: `article`, `tutorial`.
| title | `string` | `true` | The title of the page, it will appear as the first `H1` tag in the content of the page as well as the page `<title>` element (suffixed with ` \| Sitecore OrderCloud`) |
| description | `string` | `true` | A short description of the page, this will be used in `meta[name="description]` tag for SEO purposes |
| author | `string` | `true` | This is the author _identifier_, when set, Gatsby will query data in `root/src/data/author.json` to retrieve the author's name & title. Additionally, there should always be a `.jpg` image for each author entry where the name of the image is the `author.id`. |
| publishDate | `date` | `true` | The date the document is first published using the format `YYYY-MM-DD`. |
| updatedDate | `date` | `false` | If you are making changes to an existing document update this value using the format `YYYY-MM-DD`. |
| tags | `string[]` | `true` | An array of strings that you would like this document to be filtered on. This also controls related articles, which will pull up documents with the same tag so be sure you check if a tag already exists for the topic you are thinking of. If you are unsure about what tag to use, consult @rwatt.

### Learn 
Location: `root/content/learn`

Learn content is managed and approved by @rwatt at Four51. It is a two layered directory full of `.mdx` files that need the following `frontmatter`.

| Property | Type | Required | Description |
| ----------- | ----------- | ----------- | ---------- |
| section | `enum` | `true` | This should match whatever folder you are putting the current document in. See othe articles for the correct value in each folder |
| title | `string` | `true` | The title of the page, it will appear as the first `H1` tag in the content of the page as well as the page `<title>` element (suffixed with ` \| Sitecore OrderCloud`) |
| description | `string` | `true` | A short description of the page, this will be used in `meta[name="description]` tag for SEO purposes |
| priority | `number` | `true` | The list order of the page, controls the order of the right hand menu for the current section when viewing learn content |

### Releaes Notes
Locations:
- **Portal Release Notes** - `root/content/portal-release-notes`
- **Core API Release Notes** - `root/content/release-notes`

File names in these directories should follow a specific pattern: `vN.N.NNN.mdx`. 

> Core API release notes should be built/released _after_ the API release is complete (this is so that the API reference can be generated using the new Open API spec).

| Property | Type | Required | Description |
| ----------- | ----------- | ----------- | ---------- |
| apiVersion | `number` | `true` | The version of the API this release note is for - without the `v` prefix. |
| date | `date` | `true` | The release date of the version this release note is for. `YYYY-MM-DD`. |

## Writing Content

Follow the standard [markdown syntax](https://www.markdownguide.org/cheat-sheet/) while writing content. Raw HTML is supported, but not encouraged - sometimes it might be easier to write a `<table>` in HTML. It is also acceptable when using some of the custom components available in the gatsby project.

## Custom Components
> Custom components need to be written in one line to avoid breaking the `.mdx` parser in Gatsby.

### Content Link
This is a component meant for creating a stylized CTA to external or internal content within your content. It will appear on it's own line unless wrapped in other HTML content (not recommended).

Properties:
- `type` (optional) - controls which icon will appear
- `subtitle` - the smaller text on top of the components child content
- `to` - the internal uri or external url the CTA should link to
- `children` (inside the tag) - the larger text, generally the name of the destination

Example:
```md
<ContentLink type="bookmark" subtitle="API Reference" to="/api-reference/product-catalogs/products">OrderCloud Products</ContentLink>
```

![Content Link Example]([/static/images/readme/contentLink.JPG])

### Code Example
This component is useful in tutorials or guides that want to show a code example in multiple languages. Right now it supports `http`, `js`, `ts`, and `csharp`.

It is easiest to just show an example of a working `<CodeExample>` component without any content:

```md
<CodeExample
  title="Authenticating Subsequent API Requests"
  description="More in-depth description of the code example"
  content={{
      http: `content`,
      javascript: `content`,
      typescript: `content`,
      csharp: `content`
  }}
/>
```

`title` and `description` are _optional_. If you dont have an example for one of the 4 lanuguages, just keep it out of your `content` object.

Using the interpolated string syntax will allow you to add new lines to your examples.

> If you need an _empty line_ be sure to use **`\n`**. If there are any empty lines in your `.mdx` file between the beginning and end of the `<CodeExample/>` component the gatsby parser will break.
> 
> If you are ever unsure about how to implement this component, look at some of the articles within `root/content/learn` for examples.