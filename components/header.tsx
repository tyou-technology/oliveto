"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { NAV_LINKS } from "@/config/navigation";

interface HeaderProps {
  bg?: string;
}

export function Header({ bg = "bg-black" }: HeaderProps) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const closeSheet = () => setIsOpen(false);

  return (
    <header
      className={`flex items-center justify-between px-4 py-4 sm:px-8 sm:py-6 lg:px-16 ${bg}`}
    >
      <Link href="/" className="text-xl font-bold tracking-wider">
        <Image src="/logo.png" alt="Logo" width={150} height={150} />
      </Link>

      <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
        {NAV_LINKS.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`text-sm transition-colors ${
              pathname === item.href
                ? "text-primary"
                : "text-white hover:text-primary"
            }`}
          >
            {item.label}
          </Link>
        ))}
      </nav>

      <Link href="/login" className="flex w-fit h-fit">
        <Button
          variant="outline"
          className="hidden lg:inline-flex border-white text-white bg-transparent hover:bg-primary hover:border-primary hover:text-black text-sm px-8 cursor-pointer"
        >
          Login
        </Button>
      </Link>

      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden text-white hover:bg-muted"
            aria-label="Abrir menu"
          >
            <Menu className="h-6 w-6" />
          </Button>
        </SheetTrigger>
        <SheetContent
          side="right"
          className="w-full sm:w-[350px] text-white bg-black border-secondary p-0"
        >
          <SheetHeader className="p-6 border-b border-secondary">
            <SheetTitle className="text-left text-lg font-bold tracking-wider">
              <Link href="/" className="text-xl font-bold tracking-wider">
                <Image src="/logo.png" alt="Logo" width={100} height={100} />
              </Link>
            </SheetTitle>
          </SheetHeader>

          <nav className="flex flex-col p-6">
            {NAV_LINKS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={closeSheet}
                className={`py-4 text-lg font-medium border-b border-secondary transition-colors ${
                  pathname === item.href
                    ? "text-primary"
                    : "text-white hover:text-white"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="p-6 mt-auto">
            <Button
              asChild
              className="w-full bg-primary text-primary-white hover:bg-primary/90"
            >
              <Link href="/login" onClick={closeSheet}>
                Login
              </Link>
            </Button>

            <div className="mt-8 pt-6 border-t border-secondary">
              <p className="text-xs text-white mb-2">Fale conosco</p>
              <a
                href="tel:+5543991231726"
                className="text-sm text-primary hover:underline"
              >
                +55 (43) 99123.1726
              </a>
            </div>

            <div className="mt-6">
              <p className="text-xs text-white mb-2">Siga</p>
              <div className="flex gap-4">
                <Link
                  href="https://www.instagram.com/olivetocont"
                  target="_blank"
                  className="text-sm text-white hover:text-white"
                >
                  Instagram
                </Link>
                <Link
                  href="https://www.linkedin.com/company/olivetocont/"
                  target="_blank"
                  className="text-sm text-white hover:text-white"
                >
                  Linkedin
                </Link>
                <Link
                  href="https://www.tiktok.com/@olivetocont"
                  target="_blank"
                  className="text-sm text-white hover:text-white"
                >
                  Tiktok
                </Link>
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </header>
  );
}
