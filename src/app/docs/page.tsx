"use client";

import React, { useState } from "react";
import { useTranslations } from "next-intl";
import "../page/syinai-style.css";
import "../page/docs-styles.css";
import Sidebar, { NavItem } from "@/components/Sidebar";
import DesktopLanguageSwitcher from "@/components/DesktopLanguageSwitcher";

export default function DocsPage() {
  const t = useTranslations("DocsPage");
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const docsNavItems: NavItem[] = [
    { 
      id: 'docs', 
      href: '/docs', 
      label: 'Documentation', 
      isActive: true,
      onClick: () => {
        setMobileMenuOpen(false);
        window.location.href = '/docs';
      }
    },
    { 
      id: 'blog', 
      href: '/blog', 
      label: 'Blog',
      onClick: () => {
        setMobileMenuOpen(false);
        window.location.href = '/blog';
      }
    },
    { 
      id: 'api', 
      href: '/api', 
      label: 'API',
      onClick: () => {
        setMobileMenuOpen(false);
        window.location.href = '/api';
      }
    },
    { 
      id: 'home', 
      href: '/page', 
      label: 'Home',
      onClick: () => {
        setMobileMenuOpen(false);
        window.location.href = '/page';
      }
    }
  ];

  const handleGuideClick = (guide: string) => {
    setActiveSection(guide);
  };

  const handleCardClick = (cardType: string) => {
    setActiveSection(cardType);
  };

  const renderDocumentationContent = () => {
    if (!activeSection) return null;

    const content = {
      quickstart: {
        title: t("content.quickstart.title"),
        content: (
          <div className="doc-content">
            <h2>{t("content.quickstart.gettingStarted")}</h2>
            <p>{t("content.quickstart.welcome")}</p>
            
            <h3>{t("content.quickstart.installationTitle")}</h3>
            <div className="code-block">
              <pre><code>npm install alcahex-studio
# or
yarn add alcahex-studio</code></pre>
            </div>

            <h3>{t("content.quickstart.basicSetupTitle")}</h3>
            <p>{t("content.quickstart.basicSetupDesc")}</p>
            <div className="code-block">
              <pre><code>{`import AlcaHEX from 'alcahex-studio';

const studio = new AlcaHEX({
  apiKey: 'your-api-key',
  model: 'syinai-1.5'
});`}</code></pre>
            </div>

            <h3>{t("content.quickstart.firstRequestTitle")}</h3>
            <p>{t("content.quickstart.firstRequestDesc")}</p>
            <div className="code-block">
              <pre><code>{`const response = await studio.generate({
  prompt: "Hello, AlcaHEX!",
  maxTokens: 100
});

console.log(response.text);`}</code></pre>
            </div>
          </div>
        )
      },
      api: {
        title: t("content.api.title"),
        content: (
          <div className="doc-content">
            <h2>{t("content.api.title")}</h2>
            <p>{t("content.api.description")}</p>

            <h3>{t("content.api.authenticationTitle")}</h3>
            <p>{t("content.api.authenticationDesc")}</p>
            <div className="code-block">
              <pre><code>Authorization: Bearer YOUR_API_KEY</code></pre>
            </div>

            <h3>{t("content.api.generateTextTitle")}</h3>
            <p><strong>POST</strong> <code>/api/v1/generate</code></p>
            <div className="code-block">
              <pre><code>{`{
  "prompt": "Your input text",
  "model": "syinai-1.5",
  "maxTokens": 150,
  "temperature": 0.7
}`}</code></pre>
            </div>

            <h3>{t("content.api.responseFormatTitle")}</h3>
            <div className="code-block">
              <pre><code>{`{
  "id": "gen_123456",
  "text": "Generated response",
  "usage": {
    "promptTokens": 10,
    "completionTokens": 25,
    "totalTokens": 35
  }
}`}</code></pre>
            </div>
          </div>
        )
      },
      examples: {
        title: t("content.examples.title"),
        content: (
          <div className="doc-content">
            <h2>{t("content.examples.title")}</h2>
            <p>{t("content.examples.description")}</p>

            <h3>{t("content.examples.chatbotTitle")}</h3>
            <div className="code-block">
              <pre><code>{`import { AlcaHEX } from 'alcahex-studio';

class Chatbot {
  constructor(apiKey) {
    this.studio = new AlcaHEX({ apiKey });
    this.conversation = [];
  }

  async chat(message) {
    this.conversation.push({ role: 'user', content: message });
    
    const response = await this.studio.generate({
      messages: this.conversation,
      model: 'syinai-1.5'
    });
    
    this.conversation.push({ role: 'assistant', content: response.text });
    return response.text;
  }
}`}</code></pre>
            </div>

            <h3>{t("content.examples.contentGenerationTitle")}</h3>
            <div className="code-block">
              <pre><code>{`const generateBlogPost = async (topic) => {
  const response = await studio.generate({
    prompt: \`Write a blog post about \${topic}\`,
    maxTokens: 500,
    temperature: 0.8
  });
  
  return response.text;
};`}</code></pre>
            </div>
          </div>
        )
      },
      sdk: {
        title: t("content.sdk.title"),
        content: (
          <div className="doc-content">
            <h2>{t("content.sdk.title")}</h2>
            <p>{t("content.sdk.description")}</p>

            <h3>{t("content.sdk.officialSDKsTitle")}</h3>
            <ul>
              <li><strong>JavaScript/TypeScript</strong> - npm install alcahex-studio</li>
              <li><strong>Python</strong> - pip install alcahex-studio</li>
              <li><strong>Go</strong> - go get github.com/alcahex/studio-go</li>
              <li><strong>Java</strong> - Maven/Gradle support</li>
            </ul>

            <h3>{t("content.sdk.developmentToolsTitle")}</h3>
            <ul>
              <li><strong>CLI Tool</strong> - Command line interface for quick testing</li>
              <li><strong>Playground</strong> - Web-based testing environment</li>
              <li><strong>VS Code Extension</strong> - IDE integration</li>
              <li><strong>Postman Collection</strong> - API testing templates</li>
            </ul>

            <h3>{t("content.sdk.cliUsageTitle")}</h3>
            <div className="code-block">
              <pre><code>npx alcahex-studio init
alcahex generate &quot;Hello world&quot; --model syinai-1.5
alcahex test --endpoint /api/v1/generate</code></pre>
            </div>
          </div>
        )
      },
      models: {
        title: t("content.models.title"),
        content: (
          <div className="doc-content">
            <h2>{t("content.models.title")}</h2>
            <p>{t("content.models.description")}</p>

            <h3>{t("content.models.syinaiTitle")}</h3>
            <div className="model-info">
              <p><strong>{t("content.models.modelInfo.type")}</strong> {t("content.models.modelInfo.llm")}</p>
              <p><strong>{t("content.models.modelInfo.contextLength")}</strong> 8,192 {t("content.models.modelInfo.tokens")}</p>
              <p><strong>{t("content.models.modelInfo.bestFor")}</strong> {t("content.models.modelInfo.generalText")}</p>
              <p><strong>{t("content.models.modelInfo.languages")}</strong> {t("content.models.modelInfo.multiLanguage")}</p>
            </div>

            <h3>{t("content.models.modelComparisonTitle")}</h3>
            <table className="model-table">
              <thead>
                <tr>
                  <th>{t("content.models.tableHeaders.model")}</th>
                  <th>{t("content.models.tableHeaders.context")}</th>
                  <th>{t("content.models.tableHeaders.speed")}</th>
                  <th>{t("content.models.tableHeaders.quality")}</th>
                  <th>{t("content.models.tableHeaders.useCase")}</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>SyinAI 1.5</td>
                  <td>8K {t("content.models.modelInfo.tokens")}</td>
                  <td>{t("content.models.tableData.fast")}</td>
                  <td>{t("content.models.tableData.high")}</td>
                  <td>{t("content.models.tableData.generalPurpose")}</td>
                </tr>
                <tr>
                  <td>SyinAI Code</td>
                  <td>16K {t("content.models.modelInfo.tokens")}</td>
                  <td>{t("content.models.tableData.medium")}</td>
                  <td>{t("content.models.tableData.veryHigh")}</td>
                  <td>{t("content.models.tableData.codeGeneration")}</td>
                </tr>
              </tbody>
            </table>
          </div>
        )
      },
      faq: {
        title: t("content.faq.title"),
        content: (
          <div className="doc-content">
            <h2>{t("content.faq.title")}</h2>
            
            <div className="faq-item">
              <h3>{t("content.faq.items.apiKey.question")}</h3>
              <p>{t("content.faq.items.apiKey.answer")}</p>
            </div>

            <div className="faq-item">
              <h3>{t("content.faq.items.rateLimits.question")}</h3>
              <p>{t("content.faq.items.rateLimits.answer")}</p>
            </div>

            <div className="faq-item">
              <h3>{t("content.faq.items.security.question")}</h3>
              <p>{t("content.faq.items.security.answer")}</p>
            </div>

            <div className="faq-item">
              <h3>{t("content.faq.items.languages.question")}</h3>
              <p>{t("content.faq.items.languages.answer")}</p>
            </div>

            <div className="faq-item">
              <h3>{t("content.faq.items.commercial.question")}</h3>
              <p>{t("content.faq.items.commercial.answer")}</p>
            </div>
          </div>
        )
      },
      installation: {
        title: t("content.installation.title"),
        content: (
          <div className="doc-content">
            <h2>{t("content.installation.title")}</h2>
            <p>{t("content.installation.description")}</p>

            <h3>{t("content.installation.prerequisitesTitle")}</h3>
            <ul>
              <li>{t("content.installation.prerequisites.0")}</li>
              <li>{t("content.installation.prerequisites.1")}</li>
              <li>{t("content.installation.prerequisites.2")}</li>
            </ul>

            <h3>{t("content.installation.nodejsTitle")}</h3>
            <div className="code-block">
              <pre><code>npm install alcahex-studio
# or using yarn
yarn add alcahex-studio</code></pre>
            </div>

            <h3>{t("content.installation.pythonTitle")}</h3>
            <div className="code-block">
              <pre><code>pip install alcahex-studio</code></pre>
            </div>

            <h3>{t("content.installation.envSetupTitle")}</h3>
            <p>{t("content.installation.envSetupDesc")}</p>
            <div className="code-block">
              <pre><code>ALCAHEX_API_KEY=your_api_key_here
ALCAHEX_BASE_URL=https://api.alcahex-studio.com</code></pre>
            </div>
          </div>
        )
      },
      authentication: {
        title: t("content.authentication.title"),
        content: (
          <div className="doc-content">
            <h2>{t("content.authentication.title")}</h2>
            <p>{t("content.authentication.description")}</p>

            <h3>{t("content.authentication.apiKeyTitle")}</h3>
            <p>{t("content.authentication.apiKeyDesc")}</p>
            <div className="code-block">
              <pre><code>Authorization: Bearer YOUR_API_KEY</code></pre>
            </div>

            <h3>{t("content.authentication.sdkAuthTitle")}</h3>
            <div className="code-block">
              <pre><code>{`import { AlcaHEX } from 'alcahex-studio';

const client = new AlcaHEX({
  apiKey: process.env.ALCAHEX_API_KEY
});`}</code></pre>
            </div>

            <h3>{t("content.authentication.bestPracticesTitle")}</h3>
            <ul>
              <li>{t("content.authentication.bestPractices.0")}</li>
              <li>{t("content.authentication.bestPractices.1")}</li>
              <li>{t("content.authentication.bestPractices.2")}</li>
              <li>{t("content.authentication.bestPractices.3")}</li>
            </ul>
          </div>
        )
      },
      ratelimits: {
        title: t("content.ratelimits.title"),
        content: (
          <div className="doc-content">
            <h2>{t("content.ratelimits.title")}</h2>
            <p>{t("content.ratelimits.description")}</p>

            <h3>{t("content.ratelimits.currentLimitsTitle")}</h3>
            <table className="rate-table">
              <thead>
                <tr>
                  <th>{t("content.ratelimits.tableHeaders.plan")}</th>
                  <th>{t("content.ratelimits.tableHeaders.requestsPerMinute")}</th>
                  <th>{t("content.ratelimits.tableHeaders.requestsPerMonth")}</th>
                  <th>{t("content.ratelimits.tableHeaders.tokensPerRequest")}</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{t("content.ratelimits.plans.free")}</td>
                  <td>20</td>
                  <td>1,000</td>
                  <td>1,000</td>
                </tr>
                <tr>
                  <td>{t("content.ratelimits.plans.pro")}</td>
                  <td>100</td>
                  <td>10,000</td>
                  <td>4,000</td>
                </tr>
                <tr>
                  <td>{t("content.ratelimits.plans.enterprise")}</td>
                  <td>{t("content.ratelimits.plans.custom")}</td>
                  <td>{t("content.ratelimits.plans.custom")}</td>
                  <td>{t("content.ratelimits.plans.custom")}</td>
                </tr>
              </tbody>
            </table>

            <h3>{t("content.ratelimits.handlingTitle")}</h3>
            <div className="code-block">
              <pre><code>{`const handleRateLimit = async (request) => {
  try {
    return await client.generate(request);
  } catch (error) {
    if (error.status === 429) {
      // Wait and retry
      await new Promise(resolve => setTimeout(resolve, 1000));
      return await client.generate(request);
    }
    throw error;
  }
};`}</code></pre>
            </div>
          </div>
        )
      },
      errorhandling: {
        title: t("content.errorhandling.title"),
        content: (
          <div className="doc-content">
            <h2>{t("content.errorhandling.title")}</h2>
            <p>{t("content.errorhandling.description")}</p>

            <h3>{t("content.errorhandling.commonErrorsTitle")}</h3>
            <ul>
              <li><strong>400</strong> - {t("content.errorhandling.errors.400")}</li>
              <li><strong>401</strong> - {t("content.errorhandling.errors.401")}</li>
              <li><strong>429</strong> - {t("content.errorhandling.errors.429")}</li>
              <li><strong>500</strong> - {t("content.errorhandling.errors.500")}</li>
            </ul>

            <h3>{t("content.errorhandling.exampleTitle")}</h3>
            <div className="code-block">
              <pre><code>{`try {
  const response = await client.generate({
    prompt: "Hello world",
    model: "syinai-1.5"
  });
  console.log(response.text);
} catch (error) {
  switch (error.status) {
    case 400:
      console.error('Invalid request parameters');
      break;
    case 401:
      console.error('Invalid API key');
      break;
    case 429:
      console.error('Rate limit exceeded');
      break;
    default:
      console.error('Unexpected error:', error.message);
  }
}`}</code></pre>
            </div>

            <h3>{t("content.errorhandling.troubleshootingTitle")}</h3>
            <ul>
              <li>{t("content.errorhandling.troubleshooting.0")}</li>
              <li>{t("content.errorhandling.troubleshooting.1")}</li>
              <li>{t("content.errorhandling.troubleshooting.2")}</li>
              <li>{t("content.errorhandling.troubleshooting.3")}</li>
            </ul>
          </div>
        )
      }
    };

    const sectionData = content[activeSection as keyof typeof content];
    if (!sectionData) return null;

    return (
      <div className="documentation-modal">
        <div className="documentation-content">
          <div className="doc-header">
            <h1>{sectionData.title}</h1>
            <button 
              className="close-btn"
              onClick={() => setActiveSection(null)}
            >
              ✕
            </button>
          </div>
          <div className="doc-body">
            {sectionData.content}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="syinai-page">
      <nav className="fixed-nav">
        <div className="header-nav-pill">
          <a href="/page" className="logo-alcahex-nav">AlcaHEX-Studio</a>
          
          {/* Desktop Navigation */}
          <div className="desktop-nav">
            <a href="/page#home" className="nav-item">Home</a>
            <a href="/page#about" className="nav-item">About</a>
            <a href="/docs" className="nav-item active">Documentation</a>
            <a href="/blog" className="nav-item">Blog</a>
            <a href="/api" className="nav-item">API</a>
            <a
              href="https://beta-alcahex-studio.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="join-beta-button-nav"
            >
              Mulai Beta
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
              Ikut Beta
            </a>
            <button 
              className="mobile-menu-button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
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
        <section className="content-section docs-single-frame" style={{ paddingTop: "80px" }}>
          {/* Modern Background Effects */}
          <div className="docs-background-effects">
            <div className="docs-orb docs-orb-1"></div>
            <div className="docs-orb docs-orb-2"></div>
            <div className="docs-orb docs-orb-3"></div>
            <div className="docs-floating-particles">
              <div className="particle particle-1"></div>
              <div className="particle particle-2"></div>
              <div className="particle particle-3"></div>
              <div className="particle particle-4"></div>
              <div className="particle particle-5"></div>
            </div>
          </div>
          
          <div className="docs-container">
            <div className="docs-header">
              <h1 className="docs-title">{t("title")}</h1>
              <p className="docs-subtitle">
                {t("subtitle")}
              </p>
            </div>

            <div className="docs-content">
              <div className="docs-grid">
                <div className="docs-card" onClick={() => handleCardClick('quickstart')}>
                  <div className="docs-card-icon">🚀</div>
                  <div className="docs-card-body">
                    <h3>{t("quickStart")}</h3>
                    <p>{t("quickStartDesc")}</p>
                  </div>
                  <button className="docs-link">{t("learnMore")}</button>
                </div>

                <div className="docs-card" onClick={() => handleCardClick('api')}>
                  <div className="docs-card-icon">🔧</div>
                  <div className="docs-card-body">
                    <h3>{t("apiReference")}</h3>
                    <p>{t("apiReferenceDesc")}</p>
                  </div>
                  <button className="docs-link">{t("learnMore")}</button>
                </div>

                <div className="docs-card" onClick={() => handleCardClick('examples')}>
                  <div className="docs-card-icon">💡</div>
                  <div className="docs-card-body">
                    <h3>{t("examples")}</h3>
                    <p>{t("examplesDesc")}</p>
                  </div>
                  <button className="docs-link">{t("learnMore")}</button>
                </div>

                <div className="docs-card" onClick={() => handleCardClick('sdk')}>
                  <div className="docs-card-icon">🛠️</div>
                  <div className="docs-card-body">
                    <h3>{t("sdkTools")}</h3>
                    <p>{t("sdkToolsDesc")}</p>
                  </div>
                  <button className="docs-link">{t("learnMore")}</button>
                </div>

                <div className="docs-card" onClick={() => handleCardClick('models')}>
                  <div className="docs-card-icon">📊</div>
                  <div className="docs-card-body">
                    <h3>{t("models")}</h3>
                    <p>{t("modelsDesc")}</p>
                  </div>
                  <button className="docs-link">{t("learnMore")}</button>
                </div>

                <div className="docs-card" onClick={() => handleCardClick('faq')}>
                  <div className="docs-card-icon">❓</div>
                  <div className="docs-card-body">
                    <h3>{t("faq")}</h3>
                    <p>{t("faqDesc")}</p>
                  </div>
                  <button className="docs-link">{t("learnMore")}</button>
                </div>
              </div>

              <div className="docs-section">
                <h2>{t("mainGuides")}</h2>
                <div className="docs-list">
                  <div className="docs-item" onClick={() => handleGuideClick('installation')}>
                    <h4>{t("installation")}</h4>
                    <p>{t("installationDesc")}</p>
                  </div>
                  <div className="docs-item" onClick={() => handleGuideClick('authentication')}>
                    <h4>{t("authentication")}</h4>
                    <p>{t("authenticationDesc")}</p>
                  </div>
                  <div className="docs-item" onClick={() => handleGuideClick('ratelimits')}>
                    <h4>{t("rateLimits")}</h4>
                    <p>{t("rateLimitsDesc")}</p>
                  </div>
                  <div className="docs-item" onClick={() => handleGuideClick('errorhandling')}>
                    <h4>{t("errorHandling")}</h4>
                    <p>{t("errorHandlingDesc")}</p>
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
              <p>Solusi AI modern untuk generasi pengembangan baru.</p>
            </div>
            <div className="footer-column">
              <h4>Produk</h4>
              <a href="/page#intro">SyinAI 1.5</a>
              <a href="/page#capabilities">Capabilities</a>
              <a href="/page#models">Models</a>
            </div>
            <div className="footer-column">
              <h4>Sumber Daya</h4>
              <a href="/docs">Documentation</a>
              <a href="/blog">Blog</a>
              <a href="/api">API</a>
            </div>
            <div className="footer-column">
              <h4>Hubungi Kami</h4>
              <a href="mailto:alcahex.studio@gmail.com">alcahex.studio@gmail.com</a>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; {new Date().getFullYear()} AlcaHEX-Studio. Hak cipta dilindungi.</p>
          </div>
        </div>
      </footer>
      {renderDocumentationContent()}
      <Sidebar 
        isOpen={mobileMenuOpen} 
        onClose={() => setMobileMenuOpen(false)} 
        navItems={docsNavItems} 
      />
      
      {/* Desktop Language Switcher */}
      <DesktopLanguageSwitcher />
    </div>
  );
}
