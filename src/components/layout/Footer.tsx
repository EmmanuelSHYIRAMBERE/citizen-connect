"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { FaGithub, FaTwitter, FaLinkedin, FaYoutube } from "react-icons/fa";
import { Motion } from "../animations/MotionWrapper";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
    },
  },
};

const socialLinks = [
  { icon: <FaTwitter className="h-5 w-5" />, href: "#" },
  { icon: <FaGithub className="h-5 w-5" />, href: "#" },
  { icon: <FaLinkedin className="h-5 w-5" />, href: "#" },
  { icon: <FaYoutube className="h-5 w-5" />, href: "#" },
];

export default function Footer() {
  const t = useTranslations("Footer");

  const footerLinks = [
    {
      title: t("aboutTitle"),
      links: [
        { name: t("Complaints.publicDashboard"), href: "/complaints" },
        { name: t("About.title"), href: "/about" },
        { name: t("Contact.title"), href: "/contact" },
      ],
    },
    {
      title: t("quickLinks"),
      links: [
        { name: "Privacy Policy", href: "/privacy" },
        { name: "Terms of Service", href: "/terms" },
        { name: "Cookie Policy", href: "/cookies" },
      ],
    },
  ];

  return (
    <Motion.footer
      initial="hidden"
      whileInView="visible"
      variants={containerVariants}
      viewport={{ once: true, amount: 0.2 }}
      className="bg-gradient-to-b from-blue-700 to-blue-900 text-white"
    >
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About Section */}
          <Motion.div variants={itemVariants} className="md:col-span-1">
            <h3 className="text-2xl font-bold mb-4">{t("aboutTitle")}</h3>
            <p className="text-blue-100 mb-4">{t("aboutDescription")}</p>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <Motion.a
                  key={index}
                  variants={itemVariants}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -3, scale: 1.1, color: "#facc15" }}
                  className="text-blue-200 hover:text-yellow-400 transition-colors"
                >
                  {social.icon}
                </Motion.a>
              ))}
            </div>
          </Motion.div>

          {/* Links Sections */}
          {footerLinks.map((column, index) => (
            <Motion.div key={index} variants={itemVariants}>
              <h4 className="text-xl font-semibold mb-4">{column.title}</h4>
              <ul className="space-y-2">
                {column.links.map((link, linkIndex) => (
                  <Motion.li
                    key={linkIndex}
                    variants={itemVariants}
                    whileHover={{ x: 5 }}
                  >
                    <Link
                      href={link.href}
                      className="text-blue-200 hover:text-yellow-400 transition-colors"
                    >
                      {link.name}
                    </Link>
                  </Motion.li>
                ))}
              </ul>
            </Motion.div>
          ))}

          {/* Newsletter */}
          <Motion.div variants={itemVariants}>
            <h4 className="text-xl font-semibold mb-4">{t("connect")}</h4>
            <p className="text-blue-100 mb-4">
              Subscribe to our newsletter for updates
            </p>
            <div className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 px-4 py-2 rounded-l-lg bg-blue-800 text-white placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
              <button className="bg-yellow-400 hover:bg-yellow-500 text-blue-900 font-medium px-4 py-2 rounded-r-lg transition-colors">
                Subscribe
              </button>
            </div>
          </Motion.div>
        </div>

        {/* Copyright */}
        <Motion.div
          variants={itemVariants}
          className="border-t border-blue-600 mt-12 pt-6 text-center text-blue-300"
        >
          <p>
            © {new Date().getFullYear()} CitizenConnect.{" "}
            {t("allRightsReserved")}
          </p>
        </Motion.div>
      </div>
    </Motion.footer>
  );
}
