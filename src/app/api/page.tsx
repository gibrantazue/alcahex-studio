"use client";

import React, { useState } from "react";
import { useTranslations } from "next-intl";
import "../page/syinai-style.css";
import "../page/docs-styles.css";
import Sidebar, { NavItem } from "@/components/Sidebar";
import DesktopLanguageSwitcher from "@/components/DesktopLanguageSwitcher";

export default function ApiPage() {
  const t = useTranslations("ApiPage");
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const apiNavItems: NavItem[] = [
    { 
      id: 'api', 
      href: '/api', 
      label: t("navigation.api"), 
      isActive: true,
      onClick: () => {
        setMobileMenuOpen(false);
        window.location.href = '/api';
      }
    },
    { 
      id: 'docs', 
      href: '/docs', 
      label: t("navigation.documentation"),
      onClick: () => {
        setMobileMenuOpen(false);
        window.location.href = '/docs';
      }
    },
    { 
      id: 'blog', 
      href: '/blog', 
      label: t("navigation.blog"),
      onClick: () => {
        setMobileMenuOpen(false);
        window.location.href = '/blog';
      }
    },
    { 
      id: 'home', 
      href: '/page', 
      label: t("navigation.home"),
      onClick: () => {
        setMobileMenuOpen(false);
        window.location.href = '/page';
      }
    }
  ];


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubmitted(true);
    }
  };

  return (
    <div className="syinai-page">
      <nav className="fixed-nav">
        <div className="header-nav-pill">
          <a href="/page" className="logo-alcahex-nav">
            AlcaHEX-Studio
          </a>

          {/* Desktop Navigation */}
          <div className="desktop-nav">
            <a href="/page#home" className="nav-item">
              {t("navigation.home")}
            </a>
            <a href="/page#about" className="nav-item">
              {t("navigation.about")}
            </a>
            <a href="/docs" className="nav-item">
              {t("navigation.documentation")}
            </a>
            <a href="/blog" className="nav-item">
              {t("navigation.blog")}
            </a>
            <a href="/api" className="nav-item active">
              {t("navigation.api")}
            </a>
            <a
              href="https://beta-alcahex-studio.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="join-beta-button-nav"
            >
              {t("navigation.joinBeta")}
            </a>
          </div>

          {/* Mobile Navigation Section */}
          <div className="mobile-nav-section">
            <a
              href="https://beta-alcahex-studio.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="join-beta-button-nav"
            >
              {t("navigation.joinBetaMobile")}
            </a>
            <button 
              className="mobile-menu-button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="5" cy="12" r="2" fill="currentColor"/>
                <circle cx="12" cy="12" r="2" fill="currentColor"/>
                <circle cx="19" cy="12" r="2" fill="currentColor"/>
              </svg>
            </button>
          </div>
        </div>
      </nav>

      <main className="syinai-main">
        <section className="content-section" style={{ paddingTop: "80px" }}>
          <div className="api-container">
            <div className="api-header">
              <h1 className="api-title">{t("title")}</h1>
              <p className="api-subtitle">
                {t("subtitle")}
              </p>
            </div>

            <div className="api-status-banner">
              <div className="status-icon">🚧</div>
              <div className="status-content">
                <h3>{t("developmentStatus.title")}</h3>
                <p>
                  {t("developmentStatus.description")}
                </p>
              </div>
            </div>

            <div className="api-content">
              <div className="api-features">
                <h2>{t("features.title")}</h2>
                <div className="features-grid">
                  <div className="feature-card">
                    <div className="feature-icon">🤖</div>
                    <h4>{t("features.syinaiO1.title")}</h4>
                    <p>
                      {t("features.syinaiO1.description")}
                    </p>
                    <div className="feature-status coming-soon">
                      {t("features.comingSoon")}
                    </div>
                  </div>

                  <div className="feature-card">
                    <div className="feature-icon">⚡</div>
                    <h4>{t("features.syinaiFlash.title")}</h4>
                    <p>{t("features.syinaiFlash.description")}</p>
                    <div className="feature-status coming-soon">
                      {t("features.comingSoon")}
                    </div>
                  </div>

                  <div className="feature-card">
                    <div className="feature-icon">💎</div>
                    <h4>{t("features.syinaiPro.title")}</h4>
                    <p>{t("features.syinaiPro.description")}</p>
                    <div className="feature-status coming-soon">
                      {t("features.comingSoon")}
                    </div>
                  </div>

                  <div className="feature-card">
                    <div className="feature-icon">👨‍💻</div>
                    <h4>{t("features.codeGeneration.title")}</h4>
                    <p>{t("features.codeGeneration.description")}</p>
                    <div className="feature-status coming-soon">
                      {t("features.comingSoon")}
                    </div>
                  </div>
                </div>
              </div>

              <div className="api-pricing">
                <h2>{t("pricing.title")}</h2>
                <div className="pricing-grid">
                  <div className="pricing-card">
                    <h4>{t("pricing.freeTier.title")}</h4>
                    <div className="price">
                      {t("pricing.freeTier.price")}<span>{t("pricing.freeTier.period")}</span>
                    </div>
                    <ul>
                      {(t.raw("pricing.freeTier.features") as string[]).map((feature: string, index: number) => (
                        <li key={index}>{feature}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="pricing-card featured">
                    <div className="popular-badge">{t("pricing.pro.popular")}</div>
                    <h4>{t("pricing.pro.title")}</h4>
                    <div className="price">
                      {t("pricing.pro.price")}<span>{t("pricing.pro.period")}</span>
                    </div>
                    <ul>
                      {(t.raw("pricing.pro.features") as string[]).map((feature: string, index: number) => (
                        <li key={index}>{feature}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="pricing-card">
                    <h4>{t("pricing.enterprise.title")}</h4>
                    <div className="price">{t("pricing.enterprise.price")}</div>
                    <ul>
                      {(t.raw("pricing.enterprise.features") as string[]).map((feature: string, index: number) => (
                        <li key={index}>{feature}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <div className="api-waitlist">
                <div className="waitlist-content">
                  <h3>{t("waitlist.title")}</h3>
                  <p>
                    {t("waitlist.description")}
                  </p>

                  {!isSubmitted ? (
                    <form onSubmit={handleSubmit} className="waitlist-form">
                      <input
                        type="email"
                        placeholder={t("waitlist.placeholder")}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="waitlist-input"
                        required
                      />
                      <button type="submit" className="waitlist-btn">
                        {t("waitlist.button")}
                      </button>
                    </form>
                  ) : (
                    <div className="success-message">
                      <div className="success-icon">✅</div>
                      <h4>{t("waitlist.success.title")}</h4>
                      <p>
                        {t("waitlist.success.message")}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              <div className="api-timeline">
                <h2>{t("roadmap.title")}</h2>
                <div className="timeline">
                  <div className="timeline-item completed">
                    <div className="timeline-marker"></div>
                    <div className="timeline-content">
                      <h4>Q3 2025</h4>
                      <p>{t("roadmap.q3_2025").split(' - ')[1]}</p>
                    </div>
                  </div>

                  <div className="timeline-item current">
                    <div className="timeline-marker"></div>
                    <div className="timeline-content">
                      <h4>Q4 2025</h4>
                      <p>{t("roadmap.q4_2025").split(' - ')[1]}</p>
                    </div>
                  </div>

                  <div className="timeline-item">
                    <div className="timeline-marker"></div>
                    <div className="timeline-content">
                      <h4>Q1 2026</h4>
                      <p>{t("roadmap.q1_2026").split(' - ')[1]}</p>
                    </div>
                  </div>

                  <div className="timeline-item">
                    <div className="timeline-marker"></div>
                    <div className="timeline-content">
                      <h4>Q2 2026</h4>
                      <p>{t("roadmap.q2_2026").split(' - ')[1]}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="footer-container">
          <div className="footer-grid">
            <div className="footer-column footer-about">
              <h4 className="footer-logo">AlcaHEX-Studio</h4>
              <p>{t("footer.tagline")}</p>
            </div>
            <div className="footer-column">
              <h4>{t("footer.products")}</h4>
              <a href="/page#intro">SyinAI 1.5</a>
              <a href="/page#capabilities">Capabilities</a>
              <a href="/page#models">Models</a>
            </div>
            <div className="footer-column">
              <h4>{t("footer.resources")}</h4>
              <a href="/docs">{t("navigation.documentation")}</a>
              <a href="/blog">{t("navigation.blog")}</a>
              <a href="/api">{t("navigation.api")}</a>
            </div>
            <div className="footer-column">
              <h4>{t("footer.contact")}</h4>
              <a href="mailto:alcahex.studio@gmail.com">
                alcahex.studio@gmail.com
              </a>
            </div>
          </div>
          <div className="footer-bottom">
            <p>
              &copy; {new Date().getFullYear()} AlcaHEX-Studio. {t("footer.copyright")}
            </p>
          </div>
        </div>
      </footer>

      {/* Mobile Sidebar */}
      <Sidebar
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        navItems={apiNavItems}
        onItemClick={() => setMobileMenuOpen(false)}
      />
      
      {/* Desktop Language Switcher */}
      <DesktopLanguageSwitcher />
    </div>
  );
}
