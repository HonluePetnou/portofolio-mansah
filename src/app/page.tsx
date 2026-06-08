import { HeroSection } from "@/components/home/hero-section";
import { AboutSection } from "@/components/home/about-section";
import { TechStack } from "@/components/home/tech-stack";
import { ProjectsSection } from "@/components/home/projects-section";
import { ExperienceSection } from "@/components/home/experience-section";
import { TestimonialsSection } from "@/components/home/testimonials-section";
import { BlogSection } from "@/components/home/blog-section";
import { ContactSection } from "@/components/home/contact-section";
import { getExperiences, getProjects, getBlogPosts, getTestimonials } from "@/sanity/lib/fetch";

export const revalidate = 60; // Revalidate cache every 60 seconds (Incremental Static Regeneration)

export default async function Home() {
  // Fetch data in parallel on the server
  const [experiences, projects, blogPosts, testimonials] = await Promise.all([
    getExperiences(),
    getProjects(),
    getBlogPosts(),
    getTestimonials(),
  ]);

  return (
    <div className="flex flex-col w-full">
      <HeroSection />
      <AboutSection />
      <TechStack />
      <ProjectsSection projects={projects} />
      <ExperienceSection experiences={experiences} />
      <TestimonialsSection testimonials={testimonials} />
      <BlogSection posts={blogPosts} />
      <ContactSection />
    </div>
  );
}
