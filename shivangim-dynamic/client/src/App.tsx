import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Router as WouterRouter, Switch } from "wouter";
import { useHashLocation } from "wouter/use-hash-location";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import CaseStudy from "./pages/CaseStudy";
import Home from "./pages/Home";

/**
 * Opened from the filesystem — the single-file preview build — the pathname is
 * the file's own path, so path-based routes never match and every link is dead.
 * Switching to hash routing there makes the preview fully navigable: links
 * become `…preview.html#/case/creditright` and work with no server.
 *
 * On the real site nothing changes; normal path routing applies.
 */
const isFilePreview =
  typeof window !== "undefined" &&
  (window.location.protocol === "file:" ||
    (window as { __PREVIEW__?: boolean }).__PREVIEW__ === true);

function Routes() {
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/case/:slug"} component={CaseStudy} />
      <Route path={"/404"} component={NotFound} />
      {/* Final fallback route */}
      <Route component={NotFound} />
    </Switch>
  );
}

function Router() {
  if (isFilePreview) {
    return (
      <WouterRouter hook={useHashLocation}>
        <Routes />
      </WouterRouter>
    );
  }

  return <Routes />;
}

// NOTE: About Theme
// - First choose a default theme according to your design style (dark or light bg), than change color palette in index.css
//   to keep consistent foreground/background color across components
// - If you want to make theme switchable, pass `switchable` ThemeProvider and use `useTheme` hook

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider
        defaultTheme="light"
        // switchable
      >
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
