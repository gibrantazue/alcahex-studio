"use client";

import React, { useState } from "react";
import { useTranslations } from "next-intl";
import "../page/syinai-style.css";
import "../page/docs-styles.css";
import Sidebar, { NavItem } from "@/components/Sidebar";
import DesktopLanguageSwitcher from "@/components/DesktopLanguageSwitcher";

export default function BlogPage() {
  const t = useTranslations("BlogPage");
  const [activeCategory, setActiveCategory] = useState("all");
  const [email, setEmail] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedPost, setSelectedPost] = useState<any>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const blogNavItems: NavItem[] = [
    { 
      id: 'blog', 
      href: '/blog', 
      label: t('navigation.blog'), 
      isActive: true,
      onClick: () => {
        setMobileMenuOpen(false);
        window.location.href = '/blog';
      }
    },
    { 
      id: 'docs', 
      href: '/docs', 
      label: t('navigation.documentation'),
      onClick: () => {
        setMobileMenuOpen(false);
        window.location.href = '/docs';
      }
    },
    { 
      id: 'api', 
      href: '/api', 
      label: t('navigation.api'),
      onClick: () => {
        setMobileMenuOpen(false);
        window.location.href = '/api';
      }
    },
    { 
      id: 'home', 
      href: '/page', 
      label: t('navigation.home'),
      onClick: () => {
        setMobileMenuOpen(false);
        window.location.href = '/page';
      }
    }
  ];

  const blogPosts = [
    {
      id: 1,
      title: t('posts.1.title'),
      excerpt: t('posts.1.excerpt'),
      date: t('posts.1.date'),
      author: t('posts.1.author'),
      category: "productUpdate",
      readTime: t('posts.1.readTime'),
    },
    {
      id: 2,
      title: t('posts.2.title'),
      excerpt: t('posts.2.excerpt'),
      date: t('posts.2.date'),
      author: t('posts.2.author'),
      category: "tutorial",
      readTime: t('posts.2.readTime'),
    },
    {
      id: 3,
      title: t('posts.3.title'),
      excerpt: t('posts.3.excerpt'),
      date: t('posts.3.date'),
      author: t('posts.3.author'),
      category: "research",
      readTime: t('posts.3.readTime'),
    },
    {
      id: 4,
      title: t('posts.4.title'),
      excerpt: t('posts.4.excerpt'),
      date: t('posts.4.date'),
      author: t('posts.4.author'),
      category: "caseStudy",
      readTime: t('posts.4.readTime'),
    },
  ];

  // Filter posts based on active category
  const filteredPosts =
    activeCategory === "all"
      ? blogPosts
      : blogPosts.filter((post) => post.category === activeCategory);

  // Function to get display category name
  const getCategoryDisplayName = (category: string) => {
    const categoryMap: { [key: string]: string } = {
      productUpdate: t('categories.productUpdate'),
      tutorial: t('categories.tutorial'),
      research: t('categories.research'),
      caseStudy: t('categories.caseStudy'),
    };
    return categoryMap[category] || category;
  };

  // Enhanced newsletter subscription handler
  const handleNewsletterSubmit = async () => {
    if (!email.trim()) {
      alert(t('newsletter.placeholder'));
      return;
    }

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setShowSuccess(true);
      setEmail("");

      // Hide success message after 3 seconds
      setTimeout(() => {
        setShowSuccess(false);
      }, 3000);
    }, 1000);
  };

  // Enhanced read more handler
  const handleReadMore = (post: any) => {
    setSelectedPost(post);
  };

  const renderBlogModal = () => {
    if (!selectedPost) return null;

    const blogContent = {
      1: {
        content: (
          <div className="blog-article">
            <h2>{t('articles.1.title')}</h2>
            <div className="article-meta">
              <span>📝 {selectedPost.author}</span>
              <span>📅 {selectedPost.date}</span>
              <span>⏱️ {selectedPost.readTime}</span>
            </div>

            <p>{t('articles.1.description')}</p>

            <h3>{t('articles.1.featuresTitle')}</h3>
            <ul>
              {(t.raw('articles.1.features') as string[]).map((feature: string, index: number) => (
                <li key={index} dangerouslySetInnerHTML={{ __html: feature }} />
              ))}
            </ul>

            <h3>{t('articles.1.improvementsTitle')}</h3>
            <p>{t('articles.1.improvementsDesc')}</p>
            <ul>
              {(t.raw('articles.1.improvements') as string[]).map((improvement: string, index: number) => (
                <li key={index}>{improvement}</li>
              ))}
            </ul>

            <div className="code-example">
              <h4>{t('articles.1.codeExampleTitle')}</h4>
              <div className="code-block">
                <pre>
                  <code>{`import { SyinAI } from 'alcahex-studio';

const ai = new SyinAI({
  model: 'syinai-1.5',
  apiKey: 'your-api-key'
});

const response = await ai.generate({
  prompt: 'Buatkan fungsi untuk menghitung fibonacci',
  language: 'javascript',
  maxTokens: 500
});

console.log(response.text);`}</code>
                </pre>
              </div>
            </div>

            <h3>{t('articles.1.availabilityTitle')}</h3>
            <p>{t('articles.1.availabilityDesc')}</p>
          </div>
        ),
      },
      2: {
        content: (
          <div className="blog-article">
            <h2>{t('articles.2.title')}</h2>
            <div className="article-meta">
              <span>📝 {selectedPost.author}</span>
              <span>📅 {selectedPost.date}</span>
              <span>⏱️ {selectedPost.readTime}</span>
            </div>

            <p>{t('articles.2.description')}</p>

            <h3>{t('articles.2.setupTitle')}</h3>
            <p>{t('articles.2.setupDesc')}</p>

            <div className="code-block">
              <pre>
                <code>{`// Konfigurasi optimal untuk coding
const config = {
  model: 'syinai-1.5',
  temperature: 0.2, // Untuk kode yang lebih deterministik
  maxTokens: 1000,
  topP: 0.9,
  presencePenalty: 0.1
};`}</code>
              </pre>
            </div>

            <h3>{t('articles.2.bestPracticesTitle')}</h3>
            <ul>
              {(t.raw('articles.2.bestPractices') as string[]).map((practice: string, index: number) => (
                <li key={index} dangerouslySetInnerHTML={{ __html: practice }} />
              ))}
            </ul>

            <h3>{t('articles.2.examplesTitle')}</h3>

            <h4>{t('articles.2.example1Title')}</h4>
            <div className="code-block">
              <pre>
                <code>{`// Prompt: "Buatkan fungsi untuk validasi email dengan regex"
function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Test
console.log(validateEmail("test@example.com")); // true
console.log(validateEmail("invalid-email")); // false`}</code>
              </pre>
            </div>

            <h4>{t('articles.2.example2Title')}</h4>
            <div className="code-block">
              <pre>
                <code>{`// Before: O(n²)
function findDuplicates(arr) {
  const duplicates = [];
  for (let i = 0; i < arr.length; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[i] === arr[j] && !duplicates.includes(arr[i])) {
        duplicates.push(arr[i]);
      }
    }
  }
  return duplicates;
}

// After: O(n) - Optimized by AI
function findDuplicates(arr) {
  const seen = new Set();
  const duplicates = new Set();
  
  for (const item of arr) {
    if (seen.has(item)) {
      duplicates.add(item);
    } else {
      seen.add(item);
    }
  }
  
  return Array.from(duplicates);
}`}</code>
              </pre>
            </div>

            <h3>{t('articles.2.productivityTitle')}</h3>
            <ul>
              {(t.raw('articles.2.productivityTips') as string[]).map((tip: string, index: number) => (
                <li key={index}>{tip}</li>
              ))}
            </ul>
          </div>
        ),
      },
      3: {
        content: (
          <div className="blog-article">
            <h2>{t('articles.3.title')}</h2>
            <div className="article-meta">
              <span>📝 {selectedPost.author}</span>
              <span>📅 {selectedPost.date}</span>
              <span>⏱️ {selectedPost.readTime}</span>
            </div>

            <p>{t('articles.3.description')}</p>

            <h3>{t('articles.3.technologyTitle')}</h3>
            <p>{t('articles.3.technologyDesc')}</p>
            <ul>
              {(t.raw('articles.3.modalities') as string[]).map((modality: string, index: number) => (
                <li key={index} dangerouslySetInnerHTML={{ __html: modality }} />
              ))}
            </ul>

            <h3>{t('articles.3.useCasesTitle')}</h3>

            <h4>{t('articles.3.useCase1Title')}</h4>
            <p>{t('articles.3.useCase1Desc')}</p>
            <div className="code-block">
              <pre>
                <code>{`// Input: Upload gambar mockup
// Output: Generated HTML/CSS

<div class="hero-section">
  <div class="container">
    <h1 class="hero-title">Welcome to Our Platform</h1>
    <p class="hero-subtitle">Build amazing applications with AI</p>
    <button class="cta-button">Get Started</button>
  </div>
</div>

<style>
.hero-section {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 100px 0;
  text-align: center;
  color: white;
}
</style>`}</code>
              </pre>
            </div>

            <h4>{t('articles.3.useCase2Title')}</h4>
            <p>{t('articles.3.useCase2Desc')}</p>
            <div className="code-block">
              <pre>
                <code>{`// Upload invoice atau contract
// AI extracts key information

{
  "documentType": "invoice",
  "invoiceNumber": "INV-2025-001",
  "date": "2025-08-24",
  "vendor": "AlcaHEX Studio",
  "totalAmount": 1500000,
  "currency": "IDR",
  "items": [
    {
      "description": "SyinAI Pro License",
      "quantity": 1,
      "unitPrice": 1500000
    }
  ]
}`}</code>
              </pre>
            </div>

            <h3>{t('articles.3.implementationTitle')}</h3>
            <div className="code-block">
              <pre>
                <code>{`import { SyinAI } from 'alcahex-studio';

const ai = new SyinAI({
  model: 'syinai-1.5-pro',
  apiKey: 'your-api-key'
});

// Multimodal request
const response = await ai.analyze({
  image: imageFile,
  prompt: 'Analyze this UI mockup and generate responsive CSS',
  outputFormat: 'code'
});

console.log(response.generatedCode);`}</code>
              </pre>
            </div>

            <h3>{t('articles.3.futureTitle')}</h3>
            <p>{t('articles.3.futureDesc')}</p>
            <ul>
              {(t.raw('articles.3.futureItems') as string[]).map((item: string, index: number) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        ),
      },
      4: {
        content: (
          <div className="blog-article">
            <h2>{t('articles.4.title')}</h2>
            <div className="article-meta">
              <span>📝 {selectedPost.author}</span>
              <span>📅 {selectedPost.date}</span>
              <span>⏱️ {selectedPost.readTime}</span>
            </div>

            <p>{t('articles.4.description')}</p>

            <h3>{t('articles.4.profileTitle')}</h3>
            <div className="company-profile">
              <ul>
                {(t.raw('articles.4.profile') as string[]).map((item: string, index: number) => (
                  <li key={index} dangerouslySetInnerHTML={{ __html: `<strong>${item.split(':')[0]}:</strong> ${item.split(':')[1]}` }} />
                ))}
              </ul>
            </div>

            <h3>{t('articles.4.challengesTitle')}</h3>
            <ul>
              {(t.raw('articles.4.challenges') as string[]).map((challenge: string, index: number) => (
                <li key={index}>{challenge}</li>
              ))}
            </ul>

            <h3>{t('articles.4.implementationTitle')}</h3>

            <h4>{t('articles.4.codeGenTitle')}</h4>
            <div className="code-block">
              <pre>
                <code>{t('articles.4.codeGenDesc')}</code>
              </pre>
            </div>

            <div className="code-block">
              <pre>
                <code>{`// Generated API endpoint
app.post('/api/products', async (req, res) => {
  try {
    const { name, price, category, description } = req.body;
    
    // Validation
    if (!name || !price || !category) {
      return res.status(400).json({ 
        error: 'Missing required fields' 
      });
    }
    
    const product = await Product.create({
      name,
      price,
      category,
      description,
      createdAt: new Date()
    });
    
    res.status(201).json({ 
      success: true, 
      data: product 
    });
  } catch (error) {
    res.status(500).json({ 
      error: 'Internal server error' 
    });
  }
});`}</code>
              </pre>
            </div>

            <h4>{t('articles.4.testingTitle')}</h4>
            <div className="code-block">
              <pre>
                <code>{`// AI-generated unit tests
describe('Product API', () => {
  test('should create product successfully', async () => {
    const productData = {
      name: 'Test Product',
      price: 100000,
      category: 'electronics',
      description: 'Test description'
    };
    
    const response = await request(app)
      .post('/api/products')
      .send(productData)
      .expect(201);
    
    expect(response.body.success).toBe(true);
    expect(response.body.data.name).toBe(productData.name);
  });
  
  test('should return error for missing fields', async () => {
    const response = await request(app)
      .post('/api/products')
      .send({ name: 'Incomplete Product' })
      .expect(400);
    
    expect(response.body.error).toBe('Missing required fields');
  });
});`}</code>
              </pre>
            </div>

            <h3>{t('articles.4.resultsTitle')}</h3>
            <div className="results-grid">
              {(t.raw('articles.4.results') as string[]).map((result: string, index: number) => (
                <div key={index} className="result-item">
                  <p dangerouslySetInnerHTML={{ __html: result }} />
                </div>
              ))}
            </div>

            <h3>{t('articles.4.roiTitle')}</h3>
            <ul>
              {(t.raw('articles.4.roi') as string[]).map((item: string, index: number) => (
                <li key={index} dangerouslySetInnerHTML={{ __html: item }} />
              ))}
            </ul>

            <h3>{t('articles.4.takeawaysTitle')}</h3>
            <ul>
              {(t.raw('articles.4.takeaways') as string[]).map((takeaway: string, index: number) => (
                <li key={index}>{takeaway}</li>
              ))}
            </ul>

            <blockquote>
              {t('articles.4.testimonial')}
            </blockquote>
          </div>
        ),
      },
    };

    const content = blogContent[selectedPost.id as keyof typeof blogContent];
    if (!content) return null;

    return (
      <div className="blog-modal">
        <div className="blog-modal-content">
          <div className="blog-modal-header">
            <button className="close-btn" onClick={() => setSelectedPost(null)}>
              ✕
            </button>
          </div>
          <div className="blog-modal-body">{content.content}</div>
        </div>
      </div>
    );
  };

  // Category change handler with animation
  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);

    // Add a subtle animation effect
    const blogGrid = document.querySelector(".blog-grid");
    if (blogGrid) {
      blogGrid.classList.add("filtering");
      setTimeout(() => {
        blogGrid.classList.remove("filtering");
      }, 300);
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
              {t('navigation.home')}
            </a>
            <a href="/page#about" className="nav-item">
              {t('navigation.about')}
            </a>
            <a href="/docs" className="nav-item">
              {t('navigation.documentation')}
            </a>
            <a href="/blog" className="nav-item active">
              {t('navigation.blog')}
            </a>
            <a href="/api" className="nav-item">
              {t('navigation.api')}
            </a>
            <a
              href="https://beta-alcahex-studio.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="join-beta-button-nav"
            >
              {t('navigation.joinBeta')}
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
              {t('navigation.joinBeta')}
            </a>
            <button
              className="mobile-menu-button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
              type="button"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="5" cy="12" r="2" fill="currentColor" />
                <circle cx="12" cy="12" r="2" fill="currentColor" />
                <circle cx="19" cy="12" r="2" fill="currentColor" />
              </svg>
            </button>
          </div>
        </div>
      </nav>

      <main className="syinai-main">
        <section className="content-section" style={{ paddingTop: "80px" }}>
          <div className="blog-container">
            <div className="blog-header">
              <h1 className="blog-title">{t("title")}</h1>
              <p className="blog-subtitle">{t("subtitle")}</p>
            </div>

            <div className="blog-content">
              <div className="category-buttons">
                <button
                  className={`category-btn ${activeCategory === "all" ? "active" : ""}`}
                  onClick={() => handleCategoryChange("all")}
                >
                  {t('categories.all')}
                </button>
                <button
                  className={`category-btn ${activeCategory === "productUpdate" ? "active" : ""}`}
                  onClick={() => handleCategoryChange("productUpdate")}
                >
                  {t('categories.productUpdate')}
                </button>
                <button
                  className={`category-btn ${activeCategory === "tutorial" ? "active" : ""}`}
                  onClick={() => handleCategoryChange("tutorial")}
                >
                  {t('categories.tutorial')}
                </button>
                <button
                  className={`category-btn ${activeCategory === "research" ? "active" : ""}`}
                  onClick={() => handleCategoryChange("research")}
                >
                  {t('categories.research')}
                </button>
                <button
                  className={`category-btn ${activeCategory === "caseStudy" ? "active" : ""}`}
                  onClick={() => handleCategoryChange("caseStudy")}
                >
                  {t('categories.caseStudy')}
                </button>
              </div>

              <div className="blog-grid">
                {filteredPosts.map((post) => (
                  <article key={post.id} className="blog-card">
                    <div className="blog-card-header">
                      <span className="blog-category">
                        {getCategoryDisplayName(post.category)}
                      </span>
                      <span className="blog-read-time">{post.readTime}</span>
                    </div>
                    <h3 className="blog-card-title">{post.title}</h3>
                    <p className="blog-card-excerpt">{post.excerpt}</p>
                    <div className="blog-card-footer">
                      <div className="blog-meta">
                        <span className="blog-author">{post.author}</span>
                        <span className="blog-date">{post.date}</span>
                      </div>
                      <button
                        className="blog-read-more"
                        onClick={() => handleReadMore(post)}
                      >
                        {t("readMore")}
                      </button>
                    </div>
                  </article>
                ))}
              </div>

              <div className="blog-newsletter">
                <div className="newsletter-content">
                  <h3>{t("newsletter.title")}</h3>
                  <p>{t("newsletter.description")}</p>
                  <div className="newsletter-form">
                    <input
                      type="email"
                      placeholder={t("newsletter.placeholder")}
                      className="newsletter-input"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <button
                      className="newsletter-btn"
                      onClick={handleNewsletterSubmit}
                      disabled={isLoading}
                    >
                      {isLoading ? t('newsletter.subscribe') + '...' : t("newsletter.subscribe")}
                    </button>
                  </div>
                  {showSuccess && (
                    <div className="newsletter-success">
                      ✅ {t('newsletter.description')}
                    </div>
                  )}
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
              <p>{t('footer.description')}</p>
            </div>
            <div className="footer-column">
              <h4>{t('footer.products')}</h4>
              <a href="/page#intro">SyinAI 1.5</a>
              <a href="/page#capabilities">Capabilities</a>
              <a href="/page#models">Models</a>
            </div>
            <div className="footer-column">
              <h4>{t('footer.resources')}</h4>
              <a href="/docs">{t('navigation.documentation')}</a>
              <a href="/blog">{t('navigation.blog')}</a>
              <a href="/api">{t('navigation.api')}</a>
            </div>
            <div className="footer-column">
              <h4>{t('footer.contact')}</h4>
              <a href="mailto:alcahex.studio@gmail.com">alcahex.studio@gmail.com</a>
            </div>
          </div>
          <div className="footer-bottom">
            <p>
              &copy; {new Date().getFullYear()} AlcaHEX-Studio. {t('footer.copyright')}
            </p>
          </div>
        </div>
      </footer>
      {renderBlogModal()}
      <Sidebar
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        navItems={blogNavItems}
      />
      
      {/* Desktop Language Switcher */}
      <DesktopLanguageSwitcher />
    </div>
  );
}
