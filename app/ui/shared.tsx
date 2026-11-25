import Link from "next/link";
export function Kicker({ children }: { children: React.ReactNode }) {
  return <p className="kicker">{children}</p>;
}
export function Action({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link className="btn dark" href={href}>
      {children} <span aria-hidden>↗</span>
    </Link>
  );
}
