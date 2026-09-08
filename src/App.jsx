import React, { useEffect, useMemo, useState } from 'react';

const pages = [
  { id: 'home', label: 'home' },
  { id: 'about', label: 'about' },
  { id: 'skills', label: 'skills' },
  { id: 'projects', label: 'projects' },
  { id: 'contact', label: 'contact' },
];

const experience = [
  ['Ongoing', 'Full-Stack Product Builds', 'Independent', 'Designing and shipping complete web applications — storefronts, booking flows, admin dashboards, and backend automation — using Next.js, TypeScript, Tailwind, and Supabase.'],
  ['Current', 'IT Specialist', 'Linkage Foods Venture Corporation', 'Supporting day-to-day IT operations — systems, network, and hardware — across the organization.'],
  ['Previously', 'Quality Control', 'Integrated Computer Systems Inc.', 'Worked on quality control processes for computer hardware and systems.'],
  ['Internship', 'IT Intern', 'LTO Taytay', 'Gained hands-on experience supporting government office IT operations.'],
  ['Education', 'B.S. Computer Engineering', 'Graduate', 'Foundation in hardware systems, networks, and engineering problem-solving.'],
];

const skillGroups = {
  'product & web development': ['Next.js / React', 'TypeScript', 'Tailwind CSS', 'Supabase (DB, auth, storage)'],
  'systems & networking': ['Windows Server / AD', 'Network troubleshooting', 'Hardware diagnostics', 'LAN/WAN setup'],
  'support & operations': ['Help desk / end-user support', 'IT asset management', 'Quality control processes', 'Documentation'],
};

const projects = [
  {
    id: 'featured',
    filter: 'product',
    title: 'Luxury Dress Rental Platform',
    eyebrow: 'featured — full-stack build',
    summary: 'A full-stack Next.js rental marketplace for a boutique dress rental brand — storefront, booking, admin tools, and backend automation.',
    tags: ['Next.js', 'TypeScript', 'Tailwind', 'Supabase', 'Google Auth'],
    description: 'Built a complete rental platform end to end: customers browse a branded catalog, pick rental dates, sign in with Google, upload a payment receipt, and submit a booking. Supabase handles data storage and availability checks, while an admin dashboard manages inventory, bookings, and listings.',
    bullets: ['Branded storefront with category browsing', 'Date-based booking with rental logic', 'Google sign-in for customer access', 'Payment receipt upload for confirmation', 'Admin dashboard for bookings & inventory', 'Automated confirmation & reminder emails'],
  },
  { id: 'LOG—01', filter: 'systems', title: 'Network infrastructure upgrade', tags: ['networking', 'hardware'], description: 'Planned and supported infrastructure improvements focused on reliability, maintainability, and reducing operational downtime.' },
  { id: 'LOG—02', filter: 'systems', title: 'IT asset tracking system', tags: ['operations', 'documentation'], description: 'Created a clearer approach to tracking equipment and inventory so teams can locate assets and keep records current.' },
  { id: 'LOG—03', filter: 'systems', title: 'Help desk workflow improvement', tags: ['support', 'process'], description: 'Improved the flow of support requests with consistent documentation, prioritization, and follow-through.' },
];

function getInitialPage() {
  const hash = window.location.hash.slice(1);
  return pages.some((page) => page.id === hash) ? hash : 'home';
}

function App() {
  const [activePage, setActivePage] = useState(getInitialPage);
  const [theme, setTheme] = useState(() => localStorage.getItem('portfolio-theme') || 'light');
  const [filter, setFilter] = useState('all');
  const [featuredOpen, setFeaturedOpen] = useState(false);
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [typed, setTyped] = useState('');

  const visibleProjects = useMemo(
    () => projects.filter((project) => filter === 'all' || project.filter === filter),
    [filter],
  );

  useEffect(() => {
    document.body.dataset.theme = theme;
    localStorage.setItem('portfolio-theme', theme);
  }, [theme]);

  useEffect(() => {
    const phrase = ['Keeping infrastructure running,', 'and shipping full products.'][phraseIndex];
    let cursor = 0;
    setTyped('');
    const timer = window.setInterval(() => {
      cursor += 1;
      setTyped(phrase.slice(0, cursor));
      if (cursor === phrase.length) window.clearInterval(timer);
    }, 42);
    return () => window.clearInterval(timer);
  }, [phraseIndex]);

  useEffect(() => {
    const timer = window.setTimeout(() => setPhraseIndex((index) => (index + 1) % 2), 3800);
    return () => window.clearTimeout(timer);
  }, [phraseIndex]);

  const navigate = (id) => {
    setActivePage(id);
    window.history.replaceState(null, '', `#${id}`);
    document.querySelector('main')?.scrollTo({ top: 0, behavior: 'smooth' });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <div className="progress" aria-hidden="true" />
      <div className="layout">
        <aside className="sidebar">
          <div className="sb-id">
            <div className="sb-name">John Rey Loyogoy</div>
            <div className="sb-role">IT Specialist &amp; Full-Stack Builder</div>
          </div>
          <nav className="sb-nav" aria-label="Primary navigation">
            {pages.map((page, index) => (
              <button className={`sb-link ${activePage === page.id ? 'active' : ''}`} key={page.id} onClick={() => navigate(page.id)}>
                <span className="idx">0{index + 1}</span>{page.label}
              </button>
            ))}
          </nav>
          <div className="sb-foot">
            <div className="status-line"><span className="status-dot" />available for opportunities</div>
            <div className="status-line">Antipolo City, Rizal, PH</div>
            <button className="theme-toggle" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}>
              <span>theme</span><span>{theme}</span>
            </button>
          </div>
        </aside>

        <main>
          {activePage === 'home' && <Home navigate={navigate} typed={typed} />}
          {activePage === 'about' && <About />}
          {activePage === 'skills' && <Skills />}
          {activePage === 'projects' && (
            <Projects filter={filter} setFilter={setFilter} visibleProjects={visibleProjects} featuredOpen={featuredOpen} setFeaturedOpen={setFeaturedOpen} />
          )}
          {activePage === 'contact' && <Contact />}
        </main>
      </div>
    </>
  );
}

