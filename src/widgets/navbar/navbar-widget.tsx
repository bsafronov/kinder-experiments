import { Logo } from "./logo";
import { UserButton } from "@clerk/nextjs";

export function NavbarWidget() {
  return (
    <div className="w-full bg-slate-50 border-b">
      <div className="max-w-5xl mx-auto px-4 py-4 border-x">
        <div className="flex justify-between items-center">
          <Logo />
          <UserButton afterSignOutUrl="/" />
        </div>
      </div>
    </div>
  );
}
