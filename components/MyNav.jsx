"use client";
import {
  Navbar,
  NavBody,
  NavItems,
  MobileNav,
  NavbarLogo,
  NavbarButton,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
} from "@/components/ui/resizable-navbar";
import { HeartIcon, UserIcon, LogOutIcon, LogInIcon, VideoIcon } from "lucide-react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { isAuthenticated, getSession, clearSession } from "@/lib/auth";


export default function MyNav() {
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (isAuthenticated()) {
      setUser(getSession());
    }
  }, []);

  const handleLogout = () => {
    clearSession();
    setUser(null);
    router.push('/');
  };

  const navItems = [
    {
      name: "Home",
      link: "/",
    },
    {
      name: "About",
      link: "/about",
    },
    {
      name: "Visit",
      link: "/howtoreachus",
    },
    {
      name: "Events",
      link: "/events",
    },
    {
      name: "Gallery",
      link: "/media"
    },
    {
      name: "Aarti & Pooja",
      link: "/aarti-pooja"
    },
    {
      name:"Shop",
      link:"/shop"
    },
    {
      name: "Contact",
      link: "/contact",
    }
  ];

  return (
    <div className="relative w-full bg-white shadow-sm">
      <Navbar>
        {/* Desktop Navigation */}
        <NavBody>
          <NavbarLogo />
          <NavItems items={navItems} />
          <div className="flex items-center gap-3">
            <NavbarButton className="flex items-center justify-center" variant="primary">
              <HeartIcon size={16} fill="currentColor" className="mr-2" />
              Donate
            </NavbarButton>
            {user ? (
              <>
                <NavbarButton 
                  onClick={() => router.push('/my-aartis')}
                  className="flex items-center justify-center" 
                  variant="outline"
                >
                  <VideoIcon size={16} className="mr-2" />
                  My Aartis
                </NavbarButton>
                <div className="flex items-center gap-2">
                  <div className="hidden lg:flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-amber-50 to-orange-50 rounded-lg border border-[#C97A3C]/20">
                    <UserIcon size={16} className="text-[#C97A3C]" />
                    <span className="text-sm font-semibold text-[#3D2817]">{user.name}</span>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="p-2 hover:bg-red-50 rounded-lg transition-colors text-red-600"
                    title="Logout"
                  >
                    <LogOutIcon size={18} />
                  </button>
                </div>
              </>
            ) : (
              <NavbarButton 
                onClick={() => router.push('/auth/login')}
                className="flex items-center justify-center" 
                variant="outline"
              >
                <LogInIcon size={16} className="mr-2" />
                Login
              </NavbarButton>
            )}
          </div>
        </NavBody>

        {/* Mobile Navigation */}
        <MobileNav>
          <MobileNavHeader>
            <NavbarLogo />
            <MobileNavToggle
              isOpen={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} />
          </MobileNavHeader>

          <MobileNavMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)}>
            {navItems.map((item, idx) => (
              <a
                key={`mobile-link-${idx}`}
                href={item.link}
                onClick={() => setIsMobileMenuOpen(false)}
                className="relative text-spiritual-green hover:text-spiritual-gold transition-colors">
                <span className="block">{item.name}</span>
              </a>
            ))}
            <div className="flex w-full flex-col gap-4 mt-4">
              <NavbarButton
                onClick={() => setIsMobileMenuOpen(false)}
                variant="primary"
                className="w-full">
                <HeartIcon size={16} fill="currentColor" className="mr-2 inline" />
                Donate
              </NavbarButton>
              {user ? (
                <>
                  <div className="flex items-center gap-2 px-4 py-3 bg-gradient-to-r from-amber-50 to-orange-50 rounded-lg border border-[#C97A3C]/20">
                    <UserIcon size={16} className="text-[#C97A3C]" />
                    <span className="text-sm font-semibold text-[#3D2817]">{user.name}</span>
                  </div>
                  <NavbarButton
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      router.push('/my-aartis');
                    }}
                    variant="outline"
                    className="w-full">
                    <VideoIcon size={16} className="mr-2 inline" />
                    My Aartis
                  </NavbarButton>
                  <button
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      handleLogout();
                    }}
                    className="w-full px-4 py-2 bg-red-50 text-red-600 rounded-lg font-semibold hover:bg-red-100 transition-colors flex items-center justify-center">
                    <LogOutIcon size={16} className="mr-2" />
                    Logout
                  </button>
                </>
              ) : (
                <NavbarButton
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    router.push('/auth/login');
                  }}
                  variant="outline"
                  className="w-full">
                  <LogInIcon size={16} className="mr-2 inline" />
                  Login
                </NavbarButton>
              )}
            </div>
          </MobileNavMenu>
        </MobileNav>
      </Navbar>
    </div>
  );
}
