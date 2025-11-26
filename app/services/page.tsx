'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Brain,
  BarChart3,
  Cpu,
  Database,
  Zap,
  Shield,
  Users,
  TrendingUp,
  ArrowRight,
  CheckCircle
} from 'lucide-react';
import Link from 'next/link';

gsap.registerPlugin(ScrollTrigger);

export default function Services() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  useEffect(() => {
    // GSAP ScrollTrigger animations
    gsap.fromTo('.services-hero h1',
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.services-hero',
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      }
    );

    gsap.fromTo('.services-hero p',
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.services-hero',
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      }
    );

    gsap.fromTo('.service-card',
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.services-grid',
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      }
    );

    gsap.fromTo('.process-step',
      { opacity: 0, scale: 0.8 },
      {
        opacity: 1,
        scale: 1,
        duration: 0.8,
        stagger: 0.2,
        ease: 'back.out(1.7)',
        scrollTrigger: {
          trigger: '.process-section',
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const services = [
    {
      icon: Brain,
      title: 'AI Strategy Consulting',
      description: 'Develop comprehensive AI strategies aligned with your business objectives. We help you identify opportunities, assess feasibility, and create roadmaps for successful AI implementation.',
      features: [
        'AI Readiness Assessment',
        'Strategic Planning',
        'Technology Roadmap',
        'ROI Analysis',
        'Risk Assessment'
      ],
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: BarChart3,
      title: 'Data Analytics & Insights',
      description: 'Transform your data into actionable insights. Our advanced analytics solutions help you understand customer behavior, optimize operations, and drive data-driven decision making.',
      features: [
        'Predictive Analytics',
        'Business Intelligence',
        'Data Visualization',
        'Real-time Dashboards',
        'Performance Metrics'
      ],
      color: 'from-green-500 to-green-600'
    },
    {
      icon: Cpu,
      title: 'Machine Learning Implementation',
      description: 'Build and deploy custom machine learning models tailored to your specific needs. From recommendation systems to predictive maintenance, we bring ML to life.',
      features: [
        'Custom ML Models',
        'Model Training & Tuning',
        'MLOps & Deployment',
        'Model Monitoring',
        'Performance Optimization'
      ],
      color: 'from-purple-500 to-purple-600'
    },
    {
      icon: Database,
      title: 'AI-Powered Automation',
      description: 'Streamline operations with intelligent automation. Reduce manual tasks, improve accuracy, and scale your business with AI-driven workflows and processes.',
      features: [
        'Process Automation',
        'Intelligent Workflows',
        'RPA Integration',
        'Quality Assurance',
        'Scalability Solutions'
      ],
      color: 'from-orange-500 to-orange-600'
    },
    {
      icon: Shield,
      title: 'AI Ethics & Governance',
      description: 'Ensure responsible AI implementation with comprehensive governance frameworks. We help you maintain ethical standards, compliance, and trust in your AI systems.',
      features: [
        'Ethical AI Framework',
        'Bias Detection & Mitigation',
        'Compliance Management',
        'Risk Assessment',
        'Governance Policies'
      ],
      color: 'from-red-500 to-red-600'
    },
    {
      icon: Users,
      title: 'AI Training & Change Management',
      description: 'Prepare your team for the AI transformation. We provide comprehensive training programs and change management strategies to ensure smooth adoption.',
      features: [
        'Team Training Programs',
        'Change Management',
        'AI Literacy Workshops',
        'Leadership Coaching',
        'Adoption Strategies'
      ],
      color: 'from-teal-500 to-teal-600'
    }
  ];

  const processSteps = [
    {
      step: '01',
      title: 'Discovery & Assessment',
      description: 'We start by understanding your business challenges, goals, and current capabilities.'
    },
    {
      step: '02',
      title: 'Strategy Development',
      description: 'Based on our assessment, we develop a tailored AI strategy aligned with your objectives.'
    },
    {
      step: '03',
      title: 'Solution Design',
      description: 'We design and architect AI solutions that integrate seamlessly with your existing systems.'
    },
    {
      step: '04',
      title: 'Implementation & Deployment',
      description: 'Our team handles the technical implementation, testing, and deployment of AI solutions.'
    },
    {
      step: '05',
      title: 'Monitoring & Optimization',
      description: 'We provide ongoing monitoring, maintenance, and optimization to ensure continued success.'
    }
  ];

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="services-hero py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-900/20 via-gray-900 to-green-900/20">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            Our AI Services
          </h1>
          <p className="text-xl text-gray-300 leading-relaxed">
            Comprehensive AI consulting services designed to transform your business
            through intelligent automation, data-driven insights, and cutting-edge technology.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="services-grid py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="service-card bg-gray-800/50 p-6 rounded-xl border border-gray-700 hover:border-blue-400 transition-all duration-300 group cursor-pointer"
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <div className={`inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r ${service.color} rounded-lg mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <service.icon className="w-6 h-6 text-white" />
                </div>

                <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-blue-400 transition-colors">
                  {service.title}
                </h3>

                <p className="text-gray-400 mb-4 leading-relaxed">
                  {service.description}
                </p>

                <div className={`transition-all duration-300 ${hoveredCard === index ? 'opacity-100 max-h-96' : 'opacity-0 max-h-0'} overflow-hidden`}>
                  <ul className="space-y-2">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-sm text-gray-300">
                        <CheckCircle className="w-4 h-4 text-green-400 mr-2 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className={`mt-4 transition-all duration-300 ${hoveredCard === index ? 'opacity-100' : 'opacity-0'}`}>
                  <Link
                    href="/contact"
                    className="inline-flex items-center text-blue-400 hover:text-blue-300 font-medium"
                  >
                    Learn More
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="process-section py-20 px-4 sm:px-6 lg:px-8 bg-gray-800/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
              Our Process
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              A proven methodology that ensures successful AI implementation and maximum ROI.
            </p>
          </div>

          <div className="relative">
            {/* Process Steps */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
              {processSteps.map((step, index) => (
                <div key={index} className="process-step text-center relative">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-green-500 rounded-full mb-4 text-white font-bold text-lg">
                    {step.step}
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">{step.title}</h3>
                  <p className="text-gray-400 text-sm">{step.description}</p>

                  {/* Connector Line */}
                  {index < processSteps.length - 1 && (
                    <div className="hidden md:block absolute top-8 left-full w-full h-0.5 bg-gradient-to-r from-blue-500 to-green-500 transform -translate-x-8"></div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-900/20 to-green-900/20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Ready to Transform Your Business?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Let&apos;s discuss how our AI services can help you achieve your goals.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300"
            >
              Get Started
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/portfolio"
              className="inline-flex items-center gap-2 border-2 border-gray-600 hover:border-blue-400 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300"
            >
              View Our Work
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}