import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  CheckCircle2,
  Calculator,
  ShieldCheck,
  Clock3,
} from "lucide-react";
import { services, otherServices } from "../data/services";
import { getSiteLayout, SITE_LAYOUT_EVENT } from "../data/siteLayout";


export default function Home() {
  const [siteLayout, setSiteLayout] = useState(getSiteLayout);

  useEffect(() => {
    const syncLayout = () => setSiteLayout(getSiteLayout());
    window.addEventListener(SITE_LAYOUT_EVENT, syncLayout);
    window.addEventListener("storage", syncLayout);
    return () => {
      window.removeEventListener(SITE_LAYOUT_EVENT, syncLayout);
      window.removeEventListener("storage", syncLayout);
    };
  }, []);

  return (
    <>
      <section className={`hero hero--${siteLayout}`}>
        <div className="container hero-grid">
          <div>
            <span className="kicker">SPL CORPORATE SERVICES</span>
            <h1>
              Clear advice for <em>better business</em> decisions.
            </h1>
            <p>
              Comprehensive professional support across accounting, taxation,
              audit, payroll, registrations and compliance.
            </p>
            <div className="actions">
              <Link className="btn primary" to="/services">
                Explore Services <ArrowRight size={17} />
              </Link>
              <Link className="btn secondary" to="/contact">
                Request a Consultation
              </Link>
            </div>
            <div className="trust">
              <span>
                <CheckCircle2 /> Practical advice
              </span>
              <span>
                <CheckCircle2 /> Timely support
              </span>
              <span>
                <CheckCircle2 /> Personalized service
              </span>
            </div>
          </div>
          <div className="hero-card">
            <div>
              <span>ONE-STOP BUSINESS SUPPORT</span>
              <h2>Accounting, Tax & Compliance — in one place.</h2>
            </div>
            <div className="hero-stats">
              <b>
                18+<small>Core services</small>
              </b>
              <b>
                360°<small>Business support</small>
              </b>
              <b>
                1:1<small>Advisory approach</small>
              </b>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className="container">
          <div className="section-head">
            <div>
              <span className="kicker">WHAT WE DO</span>
              <h2>Services built around your business.</h2>
            </div>
            <Link to="/services">View all services →</Link>
          </div>
          <div className="cards">
            {services.slice(0, 6).map((s) => (
              <Link className="card" key={s.slug} to={"/services/" + s.slug}>
                <span className="card-icon">↗</span>
                <h3>{s.title}</h3>
                <p>{s.summary}</p>
                <strong>Explore service →</strong>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <section className="soft">
        <div className="container feature-grid">
          <div>
            <span className="kicker">WHY SPL CORPORATE SERVICES</span>
            <h2>Professional support without unnecessary complexity.</h2>
            <p>
              We combine specialized financial knowledge with a flexible,
              friendly approach so clients can focus on running and growing
              their business.
            </p>
          </div>
          <div className="mini">
            <ShieldCheck />
            <h3>Compliance focused</h3>
            <p>
              Support for registrations, tax, filings and business obligations.
            </p>
          </div>
          <div className="mini">
            <Clock3 />
            <h3>Timely delivery</h3>
            <p>Structured support designed around recurring deadlines.</p>
          </div>
          <div className="mini">
            <Calculator />
            <h3>Useful resources</h3>
            <p>
              Calculators, tax references and compliance resources in the
              Knowledge Bank.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
