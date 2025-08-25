"use client";

import React, { useState, useEffect } from 'react';
import Image from "next/image";
import './syinai-style.css';

export default function SyinAIPage() {
  const [activeSection, setActiveSection] = useState('home');
  const [isScrolled, setIsScrolled] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [showUpdateDate, setShowUpdateDate] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Active section logic
      const sections = ['home', 'about', 'intro', 'capabilities', 'models', 'safety', 'start'];
      const scrollPosition = window.scrollY + window.innerHeight / 2;

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(sectionId);
            break;
          }
        }
      }

      // Scrolled state logic
      setIsScrolled(window.scrollY > 30);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Run on mount to set initial state

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setSelectedImage(null);
      }
    };

    if (selectedImage) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedImage]);

  const iframeProps = {
    src: 'https://my.spline.design/ticktockinteractivelanding-EnZd3XcmuzKvhypAVRIDMR4g/',
    frameBorder: '0',
    width: '100%',
    height: '100%',
    className: 'spline-background',
    allow: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share",
    allowFullScreen: true,
    loading: "eager" as const,
    fetchPriority: "high" as any,
    referrerPolicy: "no-referrer-when-downgrade" as const,
    sandbox: "allow-scripts allow-same-origin allow-forms allow-popups allow-presentation",
  };

  return (
    <div className={`syinai-page ${isScrolled ? 'scrolled' : ''}`}>
      <nav className="fixed-nav">
        <div className="header-nav-pill">
          <span className="logo-alcahex-nav">AlcaHEX-Studio</span>
          <a href="#home" className={`nav-item ${activeSection === 'home' ? 'active' : ''}`}>Home</a>
          <a href="#about" className={`nav-item ${activeSection === 'about' ? 'active' : ''}`}>About</a>
          <a href="#intro" className={`nav-item ${activeSection === 'intro' ? 'active' : ''}`}>SyinAI 1.5</a>
          <a href="#capabilities" className={`nav-item ${activeSection === 'capabilities' ? 'active' : ''}`}>Capabilities</a>
          <a href="#models" className={`nav-item ${activeSection === 'models' ? 'active' : ''}`}>Models</a>
          <a href="#safety" className={`nav-item ${activeSection === 'safety' ? 'active' : ''}`}>Safety</a>
          <a href="#start" className={`nav-item ${activeSection === 'start' ? 'active' : ''}`}>Get Started</a>
          <button className="join-beta-button-nav">Join Beta</button>
        </div>
      </nav>

      <main className="syinai-main">
        <section id="home" className="hero-section">
          <iframe {...iframeProps}></iframe>
        </section>

        <section id="about" className="content-section">
          <div className="about-content">
            <h2 className="about-headline">
              The SyinAI ecosystem represents our <span className="highlight-blue">most capable AI.</span>
            </h2>
            <p className="about-description">
              Our SyinAI models are built from the ground up for <span className="highlight-blue">multimodality</span> — reasoning seamlessly across text, images, audio, video, and code.
            </p>
            <div className="update-container">
              <button className="latest-updates-button" onClick={() => setShowUpdateDate(!showUpdateDate)}>
                Latest updates
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 7h10v10"/><path d="M7 17 17 7"/></svg>
              </button>
              {showUpdateDate && (
                <span className="update-date">
                  August 20, 2025
                </span>
              )}
            </div>
          </div>
          
          <div className="gallery-section">
            <div className="gallery-grid">
              <div className="gallery-item" onClick={() => setSelectedImage('/AlcaHEX-informasi/1.jpg')}>
                <Image src="/AlcaHEX-informasi/1.jpg" alt="AlcaHEX AI Technology 1" fill style={{ objectFit: 'cover' }} />
              </div>
              <div className="gallery-item" onClick={() => setSelectedImage('/AlcaHEX-informasi/2.jpg')}>
                <Image src="/AlcaHEX-informasi/2.jpg" alt="AlcaHEX AI Technology 2" fill style={{ objectFit: 'cover' }} />
              </div>
              <div className="gallery-item" onClick={() => setSelectedImage('/AlcaHEX-informasi/3.jpg')}>
                <Image src="/AlcaHEX-informasi/3.jpg" alt="AlcaHEX AI Technology 3" fill style={{ objectFit: 'cover' }} />
              </div>
              <div className="gallery-item" onClick={() => setSelectedImage('/AlcaHEX-informasi/4.jpg')}>
                <Image src="/AlcaHEX-informasi/4.jpg" alt="AlcaHEX AI Technology 4" fill style={{ objectFit: 'cover' }} />
              </div>
              <div className="gallery-item" onClick={() => setSelectedImage('/AlcaHEX-informasi/5.jpg')}>
                <Image src="/AlcaHEX-informasi/5.jpg" alt="AlcaHEX AI Technology 5" fill style={{ objectFit: 'cover' }} />
              </div>
            </div>
          </div>
        </section>

        {/* Introducing SyinAI 1.5 Section */}
        <section id="intro" className="intro-section">
          <h2 className="intro-title">Introducing SyinAI 1.5</h2>
          <p className="intro-subtitle">Our next-generation model.</p>
          <p className="intro-text">
            Built to be natively multimodal and equipped with a breakthrough context window, SyinAI 1.5 is designed for a wide range of applications.
          </p>
          <button className="try-button">Try SyinAI 1.5</button>
        </section>

        {/* Capabilities Section */}
        <section id="capabilities" className="capability-section">
          <div className="capabilities-container">
            <div className="capability-item">
              <h3 className="capability-title">Reasoning about vast amounts of information</h3>
              <p className="capability-subtitle">Process and understand large documents, codebases, and more.</p>
              <div className="capability-visual">
                <div className="visual-header">
                  <span>SyinAI 1.5 Pro</span>
                  <span>1,000,000 tokens</span>
                </div>
                <div className="visual-main">
                  <span className="token-count">326,914</span>
                  <span className="token-label">tokens</span>
                  <div className="play-icon-small"></div>
                </div>
                <div className="progress-bar">
                  <div className="progress-bar-inner" style={{width: '32.7%'}}></div>
                </div>
              </div>
            </div>
            <div className="capability-item">
              <h3 className="capability-title">Better understanding across modalities</h3>
              <p className="capability-subtitle">Analyze and reason with text, images, audio, and video seamlessly.</p>
              <div className="capability-visual">
                <div className="visual-header">
                  <span>SyinAI 1.5 Pro</span>
                  <span>1,000,000 tokens</span>
                </div>
                <div className="visual-main">
                  <span className="token-count">696,417</span>
                  <span className="token-label">tokens</span>
                  <div className="play-icon-small"></div>
                </div>
                <div className="progress-bar">
                  <div className="progress-bar-inner" style={{width: '69.6%'}}></div>
                </div>
              </div>
            </div>
            <div className="capability-item">
              <h3 className="capability-title">Problem-solving with longer blocks of code</h3>
              <p className="capability-subtitle">Debug and explain complex algorithms and codebases.</p>
              <div className="capability-visual">
                <div className="visual-header">
                  <span>SyinAI 1.5 Pro</span>
                  <span>1,000,000 tokens</span>
                </div>
                <div className="visual-main">
                  <span className="token-count">816,767</span>
                  <span className="token-label">tokens</span>
                  <div className="play-icon-small"></div>
                </div>
                <div className="progress-bar">
                  <div className="progress-bar-inner" style={{width: '81.7%'}}></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Model Sizes Section */}
        <section id="models" className="model-sizes-section">
          <h2 className="sizes-title">SyinAI comes in three model sizes</h2>
          <div className="sizes-container">
            <div className="size-card">
              <div className="size-icon ultra">Ultra</div>
              <p className="size-description">Our largest and most capable model for highly complex tasks.</p>
            </div>
            <div className="size-card">
              <div className="size-icon pro">Pro</div>
              <p className="size-description">Our best model for scaling across a wide range of tasks.</p>
            </div>
            <div className="size-card">
              <div className="size-icon nano">Nano</div>
              <p className="size-description">Our most efficient model for on-device tasks.</p>
            </div>
          </div>
        </section>

        {/* Performance Section */}
        <section className="performance-section">
          <h2 className="performance-title">Meet the first version of SyinAI — our most capable AI model.</h2>
          <div className="performance-graph">
            {/* Placeholder for graph */}
            <div className="graph-line"></div>
            <span className="graph-label start">86.4%</span>
            <span className="graph-label end">90.0%</span>
            <p className="graph-description">SyinAI Ultra&apos;s performance on MMLU, a comprehensive benchmark for AI knowledge and reasoning.</p>
          </div>
        </section>

        {/* Benchmark Section */}
        <section className="benchmark-section">
          <h3 className="benchmark-title">SyinAI Ultra is the first model to outperform human experts on MMLU.</h3>
          <div className="benchmark-table">
            {/* This is a simplified representation of the table */}
            <div className="table-row header">
              <span>Benchmark</span>
              <span>Discipline</span>
              <span>SyinAI Ultra</span>
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
        </section>

        {/* Safety Section */}
        <section id="safety" className="safety-section">
          <div className="safety-content">
            <h2 className="safety-title">Safety</h2>
            <p className="safety-text">Building AI responsibly is at the core of our mission. We&apos;re committed to developing and deploying our models with safety at the forefront.</p>
            <button className="safety-button">Learn about our safety approach</button>
          </div>
        </section>

        {/* Get Started Section */}
        <section id="start" className="start-section">
          <h2 className="start-title">Get started with SyinAI</h2>
          <p className="start-subtitle">Build with our most capable models.</p>
          <div className="start-buttons">
            <button className="start-button primary">Get API key</button>
            <button className="start-button secondary">Read documentation</button>
          </div>
        </section>

      </main>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div className="lightbox-overlay" onClick={() => setSelectedImage(null)}>
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <button className="lightbox-close" onClick={() => setSelectedImage(null)} aria-label="Close image view">&times;</button>
            <div className="lightbox-image-container">
              <Image src={selectedImage} alt="Enlarged view" fill style={{ objectFit: 'contain' }} priority />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

