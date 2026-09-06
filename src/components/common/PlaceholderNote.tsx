interface PlaceholderNoteProps {
  children: React.ReactNode;
}

/**
 * Marks content that is scaffolding, not fact.
 *
 * Fixtures, results, coach names and news are placeholders until the Academy
 * supplies real ones. They are labelled in the UI so a parent never reads an
 * invented kick-off time as a real one.
 */
export function PlaceholderNote({ children }: PlaceholderNoteProps) {
  return (
    <p className="mt-5 rounded border-l-4 border-mustard bg-cream-tint/60 px-4 py-3 text-[15px] text-ink-body/80">
      {children}
    </p>
  );
}
