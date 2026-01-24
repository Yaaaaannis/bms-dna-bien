"use client";

import { useState, useMemo, useEffect } from "react";
import { usePathname } from "next/navigation";
import Header from "../components/Header";
import Service, { Project } from "../components/Service";
import Projet from "../components/Projet";
import { useBackground } from "../contexts/BackgroundContext";

export default function ServicesPage() {
  const pathname = usePathname();
  const { setBackgroundState } = useBackground();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [allProjects, setAllProjects] = useState<Project[]>([]);

  // Mettre à jour l'état du background pour cette page
  useEffect(() => {
    setBackgroundState({
      isServiceVisible: true,
      isCollectifVisible: false,
      isProjetsVisible: !!selectedProject,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, selectedProject]);

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project);
  };

  const handleProjectClose = () => {
    setSelectedProject(null);
  };

  // Navigation entre projets
  const currentProjectIndex = useMemo(() => {
    if (!selectedProject) return -1;
    const index = allProjects.findIndex(p => p.id === selectedProject.id);
    return index;
  }, [selectedProject, allProjects]);

  const handlePreviousProject = () => {
    const previousIndex = currentProjectIndex <= 0
      ? allProjects.length - 1
      : currentProjectIndex - 1;
    const previousProject = allProjects[previousIndex];
    setSelectedProject(previousProject);
  };

  const handleNextProject = () => {
    const nextIndex = currentProjectIndex >= allProjects.length - 1
      ? 0
      : currentProjectIndex + 1;
    const nextProject = allProjects[nextIndex];
    setSelectedProject(nextProject);
  };

  return (
    <div className="relative min-h-screen">
      {/* Header avec logo et navigation */}
      <Header
        currentPath={pathname}
      />

      {/* Service */}
      <Service
        isVisible={!selectedProject}
        onProjectClick={handleProjectClick}
        onProjectsLoaded={setAllProjects}
      />

      {/* Projets au clic sur une image de la galerie */}
      {selectedProject && (
        <Projet
          isVisible={!!selectedProject}
          project={selectedProject}
          onClose={handleProjectClose}
          onPrevious={handlePreviousProject}
          onNext={handleNextProject}
          currentIndex={currentProjectIndex}
          totalProjects={allProjects.length}
        />
      )}
    </div>
  );
}
