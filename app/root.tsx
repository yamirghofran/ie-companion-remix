import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  LiveReload
} from "@remix-run/react";
import { LinksFunction } from "@remix-run/node";
import styles from "./tailwind.css?url";
import sonnerStyles from './sonner.css?url';
import Header from "~/components/Header";
import { ReviewModalProvider } from "~/context/ReviewModalContext";
import { Toaster } from "sonner";

export const links: LinksFunction = () => [
  { rel: 'stylesheet', href: styles },
  { rel: 'stylesheet', href: sonnerStyles },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
    <ReviewModalProvider>
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <Toaster />
        <div id='nav'>
            <Header />
        </div>
          {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
    </ReviewModalProvider>
    </>
  );
}

export default function App() {
  return (
    <>
    <Outlet />
    </>
  ) ;
}
