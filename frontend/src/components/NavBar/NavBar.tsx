"use client";

import { AuthContext } from "@/providers/AuthProvider/AuthProvider";
import {
  Navbar,
  NavbarBrand,
  NavbarCollapse,
  NavbarLink,
  NavbarToggle,
} from "flowbite-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useContext } from "react";

export function NavBar() {
  const { user, logout } = useContext(AuthContext);
  const router = useRouter();
  const handleLogout = async () => {
    await logout();
    router.push("/login");
  };
  return (
    <Navbar fluid rounded>
      <NavbarBrand as={Link} href="https://flowbite-react.com">
        <Image
          src="/next.svg"
          width={50}
          height={50}
          className="mr-3 h-6 sm:h-9"
          alt="Flowbite React Logo"
        ></Image>
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
          Flowbite React
        </span>
      </NavbarBrand>
      <NavbarToggle />
      <NavbarCollapse>
        <NavbarLink as={Link} href="/" active>
          Home
        </NavbarLink>
        <NavbarLink as={Link} href="/about">
          About
        </NavbarLink>
        <NavbarLink as={Link} href="/product/create">
          Criar Produto
        </NavbarLink>
        <NavbarLink href="#">Pricing</NavbarLink>
        <NavbarLink href="#">Contact</NavbarLink>
        {!user && (
          <NavbarLink as={Link} href="/login">
            Login
          </NavbarLink>
        )}
        {user && (
          <NavbarLink as={Link} onClick={handleLogout} href="#">
            Logout
          </NavbarLink>
        )}
      </NavbarCollapse>
    </Navbar>
  );
}

export default NavBar;
