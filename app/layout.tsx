import "./globals.css";

export const metadata = {
  title: "FTN Observability",
  description: "FTN unified service and infrastructure monitoring dashboard",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
