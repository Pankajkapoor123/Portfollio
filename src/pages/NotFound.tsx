import { Link, useLocation } from "react-router-dom";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { projects } from "@/data/projects";

const NotFound = () => {
  const { pathname } = useLocation();

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="shell flex-1 pb-24 pt-32 md:pt-40">
        <p className="font-mono text-sm text-muted-foreground">
          <span className="text-primary">404</span> · GET {pathname}
        </p>
        <h1 className="mt-4 max-w-2xl text-4xl font-semibold leading-tight md:text-5xl">This page doesn't exist.</h1>
        <p className="mt-4 max-w-xl text-lg text-muted-foreground">
          The link may be outdated. Here's everything that does exist:
        </p>
        <Link to="/" className="btn btn-outline mt-8">
          <ArrowLeft className="h-4 w-4" /> Back to home
        </Link>

        <ul className="mt-14 divide-y divide-border border-y border-border">
          {projects.map((p) => (
            <li key={p.slug}>
              <Link to={`/projects/${p.slug}`} className="group flex items-center gap-4 py-4">
                <p.icon className="h-4 w-4 shrink-0 text-muted-foreground" strokeWidth={1.75} />
                <span className="font-medium">{p.title}</span>
                <span className="hidden text-sm text-muted-foreground sm:inline">{p.category}</span>
                <ArrowUpRight className="ml-auto h-4 w-4 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground" />
              </Link>
            </li>
          ))}
        </ul>
      </main>
      <Footer />
    </div>
  );
};

export default NotFound;
