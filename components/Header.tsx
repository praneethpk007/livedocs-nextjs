import Image from "next/image";
import Link from "next/link";
import React from "react";

type HeaderProps = {
  children: React.ReactNode;
  className?: string;
};

const Header = ({ children }: HeaderProps) => {
  return (
    <div className="header">
      <Link href={`/`}>
        <Image
          src="/assets/icons/logo.svg"
          alt="LiveDocs"
          width={120}
          height={32}
          className="hidden md:block"
        />
        <Image
          src="/assets/icons/logo-icon.svg"
          alt="LiveDocs"
          width={32}
          height={32}
          className="mr-2 md:hidden"
        />
      </Link>
      {children}
    </div>
  );
};

export default Header;
