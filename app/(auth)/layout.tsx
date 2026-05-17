import Header from "@/components/Header";
import Link from "next/link";
import Image from "next/image";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="auth-layout">
      <Link href="/" className="absolute top-6 left-6 lg:top-8 lg:left-16">
        <Image
          src="/assets/icons/logo.svg"
          alt="logo"
          width={140}
          height={32}
          className="h-8 w-auto cursor-pointer"
        />
      </Link>

      <section className="auth-left-section">
        <div className="pb-6 lg:pb-8 flex-1">{children}</div>
      </section>
    </main>
  );
};

export default Layout;
