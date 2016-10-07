

## 3.0.0 - 2016-10-07

**POSSIBLY BREAKING CHANGES**

Mainly bump to `ip-filter@2` which fixes some wrong behaving. Also you should notice
that signle `*` would not work in some cases, so you should `**`, because basically `ip-filter`
converts IPs to filepaths to be able to use `micromatch` as matching library behind the scenes.

So one way is to pass such `filter: ['*.*.*.*', '!111.??.244.*']`, another is
the `filter: ['**', '!111.??.244.*']` to match any IPs except `111.22.244.31` for example.

**MISC STUFF**

Boilerplate stuff. Update contributing guide, dotfiles, license year, npm scripts, release/publish flow and etc. Replace `assertit` with `mukla` which is drop-in replacement. Using `verb` for generating the README.md and API docs.

## 2.0.0 - 2015-05-27
- Release v2.0.0 / npm@v2.0.0
- add `related` section
- fix complexity of tests, close [#2](https://github.com/tunnckoCore/koa-ip-filter/issues/2), thanks @codeclimate
- remove `upcoming v2` notice, close [#1](https://github.com/tunnckoCore/koa-ip-filter/issues/1)
- update description/keywords
- refactor tests
- bump devDeps
- add test to ensure next middleware
- update docs/example, add notice
- update docs and features list
- notice for upcoming v2
- refactor - see [#1](https://github.com/tunnckoCore/koa-ip-filter/issues/1 "upcoming v2")

## 1.0.0 - 2015-05-23
- Release v1.0.0 / npm@v1.0.0
- update example
- add docs and comments
- update readme example, editorconfig
- add example.js from readme
- update readme
- add test `opts.forbidden` to be function
- change `accessForbidden` to `forbidden`
- add test for custom msg when 403
- update usage example

## 0.0.0 - 2015-05-22
- first commits