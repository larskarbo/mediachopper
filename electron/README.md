# MediaChopper

This is version `1.2.7`

dev:

```
yarn
yarn start
```

build for prod:

```
yarn package
```

build for prod + release

```
yarn publish:electron
```

## Windows 10 specific

- Execution of `yarn` or `yarn start` should be done in a command line with
  administration permission otherwise it will result in an error like the
  following one:

`Error: EPERM: operation not permitted, symlink`
