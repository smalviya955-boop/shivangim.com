/**
 * Design: Signal & Strategy — Footer
 * Dark background, minimal. Name + location.
 */
export default function Footer() {
  return (
    <footer className="py-8" style={{ background: "oklch(0.96 0.02 80)" }}>
      <div className="container flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
        <div>
          <span className="font-semibold text-foreground">Shivangi Malviya</span>
          {" | "}
          <span>Product &amp; GTM Strategy Consultant</span>
        </div>
        <div>
          Madhya Pradesh and Central India
          {" | "}
          <a href="mailto:hello@shivangim.com" className="hover:text-[#8FA83B] transition-colors">
            hello@shivangim.com
          </a>
        </div>
      </div>
    </footer>
  );
}
