/**
 * Scroll to a section on the home page, from anywhere.
 *
 * If the section is on the current page, just scroll. If it isn't — you're on a
 * case study page — route home first and scroll once it mounts.
 *
 * Deliberately does not use a "/#section" URL: in the hash-routed preview build
 * the hash carries the route, so it can't also carry an anchor.
 */
export function goToSection(id: string, navigate: (to: string) => void) {
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: "smooth", block: "start" });
    return;
  }

  navigate("/");

  let tries = 0;
  const settle = () => {
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    } else if (tries++ < 20) {
      requestAnimationFrame(settle);
    }
  };
  requestAnimationFrame(settle);
}
