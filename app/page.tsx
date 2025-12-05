"use client";

import { useState, useEffect, useMemo } from "react";
import Loader from "./components/Loader";
import Background from "./components/Background";
import Header from "./components/Header";
import Service, { Project } from "./components/Service";
import Collectif from "./components/Collectif";
import Projet from "./components/Projet";
import Presentation from "./components/Presentation";
import Contact from "./components/Contact";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [isServiceVisible, setIsServiceVisible] = useState(false);
  const [isCollectifVisible, setIsCollectifVisible] = useState(false);
  const [isPresentationVisible, setIsPresentationVisible] = useState(false);
  const [isProjetsVisible, setIsProjetsVisible] = useState(false);
  const [isContactVisible, setIsContactVisible] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [email, setEmail] = useState("");
  const [submitStatus, setSubmitStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [allProjects, setAllProjects] = useState<Project[]>([]);


  // Points 3D fixes (sans contrôles)
  const servicePoints = [
    { position: [-0.2, 1.7, 0] as [number, number, number], name: 'DIRECTION ARTISTIQUE' },
    { position: [-0.2, 1.7, 0] as [number, number, number], name: 'DIRECTION ARTISTIQUE' },

    { position: [-0.2, 0.6, 0] as [number, number, number], name: 'DÉVELOPPEMENT WEB' },
    { position: [-0.2, 0.6, 0] as [number, number, number], name: 'DÉVELOPPEMENT WEB' },

    { position: [-0.7, -1.5, 0] as [number, number, number], name: 'MOTION DESIGN / 3D' },
    { position: [-0.7, -1.5, 0] as [number, number, number], name: 'MOTION DESIGN / 3D' },

    { position: [-0.345, -0.560, 1.056] as [number, number, number], name: 'PHOTOGRAPHIE' },
    { position: [-0.345, -0.560, 1.056] as [number, number, number], name: 'PHOTOGRAPHIE' },

    { position: [0.118, -1.546, 1.420] as [number, number, number], name: 'CINÉMATOGRAPHIE' },
    { position: [0.118, -1.546, 1.420] as [number, number, number], name: 'CINÉMATOGRAPHIE' },

    { position: [0, -2.0, 2.224] as [number, number, number], name: 'MONTAGE VIDÉO' },
    { position: [0, -2.0, 2.224] as [number, number, number], name: 'MONTAGE VIDÉO' },
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);


  // Afficher le loader en surcouche mais charger le background en dessous

  const handleServicesClick = () => {
    setIsServiceVisible(!isServiceVisible);
    // Désactiver les autres sections quand on clique sur Services
    setIsCollectifVisible(false);
    setIsPresentationVisible(false);
    setIsProjetsVisible(false);
    setIsContactVisible(false);
  };


  const handleCollectifClick = () => {
    setIsPresentationVisible(!isPresentationVisible);
    // Désactiver les autres sections quand on clique sur Collectif
    setIsServiceVisible(false);
    setIsCollectifVisible(false);
    setIsProjetsVisible(false);
    setIsContactVisible(false);
  };

  const handleProjetsClick = () => {
    setIsCollectifVisible(!isCollectifVisible);
    // Désactiver les autres sections quand on clique sur Team
    setIsServiceVisible(false);
    setIsPresentationVisible(false);
    setIsProjetsVisible(false);
    setIsContactVisible(false);
  };

  const handleContactClick = () => {
    setIsContactVisible(!isContactVisible);
    // Désactiver les autres sections quand on clique sur Contact
    setIsServiceVisible(false);
    setIsCollectifVisible(false);
    setIsPresentationVisible(false);
    setIsProjetsVisible(false);
    // Ici vous pouvez ajouter la logique pour afficher le contenu Contact
  };

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project);
    setIsProjetsVisible(true);
  };

  const handleProjectClose = () => {
    setSelectedProject(null);
    setIsProjetsVisible(false);
  };

  // Navigation entre projets
  const currentProjectIndex = useMemo(() => {
    if (!selectedProject) return -1;
    const index = allProjects.findIndex(p => p.id === selectedProject.id);
    console.log('Current project index:', index, 'Selected project:', selectedProject);
    return index;
  }, [selectedProject, allProjects]);

  const handlePreviousProject = () => {
    console.log('handlePreviousProject called', {
      currentProjectIndex,
      totalProjects: allProjects.length
    });
    // Navigation circulaire : si on est au premier, on va au dernier
    const previousIndex = currentProjectIndex <= 0
      ? allProjects.length - 1
      : currentProjectIndex - 1;
    const previousProject = allProjects[previousIndex];
    console.log('Setting previous project:', previousProject, 'at index:', previousIndex);
    setSelectedProject(previousProject);
  };

  const handleNextProject = () => {
    console.log('handleNextProject called', {
      currentProjectIndex,
      totalProjects: allProjects.length
    });
    // Navigation circulaire : si on est au dernier, on revient au premier
    const nextIndex = currentProjectIndex >= allProjects.length - 1
      ? 0
      : currentProjectIndex + 1;
    const nextProject = allProjects[nextIndex];
    console.log('Setting next project:', nextProject, 'at index:', nextIndex);
    setSelectedProject(nextProject);
  };

  // Log pour déboguer les props passées au composant Projet
  useEffect(() => {
    if (isProjetsVisible && selectedProject) {
      console.log('Projet component props:', {
        currentProjectIndex,
        hasPrevious: currentProjectIndex > 0,
        hasNext: currentProjectIndex < allProjects.length - 1,
        onPrevious: currentProjectIndex > 0 ? 'defined' : 'undefined',
        onNext: currentProjectIndex < allProjects.length - 1 ? 'defined' : 'undefined',
        selectedProject
      });
    }
  }, [isProjetsVisible, selectedProject, currentProjectIndex, allProjects.length]);

  const submitEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      setSubmitStatus("error");
      return;
    }
    setSubmitStatus("loading");
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email })
      });
      if (!res.ok) throw new Error("bad");
      setSubmitStatus("success");
      setEmail("");
    } catch {
      setSubmitStatus("error");
    }
  };

  return (
    <div className="relative min-h-screen">
      {/* Scène 3D en arrière-plan */}
      <Background
        servicePoints={servicePoints}
        isServiceVisible={isServiceVisible}
        isCollectifVisible={isCollectifVisible}
        isProjetsVisible={isProjetsVisible}
      />
      {isLoading && (
        <div className="fixed inset-0 z-50">
          <Loader onComplete={() => setIsLoading(false)} />
        </div>
      )}

      {/* Header avec logo et navigation */}
      <Header
        onServicesClick={handleServicesClick}
        onCollectifClick={handleCollectifClick}
        onProjetsClick={handleProjetsClick}
        onContactClick={handleContactClick}
        isServiceVisible={isServiceVisible}
        isCollectifVisible={isCollectifVisible}
        isPresentationVisible={isPresentationVisible}
        isProjetsVisible={isProjetsVisible}
        isContactVisible={isContactVisible}
      />

      {/* Service au clic - caché quand Projet est actif */}
      {isServiceVisible && !isProjetsVisible && (
        <Service
          isVisible={isServiceVisible}
          onProjectClick={handleProjectClick}
          onProjectsLoaded={setAllProjects}
        />
      )}

      {/* Présentation au clic sur COLLECTIF */}
      {isPresentationVisible && (
        <Presentation
          isVisible={isPresentationVisible}
          onReturn={() => setIsPresentationVisible(false)}
        />
      )}

      {/* Collectif au clic sur TEAM */}
      {isCollectifVisible && (
        <Collectif
          isVisible={isCollectifVisible}
          onReturn={() => setIsCollectifVisible(false)}
        />
      )}

      {/* Projets au clic sur une image de la galerie */}
      {isProjetsVisible && selectedProject && (
        <Projet
          isVisible={isProjetsVisible}
          project={selectedProject}
          onClose={handleProjectClose}
          onPrevious={handlePreviousProject}
          onNext={handleNextProject}
          currentIndex={currentProjectIndex}
          totalProjects={allProjects.length}
        />
      )}

      {/* Contact au clic sur CONTACT */}
      {isContactVisible && (
        <Contact
          isVisible={isContactVisible}
          onReturn={() => setIsContactVisible(false)}
        />
      )}

    </div>
  );
}
