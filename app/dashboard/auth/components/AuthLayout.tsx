import SectionHeader from "@/app/components/common/header/SectionHeader";
import Image from "next/image";
import { ReactNode } from "react";

interface AuthLayoutProps {
  eyebrow?: string;
  headline?: string;
  children: ReactNode;
}

/** Original clip-path curve, used as a mask so it scales with the panel. */
const HERO_MASK = `url("data:image/svg+xml,${encodeURIComponent(
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000" preserveAspectRatio="none"><path d="M 0,0 L 780,0 C 900,140 980,320 960,500 C 940,700 760,880 500,1000 L 0,1000 Z" fill="white"/></svg>',
)}")`;

const AuthLayout: React.FC<AuthLayoutProps> = ({
  eyebrow = "My Dashboard",
  headline = "Admin Login",
  children,
}) => {
  return (
    <div className="flex min-h-screen w-full items-stretch justify-center bg-[#F3F2EF]">
      <div className="flex min-h-screen w-full flex-col overflow-x-hidden bg-white shadow-sm md:flex-row">
        <div className="relative hidden min-h-full overflow-hidden lg:flex lg:w-[52%] lg:shrink-0 lg:self-stretch">
          <div
            className="absolute inset-0 bg-offYellow"
            style={{
              WebkitMaskImage: HERO_MASK,
              maskImage: HERO_MASK,
              WebkitMaskSize: "100% 100%",
              maskSize: "100% 100%",
              WebkitMaskRepeat: "no-repeat",
              maskRepeat: "no-repeat",
              WebkitMaskPosition: "center",
              maskPosition: "center",
            }}
          >
            <Image
              src="/loginImg.svg"
              alt="Login Background"
              fill
              className="object-cover"
              priority
            />
          </div>

          <div className="relative z-10 flex h-full flex-col items-center w-full justify-center ">
            <SectionHeader
              className="text-white! pt-1"
              title={headline}
              description={eyebrow}
              desClassName="text-white!"
              desSize="2xl"
              direction="col-reverse"
            />
          </div>
        </div>

        <div className="mx-auto flex min-h-full min-w-0 w-full max-w-132 flex-1 flex-col px-8 py-14 sm:px-16 md:px-8 lg:px-16">
          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
