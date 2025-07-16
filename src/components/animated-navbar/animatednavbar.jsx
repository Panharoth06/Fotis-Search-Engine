"use client";

import Link from "next/link";
import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";

const Links = ({ link, setAttributes }) => {
  const ref = useRef(null);
  const pathname = usePathname();

  const handleMouseEnter = () => {
    if (ref.current) {
      const { width, left } = ref.current.getBoundingClientRect();
      const parentLeft =
        ref.current.parentNode?.getBoundingClientRect().left || 0;
      setAttributes({
        width: width + 40,
        left: left - parentLeft - 20,
        opacity: 1,
      });
    }
  };

  // Normalize both paths
  const normalize = (path) => path.replace(/\/$/, "");
  const isActive = normalize(pathname) === normalize(link.href);

    const handleClick = (e) => {
    if (link.href === "/") {
      e.preventDefault();
      window.location.href = "/";
    }
  };

  return (
    <li
      ref={ref}
      onMouseEnter={handleMouseEnter}
      className={`relative px-4 py-1 rounded-full transition-all duration-200 ${
        isActive ? "bg-black/95 text-white" : ""
      }`}
    >
      <Link onClick={handleClick} href={link.href}>{link.label}</Link>
    </li>
  );
};

const AnimatedNavBar = ({ links }) => {
  const [attributes, setAttributes] = useState({
    left: 0,
    width: 0,
    opacity: 0,
  });

  const handleMouseLeave = () => {
    setAttributes((prev) => ({
      ...prev,
      opacity: 0,
    }));
  };

  return (
    <div className="relative">
      <div className="bg-white flex relative items-center w-max h-10 rounded-full border border-white">
        <ul
          className="flex flex-row z-10 gap-x-10 mix-blend-difference relative px-6"
          onMouseLeave={handleMouseLeave}
        >
          {links.map((link, index) => (
            <Links key={index} link={link} setAttributes={setAttributes} />
          ))}
        </ul>

        <motion.div
          className="bg-black/95 top-1/2 z-0 -translate-y-1/2 absolute h-9 rounded-full"
          animate={{
            width: attributes.width,
            left: attributes.left,
            opacity: attributes.opacity,
          }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        />
      </div>
    </div>
  );
};

export default AnimatedNavBar;
