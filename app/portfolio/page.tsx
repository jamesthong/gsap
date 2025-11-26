'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, ExternalLink, Github, Play, Star, Users, TrendingUp } from 'lucide-react';
import Link from 'next/link';
import ThreeScene from '@/components/ThreeScene';

gsap.registerPlugin(ScrollTrigger);

export default function Portfolio() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    // GSAP ScrollTrigger animations
    gsap.fromTo('.portfolio-hero h1',
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.portfolio-hero',
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      }
    );

    gsap.fromTo('.portfolio-hero p',
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.portfolio-hero',
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      }
    );

    gsap.fromTo('.featured-project',
      { opacity: 0, x: -50 },
      {
        opacity: 1,
        x: 0,
        duration: 1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.featured-section',
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      }
    );

    gsap.fromTo('.portfolio-item',
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.portfolio-grid',
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const categories = [
    { id: 'all', name: 'All Projects' },
    { id: 'ml', name: 'Machine Learning' },
    { id: 'analytics', name: 'Data Analytics' },
    { id: 'automation', name: 'Automation' },
    { id: 'nlp', name: 'NLP' },
  ];

  const projects = [
    {
      id: 1,
      title: 'Predictive Customer Analytics Platform',
      category: 'analytics',
      description: 'Built a comprehensive analytics platform that predicts customer behavior and optimizes marketing spend with 85% accuracy improvement.',
      image: '/api/placeholder/600/400',
      technologies: ['Python', 'TensorFlow', 'AWS', 'React'],
      metrics: { roi: '+340%', users: '50K+', accuracy: '85%' },
      featured: true,
      demoUrl: '#',
      githubUrl: '#'
    },
    {
      id: 2,
      title: 'Intelligent Document Processing System',
      category: 'nlp',
      description: 'Automated document processing for a Fortune 500 company, reducing processing time by 90% and improving accuracy to 98%.',
      image: '/api/placeholder/600/400',
      technologies: ['Python', 'NLP', 'Azure AI', 'Docker'],
      metrics: { efficiency: '90%', accuracy: '98%', time: '-80%' },
      featured: true,
      demoUrl: '#',
      githubUrl: '#'
    },
    {
      id: 3,
      title: 'Manufacturing Quality Control AI',
      category: 'ml',
      description: 'Computer vision system for real-time defect detection in manufacturing lines, achieving 95% defect detection rate.',
      image: '/api/placeholder/600/400',
      technologies: ['PyTorch', 'OpenCV', 'Kubernetes', 'MongoDB'],
      metrics: { detection: '95%', falsePositives: '-60%', throughput: '+200%' },
      featured: false,
      demoUrl: '#',
      githubUrl: '#'
    },
    {
      id: 4,
      title: 'Conversational AI Customer Support',
      category: 'nlp',
      description: 'Intelligent chatbot system handling 70% of customer inquiries automatically with 92% satisfaction rate.',
      image: '/api/placeholder/600/400',
      technologies: ['Rasa', 'BERT', 'Node.js', 'PostgreSQL'],
      metrics: { automation: '70%', satisfaction: '92%', cost: '-60%' },
      featured: false,
      demoUrl: '#',
      githubUrl: '#'
    },
    {
      id: 5,
      title: 'Supply Chain Optimization Engine',
      category: 'analytics',
      description: 'AI-powered supply chain optimization reducing inventory costs by 35% and improving delivery times by 40%.',
      image: '/api/placeholder/600/400',
      technologies: ['Python', 'Optimization', 'GCP', 'BigQuery'],
      metrics: { costReduction: '35%', delivery: '+40%', efficiency: '+50%' },
      featured: false,
      demoUrl: '#',
      githubUrl: '#'
    },
    {
      id: 6,
      title: 'Robotic Process Automation Suite',
      category: 'automation',
      description: 'Comprehensive RPA solution automating complex business processes across multiple departments.',
      image: '/api/placeholder/600/400',
      technologies: ['UiPath', 'Python', 'APIs', 'SQL Server'],
      metrics: { processes: '25+', time: '-75%', errors: '-90%' },
      featured: false,
      demoUrl: '#',
      githubUrl: '#'
    }
  ];

  const filteredProjects = selectedCategory === 'all'
    ? projects
    : projects.filter(project => project.category === selectedCategory);

  const featuredProjects = projects.filter(project => project.featured);

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section with 3D Background */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0">
          <ThreeScene className="opacity-30" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            Our Portfolio
          </h1>
          <p className="text-xl text-gray-300 leading-relaxed">
            Discover how we&apos;ve transformed businesses across industries with
            cutting-edge AI solutions and data-driven strategies.
          </p>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="featured-section py-20 px-4 sm:px-6 lg:px-8 bg-gray-800/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
              Featured Case Studies
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Explore our most impactful projects that demonstrate the transformative power of AI.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
            {featuredProjects.map((project) => (
              <div key={project.id} className="featured-project bg-gray-800/50 p-8 rounded-xl border border-gray-700 hover:border-blue-400 transition-all duration-300">
                <div className="flex items-center justify-between mb-4">
                  <span className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm font-medium">
                    {categories.find(cat => cat.id === project.category)?.name}
                  </span>
                  <Star className="w-5 h-5 text-yellow-400 fill-current" />
                </div>

                <h3 className="text-2xl font-bold text-white mb-4">{project.title}</h3>
                <p className="text-gray-400 mb-6 leading-relaxed">{project.description}</p>

                <div className="grid grid-cols-3 gap-4 mb-6">
                  {Object.entries(project.metrics).map(([key, value]) => (
                    <div key={key} className="text-center">
                      <div className="text-2xl font-bold text-blue-400">{value}</div>
                      <div className="text-sm text-gray-400 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</div>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap gap-2 mb-6">
                  {project.technologies.map((tech) => (
                    <span key={tech} className="px-3 py-1 bg-gray-700 text-gray-300 rounded-full text-sm">
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex gap-4">
                  <a
                    href={project.demoUrl}
                    className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-white px-4 py-2 rounded-lg font-medium transition-all duration-300"
                  >
                    <Play className="w-4 h-4" />
                    View Demo
                  </a>
                  <a
                    href={project.githubUrl}
                    className="flex items-center gap-2 border border-gray-600 hover:border-blue-400 text-gray-300 hover:text-white px-4 py-2 rounded-lg font-medium transition-all duration-300"
                  >
                    <Github className="w-4 h-4" />
                    Code
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* All Projects */}
      <section ref={sectionRef} className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                  selectedCategory === category.id
                    ? 'bg-gradient-to-r from-blue-500 to-green-500 text-white'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>

          {/* Projects Grid */}
          <div className="portfolio-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <div key={project.id} className="portfolio-item bg-gray-800/50 p-6 rounded-xl border border-gray-700 hover:border-blue-400 transition-all duration-300 group">
                <div className="aspect-video bg-gradient-to-br from-blue-500/20 to-green-500/20 rounded-lg mb-4 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-blue-400 mb-2">{project.id}</div>
                    <div className="text-gray-400">Project</div>
                  </div>
                </div>

                <div className="flex items-center justify-between mb-3">
                  <span className="px-2 py-1 bg-gray-700 text-gray-300 rounded text-xs">
                    {categories.find(cat => cat.id === project.category)?.name}
                  </span>
                  {project.featured && <Star className="w-4 h-4 text-yellow-400 fill-current" />}
                </div>

                <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-blue-400 transition-colors">
                  {project.title}
                </h3>

                <p className="text-gray-400 text-sm mb-4 leading-relaxed">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-1 mb-4">
                  {project.technologies.slice(0, 3).map((tech) => (
                    <span key={tech} className="px-2 py-1 bg-gray-700 text-gray-300 rounded text-xs">
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 3 && (
                    <span className="px-2 py-1 bg-gray-700 text-gray-300 rounded text-xs">
                      +{project.technologies.length - 3}
                    </span>
                  )}
                </div>

                <div className="flex justify-between items-center">
                  <div className="text-sm text-gray-400">
                    {Object.entries(project.metrics)[0] && (
                      <span className="text-blue-400 font-medium">
                        {Object.values(project.metrics)[0]}
                      </span>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <a
                      href={project.demoUrl}
                      className="p-2 text-gray-400 hover:text-blue-400 transition-colors"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                    <a
                      href={project.githubUrl}
                      className="p-2 text-gray-400 hover:text-blue-400 transition-colors"
                    >
                      <Github className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-900/20 to-green-900/20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Ready to Start Your AI Project?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Let&apos;s discuss how we can help transform your business with AI.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300"
          >
            Get Started
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}