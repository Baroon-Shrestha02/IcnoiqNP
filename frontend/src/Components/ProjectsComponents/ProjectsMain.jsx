import React from "react";
import AllProjects from "./AllProjects";
import ProjectsHero from "./ProjectsHero";
import ProjectsCTA from "./ProjectsCTA";

export default function ProjectsMain() {
  return (
    <div>
      <ProjectsHero />
      <AllProjects />
      <ProjectsCTA />
    </div>
  );
}
