import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  LiveReload
} from "@remix-run/react";
import { LinksFunction } from "@remix-run/node";
import "./tailwind.css";
import Header from "~/components/Header";
import { ReviewModalProvider } from "~/context/ReviewModalContext";


export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <ReviewModalProvider>
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <div id='nav'>
            <Header />
        </div>
          {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
    </ReviewModalProvider>
  );
}

export default function App() {
  return (
    <Outlet />
  ) ;
}
