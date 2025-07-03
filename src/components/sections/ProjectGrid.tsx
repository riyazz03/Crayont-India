"use client";
import { useState } from 'react';
import projectsData from '../../data/projects.json';
import '../../styles/project-grid.css';

export default function ProjectGrid() {
  const [filter, setFilter] = useState('All');

  const categories = ['All', 'Web Development', 'Mobile App', 'UI/UX Design'];

  const filteredProjects = filter === 'All'
    ? projectsData
    : projectsData.filter(project => project.categories.includes(filter));

  return (
    <section id="projects" className="projects-section">
      <div className="main-container">
        <div className="section-title-wrapper">
          <h2 className="section-title">
            Portfolio <span>Showcase</span>
          </h2>
          <p className="section-subtitle">
            Your brand&apos;s next chapter—written in digital
          </p>
        </div>

        <div className="filter-container">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setFilter(category)}
              className={`filter-button ${filter === category ? 'filter-button-active' : ''}`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="projects-grid">
          {filteredProjects.map((project) => (
            <div key={project.id} className="project-card">
              <div className="card-image">
                <img
                  src={`${project.image}`}
                  alt={project.title}
                  className="card-image-img"
                />
              </div>

              <div className="card-content">
                <div className="card-content-header">
                  <div className="category-badges">
                    {project.categories.map((category, index) => (
                      <span key={index} className="category-badge">
                        {category}
                      </span>
                    ))}
                  </div>
                  <p className="card-title">
                    {project.title}
                  </p>
                </div>

                <p className="card-description">
                  {project.description}
                </p>

                <div className="tech-container">
                  {project.technologies.map((tech, index) => (
                    <span key={index} className="tech-tag">
                      {tech}
                    </span>
                  ))}
                </div>

                {project.link && project.link.trim() !== '' && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-link"
                  >
                    View Project
                    <svg className="link-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </a>
                )}

                {(!project.link || project.link.trim() === '') && (
                  <div className="project-link-disabled">
                    Coming Soon
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}