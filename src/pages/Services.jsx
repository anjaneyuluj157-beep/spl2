import React from "react";
import { Link } from "react-router-dom";
import { services, otherServices } from "../data/services";
export default function Services() {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <span className="kicker">OUR SERVICES</span>
          <h1>Business, Tax and Compliance support.</h1>
          <p>Select a service to view its own detailed page.</p>
        </div>
      </section>
      <section>
        <div className="container">
          <div className="cards">
            {services.map((s) => (
              <Link className="card" key={s.slug} to={"/services/" + s.slug}>
                <span className="card-icon">↗</span>
                <h3>{s.title}</h3>
                <p>{s.summary}</p>
                <strong>View details →</strong>
              </Link>
            ))}
          </div>
          <div className="other">
            <h2>Additional Services</h2>
            <div className="chips">
              {otherServices.map((x) => (
                <span key={x}>{x}</span>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
