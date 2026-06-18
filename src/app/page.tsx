"use client";

import React, { useMemo } from "react";
import { Badge, Card, ProgressBar, StatusDot, StatCard } from "@/components/ui";
import {
  products,
  customerSegments,
  revenueMetrics,
  promotions,
  getProductPerformanceRows,
  getHeroStats,
  getStockoutAlerts,
} from "@/lib/demo-data";

export default function DashboardPage() {
  const hero = useMemo(() => getHeroStats(), []);
  const rows = useMemo(() => getProductPerformanceRows(), []);
  const alerts = useMemo(() => getStockoutAlerts(), []);

  const totalPromoRevenue = useMemo(
    () => promotions.reduce((sum, p) => sum + p.revenueGenerated, 0),
    []
  );

  const totalIncrementalRevenue = useMemo(
    () => promotions.reduce((sum, p) => sum + p.incrementalRevenue, 0),
    []
  );

  const totalPromoOrders = useMemo(
    () => promotions.reduce((sum, p) => sum + p.ordersInfluenced, 0),
    []
  );

  return (
    <div className="space-y-8">
      {/* ================================================================== */}
      {/* HERO STATS                                                         */}
      {/* ================================================================== */}
      <section>
        <div className="mb-4">
          <h2 className="text-xl font-semibold text-ink">Dashboard Overview</h2>
          <p className="text-sm text-ink/50">
            Real-time intelligence for {new Date().toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </p>
        </div>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          <Card>
            <StatCard
              label="Total Revenue"
              value={hero.totalRevenue}
              format="currency"
              variant="positive"
              delta={`+${hero.revenueGrowth}% YoY`}
            />
          </Card>
          <Card>
            <StatCard
              label="Gross Margin"
              value={hero.grossMargin}
              format="percentage"
              variant="accent"
            />
          </Card>
          <Card>
            <StatCard
              label="Stockout Risks"
              value={hero.stockoutRiskCount}
              format="count"
              variant="negative"
              delta={`${alerts.filter((a) => a.stockoutRisk === "critical").length} critical`}
            />
          </Card>
          <Card>
            <StatCard
              label="Active Segments"
              value={hero.activeSegments}
              format="count"
              variant="neutral"
            />
          </Card>
          <Card>
            <StatCard
              label="Active Promotions"
              value={hero.activePromotions}
              format="count"
              variant="neutral"
              delta={`${totalPromoOrders.toLocaleString()} influenced orders`}
            />
          </Card>
          <Card>
            <StatCard
              label="AOV"
              value={revenueMetrics.averageOrderValue}
              format="currency"
              variant="neutral"
            />
          </Card>
        </div>
      </section>

      {/* ================================================================== */}
      {/* PRODUCT PERFORMANCE GRID                                           */}
      {/* ================================================================== */}
      <section>
        <Card
          title="Product Performance &amp; Pricing Recommendations"
          subtitle={`${products.length} products across 6 categories`}
        >
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-100 text-left text-xs uppercase tracking-wide text-ink/40">
                  <th className="pb-3 pr-4 font-medium">Product</th>
                  <th className="pb-3 pr-4 font-medium">Category</th>
                  <th className="pb-3 pr-4 font-medium text-right">
                    Current Price
                  </th>
                  <th className="pb-3 pr-4 font-medium text-right">
                    Rec. Price
                  </th>
                  <th className="pb-3 pr-4 font-medium text-right">Margin</th>
                  <th className="pb-3 pr-4 font-medium">Rec. Impact</th>
                  <th className="pb-3 pr-4 font-medium">Stock</th>
                  <th className="pb-3 font-medium">Risk</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {rows.map(({ product, priceOptimization, inventory }) => (
                  <tr key={product.id} className="hover:bg-slate-50/50">
                    <td className="py-3 pr-4">
                      <div className="font-medium text-ink">
                        {product.name}
                      </div>
                      <div className="text-xs text-ink/40">{product.sku}</div>
                    </td>
                    <td className="py-3 pr-4 text-ink/60">
                      <Badge variant="info">{product.category}</Badge>
                    </td>
                    <td className="py-3 pr-4 text-right font-medium tabular-nums">
                      ${product.currentPrice.toFixed(2)}
                    </td>
                    <td className="py-3 pr-4 text-right tabular-nums">
                      {priceOptimization ? (
                        <span
                          className={
                            priceOptimization.recommendedPrice >
                            product.currentPrice
                              ? "font-medium text-green-600"
                              : priceOptimization.recommendedPrice <
                                  product.currentPrice
                                ? "font-medium text-amber-600"
                                : "font-medium text-slate-600"
                          }
                        >
                          ${priceOptimization.recommendedPrice.toFixed(2)}
                        </span>
                      ) : (
                        <span className="text-ink/30">--</span>
                      )}
                    </td>
                    <td className="py-3 pr-4 text-right tabular-nums">
                      <span
                        className={
                          product.margin >= 60
                            ? "text-green-600"
                            : product.margin >= 50
                              ? "text-ink/70"
                              : "text-amber-600"
                        }
                      >
                        {product.margin.toFixed(1)}%
                      </span>
                    </td>
                    <td className="py-3 pr-4">
                      {priceOptimization ? (
                        <div className="space-y-1">
                          <div className="flex items-center gap-1.5">
                            <Badge
                              variant={
                                priceOptimization.estimatedRevenueImpact > 0
                                  ? "success"
                                  : "warning"
                              }
                            >
                              {priceOptimization.estimatedRevenueImpact > 0
                                ? "+"
                                : ""}
                              {priceOptimization.estimatedRevenueImpact.toFixed(
                                1
                              )}
                              % rev
                            </Badge>
                            <span className="text-xs text-ink/30">
                              {Math.round(priceOptimization.confidence * 100)}%
                              conf
                            </span>
                          </div>
                          <div className="flex flex-wrap items-center gap-1 text-xs text-ink/40">
                            <Badge
                              variant={
                                priceOptimization.inventorySignal ===
                                "stockout_guardrail"
                                  ? "warning"
                                  : priceOptimization.inventorySignal ===
                                      "overstock_clearance"
                                    ? "info"
                                    : "neutral"
                              }
                            >
                              {priceOptimization.recommendedAction.replace(
                                "_",
                                " "
                              )}
                            </Badge>
                            <span>
                              Floor: $
                              {priceOptimization.marginFloorPrice.toFixed(2)}
                            </span>
                          </div>
                        </div>
                      ) : (
                        <span className="text-xs text-ink/30">
                          No recommendation
                        </span>
                      )}
                    </td>
                    <td className="py-3 pr-4">
                      {inventory ? (
                        <div className="flex items-center gap-2">
                          <span className="tabular-nums text-ink/70">
                            {inventory.currentStock.toLocaleString()}
                          </span>
                          <span className="text-xs text-ink/30">
                            ({inventory.daysOfStockRemaining}d)
                          </span>
                        </div>
                      ) : (
                        <span className="tabular-nums text-ink/70">
                          {product.stockLevel.toLocaleString()}
                        </span>
                      )}
                    </td>
                    <td className="py-3">
                      {inventory ? (
                        <StatusDot
                          level={inventory.stockoutRisk}
                          label={inventory.stockoutRisk}
                        />
                      ) : (
                        <StatusDot level="low" label="healthy" />
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </section>

      {/* ================================================================== */}
      {/* CUSTOMER SEGMENT BREAKDOWN + INVENTORY HEALTH (side by side)       */}
      {/* ================================================================== */}
      <section className="grid gap-6 lg:grid-cols-2">
        {/* Customer Segments */}
        <Card
          title="Customer Segments"
          subtitle={`${customerSegments
            .reduce((sum, s) => sum + s.customerCount, 0)
            .toLocaleString()} total customers`}
        >
          <div className="space-y-4">
            {customerSegments.map((seg) => (
              <div key={seg.id} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span
                      className="h-3 w-3 rounded-full"
                      style={{ backgroundColor: seg.color }}
                    />
                    <span className="text-sm font-medium text-ink">
                      {seg.name}
                    </span>
                    <Badge
                      variant={
                        seg.churnRisk < 0.1
                          ? "success"
                          : seg.churnRisk < 0.3
                            ? "info"
                            : seg.churnRisk < 0.5
                              ? "warning"
                              : "danger"
                      }
                    >
                      {seg.churnRisk < 0.1
                        ? "Healthy"
                        : seg.churnRisk < 0.3
                          ? "Stable"
                          : seg.churnRisk < 0.5
                            ? "At Risk"
                            : "Critical"}
                    </Badge>
                  </div>
                  <span className="text-sm font-semibold tabular-nums text-ink">
                    ${seg.arpu.toLocaleString()}{" "}
                    <span className="text-xs font-normal text-ink/40">
                      ARPU
                    </span>
                  </span>
                </div>
                <ProgressBar
                  value={seg.customerCount}
                  max={customerSegments.reduce(
                    (max, s) => Math.max(max, s.customerCount),
                    0
                  )}
                  variant={
                    seg.churnRisk < 0.15
                      ? "success"
                      : seg.churnRisk < 0.4
                        ? "warning"
                        : "danger"
                  }
                />
                <div className="flex justify-between text-xs text-ink/40">
                  <span>
                    {seg.percentageOfBase}% of base &middot;{" "}
                    {seg.customerCount.toLocaleString()} customers
                  </span>
                  <span>
                    LTV: ${seg.lifetimeValue.toLocaleString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Inventory Health with Reorder Alerts */}
        <Card
          title="Inventory Health"
          subtitle={`${alerts.length} products need attention`}
        >
          {alerts.length === 0 ? (
            <p className="text-sm text-ink/50">
              All inventory levels are healthy.
            </p>
          ) : (
            <div className="space-y-4">
              {alerts.map((alert) => {
                const product = products.find(
                  (p) => p.id === alert.productId
                );
                return (
                  <div
                    key={alert.productId}
                    className="rounded-xl border border-slate-100 bg-slate-50/50 p-4"
                  >
                    <div className="mb-3 flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium text-ink">
                            {product?.name ?? alert.productId}
                          </span>
                          <Badge variant="info">
                            {product?.category ?? "Unknown"}
                          </Badge>
                        </div>
                        <p className="mt-0.5 text-xs text-ink/50">
                          SKU: {product?.sku ?? "N/A"}
                        </p>
                      </div>
                      <StatusDot
                        level={alert.stockoutRisk}
                        label={alert.stockoutRisk}
                      />
                    </div>
                    <div className="mb-2">
                      <ProgressBar
                        value={alert.currentStock}
                        max={alert.reorderPoint}
                        variant={
                          alert.stockoutRisk === "critical"
                            ? "danger"
                            : "warning"
                        }
                        showLabel={false}
                      />
                    </div>
                    <div className="grid grid-cols-3 gap-2 text-xs text-ink/60">
                      <div>
                        <span className="block text-ink/30">Stock</span>
                        <span className="font-medium tabular-nums">
                          {alert.currentStock} units
                        </span>
                      </div>
                      <div>
                        <span className="block text-ink/30">Days Left</span>
                        <span className="font-medium tabular-nums text-red-600">
                          {alert.daysOfStockRemaining}d
                        </span>
                      </div>
                      <div>
                        <span className="block text-ink/30">Daily Demand</span>
                        <span className="font-medium tabular-nums">
                          {alert.dailyDemandAvg.toFixed(1)}
                        </span>
                      </div>
                    </div>
                    <div className="mt-2 flex items-center gap-2 text-xs">
                      <Badge variant="danger">
                        Reorder: {alert.reorderQuantity} units
                      </Badge>
                      <span className="text-ink/30">
                        Lead time: {alert.leadTimeDays}d &middot; Order by{" "}
                        {new Date(alert.suggestedOrderDate).toLocaleDateString(
                          "en-US",
                          { month: "short", day: "numeric" }
                        )}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </Card>
      </section>

      {/* ================================================================== */}
      {/* PROMOTION EFFECTIVENESS TRACKER                                    */}
      {/* ================================================================== */}
      <section>
        <Card
          title="Promotion Effectiveness"
          subtitle={`${promotions.length} active campaigns`}
        >
          <div className="mb-4 grid grid-cols-4 gap-4">
            <StatCard
              label="Total Promo Revenue"
              value={totalPromoRevenue}
              format="currency"
              variant="positive"
            />
            <StatCard
              label="Orders Influenced"
              value={totalPromoOrders}
              format="count"
              variant="neutral"
            />
            <StatCard
              label="Incremental Revenue"
              value={totalIncrementalRevenue}
              format="currency"
              variant="positive"
            />
            <StatCard
              label="Avg ROI"
              value={
                promotions.reduce((s, p) => s + p.roi, 0) / promotions.length
              }
              format="percentage"
              variant="positive"
            />
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-100 text-left text-xs uppercase tracking-wide text-ink/40">
                  <th className="pb-3 pr-4 font-medium">Promotion</th>
                  <th className="pb-3 pr-4 font-medium">Type</th>
                  <th className="pb-3 pr-4 font-medium text-right">
                    Discount
                  </th>
                  <th className="pb-3 pr-4 font-medium text-right">Revenue</th>
                  <th className="pb-3 pr-4 font-medium text-right">Orders</th>
                  <th className="pb-3 pr-4 font-medium">Budget</th>
                  <th className="pb-3 pr-4 font-medium text-right">ROI</th>
                  <th className="pb-3 pr-4 font-medium text-right">Cannib.</th>
                  <th className="pb-3 font-medium">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {promotions.map((promo) => (
                  <tr key={promo.id} className="hover:bg-slate-50/50">
                    <td className="py-3 pr-4">
                      <span className="font-medium text-ink">
                        {promo.name}
                      </span>
                    </td>
                    <td className="py-3 pr-4">
                      <Badge
                        variant={
                          promo.type === "percentage"
                            ? "accent"
                            : promo.type === "bogo"
                              ? "success"
                              : promo.type === "bundle"
                                ? "info"
                                : "warning"
                        }
                      >
                        {promo.type.replace("_", " ")}
                      </Badge>
                    </td>
                    <td className="py-3 pr-4 text-right tabular-nums text-ink/70">
                      {promo.type === "free_shipping"
                        ? `$${promo.discountValue.toFixed(2)}`
                        : `${promo.discountValue}%`}
                    </td>
                    <td className="py-3 pr-4 text-right font-medium tabular-nums text-green-600">
                      ${promo.revenueGenerated.toLocaleString()}
                    </td>
                    <td className="py-3 pr-4 text-right tabular-nums text-ink/70">
                      {promo.ordersInfluenced.toLocaleString()}
                    </td>
                    <td className="py-3 pr-4">
                      <ProgressBar
                        value={promo.spentSoFar}
                        max={promo.budget}
                        variant={
                          promo.spentSoFar / promo.budget > 0.8
                            ? "danger"
                            : "accent"
                        }
                        showLabel={false}
                        className="w-28"
                      />
                      <span className="mt-0.5 block text-xs text-ink/40">
                        ${promo.spentSoFar.toLocaleString()} / $
                        {promo.budget.toLocaleString()}
                      </span>
                    </td>
                    <td className="py-3 pr-4 text-right tabular-nums">
                      <span
                        className={
                          promo.roi > 500
                            ? "font-medium text-green-600"
                            : "text-ink/70"
                        }
                      >
                        {promo.roi.toFixed(1)}%
                      </span>
                    </td>
                    <td className="py-3 pr-4 text-right tabular-nums">
                      <span
                        className={
                          promo.cannibalizationRate > 40
                            ? "font-medium text-red-600"
                            : promo.cannibalizationRate > 25
                              ? "font-medium text-amber-600"
                              : "text-green-600"
                        }
                      >
                        {promo.cannibalizationRate.toFixed(0)}%
                      </span>
                    </td>
                    <td className="py-3">
                      <StatusDot
                        level={promo.status === "active" ? "low" : "medium"}
                        label={promo.status}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </section>

      {/* ================================================================== */}
      {/* REVENUE TREND SECTION                                              */}
      {/* ================================================================== */}
      <section>
        <Card
          title="Revenue Analytics"
          subtitle={`${revenueMetrics.periodStart} to ${revenueMetrics.periodEnd}`}
        >
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-xl border border-slate-100 bg-slate-50/50 p-4">
              <StatCard
                label="Revenue Growth"
                value={revenueMetrics.revenueGrowth}
                format="percentage"
                variant="positive"
                delta="vs prior period"
              />
              <div className="mt-3">
                <ProgressBar
                  value={revenueMetrics.revenueGrowth}
                  max={30}
                  variant="success"
                />
              </div>
            </div>

            <div className="rounded-xl border border-slate-100 bg-slate-50/50 p-4">
              <StatCard
                label="Conversion Rate"
                value={revenueMetrics.conversionRate}
                format="percentage"
                variant="accent"
              />
              <div className="mt-3">
                <ProgressBar
                  value={revenueMetrics.conversionRate}
                  max={10}
                  variant="accent"
                />
              </div>
              <p className="mt-1 text-xs text-ink/40">
                Industry avg: 2.8%
              </p>
            </div>

            <div className="rounded-xl border border-slate-100 bg-slate-50/50 p-4">
              <StatCard
                label="CAC"
                value={revenueMetrics.customerAcquisitionCost}
                format="currency"
                variant="neutral"
              />
              <div className="mt-3 flex items-center gap-2 text-sm">
                <span className="text-ink/40">LTV:CAC Ratio</span>
                <Badge variant="success">
                  {(
                    revenueMetrics.customerLifetimeValue /
                    revenueMetrics.customerAcquisitionCost
                  ).toFixed(1)}
                  x
                </Badge>
              </div>
            </div>

            <div className="rounded-xl border border-slate-100 bg-slate-50/50 p-4">
              <StatCard
                label="Churn Rate"
                value={revenueMetrics.churnRate}
                format="percentage"
                variant="negative"
                delta="-0.4% from last quarter"
              />
              <div className="mt-3">
                <ProgressBar
                  value={revenueMetrics.churnRate}
                  max={10}
                  variant="warning"
                />
              </div>
            </div>
          </div>

          {/* Additional Revenue KPIs */}
          <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
            <div className="flex flex-col gap-1">
              <span className="text-xs text-ink/40">Active Customers</span>
              <span className="text-lg font-semibold tabular-nums text-ink">
                {revenueMetrics.activeCustomers.toLocaleString()}
              </span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-xs text-ink/40">Net Profit</span>
              <span className="text-lg font-semibold tabular-nums text-green-600">
                ${revenueMetrics.netProfit.toLocaleString()}
              </span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-xs text-ink/40">CLTV</span>
              <span className="text-lg font-semibold tabular-nums text-ink">
                ${revenueMetrics.customerLifetimeValue.toLocaleString()}
              </span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-xs text-ink/40">Total Products</span>
              <span className="text-lg font-semibold tabular-nums text-ink">
                {products.length}
              </span>
            </div>
          </div>
        </Card>
      </section>
    </div>
  );
}
