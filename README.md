# Firefox Addon Action

This is a GitHub Action that allows you to publish to Firefox addon store.

Currently it only supports updating an existing addon, not creating a new one.
It supports supplying source code.
It is used in [web scrobbler](https://github.com/yayuyokitano/web-scrobbler/blob/master/.github/workflows/deploy.yml), see that for example usage.

## Usage

```yaml
steps:
  - uses: yayuyokitano/firefox-addon@v0.0.3-alpha
    with:
      api_key: ${{ secrets.AMO_ISSUER }}
      api_secret: ${{ secrets.AMO_SECRET }}
      guid: '{799c0914-748b-41df-a25c-22d008f9e83f}'
      xpi_path: web-scrobbler-firefox.zip
      src_path: web-scrobbler-src.zip # Optional
```

## Credentials

Check the [API keys page](https://addons.mozilla.org/en-US/developers/addon/api/key/) to get your credentials for authentication.

## License

MIT
