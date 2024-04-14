./src
|-- pages/
|-- api/
|-- v1/
|-- user-ip.ts # Gets users's IP address
|-- app/ # New directory for enhanced routing and components
|-- layout.tsx # Default layout component
|-- loading.tsx # Loading component for dynamic imports
|-- error.tsx # Error boundary component
|-- page.server.tsx # Entry for server-side rendering
|-- page.tsx # Entry for client-side interactions
|-- NavBar.tsx # Component, can be either server or client
|-- (CSR)/ # Explicit client-side components
|-- terminal/
|-- TerminalPage.client.tsx
|-- (SSR)/ # Server-side rendering specific components
|-- about/
|-- page.server.tsx
|-- context/ # Context providers
|-- IpContext.tsx
|-- components/ # Reusable components
|-- Terminal.tsx
|-- types/ # TypeScript types
|-- types.ts
|-- public/ # Static files like images and icons
|-- favicon.ico
|-- opengraph-image.png
|-- styles/ # Global styles
|-- globals.css
|-- @types/ # Shared TypeScript types if needed outside app
|-- models/ # Data models
