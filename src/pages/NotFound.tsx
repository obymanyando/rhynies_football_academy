import { CTAButton } from "@/components/common/CTAButton";
import { PageHeader } from "@/components/common/PageHeader";
import { SEO } from "@/components/common/SEO";
import { Section } from "@/components/common/Section";

export default function NotFound() {
  return (
    <Section>
      <SEO title="Page not found" description="That page does not exist." />
      <PageHeader
        kicker="404"
        title="That page has gone walkabout."
        lead="The page you were looking for is not here. Try the Academy home page."
      />
      <CTAButton to="/" className="mt-8">
        Back to home
      </CTAButton>
    </Section>
  );
}
