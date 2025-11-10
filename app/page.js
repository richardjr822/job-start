import Image from 'next/image';
import Link from 'next/link';
import styles from './page.module.css';
import Header from '@/app/components/Header';

const ProfileIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
);

const JobIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg>
);

const NotifyIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>
);


export default function LandingPage() {
  return (
    <>
      <Header />

      {/* === HERO SECTION (Main Content) === */}
      <main className={styles.mainContent}>
        <h1>Welcome to Job Start</h1>
        <p className={styles.subheadline}>
          Job Start connects you with quick, short-term jobs in your neighborhood.
          No resumes, no long applications. Just real work, right now. <br/>
          <strong>Find Flexible Work in Your Community. Today.</strong>
        </p>
        <Link href="/auth/signup" className={styles.ctaButton}>
          Get Started
        </Link>      
      </main>

      {/* === ABOUT SECTION === */}
      <section id="about-section" className={`${styles.pageSection} ${styles.aboutSection}`}>
        <div className={styles.aboutContainer}>
          <h2 className={styles.sectionTitle}>About Job Start</h2>
          <p className={styles.sectionDescription}>
            We are dedicated to building a stronger community by connecting people
            with opportunity. Job Start is the bridge between your skills and your
            next paycheck.
          </p>
          <div className={styles.aboutContent}>
            <div className={styles.aboutCard}>
              <div className={styles.aboutText}>
                <h3 className={styles.sectionSubtitle}>Our Mission</h3>
                <p>
                  This website aims to link unemployed individuals with quick, short-term
                  jobs in their neighborhoods. We emphasize ease of use and accessibility,
                  so there’s no need for formal resumes or long hiring processes.
                </p>
              </div>
            </div>
            <div className={styles.aboutCard}>
              <div className={styles.aboutText}>
                <h3 className={styles.sectionSubtitle}>Our Goals</h3>
                <ul className={styles.goalList}>
                  <li>Design a user-friendly web app for quick, local job matching.</li>
                  <li>Provide an alternative to traditional resumes, focusing on skills.</li>
                  <li>Create an efficient platform for job posting and browsing.</li>
                  <li>Boost economic participation and strengthen local support networks.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* === FEATURES SECTION === */}
      <section id="features-section" className={`${styles.pageSection} ${styles.featuresSection}`}>
        <div className={styles.featuresHeader}>
          <h2 className={styles.sectionTitle}>Features That Connect You</h2>
          <p className={styles.sectionDescription}>
            We built Job Start with simple, powerful tools to get you working.
          </p>
        </div>
        <div className={styles.cardGrid}>
          <div className={styles.card}>
            <div className={styles.cardIcon}><ProfileIcon /></div>
            <h3 className={styles.cardTitle}>User Profiles, Not Resumes</h3>
            <p className={styles.cardText}>
              Create a role-based account as a Job Seeker or Client. Showcase your
              skills, past experiences, and a photo. No formal resume required.
            </p>
          </div>
          <div className={styles.card}>
            <div className={styles.cardIcon}><JobIcon /></div>
            <h3 className={styles.cardTitle}>Easy Job Posting & Browsing</h3>
            <p className={styles.cardText}>
              Clients post jobs with clear details: title, description, location,
              and budget. Job Seekers browse listings with powerful filters.
            </p>
          </div>
          <div className={styles.card}>
            <div className={styles.cardIcon}><NotifyIcon /></div>
            <h3 className={styles.cardTitle}>Trust, Safety & Notifications</h3>
            <p className={styles.cardText}>
              Get real-time notifications for job approvals. User verification, 
              ratings, and reviews build trust and credibility for everyone.
            </p>
          </div>
        </div>
      </section>

      {/* === FOOTER === */}
      <footer className={styles.footer}>
        <p>&copy; {new Date().getFullYear()} JobStart. All rights reserved.</p>
      </footer>
    </>
  );
}