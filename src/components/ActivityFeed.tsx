interface ActivityFeedProps {
  activities: {
    user: {
      name: string;
      initials: string;
    };
    type: "employee" | "tool" | "device" | "approval" | "system";
    description: string;
    timestamp: string;
    details?: string;
  }[];
}

const activityTypeStyles = {
  employee: "bg-secondary text-secondary-foreground",
  tool: "bg-success text-success-foreground",
  device: "bg-warning text-warning-foreground",
  approval: "bg-accent text-accent-foreground",
  system: "bg-popover text-popover-foreground",
};

export function ActivityFeed({ activities }: ActivityFeedProps) {
  return (
    <div className="bg-card rounded-xl shadow-soft p-6">
      <div className="font-bold text-lg mb-2 text-card-foreground">Atividades Recentes</div>
      <ul className="space-y-4">
        {activities.map((activity, index) => (
          <li key={index} className="flex items-center gap-2">
            <div className="bg-muted rounded-full w-8 h-8 flex items-center justify-center font-bold text-muted-foreground">
              {activity.user.initials}
            </div>
            <div>
              <span className="font-semibold">{activity.user.name}</span>
              <span className={`ml-2 ${activityTypeStyles[activity.type]} text-xs px-2 py-1 rounded`}>
                {activity.type.charAt(0).toUpperCase() + activity.type.slice(1)}
              </span>
              <div className="text-xs text-muted-foreground">
                {activity.description}
                {activity.details && <> • {activity.details}</>}
                <br />
                {activity.timestamp}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}