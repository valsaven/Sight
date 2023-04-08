# Sight

[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2Fvalsaven%2FSight.svg?type=shield)](https://app.fossa.com/projects/git%2Bgithub.com%2Fvalsaven%2FSight?ref=badge_shield)

A cross-platform image viewer. (Vite+Vue3+Electron+Typescript)

Features:

- Select image: Ctrl + Click
- Get image info: Hovering mouse over image

## Install packages

```bash
npm i
```

## Run

### dev mode

```bash
npm run app:dev
```

### preview mode

```bash
npm run app:preview
```

### build app

```bash
npm run app:build
```

### debug main process

1. Add a break point in the main process `src/electron/main/main.ts`.
2. Open the `Run and Debug (Ctrl+Shift+D)` tool, and select `Debug Main Process`.
   *Note: Before using the debug tool to debug the main process, you should run the preview script `npm run app:preview` first to build the Vue app.*

## License

GNU GPL v3 - see [LICENSE](LICENSE)

[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2Fvalsaven%2FSight.svg?type=large)](https://app.fossa.com/projects/git%2Bgithub.com%2Fvalsaven%2FSight?ref=badge_large)
