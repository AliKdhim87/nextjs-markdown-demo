import type { PropsWithChildren } from "react";
import "../styles/globals.css";
import Link from "next/link";

const RootLayout = ({ children }: PropsWithChildren) => (
  <html lang="en">
    <body>
      <header>
        <Link href="/">LOGO</Link>
      </header>
      <main className="container">{children}</main>
    </body>
  </html>
);

export default RootLayout;
