This is a [Plasmo extension](https://docs.plasmo.com/) project bootstrapped with [`plasmo init`](https://www.npmjs.com/package/plasmo).

## Getting Started

First, run the development server:

```bash
pnpm dev
# or
npm run dev
```

Open your browser and load the appropriate development build. For example, if you are developing for the chrome browser, using manifest v3, use: `build/chrome-mv3-dev`.

You can start editing the popup by modifying `popup.tsx`. It should auto-update as you make changes. To add an options page, simply add a `options.tsx` file to the root of the project, with a react component default exported. Likewise to add a content page, add a `content.ts` file to the root of the project, importing some module and do some logic, then reload the extension on your browser.

For further guidance, [visit our Documentation](https://docs.plasmo.com/)

## Environment Variables

### .env.development

Set up the following environment variables for development. Authentication details can be found in the Clerk dashboard.

```
PLASMO_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_FRONTEND_API=
PLASMO_PUBLIC_API_ENDPOINT=
PLASMO_PUBLIC_IDP_HEADER=
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
