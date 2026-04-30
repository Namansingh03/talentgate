import "./globals.css";
import EmployerNavbar from "@/components/employer/EmployerNavbar";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body className="min-h-full flex flex-col">
        <EmployerNavbar />
        <main>{children}</main>
      </body>
    </html>
  );
}
