import { pageMetadata } from "@/lib/seo";
import About from "../ui/about";

export const metadata = pageMetadata("/about");

export default function AboutPage() {
  return <About />;
}
