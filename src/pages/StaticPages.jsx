import React from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import {
  Calculator,
  BookOpen,
  Landmark,
  Link as LinkIcon,
  MapPin,
  Phone,
  Mail,
  BadgeCheck,
  BriefcaseBusiness,
  ClipboardCheck,
  FileText,
  UsersRound,
} from "lucide-react";
import EnquiryForm from "../components/EnquiryForm";

const teamMembers = [
  {
    slug: "ca-prudhvi-raju-addala",
    initials: "P",
    name: "CA Prudhvi Raju Addala",
    role: "Chartered Accountant",
    bio:
      "CA Prudhvi Raju Addala brings a focused, client-first approach to finance and compliance work, helping businesses maintain accurate records and practical decision support.",
  },
  {
    slug: "ca-b-v-gupta",
    initials: "G",
    name: "CA B V Gupta",
    role: "Chartered Accountant",
    bio:
      "CA B V Gupta contributes a strong accounting and advisory perspective, with emphasis on clarity, compliance and dependable service for business clients.",
  },
  {
    slug: "ca-sowmya-lakshmi",
    initials: "S",
    name: "CA Sowmya Lakshmi",
    role: "Chartered Accountant",
    bio:
      "CA Sowmya Lakshmi supports clients with professional guidance in core accounting, tax and business compliance matters across varied operating models.",
  },
  {
    slug: "lakshmaiah-doredla",
    initials: "L",
    name: "Lakshmaiah Doredla",
    role: "Managing Director",
    bio:
      "Mr. Lakshmaiah Doredla, Managing Director is a Business Administration graduate with proven industry experience across accounting, investment banking and startups. He has worked across diverse business environments and has developed expertise in cost-efficient outsourcing models, functional consulting and implementation support. His experience enables him to recommend practical and accurate solutions tailored to client requirements.",
  },
];

