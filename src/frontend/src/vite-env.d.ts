/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_REACT_APP_AUTH0_DOMAIN: string
  readonly VITE_REACT_APP_AUTH0_CLIENT_ID: string
  readonly VITE_REACT_APP_AUTH0_CALLBACK_URL: string
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}