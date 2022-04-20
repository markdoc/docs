export function Banner({ children, type }) {
  return (
    <section className={`banner ${type}`}>
      {children}
      <style jsx>{`
        .banner {
          border-radius: 4px;
          padding: 0 1em;
        }
        .warning {
          background: #fef9da;
          border: 1px solid #40445229;
        }
      `}</style>
    </section>
  );
}
