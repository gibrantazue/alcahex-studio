"use client";

import React, { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import "./syinai-style.css";
import Sidebar, { NavItem } from "../../components/Sidebar";
import DesktopLanguageSwitcher from "../../components/DesktopLanguageSwitcher";

export default function SyinAIPage() {
  const t = useTranslations("LandingPage");
  const [activeSection, setActiveSection] = useState("home");
  const [isScrolled, setIsScrolled] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    const scrollers = document.querySelectorAll(".scroller");

    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      addAnimation();
    }

    function addAnimation() {
      scrollers.forEach((scroller) => {
        scroller.setAttribute("data-animated", "true");

        const scrollerInner = scroller.querySelector(".scroller__inner");
        if (scrollerInner) {
          const scrollerContent = Array.from(scrollerInner.children);

          scrollerContent.forEach((item) => {
            const duplicatedItem = item.cloneNode(true) as HTMLElement;
            duplicatedItem.setAttribute("aria-hidden", "true");
            scrollerInner.appendChild(duplicatedItem);
          });
        }
      });
    }
  }, []);

  const [showUpdateDate, setShowUpdateDate] = useState(false);
  const [playingModel, setPlayingModel] = useState<string | null>(null);
  const [animationTrigger, setAnimationTrigger] = useState<string | null>(null);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    setTimeout(() => {
      document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth' });
    }, 300); // Delay to allow sidebar to close
  };

  const mainNavItems: NavItem[] = [
    { 
      id: 'home',
      href: '#home', 
      label: t("navHome"), 
      isActive: activeSection === 'home', 
      onClick: (e) => e && handleLinkClick(e, 'home') 
    },
    { 
      id: 'intro',
      href: '#intro', 
      label: t("navIntro"), 
      isActive: activeSection === 'intro', 
      onClick: (e) => e && handleLinkClick(e, 'intro') 
    },
    { 
      id: 'capabilities',
      href: '#capabilities', 
      label: t("navCapabilities"), 
      isActive: activeSection === 'capabilities', 
      onClick: (e) => e && handleLinkClick(e, 'capabilities') 
    },
    { 
      id: 'models',
      href: '#models', 
      label: t("navModels"), 
      isActive: activeSection === 'models', 
      onClick: (e) => e && handleLinkClick(e, 'models') 
    },
    { 
      id: 'start',
      href: '#start', 
      label: t("navGetApi"), 
      isActive: activeSection === 'start', 
      onClick: (e) => e && handleLinkClick(e, 'start') 
    },
    {
      id: 'join-beta',
      href: 'https://beta-alcahex-studio.vercel.app/',
      label: t("navJoinBeta"),
      isExternal: true,
      isButton: true,
      onClick: () => setMobileMenuOpen(false)
    }
  ];

  // Close mobile menu when clicking outside - TEMPORARILY DISABLED FOR DEBUGGING
  // useEffect(() => {
  //   const handleClickOutside = (event: MouseEvent) => {
  //     const target = event.target as HTMLElement;
  //     if (mobileMenuOpen && !target.closest('.header-nav-pill')) {
  //       setMobileMenuOpen(false);
  //     }
  //   };

  //   document.addEventListener('mousedown', handleClickOutside);
  //   return () => {
  //     document.removeEventListener('mousedown', handleClickOutside);
  //   };
  // }, [mobileMenuOpen]);

  useEffect(() => {
    const handleScroll = () => {
      // Active section logic
      const sections = [
        "home",
        "about",
        "intro",
        "capabilities",
        "models",
        "start",
      ];
      const scrollPosition = window.scrollY + window.innerHeight / 2;

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(sectionId);
            break;
          }
        }
      }

      // Scrolled state logic
      setIsScrolled(window.scrollY > 30);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Run on mount to set initial state

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSelectedImage(null);
      }
    };

    if (selectedImage) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedImage]);

  const handlePlayClick = (modelName: string) => {
    setPlayingModel(modelName);
    setAnimationTrigger(modelName);

    // Reset animation after 3 seconds
    setTimeout(() => {
      setPlayingModel(null);
      setAnimationTrigger(null);
    }, 3000);
  };

  const iframeProps = {
    src: "https://my.spline.design/ticktockinteractivelanding-EnZd3XcmuzKvhypAVRIDMR4g/",
    frameBorder: "0",
    width: "100%",
    height: "100%",
    className: "spline-background",
    allow:
      "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share",
    allowFullScreen: true,
    loading: "eager" as const,
    fetchPriority: "high" as any,
    referrerPolicy: "no-referrer-when-downgrade" as const,
    sandbox:
      "allow-scripts allow-same-origin allow-forms allow-popups allow-presentation",
  };

  return (
    <div className={`syinai-page ${isScrolled ? "scrolled" : ""}`}>
      <nav className="fixed-nav">
        <div className="header-nav-pill">
          <span className="logo-alcahex-nav">AlcaHEX-Studio</span>
          
          {/* Desktop Navigation */}
          <div className="desktop-nav">
            <a
              href="#home"
              className={`nav-item ${activeSection === "home" ? "active" : ""}`}
            >
              {t("navHome")}
            </a>
            <a
              href="#about"
              className={`nav-item ${activeSection === "about" ? "active" : ""}`}
            >
              {t("navAbout")}
            </a>
            <a
              href="#intro"
              className={`nav-item ${activeSection === "intro" ? "active" : ""}`}
            >
              {t("navIntro")}
            </a>
            <a
              href="#capabilities"
              className={`nav-item ${activeSection === "capabilities" ? "active" : ""}`}
            >
              {t("navCapabilities")}
            </a>
            <a
              href="#models"
              className={`nav-item ${activeSection === "models" ? "active" : ""}`}
            >
              {t("navModels")}
            </a>
            <a
              href="#start"
              className={`nav-item ${activeSection === "start" ? "active" : ""}`}
            >
              {t("navGetApi")}
            </a>
            <a
              href="https://beta-alcahex-studio.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="join-beta-button-nav"
            >
              {t("navJoinBeta")}
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
              {t("navJoinBeta")}
            </a>
            <button 
              className="mobile-menu-button"
              onClick={() => {
                console.log('Toggling mobile menu. Current state:', mobileMenuOpen, 'New state:', !mobileMenuOpen);
                setMobileMenuOpen(!mobileMenuOpen)
              }}
              aria-label="Toggle menu"
              type="button"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="5" cy="12" r="2" fill="currentColor"/>
                <circle cx="12" cy="12" r="2" fill="currentColor"/>
                <circle cx="19" cy="12" r="2" fill="currentColor"/>
              </svg>
            </button>
          </div>


        </div>
      </nav>

      <main className="syinai-main">
        <section id="home" className="hero-section">
          <iframe {...iframeProps}></iframe>
          
          {/* Mobile Hero Content */}
          <div className="mobile-hero-content">
            <div className="mobile-hero-text">
              <h1 className="mobile-hero-title">ALCAHEX</h1>
              <p className="mobile-hero-subtitle">
                {t.rich("aboutHeadline", {
                  highlight: (chunks) => (
                    <span className="highlight-blue">{chunks}</span>
                  ),
                })}
              </p>
              <p className="mobile-hero-description">
                {t.rich("aboutDescription", {
                  highlight: (chunks) => (
                    <span className="highlight-blue">{chunks}</span>
                  ),
                })}
              </p>
              <div className="mobile-hero-buttons">
                <a 
                  href="https://beta-alcahex-studio.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mobile-cta-primary"
                >
                  {t("navJoinBeta")}
                </a>
              </div>
            </div>
          </div>
        </section>

        <section id="about" className="content-section">
          <div className="about-content">
            <h2 className="about-headline">
              {t.rich("aboutHeadline", {
                highlight: (chunks) => (
                  <span className="highlight-blue">{chunks}</span>
                ),
              })}
            </h2>
            <p className="about-description">
              {t.rich("aboutDescription", {
                highlight: (chunks) => (
                  <span className="highlight-blue">{chunks}</span>
                ),
              })}
            </p>
            <div className="update-container">
              <button
                className="latest-updates-button"
                onClick={() => setShowUpdateDate(!showUpdateDate)}
              >
                {t("latestUpdates")}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M7 7h10v10" />
                  <path d="M7 17 17 7" />
                </svg>
              </button>
              {showUpdateDate && (
                <span className="update-date">{t("updateDate")}</span>
              )}
            </div>
          </div>

          <div className="gallery-section">
            <div className="gallery-grid">
              <div
                className="gallery-item"
                onClick={() => setSelectedImage("/AlcaHEX-informasi/1.jpg")}
              >
                <Image
                  src="/AlcaHEX-informasi/1.jpg"
                  alt="AlcaHEX AI Technology 1"
                  fill
                  style={{ objectFit: "cover" }}
                />
              </div>
              <div
                className="gallery-item"
                onClick={() => setSelectedImage("/AlcaHEX-informasi/2.jpg")}
              >
                <Image
                  src="/AlcaHEX-informasi/2.jpg"
                  alt="AlcaHEX AI Technology 2"
                  fill
                  style={{ objectFit: "cover" }}
                />
              </div>
              <div
                className="gallery-item"
                onClick={() => setSelectedImage("/AlcaHEX-informasi/3.jpg")}
              >
                <Image
                  src="/AlcaHEX-informasi/3.jpg"
                  alt="AlcaHEX AI Technology 3"
                  fill
                  style={{ objectFit: "cover" }}
                />
              </div>
              <div
                className="gallery-item"
                onClick={() => setSelectedImage("/AlcaHEX-informasi/4.jpg")}
              >
                <Image
                  src="/AlcaHEX-informasi/4.jpg"
                  alt="AlcaHEX AI Technology 4"
                  fill
                  style={{ objectFit: "cover" }}
                />
              </div>
              <div
                className="gallery-item"
                onClick={() => setSelectedImage("/AlcaHEX-informasi/5.jpg")}
              >
                <Image
                  src="/AlcaHEX-informasi/5.jpg"
                  alt="AlcaHEX AI Technology 5"
                  fill
                  style={{ objectFit: "cover" }}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Introducing SyinAI 1.5 Section */}
        <section id="intro" className="intro-section">
          <div className="intro-light-effects">
            <div className="light-orb light-orb-1"></div>
            <div className="light-orb light-orb-2"></div>
            <div className="light-orb light-orb-3"></div>
            <div className="light-beam light-beam-2"></div>
          </div>
          <div className="intro-content">
            <h2 className="intro-title">{t("introTitle")}</h2>
            <p className="intro-subtitle">{t("introSubtitle")}</p>
            <p className="intro-text">{t("introText")}</p>
            <a
              href="https://beta-alcahex-studio.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="try-button"
            >
              {t("tryButton")}
            </a>
          </div>
        </section>

        {/* Capabilities Section */}
        <section id="capabilities" className="capability-section">
          <div className="capability-section-content">
            <div className="capability-header">
              <h2 className="capability-main-title">
                {t("capabilitiesTitle")}
              </h2>
              <p className="capability-main-subtitle">
                {t("capabilitiesSubtitle")}
              </p>
            </div>
            <div className="capabilities-container">
              <div
                className={`capability-item ${playingModel === "syin-o1" ? "active-playing" : ""}`}
              >
                <h3 className="capability-title">{t("reasoningTitle")}</h3>
                <p className="capability-subtitle">
                  {t("reasoningDescription")}
                </p>
                <div className="capability-visual">
                  <div className="visual-header">
                    <span className="model-name">Syin o1</span>
                    <span className="token-limit">1,000,000 tokens</span>
                  </div>
                  <div className="visual-main">
                    <span className="token-count">326,914</span>
                    <span className="token-label">tokens</span>
                    <div
                      className={`play-icon-small ${playingModel === "syin-o1" ? "playing" : ""} ${animationTrigger === "syin-o1" ? "animate" : ""}`}
                      onClick={() => handlePlayClick("syin-o1")}
                    ></div>
                  </div>
                  <div className="progress-bar">
                    <div
                      className="progress-bar-inner"
                      style={{ width: "32.7%" }}
                    ></div>
                  </div>
                </div>
              </div>
              <div
                className={`capability-item ${playingModel === "syin-1.5-pro" ? "active-playing" : ""}`}
              >
                <h3 className="capability-title">{t("multimodalTitle")}</h3>
                <p className="capability-subtitle">
                  {t("multimodalDescription")}
                </p>
                <div className="capability-visual">
                  <div className="visual-header">
                    <span className="model-name">Syin 1.5 Flash</span>
                    <span className="token-limit">1,000,000 tokens</span>
                  </div>
                  <div className="visual-main">
                    <span className="token-count">696,417</span>
                    <span className="token-label">tokens</span>
                    <div
                      className={`play-icon-small ${playingModel === "syin-1.5-pro" ? "playing" : ""} ${animationTrigger === "syin-1.5-pro" ? "animate" : ""}`}
                      onClick={() => handlePlayClick("syin-1.5-pro")}
                    ></div>
                  </div>
                  <div className="progress-bar">
                    <div
                      className="progress-bar-inner"
                      style={{ width: "69.6%" }}
                    ></div>
                  </div>
                </div>
              </div>
              <div
                className={`capability-item ${playingModel === "syin-coder" ? "active-playing" : ""}`}
              >
                <h3 className="capability-title">{t("codingTitle")}</h3>
                <p className="capability-subtitle">{t("codingDescription")}</p>
                <div className="capability-visual">
                  <div className="visual-header">
                    <span className="model-name">Syin 1.5 Pro</span>
                    <span className="token-limit">1,000,000 tokens</span>
                  </div>
                  <div className="visual-main">
                    <span className="token-count">816,767</span>
                    <span className="token-label">tokens</span>
                    <div
                      className={`play-icon-small ${playingModel === "syin-coder" ? "playing" : ""} ${animationTrigger === "syin-coder" ? "animate" : ""}`}
                      onClick={() => handlePlayClick("syin-coder")}
                    ></div>
                  </div>
                  <div className="progress-bar">
                    <div
                      className="progress-bar-inner"
                      style={{ width: "81.7%" }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Model Sizes Section */}
        <section id="models" className="model-sizes-section">
          <div className="aurora-background">
            <div className="aurora-orb aurora-orb-1"></div>
            <div className="aurora-orb aurora-orb-2"></div>
            <div className="aurora-orb aurora-orb-3"></div>
            <div className="aurora-orb aurora-orb-4"></div>
          </div>
          <div className="models-content-wrapper">
            <div className="models-left-column">
              <h2 className="sizes-title">{t("modelsTitle")}</h2>
              <div className="sizes-container">
                <div className="size-card">
                  <div className="size-icon ultra">Syin o1</div>
                  <p className="size-description">{t("ultraDescription")}</p>
                </div>
                <div className="size-card">
                  <div className="size-icon pro">Syin 1.5 Flash</div>
                  <p className="size-description">{t("proDescription")}</p>
                </div>
                <div className="size-card">
                  <div className="size-icon nano">Syin 1.5 Pro</div>
                  <p className="size-description">{t("nanoDescription")}</p>
                </div>
              </div>
              <div className="performance-metrics">
                <div className="metric-card">
                  <h3 className="metric-title">{t("mmluPerformance")}</h3>
                  <div className="metric-value">90.0%</div>
                  <p className="metric-description">{t("mmluDescription")}</p>
                </div>
                <div className="metric-card">
                  <h3 className="metric-title">{t("responseSpeed")}</h3>
                  <div className="metric-value">2.3s</div>
                  <p className="metric-description">
                    {t("responseSpeedDescription")}
                  </p>
                </div>
                <div className="metric-card">
                  <h3 className="metric-title">{t("codeAccuracy")}</h3>
                  <div className="metric-value">94.4%</div>
                  <p className="metric-description">
                    {t("codeAccuracyDescription")}
                  </p>
                </div>
              </div>
            </div>
            <div className="models-right-column">
              <div className="benchmark-comparison">
                <h3 className="benchmark-subtitle">
                  {t("benchmarkComparison")}
                </h3>
                <div className="benchmark-table">
                  <div className="table-row header">
                    <span>Benchmark</span>
                    <span>Kategori</span>
                    <span>Syin 1.5 pro</span>
                    <span>GPT-4</span>
                  </div>
                  <div className="table-row">
                    <span>MMLU</span>
                    <span>General</span>
                    <span className="highlight">90.0%</span>
                    <span>86.4%</span>
                  </div>
                  <div className="table-row">
                    <span>GSM8K</span>
                    <span>Math</span>
                    <span className="highlight">94.4%</span>
                    <span>92.0%</span>
                  </div>
                  <div className="table-row">
                    <span>HumanEval</span>
                    <span>Code</span>
                    <span className="highlight">74.4%</span>
                    <span>67.0%</span>
                  </div>
                  <div className="table-row">
                    <span>MATH</span>
                    <span>Math</span>
                    <span className="highlight">53.2%</span>
                    <span>52.9%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Get Started Section */}
        <section id="start" className="start-section">
          <div className="start-content-overlay">
            <h2 className="start-title">{t("startTitle")}</h2>
            <p className="start-subtitle">{t("startSubtitle")}</p>
            <div className="start-buttons">
              <a 
                href="/api" 
                className="start-button primary"
                onClick={(e) => {
                  e.preventDefault();
                  window.location.href = '/api';
                }}
              >
                {t("getApiKey")}
              </a>
              <a 
                href="/docs" 
                className="start-button secondary"
                onClick={(e) => {
                  e.preventDefault();
                  window.location.href = '/docs';
                }}
              >
                {t("readDocs")}
              </a>
            </div>
          </div>

          {/* Sponsor Section */}
          <div id="sponsors" className="sponsor-section">
            <h3 className="sponsor-title">{t("sponsorsTitle")}</h3>
            <div className="scroller" data-speed="slow">
              <ul className="tag-list scroller__inner">
                <Image
                  src="/sponsors/google.svg"
                  alt="Google"
                  width={120}
                  height={40}
                  style={{ objectFit: "contain" }}
                />
                <Image
                  src="/sponsors/microsoft.svg"
                  alt="Microsoft"
                  width={120}
                  height={40}
                  style={{ objectFit: "contain" }}
                />
                <Image
                  src="/sponsors/meta.png"
                  alt="Meta"
                  width={120}
                  height={40}
                  style={{ objectFit: "contain" }}
                />
                <Image
                  src="/sponsors/openai.png"
                  alt="OpenAI"
                  width={120}
                  height={40}
                  style={{ objectFit: "contain" }}
                />
                <Image
                  src="/sponsors/nvidia.png"
                  alt="NVIDIA"
                  width={120}
                  height={40}
                  style={{ objectFit: "contain" }}
                />
                <Image
                  src="/sponsors/intel.png"
                  alt="Intel"
                  width={120}
                  height={40}
                  style={{ objectFit: "contain" }}
                />
                <Image
                  src="/sponsors/alctrazz.png"
                  alt="alctrazz"
                  width={120}
                  height={40}
                  style={{ objectFit: "contain" }}
                />
                <Image
                  src="/sponsors/alcahex.png"
                  alt="alcahex"
                  width={120}
                  height={40}
                  style={{ objectFit: "contain" }}
                />
                <Image
                  src="/sponsors/syinai.png"
                  alt="syinai"
                  width={120}
                  height={40}
                  style={{ objectFit: "contain" }}
                />
              </ul>
            </div>
          </div>
        </section>
      </main>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div
          className="lightbox-overlay"
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="lightbox-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="lightbox-close"
              onClick={() => setSelectedImage(null)}
              aria-label="Close image view"
            >
              &times;
            </button>
            <div className="lightbox-image-container">
              <Image
                src={selectedImage}
                alt="Enlarged view"
                fill
                style={{ objectFit: "contain" }}
                priority
              />
            </div>
          </div>
        </div>
      )}

      <footer className="site-footer">
        <div className="footer-container">
          <div className="footer-grid">
            <div className="footer-column footer-about">
              <h4 className="footer-logo">AlcaHEX-Studio</h4>
              <p>{t("footerSlogan")}</p>
            </div>
            <div className="footer-column">
              <h4>{t("footerProducts")}</h4>
              <a href="#intro">SyinAI 1.5</a>
              <a href="#capabilities">Capabilities</a>
              <a href="#models">Models</a>
            </div>
            <div className="footer-column">
              <h4>{t("footerResources")}</h4>
              <a href="/docs">Documentation</a>
              <a href="/blog">Blog</a>
              <a href="/api">API</a>
            </div>
            <div className="footer-column">
              <h4>{t("footerContact")}</h4>
              <a href="mailto:alcahex.studio@gmail.com" className="footer-email-link">
                alcahex.studio@gmail.com
              </a>
            </div>
          </div>
          <div className="footer-bottom">
            <p>
              &copy; {new Date().getFullYear()} AlcaHEX-Studio.{" "}
              {t("footerRights")}
            </p>
            <div className="footer-bottom-links">
              <a href="https://beta-alcahex-studio.vercel.app/" target="_blank" rel="noopener noreferrer">{t("footerPrivacy")}</a>
              <a href="https://beta-alcahex-studio.vercel.app/" target="_blank" rel="noopener noreferrer">{t("footerTerms")}</a>
            </div>
          </div>
        </div>
      </footer>
      <Sidebar 
        isOpen={mobileMenuOpen} 
        onClose={() => setMobileMenuOpen(false)} 
        navItems={mainNavItems} 
      />
      
      {/* Desktop Language Switcher */}
      <DesktopLanguageSwitcher />
    </div>
  );
}
