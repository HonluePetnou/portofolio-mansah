import { SectionHeader } from "@/components/shared/section-header";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";

import Link from "next/link";
import { ArrowLeft, ExternalLink, Github } from "lucide-react";

export default function ProjectDetailsPage({
  params,
}: {
  params: { slug: string };
}) {
  // In a real app, you'd fetch project data based on params.slug
  // For now, we'll use placeholder content
  const projectTitle = params.slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return (
    <div className="container section-py">
      <Breadcrumbs
        items={[
          { label: "Projects", href: "/projects" },
          { label: projectTitle, href: `/projects/${params.slug}` },
        ]}
      />

      <div className="mb-12">
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Projects
        </Link>

        <SectionHeader
          title={projectTitle}
          subtitle="A detailed look at the problem, solution, and outcome."
          className="text-left mb-0"
        />
      </div>

      <div className="grid md:grid-cols-[1fr_350px] gap-12">
        <div className="space-y-12">
          {/* Main Content would go here */}
          <div className="aspect-video w-full rounded-[40px] bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 flex items-center justify-center">
            <span className="text-muted-foreground italic">Project Preview Image</span>
          </div>

          <div className="max-w-none">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              The Challenge
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Details about the technical and product challenges faced during
              development. This section covers the initial problem statement and
              the constraints involved.
            </p>

            <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">
              The Strategy
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              How we approached the problem, the architectural decisions made,
              and the specific technologies chosen to overcome obstacles.
            </p>

            <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">
              The Impact
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Measurable results, user feedback, and the overall outcome of the
              project.
            </p>
          </div>
        </div>

        <aside className="space-y-8">
          <div className="p-8 rounded-[32px] bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 backdrop-blur-md">
            <h3 className="font-bold mb-6 uppercase tracking-widest text-[11px] text-muted-foreground">
              Technology Stack
            </h3>
            <div className="flex flex-wrap gap-2">
              <span className="text-muted-foreground text-sm italic">(Dynamic content coming soon)</span>
            </div>

            <div className="mt-10 space-y-4">
              <button className="w-full flex items-center justify-center gap-2 py-3 rounded-full bg-brand-primary text-white font-bold transition-all hover:shadow-[0_0_20px_rgba(94,80,249,0.4)]">
                Live Demo <ExternalLink className="w-4 w-4" />
              </button>
              <button className="w-full flex items-center justify-center gap-2 py-3 rounded-full border border-gray-200 dark:border-white/10 text-foreground font-medium hover:bg-gray-50 dark:hover:bg-white/5 transition-all">
                View Repository <Github className="w-4 w-4" />
              </button>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
