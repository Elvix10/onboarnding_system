interface ChartCardProps {
  title: string;
  description: string;
  children: React.ReactNode;
}

export function ChartCard({ title, description, children }: ChartCardProps) {
  return (
    <div className="col-span-2 bg-card rounded-xl shadow-soft p-6">
      <div className="font-bold text-lg mb-2 text-card-foreground">{title}</div>
      <div className="text-sm text-muted-foreground mb-4">{description}</div>
      <div className="h-40 bg-success-light/20 rounded-lg flex items-center justify-center">
        {children}
      </div>
    </div>
  );
}