import React, { useState } from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import { Menu, X, Phone, Mail, MapPin } from "lucide-react";
export default function Layout() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <div className="topbar">
        <div className="container topbar-in">
          <span>Professional Accounting • Tax • Audit • Compliance</span>
          <span>
            <Phone size={13} /> <a href="tel:+919542095406">+91 95420 95406</a>{" "}
            <i /> <Mail size={13} />{" "}
            <a href="mailto:splfintax@gmail.com">splfintax@gmail.com</a>
          </span>
        </div>
      </div>
      <header>
        <div className="container nav">
          <Link to="/" className="brand">
            <b>S</b>
            <span>
              SPL Corporate Services<small>Tax • Accounting • Advisory</small>
            </span>
          </Link>
          <nav className={open ? "open" : ""} onClick={() => setOpen(false)}>
            <NavLink to="/">Home</NavLink>
            <NavLink to="/about">About</NavLink>
            <NavLink to="/services">Services</NavLink>
            <NavLink to="/knowledge-bank">Knowledge Bank</NavLink>
            <NavLink className="nav-cta" to="/contact">Contact Us</NavLink>
          </nav>
          <button className="menu" onClick={() => setOpen(!open)}>
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </header>
      <main>
        <Outlet />
      </main>
      <footer>
        <div className="container footer-grid">
          <div>
            <Link to="/" className="brand footer-brand">
              <b>S</b>
              <span>
                SPL Corporate Services<small>Tax • Accounting • Advisory</small>
              </span>
            </Link>
            <p>
              Practical accounting, tax, payroll and compliance support for
              individuals and businesses.
            </p>
          </div>
          <div>
            <h4>Quick Links</h4>
            <Link to="/about">About Us</Link>
            <Link to="/services">Services</Link>
            <Link to="/knowledge-bank">Knowledge Bank</Link>
            <Link to="/contact">Contact</Link>
          </div>
          <div>
            <h4>Contact</h4>
            <p>
              <MapPin size={15} /> Srinagar Colony Main Rd, Punjagutta,
              Hyderabad, Telangana 500082
            </p>
            <p>
              <Phone size={15} /> +91 95420 95406
            </p>
            <p>
              <Mail size={15} /> splfintax@gmail.com
            </p>
          </div>
        </div>
        <div className="copyright">
          © 2026 SPL Corporate Services. All rights reserved.
        </div>
      </footer>
    </>
  );
}
