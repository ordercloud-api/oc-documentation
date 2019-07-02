---
path: "/sample-markdown-format"
title: "Sample Markdown File Format"
section: "Contributing"
---

## Headings

Heading level 1 is handled by the `title` meta data above

`## Heading Level 2`

`### Heading Level 3`

`#### Heading Level 4`

`##### Heading Level 5`

## Paragraphs

To create paragraphs, use a blank line to separate one or more lines of text. You should not indent paragraphs with spaces or tabs.

Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.

## Line Breaks

To create a line break (`<br>`), end a line with two or more spaces, and then type return

## Emphasis

This is **bold** text

This is *italicized* text

This is ***bold italicized*** text

## Blockquotes

To create a blockquote, add a `>` in front of a paragraph.

> This text is a quote!

Blockquotes can contain multiple paragraphs. Add a > on the blank lines between the paragraphs.

> This text is a quote!
>
> With an extra line!

Blockquotes can be nested. Add a `>>` in front of the paragraph you want to nest.

> Dorothy followed her through many of the beautiful rooms in her castle.
>
>> The Witch bade her clean the pots and kettles and sweep the floor and keep the fire fed with wood.

## Tables

Below is a table with four columns and three rows

|column 1|column 2|column 3|column 4|
|---|---|---|---|
|row 1|row 1|row 1|row 1|
|row 2|row 2|row 2|row 2|
|row 3|row 3|row 3|row 3|

## Lists

### Ordered Lists

A standard ordered list

```plaintext
1. First item
2. Second item
3. Third item
4. Fourth item
```

1. First item
2. Second item
3. Third item
4. Fourth item

An ordered list with a sub set list

```
1. First item
2. Second item
    1. Indented
3. Third item
    1. Indented
    2. Indented
4. Fourth item
```

1. First item
2. Second item
    1. Indented
3. Third item
    1. Indented
    2. Indented
4. Fourth item

### Unordered Lists

```
- First item
- Second item
- Third item
    - Indented item
    - Indented item
- Fourth item
```

- First item
- Second item
- Third item
    - Indented item
    - Indented item
- Fourth item

```javascript{1,7,8}
// I should be highlighted
var name = 'Crhistian';
function sayHello(name) {
    console.log(`Hello ${name}`);
}
sayHello(name);
// me
// too
```

Source: [Basic Syntax](https://www.markdownguide.org/basic-syntax/)
