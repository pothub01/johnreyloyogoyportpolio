import React from 'react';
import './sample.css';

const samples = {
  '/samples/olive-garden': {
    className: 'olive',
    title: 'invite you to the olive garden',
    monogram: 'M & J',
    eyebrow: 'Together with their families',
    message: 'to celebrate the beginning of their forever.',
    date: 'Saturday, September 14, 2024',
    details: <>at half past four in the afternoon<br />Villa Verde · Napa Valley</>,
    action: 'Kindly RSVP',
    subject: 'RSVP M and J',
  },
  '/samples/sunday-in-capri': {
    className: 'capri',
    title: 'Sunday in Capri',
    monogram: 'C & A',
    eyebrow: 'A weekend by the sea',
    message: 'Join us for a sunny little celebration of love, laughter, and the Mediterranean.',
    date: 'June 22 · 2025',
    details: <>The Villa San Michele<br />Anacapri, Italy</>,
    action: 'Save your seat',
    subject: 'RSVP C and A',
  },
  '/samples/midnight-toast': {
    className: 'night',
    title: 'Midnight Toast',
    monogram: '25',
    eyebrow: 'Come raise a glass',
    message: 'A birthday celebration under the stars. Dress up, stay late, and bring your best story.',
    date: 'Friday, October 18 · 8 PM',
    details: <>The Lantern Room<br />Brooklyn, New York</>,
    action: 'RSVP by October 1',
    subject: 'RSVP Midnight Toast',
  },
};

export default function SampleInvitation({ path }) {
  const sample = samples[path] || samples['/samples/olive-garden'];

  return (
    <main className={`sample-page ${sample.className}`}>
      <a className="sample-back" href="/">← Vow &amp; Vine</a>
      <section className="sample-card">
        <span className="sample-leaf sample-leaf-one">❧</span>
        <span className="sample-leaf sample-leaf-two">❧</span>
        <div className="sample-monogram">{sample.monogram}</div>
        <div className="sample-eyebrow">{sample.eyebrow}</div>
        <h1>{sample.title.includes('garden') ? <>invite you to<br />the olive garden</> : sample.title.includes('Capri') ? <>Sunday<br />in Capri</> : <>Midnight<br />Toast</>}</h1>
        <p>{sample.message}</p>
        <div className="sample-date">{sample.date}</div>
        <div className="sample-details">{sample.details}</div>
        <a className="sample-rsvp" href={`mailto:rsvp@example.com?subject=${encodeURIComponent(sample.subject)}`}>{sample.action}</a>
      </section>
    </main>
  );
}
