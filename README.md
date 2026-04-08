# Shiptivitas Frontend

This is a React frontend project for a shipping productivity dashboard.

## Install

1. Open a terminal in `c:\Users\Administrator\Downloads\shiptivitas-1-master`
2. Install dependencies:
   ```bash
   npm install
   ```

## Start development server

```bash
npm start
```

Then open `http://localhost:3000` in your browser.

## Build for production

```bash
npm run build
```

## Node compatibility fix

This project uses an older Create React App / Webpack version that may fail under newer Node versions.

If you see this error:

```text
Error: error:0308010C:digital envelope routines::unsupported
```

Then start/build with the OpenSSL legacy provider already configured by the project scripts.

If the scripts still fail, use a compatible Node version such as Node 16 or Node 18.

## Notes

- The app entry is `src/index.js`.
- The board data lives in `src/Board.js`.
- `dragula` is used for drag-and-drop behavior.