function Home({ navigate, typed }) {
  return <section className="page">
    <div className="kicker">systems &amp; product</div>
    <h1><span className="hero-typed">{typed}</span></h1>
    <p className="lead">IT Specialist with a background in computer engineering and hardware quality control — and, more recently, a self-driven full-stack builder shipping complete web products end to end.</p>
    <div className="panel">
      {[['role', 'IT Specialist'], ['company', 'Linkage Foods Venture Corporation'], ['location', 'Antipolo City, Rizal, Philippines'], ['also building', 'Full-stack web products — Next.js, TypeScript, Supabase']].map(([key, value]) => <div className="panel-row" key={key}><div className="k">{key}</div><div>{value}</div></div>)}
    </div>
    <div className="cta-row"><button className="btn primary" onClick={() => navigate('projects')}>view projects</button><button className="btn" onClick={() => navigate('contact')}>get in touch</button></div>
  </section>;
}

function About() {
  return <section className="page"><div className="kicker">about</div><h2>Background</h2><div className="timeline">{experience.map(([date, role, org, description]) => <article className="tl-item" key={`${date}-${role}`}><div className="tl-date">{date}</div><div className="tl-role">{role}</div><div className="tl-org">{org}</div><div className="tl-desc">{description}</div></article>)}</div></section>;
}

function Skills() {
  return <section className="page"><div className="kicker">capabilities</div><h2>Skills</h2><div className="skill-groups">{Object.entries(skillGroups).map(([group, skills]) => <div key={group}><div className="skill-group-title">{group}</div><div className="skill-grid">{skills.map((skill) => <div className="skill-cell" key={skill}>{skill}</div>)}</div></div>)}</div></section>;
}

function Projects({ filter, setFilter, visibleProjects, featuredOpen, setFeaturedOpen }) {
  return <section className="page"><div className="kicker">selected work</div><h2>Projects</h2><div className="filter-row" role="group" aria-label="Filter projects">{[['all', 'all'], ['product', 'product & web'], ['systems', 'it & systems']].map(([value, label]) => <button className={`filter-chip ${filter === value ? 'active' : ''}`} key={value} onClick={() => setFilter(value)}>{label}</button>)}</div><div className="log">{visibleProjects.map((project) => project.id === 'featured' ? <article className={`featured ${featuredOpen ? 'open' : ''}`} key={project.id}><button className="featured-head" onClick={() => setFeaturedOpen(!featuredOpen)} aria-expanded={featuredOpen}><div><div className="featured-eyebrow">{project.eyebrow}</div><div className="featured-title">{project.title}</div><div className="featured-sub">{project.summary}</div><div className="tag-row">{project.tags.map((tag) => <span className="tag" key={tag}>{tag}</span>)}</div><a className="project-link" href="https://luxe-lace-hershey.vercel.app/" target="_blank" rel="noreferrer" onClick={(event) => event.stopPropagation()}>view live project ↗</a></div><span className="chev" aria-hidden="true">＋</span></button>{featuredOpen && <div className="featured-body"><div className="featured-body-inner"><p className="feat-desc">{project.description}</p><ul className="feat-list">{project.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul></div></div>}</article> : <article className="log-entry" key={project.id}><div className="log-id">{project.id}</div><div><div className="log-title">{project.title}</div><div className="log-tags">{project.tags.map((tag) => <span className="tag" key={tag}>{tag}</span>)}</div><div className="log-desc">{project.description}</div></div></article>)}</div></section>;
}

function Contact() {
  return <section className="page"><div className="kicker">reach out</div><h2>Contact</h2><p className="lead contact-lead">Open to IT specialist, systems support, and full-stack development roles.</p><div className="contact-grid">{[['email', 'johnreyloyogoy@gmail.com', 'mailto:johnreyloyogoy@gmail.com'], ['phone', '+63 961 266 1652 · Viber / WhatsApp', 'tel:+639612661652'], ['linkedin', 'linkedin.com/in/john-rey-loyogoy-682425311', 'https://www.linkedin.com/in/john-rey-loyogoy-682425311?utm_source=share_via&utm_content=profile&utm_medium=member_ios'], ['location', 'Antipolo City, Rizal, Philippines']].map(([key, value, href]) => <div className="contact-row" key={key}><div className="k">{key}</div><div>{href ? <a href={href} target={key === 'linkedin' ? '_blank' : undefined} rel={key === 'linkedin' ? 'noreferrer' : undefined}>{value}</a> : value}</div></div>)}</div><footer className="page-footer">© {new Date().getFullYear()} John Rey Loyogoy</footer></section>;
}

export default App;
