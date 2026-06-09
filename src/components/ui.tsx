"use client";

import React from "react";
import clsx from "clsx";

// ============================================================================
// Badge
// ============================================================================
const badgeVariants = {
  success: "bg-green-50 text-green-700 border-green-200",
  warning: "bg-amber-50 text-amber-700 border-amber-200",
  danger: "bg-red-50 text-red-700 border-red-200",
  info: "bg-blue-50 text-blue-700 border-blue-200",
  neutral: "bg-slate-50 text-slate-600 border-slate-200",
  accent: "bg-indigo-50 text-accent border-indigo-200",
};

export function Badge({
  children,
  variant = "neutral",
  className,
}: {
  children: React.ReactNode;
  variant?: keyof typeof badgeVariants;
  className?: string;
}) {
  return (
    <span
      className={clsx(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium",
        badgeVariants[variant],
        className
      )}
    >
      {children}
    </span>
  );
}

// ============================================================================
// StatusDot
// ============================================================================
const statusColors = {
  low: "bg-green-400",
  medium: "bg-amber-400",
  high: "bg-orange-400",
  critical: "bg-red-500 animate-pulse",
};

export function StatusDot({
  level,
  label,
}: {
  level: keyof typeof statusColors;
  label: string;
}) {
  return (
    <span className="inline-flex items-center gap-1.5 text-sm">
      <span
        className={clsx("h-2 w-2 rounded-full", statusColors[level])}
        aria-hidden="true"
      />
      <span className="text-ink/70 capitalize">{label}</span>
    </span>
  );
}

// ============================================================================
// ProgressBar
// ============================================================================
export function ProgressBar({
  value,
  max = 100,
  variant = "accent",
  showLabel = true,
  className,
}: {
  value: number;
  max?: number;
  variant?: "accent" | "success" | "warning" | "danger";
  showLabel?: boolean;
  className?: string;
}) {
  const pct = Math.min(Math.round((value / max) * 100), 100);

  const barColors = {
    accent: "bg-accent",
    success: "bg-green-500",
    warning: "bg-amber-500",
    danger: "bg-red-500",
  };

  return (
    <div className={clsx("w-full", className)}>
      {showLabel && (
        <div className="mb-1 flex justify-between text-xs text-ink/60">
          <span>{pct}%</span>
          <span>
            {value.toLocaleString()} / {max.toLocaleString()}
          </span>
        </div>
      )}
      <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
        <div
          className={clsx("h-full rounded-full transition-all", barColors[variant])}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

// ============================================================================
// Card
// ============================================================================
export function Card({
  children,
  title,
  subtitle,
  className,
  action,
}: {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  className?: string;
  action?: React.ReactNode;
}) {
  return (
    <div
      className={clsx(
        "rounded-2xl border border-slate-200/60 bg-white/70 p-6 shadow-sm backdrop-blur",
        className
      )}
    >
      {(title || action) && (
        <div className="mb-4 flex items-start justify-between gap-4">
          <div>
            {title && (
              <h3 className="text-base font-semibold text-ink">{title}</h3>
            )}
            {subtitle && (
              <p className="mt-0.5 text-sm text-ink/50">{subtitle}</p>
            )}
          </div>
          {action && <div className="shrink-0">{action}</div>}
        </div>
      )}
      {children}
    </div>
  );
}

// ============================================================================
// StatCard
// ============================================================================
export function StatCard({
  label,
  value,
  delta,
  icon,
  format = "currency",
  variant = "neutral",
}: {
  label: string;
  value: number;
  delta?: string;
  icon?: string;
  format?: "currency" | "percentage" | "number" | "count";
  variant?: "neutral" | "positive" | "negative" | "accent";
}) {
  const fmt = new Intl.NumberFormat("en-US", {
    style: format === "currency" ? "currency" : "decimal",
    currency: "USD",
    minimumFractionDigits: format === "currency" ? 0 : 1,
    maximumFractionDigits: format === "currency" ? 0 : 1,
  });

  let display = fmt.format(value);
  if (format === "percentage") display = `${value.toFixed(1)}%`;
  if (format === "count") display = value.toLocaleString();

  const variantStyles = {
    neutral: "text-ink",
    positive: "text-green-600",
    negative: "text-red-600",
    accent: "text-accent",
  };

  return (
    <div className="flex flex-col gap-1">
      <span className="text-xs font-medium uppercase tracking-wide text-ink/40">
        {label}
      </span>
      <span
        className={clsx(
          "text-2xl font-bold tabular-nums",
          variantStyles[variant]
        )}
      >
        {icon && <span className="mr-1.5">{icon}</span>}
        {display}
      </span>
      {delta && (
        <span
          className={clsx(
            "text-xs font-medium",
            delta.startsWith("+") ? "text-green-600" : "text-red-600"
          )}
        >
          {delta}
        </span>
      )}
    </div>
  );
}
