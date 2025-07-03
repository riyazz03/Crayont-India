"use client";
import { useState, useEffect, useRef } from 'react';
import '../../styles/contact-form.css';


// Type for EmailJS window object
declare global {
  interface Window {
    emailjs: {
      init: (publicKey: string) => void;
      send: (serviceId: string, templateId: string, params: Record<string, string>) => Promise<unknown>;
    };
  }
}

interface ContactFormProps {
  isOpen: boolean;
  onClose: () => void;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

export default function ContactForm({ isOpen, onClose }: ContactFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    projectType: '',
    budget: '',
    message: ''
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const overlayRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js';
    script.onload = () => {
      window.emailjs.init('JFYJsVCly6UBLsnPP');
      console.log('EmailJS initialized');
    };
    document.head.appendChild(script);

    return () => {
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
    };
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';

      if (overlayRef.current && formRef.current) {
        const viewportHeight = window.innerHeight;
        const viewportWidth = window.innerWidth;
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        // Using inline styles for GSAP positioning
        if (overlayRef.current) {
          overlayRef.current.style.opacity = '0';
          overlayRef.current.style.position = 'absolute';
          overlayRef.current.style.top = scrollTop + 'px';
          overlayRef.current.style.left = '0';
          overlayRef.current.style.width = viewportWidth + 'px';
          overlayRef.current.style.height = viewportHeight + 'px';
          overlayRef.current.style.zIndex = '9999';
        }

        if (formRef.current) {
          formRef.current.style.transform = 'scale(0.8)';
          formRef.current.style.opacity = '0';
        }

        // Animate in
        setTimeout(() => {
          if (overlayRef.current) {
            overlayRef.current.style.transition = 'opacity 0.3s ease-out';
            overlayRef.current.style.opacity = '1';
          }
          if (formRef.current) {
            formRef.current.style.transition = 'transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275), opacity 0.4s ease-out';
            formRef.current.style.transform = 'scale(1)';
            formRef.current.style.opacity = '1';
          }
        }, 10);
      }
    } else {
      document.body.style.overflow = '';
    }

