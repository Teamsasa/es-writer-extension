## Getting Started

First, run the development server:

```bash
pnpm dev
# or
npm run dev
```

After running pnpm dev, open chrome://extensions/ in Chrome. Enable Developer mode by toggling the switch in the top right corner. Then, click "Load unpacked" and select the build/chrome-mv3-dev folder in your project directory. Your extension should now be loaded and running. For more details, refer to [Plasmo Framework Documentation](https://docs.plasmo.com/framework).

## Environment Variables

### .env

Authentication details can be found in the Clerk dashboard.

```
PLASMO_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_FRONTEND_API=
```

### .env.development

```
PLASMO_PUBLIC_API_ENDPOINT=http://localhost:8080
PLASMO_PUBLIC_IDP_HEADER=swagger
```

### .env.production

```
PLASMO_PUBLIC_API_ENDPOINT=
PLASMO_PUBLIC_IDP_HEADER=clerk
```

### .env.chrome

Set up the following environment variable for Chrome extension builds. Follow the guide at [Clerk Chrome Extension Setup](https://clerk.com/docs/quickstarts/chrome-extension#create-a-consistent-crx-id-for-your-extension) and generate key pairs using [Itero Plasmo Tool](https://itero.plasmo.com/tools/generate-keypairs).

```
CRX_PUBLIC_KEY=
```

## Linting and Formatting

To check and automatically format your code, run the following command:

```bash
pnpm check
# or
npm run check
```

This will run linting and formatting checks, applying necessary fixes automatically. Files that are ignored by git will not be checked or modified.

## Making production build

Run the following:

```bash
pnpm build
# or
npm run build
```

This should create a production bundle for your extension, ready to be zipped and published to the stores.

## Submit to the webstores

The easiest way to deploy your Plasmo extension is to use the built-in [bpp](https://bpp.browser.market) GitHub action. Prior to using this action however, make sure to build your extension and upload the first version to the store to establish the basic credentials. Then, simply follow [this setup instruction](https://docs.plasmo.com/framework/workflows/submit) and you should be on your way for automated submission!