export function About() {
  const firmServices = [
    {
      title: "Audit & Assurance",
      description:
        "Professional audit support to help organizations meet their review and reporting needs.",
      Icon: ClipboardCheck,
    },
    {
      title: "Management Consultancy",
      description:
        "Practical business and management guidance shaped around each client's requirements.",
      Icon: BriefcaseBusiness,
    },
    {
      title: "Tax Consultancy",
      description:
        "Tax advisory and compliance support for individuals and businesses.",
      Icon: BadgeCheck,
    },
    {
      title: "Accounting Services",
      description:
        "Dependable accounting assistance to support clear, organized financial records.",
      Icon: Calculator,
    },
    {
      title: "Manpower Management",
      description:
        "Professional support for workforce and manpower management requirements.",
      Icon: UsersRound,
    },
    {
      title: "Secretarial Services",
      description:
        "Secretarial and corporate support to help businesses manage ongoing requirements.",
      Icon: FileText,
    },
  ];

  return (
    <>
      <section className="page-hero about-hero">
        <div className="container about-hero-grid">
          <div className="about-hero-copy">
            <span className="kicker">ABOUT SPL CORPORATE SERVICES</span>
            <h1>Professional advice. Personal service.</h1>
            <p>
              A leading, professionally managed corporate services provider
              offering comprehensive audit, finance, tax and business support.
            </p>
            <a className="btn primary" href="#team">
              Meet our team <span aria-hidden="true">→</span>
            </a>
          </div>
          <aside className="about-expertise-card" aria-label="Our expertise">
            <span className="about-card-label">A multidisciplinary team</span>
            <h2>Expertise that works together.</h2>
            <ul>
              <li><BadgeCheck aria-hidden="true" /> Chartered Accountants</li>
              <li><BriefcaseBusiness aria-hidden="true" /> Corporate Financial Advisors</li>
              <li><Calculator aria-hidden="true" /> Tax Consultants</li>
            </ul>
          </aside>
        </div>
      </section>

      <section className="about-story-section">
        <div className="container about-story-grid">
          <div className="about-story-copy">
            <span className="kicker">WHO WE ARE</span>
            <h2>Comprehensive support for every stage of business.</h2>
            <p>
              SPL Corporate Services is a professionally managed firm delivering
              comprehensive professional services. Our work spans audit,
              management consultancy, tax consultancy, accounting services,
              manpower management and secretarial services.
            </p>
            <p>
              We bring together specialized skills to offer sound financial
              advice and personalized, proactive service. Regular interaction
              with industry and other professionals helps our team keep pace
              with contemporary developments and respond to our clients' needs.
            </p>
          </div>
          <div className="about-principles-card">
            <div className="about-principle">
              <span className="about-principle-icon"><BadgeCheck aria-hidden="true" /></span>
              <div>
                <h3>Specialist knowledge</h3>
                <p>Professional disciplines brought together for well-rounded guidance.</p>
              </div>
            </div>
            <div className="about-principle">
              <span className="about-principle-icon"><UsersRound aria-hidden="true" /></span>
              <div>
                <h3>Personalized service</h3>
                <p>Practical support shaped around each client's requirements.</p>
              </div>
            </div>
            <div className="about-principle">
              <span className="about-principle-icon"><BriefcaseBusiness aria-hidden="true" /></span>
              <div>
                <h3>Industry awareness</h3>
                <p>Current perspectives informed by regular professional interaction.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="team" className="about-team-section">
        <div className="container">
          <div className="about-team-heading">
            <span className="kicker">OUR TEAM</span>
            <h2>Meet the people behind the service.</h2>
            <p>
              Our team includes Chartered Accountants and experienced business
              professionals, bringing focused expertise to every client relationship.
            </p>
          </div>
          <div className="team-grid">
            {teamMembers.map((member) => (
              <Link
                className="team-card"
                key={member.slug}
                to={`/team/${member.slug}`}
              >
                <div className="team-avatar">{member.initials}</div>
                <h3>{member.name}</h3>
                <p>{member.role}</p>
                <span>View profile →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
export function Knowledge() {
  const groups = [
    [
      "Calculators",
      Calculator,
      [
        "GST Return Late Fee Calculator",
        "GST Late Payment Interest Calculator",
        "TDS Late Payment Interest Calculator",
        "Tax Calculator",
        "Home Loan Calculator",
      ],
    ],
    [
      "Bulletins",
      BookOpen,
      [
        "Notifications",
        "Circular",
        "Income Tax",
        "Company Law",
        "Service Tax",
        "GST",
      ],
    ],
    [
      "Utilities",
      Landmark,
      [
        "Rate of TDS",
        "Rates of Income Tax",
        "National Industries of Classification",
        "HSN-wise GST Rates",
        "GST / VAT Links",
      ],
    ],
    [
      "Links",
      LinkIcon,
      ["Quick Links", "GST & VAT Links", "Ease of Doing Business"],
    ],
  ];
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <span className="kicker">KNOWLEDGE BANK</span>
          <h1>Useful tax and business resources.</h1>
          <p>
            Calculators, bulletins, utilities and reference links organized as
            outlined in the workbook.
          </p>
        </div>
      </section>
      <section>
        <div className="container knowledge-grid">
          {groups.map(([name, Icon, items]) => (
            <article className="resource" key={name}>
              <Icon />
              <h2>{name}</h2>
              {items.map((i) => (
                <div className="resource-row" key={i}>
                  {i}
                  <span>↗</span>
                </div>
              ))}
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
export function Gallery() {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <span className="kicker">GALLERY</span>
          <h1>Inside SPL Corporate Services.</h1>
          <p>
            The workbook defines a Gallery page but does not provide
            photographs. These placeholders can be replaced with your office,
            team and client-event images.
          </p>
        </div>
      </section>
      <section>
        <div className="container gallery-grid">
          {[
            "Professional Business Support",
            "Accounting",
            "Tax Advisory",
            "Compliance",
            "Client Support",
          ].map((x, i) => (
            <div className={"gallery-item " + (i === 0 ? "large" : "")} key={x}>
              {x}
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
export function TeamDetail() {
  const { slug } = useParams();
  const member = teamMembers.find((item) => item.slug === slug);

  if (!member) {
    return <Navigate to="/team" replace />;
  }

  return (
    <>
      <section className="page-hero team-hero">
        <div className="container">
          <Link className="crumb" to="/team">
            Team /
          </Link>
          <span className="kicker">TEAM MEMBER</span>
          <h1>{member.name}</h1>
          <p>{member.role}</p>
        </div>
      </section>

      <section>
        <div className="container team-detail-wrap">
          <div className="team-detail-card">
            <div className="team-avatar large">{member.initials}</div>
            <div>
              <span className="kicker">PROFILE</span>
              <h2>{member.name}</h2>
              <p className="team-role">{member.role}</p>
              <p>{member.bio}</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export function Contact() {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <span className="kicker">CONTACT US</span>
          <h1>Let's discuss your requirements.</h1>
          <p>
            Send an enquiry about registration, GST, income tax, accounting,
            payroll or audit support.
          </p>
        </div>
      </section>
      <section>
        <div className="container contact-grid">
          <div className="contact-info">
            <h2>Contact information</h2>
            <p>
              <MapPin /> D.NO: 8-2-147/1, Srinagar Colony Main Rd, Opp Indian
              Overseas Bank, Pratap Nagar, Nagarjuna Nagar Colony, Punjagutta,
              Hyderabad, Telangana 500082
            </p>
            <p>
              <Phone /> <a href="tel:+919542095406">+91 95420 95406</a>
            </p>
            <p>
              <Mail />{" "}
              <a href="mailto:splfintax@gmail.com">splfintax@gmail.com</a>
            </p>
            <div className="map-frame-wrap">
              <iframe
                title="SPL Corporate Services Location"
                src="https://www.google.com/maps?q=8-2-147%2F1%2C%20Srinagar%20Colony%20Main%20Rd%2C%20Opp%20Indian%20Overseas%20Bank%2C%20Pratap%20Nagar%2C%20Nagarjuna%20Nagar%20Colony%2C%20Punjagutta%2C%20Hyderabad%2C%20Telangana%20500082&output=embed"
                className="map-frame"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
          </div>
          <EnquiryForm />
        </div>
      </section>
    </>
  );
}
