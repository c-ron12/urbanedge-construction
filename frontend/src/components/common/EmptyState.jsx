const EmptyState = ({ children }) => {
  return (
    <div className="text-center py-3">
      <div className="empty-state">{children}</div>
    </div>
  );
};

export default EmptyState;

