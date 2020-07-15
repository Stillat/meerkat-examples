# Meerkat Examples

A place for examples on how to accomplish some cool things with Meerkat.

## Current Examples

### `custom-spam-guard`

An example Statamic 2 and Meerkat addon that demonstrates how to add a new Spam Detector to Meerkat's Spam Guard.

### `editing-comments-inline`

**Important: This example requires Meerkat v1.5.82 for the latest Statamic 2 version**

Demonstrates how to allow authenticated Statamic users to edit their comments from your site's theme. Users will only be able to edit their own comments with this example.

This example modifies the following theme files:

* `js/meerkat-edit-form.js` - Adds the custom logic to edit comments in-line.
* `layouts/default.html` - Adds a CSRF-TOKEN meta tag; includes the Meerkat edit-form JavaScript file, as well as the axios JavaScript library [https://github.com/axios/axios](https://github.com/axios/axios)
* `partials/article-footer.html` - Adds the basic Meerkat comment form, responses list, as well as custom logic to display an Edit Comment button to authenticated Statamic users.

