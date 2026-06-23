export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-full flex flex-col">
      <div>
        This is nav bar for authentication
      </div>

      {children}
    </div>
  );
}