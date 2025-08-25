const MemoriesLoading = () => (
  <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
    {Array.from({ length: 18 }, (_, index) => (
      <div key={index} className="skeleton h-49" />
    ))}
  </div>
);

export default MemoriesLoading;
