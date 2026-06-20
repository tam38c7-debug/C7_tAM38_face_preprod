import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { LogIn, LogOut, User as UserIcon } from "lucide-react";

// import CurrencySelect from "./CurrencySelect";
// import { useAuth } from "../lib/auth-context";

import {useQuery} from "@apollo/client/react";
import {gql} from "@apollo/client";

const GRAPHQL_NAVBAR_QUERY =
    gql`
        query shared_HeaderPageElement {
          sharedHeaderPageElement(locale: "en") {    
            locale    
            headerTagline
            websiteTitle
            documentId
        
        
            localizations {
              documentId
              locale
            }
        
            logo {
              url
            }
        
            
        
          }
        }    
    `


function cx(...cls: Array<string | false | null | undefined>) {
  return cls.filter(Boolean).join(" ");
}

export default function Navbar() {
  const navigate = useNavigate();
  // const { user, logout } = useAuth();

  // const role = user?.role;
  // const displayName = user?.email || "Guest";

  const { loading, error, data } = useQuery (GRAPHQL_NAVBAR_QUERY)

  if (loading) return <p>Loading...</p>
  if (error) return <p>{error.message}</p>

  // console.log(data)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-black/10 bg-black/60 backdrop-blur">
      <div className="mx-auto max-w-7xl px-4 py-3 flex items-center justify-between gap-4">

        {/* BRAND */}
        <Link to="/" className="flex items-center gap-3">

          <motion.img
            src={`http://69.62.124.53:1337${data.sharedHeaderPageElement.logo.url}`}
            alt={`${data.sharedHeaderPageElement.websiteTitle} Logo`}
            className="h-12 rounded-lg border border-white/20 shadow-lg"
            animate={{ y: [0, -4, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
            whileHover={{ scale: 1.05 }}
          />

          <div className="leading-tight">
            <div className="text-white font-black text-sm">
              { data.sharedHeaderPageElement.websiteTitle}
            </div>
            <div className="text-white/70 text-[11px] -mt-0.5">
              { data.sharedHeaderPageElement.headerTagline}
            </div>
          </div>
        </Link>

        {/* NAV */}
        <nav className="hidden md:flex items-center gap-2 rounded-full bg-white/10 border border-white/10 px-2 py-1">
          {/* <NavItem to="/">Home</NavItem>
          <NavItem to="/cars">Cars</NavItem>
          <NavItem to="/explore">Explore</NavItem>
          <NavItem to="/my-bookings">My Bookings</NavItem>
          <NavItem to="/support">Support</NavItem> */}

          {/* {(role === "admin" || role === "staff") && (
            <NavItem to="/admin">Admin</NavItem>
          )} */}
        </nav>

        {/* RIGHT */}
        <div className="flex items-center gap-2">

          {/* <CurrencySelect /> */}
 
          {/* {!user ? (
            <>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate("/login")}
                className="rounded-full bg-white/10 border border-white/10 px-4 py-2 text-white font-black"
              >
                <LogIn className="h-4 w-4 inline mr-2" />
                Login
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate("/register")}
                className="rounded-full px-4 py-2 font-black text-black bg-white"
              >
                Register
              </motion.button>
            </>
          ) : (
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => logout()}
              className="rounded-full bg-white/10 border border-white/10 px-4 py-2 text-white font-black"
            >
              <LogOut className="h-4 w-4 inline mr-2" />
              Logout
            </motion.button>
          )} */}
        </div>
      </div>
    </header>
  );
}

function NavItem({ to, children }: { to: string; children: React.ReactNode }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        cx(
          "rounded-full px-4 py-2 text-sm font-black transition",
          isActive
            ? "bg-white text-black"
            : "text-white/85 hover:bg-white/10"
        )
      }
    >
      {children}
    </NavLink>
  );
}