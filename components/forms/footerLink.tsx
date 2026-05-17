import Link from "next/link";
import React from "react";

const FooterLink = ({ text, linkText, href }: FooterLinkProps) => {
  return (
    <div className="flex items-center gap-2 justify-center pt-4">
      <p className="text-sm text-gray-500">{text}</p>
      <Link
        href={href}
        className="text-sm text-yellow-500 hover:text-yellow-600"
      >
        {linkText}
      </Link>
    </div>
  );
};

export default FooterLink;
