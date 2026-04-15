export const metadata = {
  title: "Yoshi Yamamoto — Portfolio",
  description: "PMP Certified Project Manager — Operations & Technology Portfolio",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0 }}>{children}</body>
    </html>
  );
}
