import type { Metadata } from "next";
import "./globals.scss";
import { Toaster, toast } from "sonner";

function App() {
  return (
    <div>
      <Toaster />
      <button onClick={() => toast("My first toast")}>Give me a toast</button>
    </div>
  );
}
export const metadata: Metadata = {
  title: "Sujeito Pizza - A melhor pizzaria",
  description: "A melhor pizzaria do Brasil",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              backgroundColor: "#f1f1f1",
              color: "#131313",
              borderColor: "rgba(255, 255, 255, 0.5)",
            },
          }}
        />
        {children}
      </body>
    </html>
  );
}
