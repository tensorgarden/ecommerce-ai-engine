import { describe, it, expect } from "vitest";
import {
  products,
  priceOptimizations,
  inventoryForecasts,
  customerSegments,
  revenueMetrics,
  promotions,
  getProductPerformanceRows,
  getHeroStats,
  getStockoutAlerts,
} from "@/lib/demo-data";

// ---------------------------------------------------------------------------
// 1. Products: 20 items across categories
// ---------------------------------------------------------------------------
describe("Products", () => {
  it("has exactly 20 products", () => {
    expect(products).toHaveLength(20);
  });

  it("covers at least 5 distinct categories", () => {
    const cats = new Set(products.map((p) => p.category));
    expect(cats.size).toBeGreaterThanOrEqual(5);
  });

  it("every product has a positive margin", () => {
    for (const p of products) {
      expect(p.margin).toBeGreaterThan(0);
    }
  });

  it("no product has a duplicate SKU", () => {
    const skus = products.map((p) => p.sku);
    expect(new Set(skus).size).toBe(skus.length);
  });
});

// ---------------------------------------------------------------------------
// 2. Price optimizations cover a subset of products
// ---------------------------------------------------------------------------
describe("PriceOptimizations", () => {
  it("has at least 5 recommendations", () => {
    expect(priceOptimizations.length).toBeGreaterThanOrEqual(5);
  });

  it("every recommendation references a real product", () => {
    const productIds = new Set(products.map((p) => p.id));
    for (const po of priceOptimizations) {
      expect(productIds.has(po.productId)).toBe(true);
    }
  });

  it("recommendations have confidence between 0 and 1", () => {
    for (const po of priceOptimizations) {
      expect(po.confidence).toBeGreaterThanOrEqual(0);
      expect(po.confidence).toBeLessThanOrEqual(1);
    }
  });
});

// ---------------------------------------------------------------------------
// 3. Inventory forecasts include stockout risks
// ---------------------------------------------------------------------------
describe("InventoryForecasts", () => {
  it("getStockoutAlerts returns only critical or high risk items", () => {
    const alerts = getStockoutAlerts();
    for (const a of alerts) {
      expect(["critical", "high"]).toContain(a.stockoutRisk);
    }
  });

  it("alerts are sorted by days remaining ascending", () => {
    const alerts = getStockoutAlerts();
    for (let i = 1; i < alerts.length; i++) {
      expect(alerts[i].daysOfStockRemaining).toBeGreaterThanOrEqual(
        alerts[i - 1].daysOfStockRemaining
      );
    }
  });
});

// ---------------------------------------------------------------------------
// 4. Customer segments: 6 segments with valid data
// ---------------------------------------------------------------------------
describe("CustomerSegments", () => {
  it("has exactly 6 segments", () => {
    expect(customerSegments).toHaveLength(6);
  });

  it("all segment percentages sum to roughly 100%", () => {
    const total = customerSegments.reduce(
      (sum, s) => sum + s.percentageOfBase,
      0
    );
    expect(total).toBeCloseTo(100, 0);
  });

  it("each segment has ARPU > 0 and LTV > 0", () => {
    for (const seg of customerSegments) {
      expect(seg.arpu).toBeGreaterThan(0);
      expect(seg.lifetimeValue).toBeGreaterThan(0);
    }
  });
});

// ---------------------------------------------------------------------------
// 5. Revenue metrics are sensible
// ---------------------------------------------------------------------------
describe("RevenueMetrics", () => {
  it("total revenue is greater than zero", () => {
    expect(revenueMetrics.totalRevenue).toBeGreaterThan(0);
  });

  it("gross margin is a percentage between 0 and 100", () => {
    expect(revenueMetrics.grossMargin).toBeGreaterThan(0);
    expect(revenueMetrics.grossMargin).toBeLessThan(100);
  });

  it("conversion rate is a percentage between 0 and 100", () => {
    expect(revenueMetrics.conversionRate).toBeGreaterThan(0);
    expect(revenueMetrics.conversionRate).toBeLessThan(100);
  });
});

// ---------------------------------------------------------------------------
// 6. Promotions: 5 active
// ---------------------------------------------------------------------------
describe("Promotions", () => {
  it("has exactly 5 promotions", () => {
    expect(promotions).toHaveLength(5);
  });

  it("all promotions are active", () => {
    for (const promo of promotions) {
      expect(promo.status).toBe("active");
    }
  });

  it("every promotion has positive ROI", () => {
    for (const promo of promotions) {
      expect(promo.roi).toBeGreaterThan(0);
    }
  });
});

// ---------------------------------------------------------------------------
// 7. Hero stats aggregation
// ---------------------------------------------------------------------------
describe("HeroStats", () => {
  it("getHeroStats returns expected shape", () => {
    const stats = getHeroStats();
    expect(stats.totalRevenue).toBeGreaterThan(0);
    expect(stats.grossMargin).toBeGreaterThan(0);
    expect(stats.activePromotions).toBe(5);
    expect(stats.activeSegments).toBeGreaterThan(0);
    expect(stats.stockoutRiskCount).toBeGreaterThan(0);
    expect(stats.revenueGrowth).toBeGreaterThan(0);
  });
});

// ---------------------------------------------------------------------------
// 8. Product performance rows
// ---------------------------------------------------------------------------
describe("ProductPerformanceRows", () => {
  it("returns one row per product", () => {
    const rows = getProductPerformanceRows();
    expect(rows).toHaveLength(products.length);
  });

  it("rows with price optimization have valid product reference", () => {
    const rows = getProductPerformanceRows();
    for (const row of rows) {
      expect(row.product).toBeDefined();
      if (row.priceOptimization) {
        expect(row.priceOptimization.productId).toBe(row.product.id);
      }
    }
  });
});
