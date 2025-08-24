const EssencesLoading = () => (
  <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
    {Array.from({ length: 18 }, (_, index) => (
      <div key={index} className="skeleton h-47" />
    ))}
  </div>
);

export default EssencesLoading;
