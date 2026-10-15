import { ThemeProvider } from "next-themes";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";
import { CommandMenuProvider } from "@/components/CommandMenu";
import PageBackground from "@/components/PageBackground";
import MobileHireBar from "@/components/MobileHireBar";
import ScrollTopButton from "@/components/ScrollTopButton";
import Index from "./pages/Index";
import ProjectDetail from "./pages/ProjectDetail";
import NotFound from "./pages/NotFound";

const App = () => (
  <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
    <BrowserRouter>
      <PageBackground />
      <CommandMenuProvider>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/projects/:slug" element={<ProjectDetail />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <MobileHireBar />
        <ScrollTopButton />
      </CommandMenuProvider>
      <Toaster position="bottom-right" />
    </BrowserRouter>
  </ThemeProvider>
);

export default App;
