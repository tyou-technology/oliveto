import Link from "next/link";
import Image from "next/image";
import { loginPageContent } from "@/lib/constants/login-page";
import { IMAGES } from "@/lib/constants/images";

export function LoginBranding() {
  return (
    <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden flex-col justify-between p-12">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute select-none">
          <Image
            src={IMAGES.SYMBOL_WHITE}
            alt="Logo"
            width={2000}
            height={2000}
          />
        </div>
      </div>

      {/* Decorative Lines */}
      <div className="absolute top-0 right-0 w-px h-full bg-gradient-to-b from-transparent via-primary/30 to-transparent" />
      <div className="absolute bottom-20 left-12 right-12 h-px bg-gradient-to-r from-primary/50 to-transparent" />

      {/* Logo */}
      <Link href="/public" className="relative z-10">
        <Image src={IMAGES.LOGO} alt="Logo" width={150} height={150} />
      </Link>

      {/* Content */}
      <div className="relative z-10 space-y-6">
        <h1 className="text-5xl font-bold text-white leading-tight">
          {loginPageContent.brandingTitle}
          <br />
          <span className="text-primary">
            {loginPageContent.brandingTitleHighlight}
          </span>
        </h1>
        <p className="text-gray-400 text-lg max-w-md">
          {loginPageContent.brandingDescription}
        </p>
      </div>

      {/* Footer Info */}
      <div className="relative z-10 flex items-center gap-8 text-sm text-gray-500">
        {loginPageContent.brandingFooter.map((item, index) => (
          <span key={item}>
            {index > 0 && (
              <span className="w-1 h-1 bg-primary rounded-full inline-block mx-4" />
            )}
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
