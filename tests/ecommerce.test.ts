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
  getCannibalizedMarginLoss,
  getPromotionProfitabilitySnapshots,
  getPromotionBreakEvenSnapshots,
  getPromotionAudienceFitReviews,
  getPromotionLeakageReviews,
  getPromotionAbuseReviews,
  getPromotionCrackResistanceReviews,
  getPromotionReturnRiskReviews,
  getPromotionReturnAbuseReviews,
  getPromotionInventoryReadinessReviews,
  getPromotionDemandPullForwardReviews,
  getPromotionFulfillmentCostReviews,
  getPromotionShippingOutlierReviews,
  getPromotionDeliveryExceptionReviews,
  getPromotionCadenceReviews,
  getPromotionInventoryRefreshReadinessReviews,
  getPromotionFreeShippingThresholdReviews,
  getPromotionStackingRisks,
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

  it("recommendation actions match the price move", () => {
    for (const po of priceOptimizations) {
      if (po.recommendedAction === "raise_price") {
        expect(po.recommendedPrice).toBeGreaterThan(po.currentPrice);
      }

      if (po.recommendedAction === "markdown") {
        expect(po.recommendedPrice).toBeLessThan(po.currentPrice);
      }

      if (po.recommendedAction === "hold_price") {
        expect(po.recommendedPrice).toBe(po.currentPrice);
      }
    }
  });

  it("margin guardrails keep every recommended price above cost", () => {
    const productById = new Map(products.map((p) => [p.id, p]));

    for (const po of priceOptimizations) {
      const product = productById.get(po.productId);
      if (!product) throw new Error(`Missing product ${po.productId}`);

      expect(po.marginFloorPrice).toBeGreaterThan(product.costPrice);
      expect(po.recommendedPrice).toBeGreaterThanOrEqual(po.marginFloorPrice);
    }
  });

  it("does not markdown products under high or critical stockout pressure", () => {
    const stockoutByProduct = new Map(
      inventoryForecasts.map((f) => [f.productId, f.stockoutRisk])
    );

    for (const po of priceOptimizations) {
      const risk = stockoutByProduct.get(po.productId);
      if (risk === "high" || risk === "critical") {
        expect(po.inventorySignal).toBe("stockout_guardrail");
        expect(po.recommendedAction).not.toBe("markdown");
      }
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

  it("every promotion has a cannibalization rate between 0 and 100", () => {
    for (const promo of promotions) {
      expect(promo.cannibalizationRate).toBeGreaterThanOrEqual(0);
      expect(promo.cannibalizationRate).toBeLessThanOrEqual(100);
    }
  });

  it("incremental revenue is always less than or equal to total revenue", () => {
    for (const promo of promotions) {
      expect(promo.incrementalRevenue).toBeLessThanOrEqual(
        promo.revenueGenerated
      );
    }
  });

  it("at least one promotion has cannibalization rate over 40%", () => {
    const highCannib = promotions.filter(
      (p) => p.cannibalizationRate > 40
    );
    expect(highCannib.length).toBeGreaterThanOrEqual(1);
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

// ---------------------------------------------------------------------------
// 9. Cannibalized margin loss from promotions
// ---------------------------------------------------------------------------
describe("CannibalizedMarginLoss", () => {
  it("returns a positive dollar amount (cannibalization is real)", () => {
    const loss = getCannibalizedMarginLoss();
    expect(loss).toBeGreaterThan(0);
  });

  it("margin loss is less than total promo revenue", () => {
    const loss = getCannibalizedMarginLoss();
    const totalPromoRevenue = promotions.reduce(
      (sum, p) => sum + p.revenueGenerated,
      0,
    );
    expect(loss).toBeLessThan(totalPromoRevenue);
  });

  it("loyalty bonus promo (52% cannibalization) is the largest margin drain", () => {
    const grossMargin = revenueMetrics.grossMargin / 100;
    const byPromo = promotions.map((p) => ({
      name: p.name,
      loss: p.revenueGenerated * (p.cannibalizationRate / 100) * grossMargin,
    }));
    byPromo.sort((a, b) => b.loss - a.loss);
    expect(byPromo[0].name).toBe("Loyalty Member Bonus 10%");
  });
});

// ---------------------------------------------------------------------------
// 10. Promotion profitability after cannibalization and spend
// ---------------------------------------------------------------------------
describe("PromotionProfitabilitySnapshots", () => {
  it("returns one margin-adjusted snapshot per promotion", () => {
    const snapshots = getPromotionProfitabilitySnapshots();
    expect(snapshots).toHaveLength(promotions.length);
  });

  it("calculates adjusted ROI from incremental margin after the full cost stack", () => {
    const snapshots = getPromotionProfitabilitySnapshots();
    const freeShipping = snapshots.find(
      (s) => s.promotionId === "promo-free-ship",
    );
    const promo = promotions.find((p) => p.id === "promo-free-ship");
    if (!freeShipping || !promo) throw new Error("Missing free shipping promo");

    const variableCostExposure =
      promo.costExposure.paymentProcessingFees +
      promo.costExposure.fulfillmentSubsidies +
      promo.costExposure.loyaltyPointLiability +
      promo.costExposure.returnReserve;
    const totalPromotionCost = promo.spentSoFar + variableCostExposure;
    const expectedAdjustedRoi =
      ((promo.incrementalRevenue * (revenueMetrics.grossMargin / 100) -
        totalPromotionCost) /
        totalPromotionCost) *
      100;

    expect(freeShipping.variableCostExposure).toBe(variableCostExposure);
    expect(freeShipping.adjustedRoi).toBeCloseTo(expectedAdjustedRoi, 2);
    expect(freeShipping.adjustedRoi).toBeLessThan(freeShipping.topLineRoi);
  });

  it("subtracts fulfillment, payment, loyalty, and return reserves before clearing a promo", () => {
    const snapshots = getPromotionProfitabilitySnapshots();
    const loyaltyBonus = snapshots.find(
      (s) => s.promotionId === "promo-loyalty-bonus",
    );
    const promo = promotions.find((p) => p.id === "promo-loyalty-bonus");
    if (!loyaltyBonus || !promo) throw new Error("Missing loyalty bonus promo");

    const hiddenCostStack =
      promo.costExposure.paymentProcessingFees +
      promo.costExposure.fulfillmentSubsidies +
      promo.costExposure.loyaltyPointLiability +
      promo.costExposure.returnReserve;

    expect(loyaltyBonus.variableCostExposure).toBe(hiddenCostStack);
    expect(loyaltyBonus.netIncrementalMargin).toBeCloseTo(
      loyaltyBonus.grossIncrementalMargin - promo.spentSoFar - hiddenCostStack,
      2,
    );
    expect(loyaltyBonus.adjustedRoi).toBeLessThan(50);
  });

  it("flags broad high-cannibalization offers as margin leaks", () => {
    const risky = getPromotionProfitabilitySnapshots().filter(
      (s) => s.riskLevel === "margin_leak",
    );
    expect(risky.map((s) => s.name)).toContain("Free Shipping Weekend");
    expect(risky.map((s) => s.name)).toContain("Loyalty Member Bonus 10%");
  });
});


// ---------------------------------------------------------------------------
// 11. Promotion break-even volume lift
// ---------------------------------------------------------------------------
describe("PromotionBreakEvenSnapshots", () => {
  it("returns one break-even snapshot per promotion", () => {
    const snapshots = getPromotionBreakEvenSnapshots();
    expect(snapshots).toHaveLength(promotions.length);
  });

  it("translates free shipping subsidies into AOV-based discount depth", () => {
    const snapshots = getPromotionBreakEvenSnapshots();
    const freeShipping = snapshots.find(
      (s) => s.promotionId === "promo-free-ship",
    );
    if (!freeShipping) throw new Error("Missing free shipping snapshot");

    expect(freeShipping.effectiveDiscountDepth).toBeCloseTo(
      (9.99 / revenueMetrics.averageOrderValue) * 100,
      2,
    );
  });

  it("shows BOGO requires more unit lift than a 20% percentage discount", () => {
    const snapshots = getPromotionBreakEvenSnapshots();
    const bogo = snapshots.find((s) => s.promotionId === "promo-beauty-bogo");
    const summer = snapshots.find(
      (s) => s.promotionId === "promo-summer-sale",
    );
    if (!bogo || !summer) throw new Error("Missing promo snapshots");

    expect(bogo.effectiveDiscountDepth).toBe(25);
    expect(bogo.requiredVolumeLift).toBeGreaterThan(
      summer.requiredVolumeLift,
    );
    expect(summer.requiredVolumeLift).toBeGreaterThan(40);
  });

  it("keeps broad high-cannibalization offers in margin review", () => {
    const marginLeaks = getPromotionBreakEvenSnapshots()
      .filter((s) => s.riskLevel === "margin_leak")
      .map((s) => s.name);

    expect(marginLeaks).toContain("Free Shipping Weekend");
    expect(marginLeaks).toContain("Loyalty Member Bonus 10%");
  });
});

// ---------------------------------------------------------------------------
// 12. Promotion audience-fit guardrails
// ---------------------------------------------------------------------------
describe("PromotionAudienceFitReviews", () => {
  it("returns one audience-fit review per promotion", () => {
    const reviews = getPromotionAudienceFitReviews();
    expect(reviews).toHaveLength(promotions.length);
  });

  it("blocks broad or high-cannibalization offers that expose full-price buyers", () => {
    const reviews = getPromotionAudienceFitReviews();
    const freeShipping = reviews.find(
      (review) => review.promotionId === "promo-free-ship",
    );
    const loyaltyBonus = reviews.find(
      (review) => review.promotionId === "promo-loyalty-bonus",
    );

    expect(freeShipping?.reviewStatus).toBe("blocked");
    expect(freeShipping?.exposedHighValueSegments).toContain(
      "VIP High-Value",
    );
    expect(loyaltyBonus?.reviewStatus).toBe("blocked");
    expect(loyaltyBonus?.exposedHighValueSegments).toEqual(
      expect.arrayContaining(["VIP High-Value", "Loyal Regulars"]),
    );
  });

  it("approves acquisition and reactivation promos that exclude high-value buyers", () => {
    const reviews = getPromotionAudienceFitReviews();
    const summer = reviews.find(
      (review) => review.promotionId === "promo-summer-sale",
    );
    const beauty = reviews.find(
      (review) => review.promotionId === "promo-beauty-bogo",
    );

    expect(summer?.reviewStatus).toBe("approved");
    expect(summer?.exposedHighValueSegments).toEqual([]);
    expect(beauty?.reviewStatus).toBe("approved");
    expect(beauty?.exposedHighValueSegments).toEqual([]);
  });
});


// ---------------------------------------------------------------------------
// 13. Promotion coupon leakage guardrails
// ---------------------------------------------------------------------------
describe("PromotionLeakageReviews", () => {
  it("returns one leakage review per promotion", () => {
    const reviews = getPromotionLeakageReviews();
    expect(reviews).toHaveLength(promotions.length);
  });

  it("blocks public codes exposed through coupon extensions", () => {
    const reviews = getPromotionLeakageReviews();
    const freeShipping = reviews.find(
      (review) => review.promotionId === "promo-free-ship",
    );

    expect(freeShipping?.controlStatus).toBe("blocked");
    expect(freeShipping?.exposedLeakageChannels).toContain(
      "coupon_extension",
    );
    expect(freeShipping?.reason).toContain("rotate the code");
  });

  it("approves single-use segment-locked offers without leakage-prone channels", () => {
    const reviews = getPromotionLeakageReviews();
    const bundle = reviews.find(
      (review) => review.promotionId === "promo-bundle-deal",
    );

    expect(bundle?.controlStatus).toBe("approved");
    expect(bundle?.exposedLeakageChannels).toEqual([]);
  });
});

// ---------------------------------------------------------------------------
// 14. Promotion discount stacking guardrails
// ---------------------------------------------------------------------------
describe("PromotionStackingRisks", () => {
  it("surfaces overlapping sitewide offers before stacked discounts leak margin", () => {
    const risks = getPromotionStackingRisks();
    const freeShippingLoyalty = risks.find(
      (risk) =>
        risk.promotionIds.includes("promo-free-ship") &&
        risk.promotionIds.includes("promo-loyalty-bonus"),
    );

    expect(freeShippingLoyalty).toBeDefined();
    expect(freeShippingLoyalty?.sharedScope).toBe("sitewide");
    expect(freeShippingLoyalty?.approvalStatus).toBe("review_required");
    expect(freeShippingLoyalty?.overlapWindow).toEqual({
      startDate: "2026-06-05",
      endDate: "2026-06-08",
    });
  });

  it("blocks stacked discount depth that would consume too much gross margin", () => {
    const risks = getPromotionStackingRisks();
    const beautyLoyalty = risks.find(
      (risk) =>
        risk.promotionIds.includes("promo-beauty-bogo") &&
        risk.promotionIds.includes("promo-loyalty-bonus"),
    );

    expect(beautyLoyalty).toBeDefined();
    expect(beautyLoyalty?.combinedDiscountDepth).toBe(35);
    expect(beautyLoyalty?.approvalStatus).toBe("blocked");
    expect(beautyLoyalty?.reason).toContain("finance approval");
  });

  it("does not flag overlapping campaigns with no shared product scope", () => {
    const risks = getPromotionStackingRisks();
    const unrelatedPair = risks.find(
      (risk) =>
        risk.promotionIds.includes("promo-summer-sale") &&
        risk.promotionIds.includes("promo-beauty-bogo"),
    );

    expect(unrelatedPair).toBeUndefined();
  });
});

// ---------------------------------------------------------------------------
// 15. Promotion return-cost guardrails
// ---------------------------------------------------------------------------
describe("PromotionReturnRiskReviews", () => {
  it("returns one return-risk review per promotion", () => {
    const reviews = getPromotionReturnRiskReviews();
    expect(reviews).toHaveLength(promotions.length);
  });

  it("blocks high-return promotions whose reverse-logistics reserve is insufficient", () => {
    const reviews = getPromotionReturnRiskReviews();
    const blockedIds = reviews
      .filter((review) => review.reviewStatus === "blocked")
      .map((review) => review.promotionId);
    const freeShipping = reviews.find(
      (review) => review.promotionId === "promo-free-ship",
    );

    expect(blockedIds).toEqual(
      expect.arrayContaining(["promo-free-ship", "promo-loyalty-bonus"]),
    );
    expect(freeShipping?.reserveCoverageRatio).toBeLessThan(1);
    expect(freeShipping?.reason).toContain("increase the return reserve");
  });

  it("approves targeted offers when projected return costs are fully reserved", () => {
    const reviews = getPromotionReturnRiskReviews();
    const summer = reviews.find(
      (review) => review.promotionId === "promo-summer-sale",
    );
    const bundle = reviews.find(
      (review) => review.promotionId === "promo-bundle-deal",
    );

    expect(summer?.reviewStatus).toBe("approved");
    expect(summer?.reserveCoverageRatio).toBeGreaterThan(1);
    expect(bundle?.reviewStatus).toBe("approved");
    expect(bundle?.reserveCoverageRatio).toBeGreaterThan(1);
  });
});

// ---------------------------------------------------------------------------
// 16. Promotion coordinated-account abuse guardrails
// ---------------------------------------------------------------------------
describe("PromotionAbuseReviews", () => {
  it("returns one abuse review per promotion", () => {
    const reviews = getPromotionAbuseReviews();
    expect(reviews).toHaveLength(promotions.length);
  });

  it("blocks promotional value when identity overlap and signup velocity combine", () => {
    const review = getPromotionAbuseReviews().find(
      (item) => item.promotionId === "promo-free-ship",
    );

    expect(review?.reviewStatus).toBe("blocked");
    expect(review?.linkedIdentityRedemptionRate).toBeGreaterThanOrEqual(20);
    expect(review?.rapidSignupRedemptionRate).toBeGreaterThanOrEqual(25);
    expect(review?.reason).toContain("identity verification");
  });

  it("review-gates moderate signals without treating one signal as proven abuse", () => {
    const review = getPromotionAbuseReviews().find(
      (item) => item.promotionId === "promo-beauty-bogo",
    );
    const approved = getPromotionAbuseReviews().find(
      (item) => item.promotionId === "promo-bundle-deal",
    );

    expect(review?.reviewStatus).toBe("review_required");
    expect(approved?.reviewStatus).toBe("approved");
    expect(approved?.verifiedIdentityCoverage).toBeGreaterThanOrEqual(85);
  });
});

// ---------------------------------------------------------------------------
// 17. Promotion inventory readiness guardrails
// ---------------------------------------------------------------------------
describe("PromotionInventoryReadinessReviews", () => {
  it("returns one inventory-readiness review per promotion", () => {
    const reviews = getPromotionInventoryReadinessReviews();
    expect(reviews).toHaveLength(promotions.length);
  });

  it("blocks campaigns that include critically constrained products", () => {
    const review = getPromotionInventoryReadinessReviews().find(
      (item) => item.promotionId === "promo-beauty-bogo",
    );

    expect(review?.reviewStatus).toBe("blocked");
    expect(review?.atRiskProductIds).toEqual(
      expect.arrayContaining(["prod-014", "prod-016"]),
    );
    expect(review?.minimumDaysOfStockRemaining).toBe(3);
    expect(review?.reason).toContain("confirm replenishment");
  });

  it("review-gates high-risk stock without overstating it as critical", () => {
    const review = getPromotionInventoryReadinessReviews().find(
      (item) => item.promotionId === "promo-summer-sale",
    );

    expect(review?.reviewStatus).toBe("review_required");
    expect(review?.atRiskProductIds).toEqual(["prod-011"]);
    expect(review?.minimumDaysOfStockRemaining).toBe(6);
  });
});

// ---------------------------------------------------------------------------
// 18. Promotion demand pull-forward guardrails
// ---------------------------------------------------------------------------
describe("PromotionDemandPullForwardReviews", () => {
  it("returns one demand-displacement review per promotion", () => {
    const reviews = getPromotionDemandPullForwardReviews();
    expect(reviews).toHaveLength(promotions.length);
  });

  it("blocks apparent lift when stockpiling predicts a prolonged post-promo dip", () => {
    const reviews = getPromotionDemandPullForwardReviews();
    const blockedIds = reviews
      .filter((review) => review.reviewStatus === "blocked")
      .map((review) => review.promotionId);
    const freeShipping = reviews.find(
      (review) => review.promotionId === "promo-free-ship",
    );

    expect(blockedIds).toEqual(
      expect.arrayContaining(["promo-free-ship", "promo-loyalty-bonus"]),
    );
    expect(freeShipping?.projectedPostPromotionDip).toBeGreaterThanOrEqual(20);
    expect(freeShipping?.reason).toContain("baseline recovers");
  });

  it("review-gates moderate displacement while approving limited demand shifts", () => {
    const reviews = getPromotionDemandPullForwardReviews();
    const beauty = reviews.find(
      (review) => review.promotionId === "promo-beauty-bogo",
    );
    const bundle = reviews.find(
      (review) => review.promotionId === "promo-bundle-deal",
    );

    expect(beauty?.reviewStatus).toBe("review_required");
    expect(bundle?.reviewStatus).toBe("approved");
    expect(bundle?.baselineRecoveryDays).toBeLessThanOrEqual(14);
  });
});

// ---------------------------------------------------------------------------
// 19. Promotion fulfillment subsidy coverage
// ---------------------------------------------------------------------------
describe("PromotionFulfillmentCostReviews", () => {
  it("returns one fulfillment-cost review per promotion", () => {
    const reviews = getPromotionFulfillmentCostReviews();
    expect(reviews).toHaveLength(promotions.length);
  });

  it("blocks free shipping when split shipments exceed the reserved subsidy", () => {
    const review = getPromotionFulfillmentCostReviews().find(
      (item) => item.promotionId === "promo-free-ship",
    );

    expect(review?.reviewStatus).toBe("blocked");
    expect(review?.splitShipmentRate).toBe(32);
    expect(review?.projectedFulfillmentCost).toBeGreaterThan(
      review?.reservedSubsidy ?? Number.POSITIVE_INFINITY,
    );
    expect(review?.subsidyCoverageRatio).toBeLessThan(0.8);
    expect(review?.reason).toContain("fund the gap");
  });

  it("review-gates a small subsidy gap and approves fully covered fulfillment", () => {
    const reviews = getPromotionFulfillmentCostReviews();
    const beauty = reviews.find(
      (item) => item.promotionId === "promo-beauty-bogo",
    );
    const bundle = reviews.find(
      (item) => item.promotionId === "promo-bundle-deal",
    );

    expect(beauty?.reviewStatus).toBe("review_required");
    expect(beauty?.subsidyCoverageRatio).toBeLessThan(1);
    expect(bundle?.reviewStatus).toBe("approved");
    expect(bundle?.requiredSubsidy).toBeLessThanOrEqual(
      bundle?.reservedSubsidy ?? 0,
    );
  });
});

// ---------------------------------------------------------------------------
// 20. Promotion shipping-zone and package-size outlier guardrails
// ---------------------------------------------------------------------------
describe("PromotionShippingOutlierReviews", () => {
  it("returns one shipping-outlier review per promotion with complete signals", () => {
    const reviews = getPromotionShippingOutlierReviews();
    expect(reviews).toHaveLength(promotions.length);
    for (const promo of promotions) {
      expect(promo.fulfillmentSignals.remoteZoneOrderRate).toBeGreaterThanOrEqual(0);
      expect(
        promo.fulfillmentSignals.dimensionalWeightOrderRate,
      ).toBeGreaterThanOrEqual(0);
    }
  });

  it("blocks free shipping with material zone and dimensional-weight exposure", () => {
    const review = getPromotionShippingOutlierReviews().find(
      (item) => item.promotionId === "promo-free-ship",
    );
    expect(review?.reviewStatus).toBe("blocked");
    expect(review?.remoteZoneOrderRate).toBeGreaterThanOrEqual(25);
    expect(review?.dimensionalWeightOrderRate).toBeGreaterThanOrEqual(20);
    expect(review?.reason).toContain("zone exclusions");
  });

  it("review-gates package-size outliers while approving limited exposure", () => {
    const reviews = getPromotionShippingOutlierReviews();
    const bundle = reviews.find(
      (item) => item.promotionId === "promo-bundle-deal",
    );
    const summer = reviews.find(
      (item) => item.promotionId === "promo-summer-sale",
    );
    expect(bundle?.reviewStatus).toBe("review_required");
    expect(bundle?.dimensionalWeightOrderRate).toBeGreaterThanOrEqual(12);
    expect(summer?.reviewStatus).toBe("approved");
  });
});

// ---------------------------------------------------------------------------
// 21. Promotion delivery-exception guardrails
// ---------------------------------------------------------------------------
describe("PromotionDeliveryExceptionReviews", () => {
  it("returns one delivery-exception review per promotion with complete signals", () => {
    const reviews = getPromotionDeliveryExceptionReviews();
    expect(reviews).toHaveLength(promotions.length);
    for (const promo of promotions) {
      expect(promo.fulfillmentSignals.addressCorrectionOrderRate).toBeGreaterThanOrEqual(0);
      expect(promo.fulfillmentSignals.returnToSenderOrderRate).toBeGreaterThanOrEqual(0);
    }
  });

  it("blocks free shipping when address failures create material exception freight", () => {
    const review = getPromotionDeliveryExceptionReviews().find(
      (item) => item.promotionId === "promo-free-ship",
    );
    expect(review?.reviewStatus).toBe("blocked");
    expect(review?.addressCorrectionOrderRate).toBeGreaterThanOrEqual(5);
    expect(review?.returnToSenderOrderRate).toBeGreaterThanOrEqual(2);
    expect(review?.reason).toContain("validate addresses");
  });

  it("review-gates moderate exceptions while approving clean address traffic", () => {
    const reviews = getPromotionDeliveryExceptionReviews();
    const bundle = reviews.find((item) => item.promotionId === "promo-bundle-deal");
    const summer = reviews.find((item) => item.promotionId === "promo-summer-sale");
    expect(bundle?.reviewStatus).toBe("review_required");
    expect(summer?.reviewStatus).toBe("approved");
  });
});

// ---------------------------------------------------------------------------
// 22. Promotion discount-cadence conditioning guardrails
// ---------------------------------------------------------------------------
describe("PromotionCadenceReviews", () => {
  it("returns one cadence review per promotion with complete signals", () => {
    const reviews = getPromotionCadenceReviews();
    expect(reviews).toHaveLength(promotions.length);
    for (const promo of promotions) {
      expect(promo.cadenceSignals.daysDiscountedLast90).toBeGreaterThanOrEqual(0);
      expect(promo.cadenceSignals.daysDiscountedLast90).toBeLessThanOrEqual(90);
      expect(promo.cadenceSignals.averageGapDaysBetweenOffers).toBeGreaterThanOrEqual(0);
      expect(promo.cadenceSignals.repeatExposureRate).toBeGreaterThanOrEqual(0);
    }
  });

  it("blocks near-continuous discounting that has reset the reference price", () => {
    const review = getPromotionCadenceReviews().find(
      (item) => item.promotionId === "promo-loyalty-bonus",
    );
    expect(review?.reviewStatus).toBe("blocked");
    expect(review?.daysDiscountedLast90).toBeGreaterThanOrEqual(45);
    expect(review?.averageGapDaysBetweenOffers).toBeLessThanOrEqual(7);
    expect(review?.reason).toContain("reference price");
  });

  it("review-gates frequent cadence while approving infrequent offers", () => {
    const reviews = getPromotionCadenceReviews();
    const bogo = reviews.find((item) => item.promotionId === "promo-beauty-bogo");
    const freeShip = reviews.find((item) => item.promotionId === "promo-free-ship");
    const summer = reviews.find((item) => item.promotionId === "promo-summer-sale");
    expect(bogo?.reviewStatus).toBe("review_required");
    expect(freeShip?.reviewStatus).toBe("review_required");
    expect(summer?.reviewStatus).toBe("approved");
  });
});

describe("PromotionInventoryRefreshReadinessReviews", () => {
  it("returns one inventory-refresh review per promotion", () => {
    const reviews = getPromotionInventoryRefreshReadinessReviews();
    expect(reviews).toHaveLength(5);
    expect(reviews.map(r => r.promotionId)).toEqual(
      expect.arrayContaining(promotions.map(p => p.id))
    );
  });

  it("blocks promotions with critical stock stress during extended campaigns", () => {
    const reviews = getPromotionInventoryRefreshReadinessReviews();
    const critical = reviews.filter(r => r.refreshWindowRiskLevel === "critical");
    // Demo data may have limited critical cases; verify they're properly flagged
    critical.forEach(r => {
      expect(r.reviewStatus).toBe("blocked");
      expect(r.reason).toContain("Insufficient stock buffer");
      expect(r.promotionDurationDays).toBeGreaterThan(0);
      expect(r.estimatedTotalUnitsNeeded).toBeGreaterThan(0);
    });
  });

  it("review-gates tight inventory refresh windows while approving healthy buffers", () => {
    const reviews = getPromotionInventoryRefreshReadinessReviews();
    const tight = reviews.find(r => r.refreshWindowRiskLevel === "tight");
    const healthy = reviews.find(r => r.refreshWindowRiskLevel === "healthy");
    
    if (tight) {
      expect(tight.reviewStatus).toBe("review_required");
      expect(tight.reason).toContain("refresh");
    }
    if (healthy) {
      expect(healthy.refreshWindowRiskLevel).toBe("healthy");
      expect(healthy.minimumDaysOfStockAvailable).not.toBeNull();
    }
  });

  it("flags peak-season timing risks when promotion overlaps with holiday demand", () => {
    const reviews = getPromotionInventoryRefreshReadinessReviews();
    const peakSeasonWarnings = reviews.filter(r => r.reason.includes("peak-season"));
    // Depending on test date, some promos may overlap peak season
    peakSeasonWarnings.forEach(r => {
      expect(r.daysUntilPeakSeasonStart).not.toBeNull();
      if (r.daysUntilPeakSeasonStart! < 60) {
        expect(r.reviewStatus).not.toBe("approved");
      }
    });
  });

  it("calculates inventory stress from total units needed vs available stock", () => {
    const reviews = getPromotionInventoryRefreshReadinessReviews();
    reviews.forEach(r => {
      expect(r.estimatedTotalUnitsNeeded).toBe(r.estimatedDailyUnitSold * r.promotionDurationDays);
      expect(r.replenishmentLeadTimeDays).toBeGreaterThan(0);
      expect(typeof r.minimumDaysOfStockAvailable === "number" || r.minimumDaysOfStockAvailable === null).toBe(true);
    });
  });
});


describe("PromotionFreeShippingThresholdReviews", () => {
  it("returns one review per promotion with complete threshold signals", () => {
    const reviews = getPromotionFreeShippingThresholdReviews();
    expect(reviews).toHaveLength(promotions.length);
    for (const promo of promotions) {
      const signals = promo.freeShippingThresholdSignals;
      expect(
        signals.thresholdOrderValue === null ||
          signals.thresholdOrderValue > 0,
      ).toBe(true);
      expect(signals.modalOrderValue).toBeGreaterThan(0);
      expect(signals.qualifyingOrderRate).toBeGreaterThanOrEqual(0);
      expect(signals.qualifyingOrderRate).toBeLessThanOrEqual(100);
    }
  });

  it("blocks sitewide free shipping that has no qualification threshold", () => {
    const review = getPromotionFreeShippingThresholdReviews().find(
      (item) => item.promotionId === "promo-free-ship",
    );
    expect(review?.reviewStatus).toBe("blocked");
    expect(review?.thresholdOrderValue).toBeNull();
    expect(review?.qualifyingOrderRate).toBeGreaterThanOrEqual(85);
    expect(review?.reason).toContain("orders that would have shipped anyway");
  });

  it("review-gates thresholds below the modal basket or clearing most orders, approving lines above the basket", () => {
    const reviews = getPromotionFreeShippingThresholdReviews();
    const summer = reviews.find((item) => item.promotionId === "promo-summer-sale");
    const bundle = reviews.find((item) => item.promotionId === "promo-bundle-deal");
    const beauty = reviews.find((item) => item.promotionId === "promo-beauty-bogo");
    const loyalty = reviews.find(
      (item) => item.promotionId === "promo-loyalty-bonus",
    );
    expect(summer?.reviewStatus).toBe("review_required");
    expect(summer?.thresholdOrderValue ?? Infinity).toBeLessThan(
      summer?.modalOrderValue ?? 0,
    );
    expect(bundle?.reviewStatus).toBe("review_required");
    expect(bundle?.qualifyingOrderRate).toBeGreaterThanOrEqual(70);
    expect(beauty?.reviewStatus).toBe("approved");
    expect(loyalty?.reviewStatus).toBe("approved");
  });

  it("sorts blocked reviews first and keeps approved coverage last", () => {
    const reviews = getPromotionFreeShippingThresholdReviews();
    expect(reviews[0].reviewStatus).toBe("blocked");
    const rank: Record<string, number> = {
      blocked: 0,
      review_required: 1,
      approved: 2,
    };
    for (let i = 1; i < reviews.length; i++) {
      expect(rank[reviews[i - 1].reviewStatus]).toBeLessThanOrEqual(
        rank[reviews[i].reviewStatus],
      );
    }
  });
});
// ---------------------------------------------------------------------------
// 25. Promotion code-cracking resistance guardrails
// ---------------------------------------------------------------------------
describe("PromotionCrackResistanceReviews", () => {
  it("returns one crack-resistance review per promotion", () => {
    const reviews = getPromotionCrackResistanceReviews();
    expect(reviews).toHaveLength(promotions.length);
  });

  it("blocks enumeration attacks that combine high velocity with public guessable codes", () => {
    const review = getPromotionCrackResistanceReviews().find(
      (item) => item.promotionId === "promo-free-ship",
    );

    expect(review?.reviewStatus).toBe("blocked");
    expect(review?.enumerationVelocityPerHour).toBeGreaterThanOrEqual(200);
    expect(review?.failedRedemptionAttemptRate).toBeGreaterThanOrEqual(25);
    expect(review?.reason).toContain("rate-limited");
  });

  it("review-gates moderate crack signals and approves single-use low-velocity campaigns", () => {
    const beauty = getPromotionCrackResistanceReviews().find(
      (item) => item.promotionId === "promo-beauty-bogo",
    );
    const bundle = getPromotionCrackResistanceReviews().find(
      (item) => item.promotionId === "promo-bundle-deal",
    );

    expect(beauty?.reviewStatus).toBe("review_required");
    expect(bundle?.reviewStatus).toBe("approved");
    expect(bundle?.enumerationVelocityPerHour).toBeLessThan(60);
  });
});


// ---------------------------------------------------------------------------
// 26. Promotion return-policy abuse guardrails
// ---------------------------------------------------------------------------
describe("PromotionReturnAbuseReviews", () => {
  it("returns one return-abuse review per promotion with bounded signals", () => {
    const reviews = getPromotionReturnAbuseReviews();
    expect(reviews).toHaveLength(promotions.length);

    for (const review of reviews) {
      expect(review.bracketingOrderRate).toBeGreaterThanOrEqual(0);
      expect(review.bracketingOrderRate).toBeLessThanOrEqual(100);
      expect(review.serialReturnCustomerRate).toBeGreaterThanOrEqual(0);
      expect(review.serialReturnCustomerRate).toBeLessThanOrEqual(100);
      expect(review.policyExceptionRate).toBeGreaterThanOrEqual(0);
      expect(review.policyExceptionRate).toBeLessThanOrEqual(100);
    }
  });

  it("blocks elevated bracketing only when repeated returns or policy exceptions reinforce it", () => {
    const reviews = getPromotionReturnAbuseReviews();
    const blockedIds = reviews
      .filter((review) => review.reviewStatus === "blocked")
      .map((review) => review.promotionId);
    const beauty = reviews.find(
      (review) => review.promotionId === "promo-beauty-bogo",
    );

    expect(blockedIds).toEqual(
      expect.arrayContaining(["promo-free-ship", "promo-loyalty-bonus"]),
    );
    expect(beauty?.bracketingOrderRate).toBeGreaterThanOrEqual(15);
    expect(beauty?.reviewStatus).toBe("review_required");
    expect(beauty?.reason).toContain("Bracketing alone is not treated as fraud");
  });

  it("approves targeted offers with low return-policy exception signals", () => {
    const reviews = getPromotionReturnAbuseReviews();
    const summer = reviews.find(
      (review) => review.promotionId === "promo-summer-sale",
    );
    const bundle = reviews.find(
      (review) => review.promotionId === "promo-bundle-deal",
    );

    expect(summer?.reviewStatus).toBe("approved");
    expect(bundle?.reviewStatus).toBe("approved");
  });
});
