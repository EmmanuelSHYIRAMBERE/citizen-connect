"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import { AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { ThemeToggle } from "../ui/ThemeToggle";
import { UserButton } from "./UserButton";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { useState } from "react";
import { Motion } from "../animations/MotionWrapper";

const navVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const navItemVariants = {
  hidden: { opacity: 0, y: -10 },
  visible: { opacity: 1, y: 0 },
};

export default function Header() {
  const t = useTranslations();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { name: t("Complaints.publicDashboard"), href: "/complaints" },
    { name: t("About.title"), href: "/about" },
    { name: t("Contact.title"), href: "/contact" },
  ];

  return (
    <Motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="sticky top-0 z-50 w-full bg-blue-600/90 backdrop-blur-md border-b border-blue-500"
    >
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex items-center"
          >
            <Link href="/" className="flex items-center space-x-2">
              <span className="text-xl font-bold text-yellow-500">
                CitizenConnect
              </span>
            </Link>
          </Motion.div>

          {/* Desktop Navigation */}
          <Motion.nav
            variants={navVariants}
            initial="hidden"
            animate="visible"
            className="hidden lg:flex items-center space-x-1"
          >
            {navItems.map((item) => (
              <Motion.div key={item.href} variants={navItemVariants}>
                <Link
                  href={item.href}
                  className={`
                    relative px-4 py-2 text-sm font-medium rounded-full
                    ${
                      pathname === item.href
                        ? "text-green-400 bg-blue-700"
                        : "text-white bg-green-500 hover:text-yellow-300 hover:bg-blue-500/50"
                    }
                    transition-all duration-300
                  `}
                >
                  {item.name}
                  {pathname === item.href && (
                    <Motion.span
                      layoutId="nav-underline"
                      className="absolute left-1/2 -bottom-1 h-0.5 w-4/5 bg-green-400 -translate-x-1/2"
                      transition={{
                        type: "spring",
                        bounce: 0.25,
                        duration: 0.5,
                      }}
                    />
                  )}
                </Link>
              </Motion.div>
            ))}
          </Motion.nav>

          {/* Right side controls */}
          <div className="flex items-center space-x-3">
            <div className="hidden lg:block w-64">
              <Input
                type="search"
                placeholder={t("Complaints.searchPlaceholder")}
                className="bg-white/10 border-none text-white placeholder-blue-200 focus:ring-2 focus:ring-yellow-400"
                suppressHydrationWarning
              />
            </div>

            <LanguageSwitcher />
            <ThemeToggle />
            <UserButton />

            {/* Mobile menu button */}
            <button
              className="lg:hidden p-2 rounded-full text-white hover:bg-blue-500 focus:outline-none"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <Motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden pb-4 space-y-2"
            >
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`
                    block px-4 py-3 rounded-lg text-base font-medium
                    ${
                      pathname === item.href
                        ? "bg-blue-700 text-green-400"
                        : "text-white bg-green-500 hover:text-yellow-300 hover:bg-blue-500/50"
                    }
                  `}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="px-4 pt-2">
                <Input
                  type="search"
                  placeholder={t("Complaints.searchPlaceholder")}
                  className="w-full bg-white/10 border-none text-white placeholder-blue-200"
                />
              </div>
            </Motion.div>
          )}
        </AnimatePresence>
      </div>
    </Motion.header>
  );
}
