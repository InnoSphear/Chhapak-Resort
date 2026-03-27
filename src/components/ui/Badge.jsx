export function Badge({ children, variant = "default", className = "" }) {
  const variants = {
    default: "bg-sand/50 text-charcoal",
    gold: "bg-gold/10 text-gold",
    success: "bg-green-100 text-green-700",
    warning: "bg-amber-100 text-amber-700",
    error: "bg-red-100 text-red-700",
  };

  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
}

export function StatusBadge({ status }) {
  const statusConfig = {
    pending: { variant: "warning", label: "Pending" },
    approved: { variant: "success", label: "Approved" },
    rejected: { variant: "error", label: "Rejected" },
    paid: { variant: "gold", label: "Paid" },
    active: { variant: "success", label: "Active" },
    inactive: { variant: "default", label: "Inactive" },
  };

  const config = statusConfig[status] || statusConfig.pending;

  return <Badge variant={config.variant}>{config.label}</Badge>;
}