    const handleResize = () => {
      if (isOpen && overlayRef.current) {
        const viewportHeight = window.innerHeight;
        const viewportWidth = window.innerWidth;
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        overlayRef.current.style.top = scrollTop + 'px';
        overlayRef.current.style.width = viewportWidth + 'px';
        overlayRef.current.style.height = viewportHeight + 'px';
      }
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleResize);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleResize);
    };
  }, [isOpen]);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Project details are required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Please provide more details (at least 10 characters)';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleClose = () => {
    if (overlayRef.current && formRef.current) {
      formRef.current.style.transition = 'transform 0.2s ease-in, opacity 0.2s ease-in';
      formRef.current.style.transform = 'scale(0.8)';
      formRef.current.style.opacity = '0';

      overlayRef.current.style.transition = 'opacity 0.3s ease-in';
      overlayRef.current.style.opacity = '0';

      setTimeout(() => {
        setFormData({ name: '', email: '', company: '', projectType: '', budget: '', message: '' });
        setErrors({});
        setSubmitStatus('idle');
        onClose();
      }, 300);
    } else {
      setFormData({ name: '', email: '', company: '', projectType: '', budget: '', message: '' });
      setErrors({});
      setSubmitStatus('idle');
      onClose();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setErrors({});

    try {
      const templateParams = {
        from_name: formData.name.trim(),
        from_email: formData.email.trim(),
        company: formData.company.trim() || 'Not specified',
        project_type: formData.projectType || 'Not specified',
        budget: formData.budget || 'Not specified',
        message: formData.message.trim(),
        date: new Date().toLocaleDateString('en-IN', { 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric' 
        }),
        time: new Date().toLocaleTimeString('en-IN', { 
          hour: '2-digit', 
          minute: '2-digit',
          hour12: true 
        })
      };

      console.log('Template params:', templateParams);

      const result = await window.emailjs.send(
        'service_szyio5l',
        'template_h66dd3o',
        templateParams
      );

      console.log('Success:', result);
      setSubmitStatus('success');
      setTimeout(() => {
        handleClose();
      }, 2000);

    } catch (error) {
      console.error('Error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: keyof typeof formData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === overlayRef.current) {
      handleClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      ref={overlayRef}
      className="contact-overlay"
      onClick={handleOverlayClick}
    >
      <div
        ref={formRef}
        className="contact-form-container"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="contact-form-content">
          <div className="contact-form-header">
            <h3 className="contact-form-title">Let&apos;s Build Something Amazing</h3>
            <button
              onClick={handleClose}
              className="contact-form-close"
              disabled={isSubmitting}
            >
              ×
            </button>
          </div>

          {submitStatus === 'success' && (
            <div className="success-message">
              <p className="success-message-title">Message sent successfully!</p>
              <p className="success-message-text">We&apos;ll get back to you within 24 hours.</p>
            </div>
          )}

          {submitStatus === 'error' && (
            <div className="error-message">
              <p className="error-message-title">Failed to send message</p>
              <p className="error-message-text">Please try again or contact us directly at crayontofficial@gmail.com</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="contact-form">
            <div className="form-grid">
              <div className="form-field">
                <label className="form-label">
                  Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className={`form-input ${errors.name ? 'error' : ''}`}
                  placeholder="Your full name"
                  disabled={isSubmitting}
                />
                {errors.name && <p className="error-text">{errors.name}</p>}
              </div>

              <div className="form-field">
                <label className="form-label">
                  Email *
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className={`form-input ${errors.email ? 'error' : ''}`}
                  placeholder="your@email.com"
                  disabled={isSubmitting}
                />
                {errors.email && <p className="error-text">{errors.email}</p>}
              </div>
            </div>

            <div className="form-grid">
              <div className="form-field">
                <label className="form-label">
                  Company
                </label>
                <input
                  type="text"
                  value={formData.company}
                  onChange={(e) => handleInputChange('company', e.target.value)}
                  className="form-input"
                  placeholder="Your company name"
                  disabled={isSubmitting}
                />
              </div>

              <div className="form-field">
                <label className="form-label">
                  Project Type
                </label>
                <select
                  value={formData.projectType}
                  onChange={(e) => handleInputChange('projectType', e.target.value)}
                  className="selecteer"
                  disabled={isSubmitting}
                >
                  <option value="">Select project type</option>
                  <option value="Web Development">Web Development</option>
                  <option value="Mobile App">Mobile App</option>
                  <option value="Web App">Web Application</option>
                  <option value="E-commerce">E-commerce</option>
                  <option value="Startup MVP">Startup MVP</option>
                  <option value="UI/UX Design">UI/UX Design</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

            <div className="form-field">
              <label className="form-label">
                Budget Range
              </label>
              <select
                value={formData.budget}
                onChange={(e) => handleInputChange('budget', e.target.value)}
                className="selecteer"
                disabled={isSubmitting}
              >
                <option value="">Select budget range</option>
                <option value="₹1L - ₹3L">₹1L - ₹3L</option>
                <option value="₹3L - ₹8L">₹3L - ₹8L</option>
                <option value="₹8L - ₹20L">₹8L - ₹20L</option>
                <option value="₹20L+">₹20L+</option>
                <option value="Let&apos;s Discuss">Let&apos;s Discuss</option>
              </select>
            </div>

            <div className="form-field">
              <label className="form-label">
                Project Details *
              </label>
              <textarea
                required
                rows={4}
                value={formData.message}
                onChange={(e) => handleInputChange('message', e.target.value)}
                className={`form-textarea ${errors.message ? 'error' : ''}`}
                placeholder="Tell us about your project, goals, and timeline..."
                disabled={isSubmitting}
              />
              {errors.message && <p className="error-text">{errors.message}</p>}
            </div>

            <button
              type="submit"
              disabled={isSubmitting || submitStatus === 'success'}
              className="submit-button"
            >
              {isSubmitting ? 'Sending...' : submitStatus === 'success' ? 'Message Sent!' : 'Send Message'}
            </button>
          </form>

          <p className="footer-text">
            We&apos;ll get back to you within 24 hours
          </p>
        </div>
      </div>
    </div>
  );
}