import type {
  Product,
  PriceOptimization,
  InventoryForecast,
  CustomerSegment,
  RevenueMetrics,
  Promotion,
  PromotionAudienceFitReview,
  PromotionLeakageReview,
  PromotionAbuseReview,
  PromotionCrackResistanceReview,
  PromotionReturnRiskReview,
  PromotionReturnAbuseReview,
  PromotionInventoryReadinessReview,
  PromotionInventoryRefreshReadinessReview,
  PromotionDemandPullForwardReview,
  PromotionFulfillmentCostReview,
  PromotionShippingReconciliationReview,
  PromotionFreeShippingThresholdReview,
  PromotionShippingOutlierReview,
  PromotionDeliveryExceptionReview,
  PromotionCadenceReview,
  PromotionCartRetargetingReview,
  PromotionProfitabilitySnapshot,
  PromotionBreakEvenSnapshot,
  PromotionStackingRisk,
  ProductPerformanceRow,
  HeroStats,
} from "./types";

// ============================================================================
// 20 Products across categories
// ============================================================================
export const products: Product[] = [
  {
    id: "prod-001",
    name: "Quantum Wireless Earbuds Pro",
    category: "Electronics",
    sku: "ELEC-QWEP-001",
    currentPrice: 149.99,
    costPrice: 72.5,
    margin: 51.7,
    unitsSold: 2847,
    revenue: 427200,
    stockLevel: 340,
    reorderPoint: 200,
    status: "active",
  },
  {
    id: "prod-002",
    name: "UltraSlim Laptop Stand",
    category: "Electronics",
    sku: "ELEC-ULSS-002",
    currentPrice: 79.99,
    costPrice: 28.0,
    margin: 65.0,
    unitsSold: 1523,
    revenue: 121800,
    stockLevel: 89,
    reorderPoint: 150,
    status: "active",
  },
  {
    id: "prod-003",
    name: "Smart Desk Lamp with Qi Charging",
    category: "Electronics",
    sku: "ELEC-SDLQ-003",
    currentPrice: 89.99,
    costPrice: 41.0,
    margin: 54.4,
    unitsSold: 2100,
    revenue: 188900,
    stockLevel: 520,
    reorderPoint: 180,
    status: "active",
  },
  {
    id: "prod-004",
    name: "Premium Merino Wool Sweater",
    category: "Fashion",
    sku: "FASH-PMWS-004",
    currentPrice: 129.99,
    costPrice: 55.0,
    margin: 57.7,
    unitsSold: 987,
    revenue: 128300,
    stockLevel: 45,
    reorderPoint: 120,
    status: "active",
  },
  {
    id: "prod-005",
    name: "Athletic Performance Tee",
    category: "Fashion",
    sku: "FASH-APTE-005",
    currentPrice: 49.99,
    costPrice: 18.5,
    margin: 63.0,
    unitsSold: 3200,
    revenue: 159900,
    stockLevel: 780,
    reorderPoint: 300,
    status: "active",
  },
  {
    id: "prod-006",
    name: "Designer Sunglasses - Aviator",
    category: "Fashion",
    sku: "FASH-DSAV-006",
    currentPrice: 199.99,
    costPrice: 68.0,
    margin: 66.0,
    unitsSold: 654,
    revenue: 130700,
    stockLevel: 210,
    reorderPoint: 80,
    status: "active",
  },
  {
    id: "prod-007",
    name: "Organic Cotton Bed Sheet Set",
    category: "Home & Garden",
    sku: "HOME-OCBS-007",
    currentPrice: 89.99,
    costPrice: 34.0,
    margin: 62.2,
    unitsSold: 1876,
    revenue: 168800,
    stockLevel: 95,
    reorderPoint: 200,
    status: "active",
  },
  {
    id: "prod-008",
    name: "Smart Herb Garden Kit",
    category: "Home & Garden",
    sku: "HOME-SHGK-008",
    currentPrice: 69.99,
    costPrice: 29.5,
    margin: 57.9,
    unitsSold: 2341,
    revenue: 163800,
    stockLevel: 310,
    reorderPoint: 250,
    status: "active",
  },
  {
    id: "prod-009",
    name: "Cast Iron Dutch Oven 6qt",
    category: "Home & Garden",
    sku: "HOME-CIDO-009",
    currentPrice: 74.99,
    costPrice: 32.0,
    margin: 57.3,
    unitsSold: 1456,
    revenue: 109100,
    stockLevel: 175,
    reorderPoint: 160,
    status: "active",
  },
  {
    id: "prod-010",
    name: "Bamboo Cutting Board Set",
    category: "Home & Garden",
    sku: "HOME-BCBS-010",
    currentPrice: 39.99,
    costPrice: 14.0,
    margin: 65.0,
    unitsSold: 2900,
    revenue: 115900,
    stockLevel: 410,
    reorderPoint: 300,
    status: "active",
  },
  {
    id: "prod-011",
    name: "Carbon Fiber Running Shoes",
    category: "Sports",
    sku: "SPRT-CFRS-011",
    currentPrice: 179.99,
    costPrice: 76.0,
    margin: 57.8,
    unitsSold: 1234,
    revenue: 222100,
    stockLevel: 62,
    reorderPoint: 150,
    status: "active",
  },
  {
    id: "prod-012",
    name: "Adjustable Kettlebell 40lb",
    category: "Sports",
    sku: "SPRT-AKB4-012",
    currentPrice: 129.99,
    costPrice: 52.0,
    margin: 60.0,
    unitsSold: 876,
    revenue: 113800,
    stockLevel: 240,
    reorderPoint: 100,
    status: "active",
  },
  {
    id: "prod-013",
    name: "Yoga Mat Premium 6mm",
    category: "Sports",
    sku: "SPRT-YMP6-013",
    currentPrice: 59.99,
    costPrice: 21.0,
    margin: 65.0,
    unitsSold: 3400,
    revenue: 203900,
    stockLevel: 560,
    reorderPoint: 350,
    status: "active",
  },
  {
    id: "prod-014",
    name: "Vitamin C Brightening Serum",
    category: "Beauty",
    sku: "BEAU-VCBS-014",
    currentPrice: 44.99,
    costPrice: 12.0,
    margin: 73.3,
    unitsSold: 4500,
    revenue: 202400,
    stockLevel: 190,
    reorderPoint: 400,
    status: "active",
  },
  {
    id: "prod-015",
    name: "Retinol Night Cream",
    category: "Beauty",
    sku: "BEAU-RTNC-015",
    currentPrice: 54.99,
    costPrice: 16.0,
    margin: 70.9,
    unitsSold: 3200,
    revenue: 175900,
    stockLevel: 280,
    reorderPoint: 350,
    status: "active",
  },
  {
    id: "prod-016",
    name: "Hyaluronic Acid Moisturizer",
    category: "Beauty",
    sku: "BEAU-HAAM-016",
    currentPrice: 39.99,
    costPrice: 11.5,
    margin: 71.2,
    unitsSold: 5100,
    revenue: 203900,
    stockLevel: 125,
    reorderPoint: 500,
    status: "active",
  },
  {
    id: "prod-017",
    name: "Algorithm Design Handbook",
    category: "Books",
    sku: "BOOK-ADHB-017",
    currentPrice: 59.99,
    costPrice: 18.0,
    margin: 70.0,
    unitsSold: 2100,
    revenue: 125900,
    stockLevel: 680,
    reorderPoint: 200,
    status: "active",
  },
  {
    id: "prod-018",
    name: "Data Science for Business",
    category: "Books",
    sku: "BOOK-DSFB-018",
    currentPrice: 49.99,
    costPrice: 15.0,
    margin: 70.0,
    unitsSold: 1890,
    revenue: 94400,
    stockLevel: 440,
    reorderPoint: 180,
    status: "active",
  },
  {
    id: "prod-019",
    name: "AI Engineering Mastery",
    category: "Books",
    sku: "BOOK-AIEM-019",
    currentPrice: 69.99,
    costPrice: 22.0,
    margin: 68.6,
    unitsSold: 1650,
    revenue: 115400,
    stockLevel: 320,
    reorderPoint: 200,
    status: "active",
  },
  {
    id: "prod-020",
    name: "Cloud Architecture Patterns",
    category: "Books",
    sku: "BOOK-CARP-020",
    currentPrice: 54.99,
    costPrice: 17.5,
    margin: 68.2,
    unitsSold: 1450,
    revenue: 79700,
    stockLevel: 280,
    reorderPoint: 150,
    status: "active",
  },
];

// ============================================================================
// Price Optimization Recommendations
// ============================================================================
export const priceOptimizations: PriceOptimization[] = [
  {
    productId: "prod-001",
    currentPrice: 149.99,
    recommendedPrice: 164.99,
    recommendedAction: "raise_price",
    inventorySignal: "balanced",
    marginFloorPrice: 129.99,
    confidence: 0.88,
    estimatedRevenueImpact: 9.8,
    estimatedMarginImpact: 14.2,
    reasoning:
      "Competitor average is $158. Low price elasticity (0.4) supports a 10% increase with minimal volume loss. High brand loyalty detected in this SKU.",
    elasticity: 0.4,
    competitorAvgPrice: 158.0,
  },
  {
    productId: "prod-004",
    currentPrice: 129.99,
    recommendedPrice: 129.99,
    recommendedAction: "hold_price",
    inventorySignal: "stockout_guardrail",
    marginFloorPrice: 114.99,
    confidence: 0.84,
    estimatedRevenueImpact: 0.8,
    estimatedMarginImpact: 2.1,
    reasoning:
      "Premium segment shows price fatigue, but critical stockout risk blocks a markdown until replenishment lands. Hold price and protect margin floor before retesting demand.",
    elasticity: 1.8,
    competitorAvgPrice: 115.0,
  },
  {
    productId: "prod-006",
    currentPrice: 199.99,
    recommendedPrice: 219.99,
    recommendedAction: "raise_price",
    inventorySignal: "balanced",
    marginFloorPrice: 179.99,
    confidence: 0.91,
    estimatedRevenueImpact: 8.2,
    estimatedMarginImpact: 15.3,
    reasoning:
      "Luxury positioning with very low elasticity (0.2). Brand cachet supports premium pricing. Competitors at $210-$230 range.",
    elasticity: 0.2,
    competitorAvgPrice: 215.0,
  },
  {
    productId: "prod-007",
    currentPrice: 89.99,
    recommendedPrice: 94.99,
    recommendedAction: "raise_price",
    inventorySignal: "stockout_guardrail",
    marginFloorPrice: 84.99,
    confidence: 0.79,
    estimatedRevenueImpact: 4.5,
    estimatedMarginImpact: 6.8,
    reasoning:
      "Organic premium justifies a modest uptick. High stockout risk means no markdown should run until replenishment clears.",
    elasticity: 0.6,
    competitorAvgPrice: 92.0,
  },
  {
    productId: "prod-011",
    currentPrice: 179.99,
    recommendedPrice: 189.99,
    recommendedAction: "raise_price",
    inventorySignal: "stockout_guardrail",
    marginFloorPrice: 169.99,
    confidence: 0.85,
    estimatedRevenueImpact: 5.2,
    estimatedMarginImpact: 7.9,
    reasoning:
      "Carbon fiber tech commands premium. Low stock + high demand supports price increase. Competitors at $180-$200.",
    elasticity: 0.5,
    competitorAvgPrice: 188.0,
  },
  {
    productId: "prod-014",
    currentPrice: 44.99,
    recommendedPrice: 49.99,
    recommendedAction: "raise_price",
    inventorySignal: "stockout_guardrail",
    marginFloorPrice: 39.99,
    confidence: 0.93,
    estimatedRevenueImpact: 10.1,
    estimatedMarginImpact: 13.8,
    reasoning:
      "High demand, strong reviews, and critical stockout risk support a price increase that protects inventory while still undercutting most competitors at $52-$58.",
    elasticity: 0.25,
    competitorAvgPrice: 54.0,
  },
  {
    productId: "prod-016",
    currentPrice: 39.99,
    recommendedPrice: 42.99,
    recommendedAction: "raise_price",
    inventorySignal: "stockout_guardrail",
    marginFloorPrice: 36.99,
    confidence: 0.87,
    estimatedRevenueImpact: 7.0,
    estimatedMarginImpact: 9.4,
    reasoning:
      "Volume leader with thin competitor pricing spread. Critical inventory pressure supports a modest increase that captures margin while protecting volume position.",
    elasticity: 0.45,
    competitorAvgPrice: 41.0,
  },
  {
    productId: "prod-020",
    currentPrice: 54.99,
    recommendedPrice: 49.99,
    recommendedAction: "markdown",
    inventorySignal: "overstock_clearance",
    marginFloorPrice: 42.99,
    confidence: 0.76,
    estimatedRevenueImpact: -2.1,
    estimatedMarginImpact: -3.4,
    reasoning:
      "High elasticity in tech books plus above-threshold inventory supports a guarded $5 markdown. The recommendation stays above the $42.99 margin floor while clearing slow stock.",
    elasticity: 1.9,
    competitorAvgPrice: 48.0,
  },
];

// ============================================================================
// Inventory Forecasts with Stockout Risks
// ============================================================================
export const inventoryForecasts: InventoryForecast[] = [
  {
    productId: "prod-002",
    currentStock: 89,
    dailyDemandAvg: 12.5,
    daysOfStockRemaining: 7,
    reorderPoint: 150,
    reorderQuantity: 300,
    stockoutRisk: "critical",
    leadTimeDays: 14,
    suggestedOrderDate: "2026-06-09",
    seasonalFactor: 1.2,
  },
  {
    productId: "prod-004",
    currentStock: 45,
    dailyDemandAvg: 8.2,
    daysOfStockRemaining: 5,
    reorderPoint: 120,
    reorderQuantity: 250,
    stockoutRisk: "critical",
    leadTimeDays: 10,
    suggestedOrderDate: "2026-06-09",
    seasonalFactor: 1.0,
  },
  {
    productId: "prod-007",
    currentStock: 95,
    dailyDemandAvg: 15.6,
    daysOfStockRemaining: 6,
    reorderPoint: 200,
    reorderQuantity: 400,
    stockoutRisk: "high",
    leadTimeDays: 12,
    suggestedOrderDate: "2026-06-10",
    seasonalFactor: 1.3,
  },
  {
    productId: "prod-011",
    currentStock: 62,
    dailyDemandAvg: 10.3,
    daysOfStockRemaining: 6,
    reorderPoint: 150,
    reorderQuantity: 300,
    stockoutRisk: "high",
    leadTimeDays: 14,
    suggestedOrderDate: "2026-06-09",
    seasonalFactor: 1.1,
  },
  {
    productId: "prod-014",
    currentStock: 190,
    dailyDemandAvg: 37.5,
    daysOfStockRemaining: 5,
    reorderPoint: 400,
    reorderQuantity: 600,
    stockoutRisk: "critical",
    leadTimeDays: 8,
    suggestedOrderDate: "2026-06-09",
    seasonalFactor: 1.4,
  },
  {
    productId: "prod-016",
    currentStock: 125,
    dailyDemandAvg: 42.5,
    daysOfStockRemaining: 3,
    reorderPoint: 500,
    reorderQuantity: 700,
    stockoutRisk: "critical",
    leadTimeDays: 7,
    suggestedOrderDate: "2026-06-09",
    seasonalFactor: 1.5,
  },
  {
    productId: "prod-001",
    currentStock: 340,
    dailyDemandAvg: 23.7,
    daysOfStockRemaining: 14,
    reorderPoint: 200,
    reorderQuantity: 350,
    stockoutRisk: "low",
    leadTimeDays: 14,
    suggestedOrderDate: "2026-06-18",
    seasonalFactor: 1.0,
  },
  {
    productId: "prod-003",
    currentStock: 520,
    dailyDemandAvg: 17.5,
    daysOfStockRemaining: 30,
    reorderPoint: 180,
    reorderQuantity: 250,
    stockoutRisk: "low",
    leadTimeDays: 10,
    suggestedOrderDate: "2026-06-30",
    seasonalFactor: 0.9,
  },
  {
    productId: "prod-005",
    currentStock: 780,
    dailyDemandAvg: 26.7,
    daysOfStockRemaining: 29,
    reorderPoint: 300,
    reorderQuantity: 400,
    stockoutRisk: "low",
    leadTimeDays: 12,
    suggestedOrderDate: "2026-06-28",
    seasonalFactor: 1.0,
  },
  {
    productId: "prod-013",
    currentStock: 560,
    dailyDemandAvg: 28.3,
    daysOfStockRemaining: 20,
    reorderPoint: 350,
    reorderQuantity: 450,
    stockoutRisk: "medium",
    leadTimeDays: 10,
    suggestedOrderDate: "2026-06-18",
    seasonalFactor: 1.1,
  },
];

// ============================================================================
// 6 Customer Segments
// ============================================================================
export const customerSegments: CustomerSegment[] = [
  {
    id: "seg-vip",
    name: "VIP High-Value",
    description:
      "Top 5% of customers by lifetime value. Frequent purchasers with high AOV and strong brand loyalty.",
    customerCount: 1240,
    percentageOfBase: 5.0,
    avgOrderValue: 187.5,
    arpu: 2240.0,
    lifetimeValue: 8960.0,
    churnRisk: 0.03,
    growthRate: 12.4,
    color: "#5b5bd6",
  },
  {
    id: "seg-loyal",
    name: "Loyal Regulars",
    description:
      "Consistent monthly purchasers with above-average retention. Core revenue drivers.",
    customerCount: 4500,
    percentageOfBase: 18.1,
    avgOrderValue: 98.4,
    arpu: 1180.0,
    lifetimeValue: 3540.0,
    churnRisk: 0.08,
    growthRate: 5.2,
    color: "#22c55e",
  },
  {
    id: "seg-at-risk",
    name: "At-Risk Decliners",
    description:
      "Previously loyal customers showing declining purchase frequency. High churn probability.",
    customerCount: 3200,
    percentageOfBase: 12.9,
    avgOrderValue: 72.3,
    arpu: 580.0,
    lifetimeValue: 1740.0,
    churnRisk: 0.45,
    growthRate: -8.1,
    color: "#f59e0b",
  },
  {
    id: "seg-new",
    name: "New Acquisitions",
    description:
      "Customers acquired in the last 90 days. High growth potential but unproven retention.",
    customerCount: 6800,
    percentageOfBase: 27.4,
    avgOrderValue: 65.0,
    arpu: 195.0,
    lifetimeValue: 780.0,
    churnRisk: 0.35,
    growthRate: 28.7,
    color: "#3b82f6",
  },
  {
    id: "seg-dormant",
    name: "Dormant Accounts",
    description:
      "No purchase in 6+ months. Require re-engagement campaigns to reactivate.",
    customerCount: 5600,
    percentageOfBase: 22.6,
    avgOrderValue: 45.2,
    arpu: 90.0,
    lifetimeValue: 360.0,
    churnRisk: 0.75,
    growthRate: -15.3,
    color: "#ef4444",
  },
  {
    id: "seg-bargain",
    name: "Bargain Hunters",
    description:
      "Price-sensitive segment that only purchases during promotions. Low margin but high volume.",
    customerCount: 3500,
    percentageOfBase: 14.1,
    avgOrderValue: 38.9,
    arpu: 234.0,
    lifetimeValue: 702.0,
    churnRisk: 0.22,
    growthRate: 3.8,
    color: "#8b5cf6",
  },
];

// ============================================================================
// Revenue Metrics
// ============================================================================
export const revenueMetrics: RevenueMetrics = {
  totalRevenue: 3240000,
  revenueGrowth: 18.4,
  grossMargin: 62.3,
  netProfit: 845000,
  averageOrderValue: 87.5,
  conversionRate: 4.8,
  customerAcquisitionCost: 42.0,
  customerLifetimeValue: 1840.0,
  activeCustomers: 24800,
  churnRate: 3.2,
  periodStart: "2026-01-01",
  periodEnd: "2026-06-08",
};

// ============================================================================
// 5 Active Promotions
// ============================================================================
export const promotions: Promotion[] = [
  {
    id: "promo-summer-sale",
    name: "Summer Launch Sale",
    type: "percentage",
    discountValue: 20,
    applicableProducts: ["prod-001", "prod-003", "prod-006", "prod-011"],
    audienceIntent: "category_expansion",
    targetSegments: ["seg-new", "seg-bargain"],
    excludedSegments: ["seg-vip", "seg-loyal"],
    startDate: "2026-06-01",
    endDate: "2026-06-30",
    budget: 50000,
    spentSoFar: 18700,
    revenueGenerated: 142000,
    ordersInfluenced: 820,
    status: "active",
    roi: 659.4,
    cannibalizationRate: 32.0,
    incrementalRevenue: 96600,
    costExposure: {
      paymentProcessingFees: 3200,
      fulfillmentSubsidies: 1800,
      loyaltyPointLiability: 2400,
      returnReserve: 3600,
    },
    returnExposure: {
      expectedReturnRate: 12,
      reverseLogisticsCostPerReturn: 14,
    },
    returnAbuseSignals: {
      bracketingOrderRate: 5,
      serialReturnCustomerRate: 3,
      policyExceptionRate: 2,
    },
    demandShiftSignals: {
      stockpilingRate: 14,
      projectedPostPromotionDip: 8,
      baselineRecoveryDays: 7,
    },
    fulfillmentSignals: {
      splitShipmentRate: 8,
      averageCostPerShipment: 8,
      averageCustomerShippingContribution: 7,
      remoteZoneOrderRate: 8,
      dimensionalWeightOrderRate: 6,
      addressCorrectionOrderRate: 1,
      returnToSenderOrderRate: 0.3,
    },
    freeShippingThresholdSignals: {
      thresholdOrderValue: 50,
      modalOrderValue: 68,
      qualifyingOrderRate: 62,
    },
    redemptionControl: {
      codeStrategy: "segment_locked",
      distributionChannels: ["email", "onsite_banner"],
      estimatedLeakageRate: 8,
      maxRedemptionsPerCustomer: 1,
    },
    abuseSignals: {
      linkedIdentityRedemptionRate: 6,
      rapidSignupRedemptionRate: 8,
      verifiedIdentityCoverage: 93,
    },
    crackResistanceSignals: {
      failedRedemptionAttemptRate: 11,
      enumerationVelocityPerHour: 72,
      resellerBulkOrderRate: 4,
    },
    cadenceSignals: {
      daysDiscountedLast90: 18,
      averageGapDaysBetweenOffers: 21,
      repeatExposureRate: 22,
    },
    cartRetargetingSignals: {
      cartAbandonmentRate: 71,
      retargetingCoverageRate: 35,
      naturalRecoveryRate: 8,
      couponRecoveryRate: 24,
    },
    shippingReconciliationSignals: {
      carrierInvoiceLagDays: 7,
      retroactiveAdjustmentRate: 3,
      unreconciledShippingCostRate: 2,
    },
  },
  {
    id: "promo-free-ship",
    name: "Free Shipping Weekend",
    type: "free_shipping",
    discountValue: 9.99,
    applicableProducts: ["all"],
    audienceIntent: "cart_conversion",
    targetSegments: ["all"],
    excludedSegments: [],
    startDate: "2026-06-05",
    endDate: "2026-06-08",
    budget: 15000,
    spentSoFar: 8900,
    revenueGenerated: 78500,
    ordersInfluenced: 1200,
    status: "active",
    roi: 782.0,
    cannibalizationRate: 45.0,
    incrementalRevenue: 43200,
    costExposure: {
      paymentProcessingFees: 2100,
      fulfillmentSubsidies: 9800,
      loyaltyPointLiability: 1200,
      returnReserve: 2600,
    },
    returnExposure: {
      expectedReturnRate: 22,
      reverseLogisticsCostPerReturn: 13,
    },
    returnAbuseSignals: {
      bracketingOrderRate: 22,
      serialReturnCustomerRate: 14,
      policyExceptionRate: 9,
    },
    demandShiftSignals: {
      stockpilingRate: 38,
      projectedPostPromotionDip: 26,
      baselineRecoveryDays: 28,
    },
    fulfillmentSignals: {
      splitShipmentRate: 32,
      averageCostPerShipment: 8.25,
      averageCustomerShippingContribution: 0,
      remoteZoneOrderRate: 34,
      dimensionalWeightOrderRate: 24,
      addressCorrectionOrderRate: 7,
      returnToSenderOrderRate: 2.5,
    },
    freeShippingThresholdSignals: {
      thresholdOrderValue: null,
      modalOrderValue: 64,
      qualifyingOrderRate: 100,
    },
    redemptionControl: {
      codeStrategy: "public_code",
      distributionChannels: ["onsite_banner", "coupon_extension"],
      estimatedLeakageRate: 32,
      maxRedemptionsPerCustomer: 5,
    },
    abuseSignals: {
      linkedIdentityRedemptionRate: 27,
      rapidSignupRedemptionRate: 34,
      verifiedIdentityCoverage: 48,
    },
    crackResistanceSignals: {
      failedRedemptionAttemptRate: 28,
      enumerationVelocityPerHour: 260,
      resellerBulkOrderRate: 12,
    },
    cadenceSignals: {
      daysDiscountedLast90: 34,
      averageGapDaysBetweenOffers: 6,
      repeatExposureRate: 55,
    },
    cartRetargetingSignals: {
      cartAbandonmentRate: 72,
      retargetingCoverageRate: 95,
      naturalRecoveryRate: 28,
      couponRecoveryRate: 31,
    },
    shippingReconciliationSignals: {
      carrierInvoiceLagDays: 28,
      retroactiveAdjustmentRate: 18,
      unreconciledShippingCostRate: 24,
    },
  },
  {
    id: "promo-bundle-deal",
    name: "Home Essentials Bundle",
    type: "bundle",
    discountValue: 15,
    applicableProducts: ["prod-007", "prod-008", "prod-009", "prod-010"],
    audienceIntent: "acquisition",
    targetSegments: ["seg-new", "seg-at-risk"],
    excludedSegments: ["seg-vip", "seg-loyal"],
    startDate: "2026-06-01",
    endDate: "2026-07-15",
    budget: 25000,
    spentSoFar: 6200,
    revenueGenerated: 48000,
    ordersInfluenced: 340,
    status: "active",
    roi: 674.2,
    cannibalizationRate: 18.0,
    incrementalRevenue: 39400,
    costExposure: {
      paymentProcessingFees: 1400,
      fulfillmentSubsidies: 900,
      loyaltyPointLiability: 600,
      returnReserve: 1200,
    },
    returnExposure: {
      expectedReturnRate: 8,
      reverseLogisticsCostPerReturn: 12,
    },
    returnAbuseSignals: {
      bracketingOrderRate: 7,
      serialReturnCustomerRate: 3,
      policyExceptionRate: 2,
    },
    demandShiftSignals: {
      stockpilingRate: 9,
      projectedPostPromotionDip: 5,
      baselineRecoveryDays: 5,
    },
    fulfillmentSignals: {
      splitShipmentRate: 12,
      averageCostPerShipment: 7.25,
      averageCustomerShippingContribution: 5.5,
      remoteZoneOrderRate: 12,
      dimensionalWeightOrderRate: 16,
      addressCorrectionOrderRate: 4,
      returnToSenderOrderRate: 1,
    },
    freeShippingThresholdSignals: {
      thresholdOrderValue: 60,
      modalOrderValue: 72,
      qualifyingOrderRate: 71,
    },
    redemptionControl: {
      codeStrategy: "single_use",
      distributionChannels: ["email", "sms"],
      estimatedLeakageRate: 4,
      maxRedemptionsPerCustomer: 1,
    },
    abuseSignals: {
      linkedIdentityRedemptionRate: 3,
      rapidSignupRedemptionRate: 5,
      verifiedIdentityCoverage: 96,
    },
    crackResistanceSignals: {
      failedRedemptionAttemptRate: 3,
      enumerationVelocityPerHour: 18,
      resellerBulkOrderRate: 2,
    },
    cadenceSignals: {
      daysDiscountedLast90: 12,
      averageGapDaysBetweenOffers: 28,
      repeatExposureRate: 15,
    },
    cartRetargetingSignals: {
      cartAbandonmentRate: 64,
      retargetingCoverageRate: 45,
      naturalRecoveryRate: 10,
      couponRecoveryRate: 28,
    },
    shippingReconciliationSignals: {
      carrierInvoiceLagDays: 14,
      retroactiveAdjustmentRate: 7,
      unreconciledShippingCostRate: 8,
    },
  },
  {
    id: "promo-beauty-bogo",
    name: "Beauty BOGO 50% Off",
    type: "bogo",
    discountValue: 50,
    applicableProducts: ["prod-014", "prod-015", "prod-016"],
    audienceIntent: "reactivation",
    targetSegments: ["seg-at-risk", "seg-bargain"],
    excludedSegments: ["seg-vip", "seg-loyal"],
    startDate: "2026-06-03",
    endDate: "2026-06-20",
    budget: 30000,
    spentSoFar: 14200,
    revenueGenerated: 112000,
    ordersInfluenced: 1560,
    status: "active",
    roi: 688.7,
    cannibalizationRate: 28.0,
    incrementalRevenue: 80600,
    costExposure: {
      paymentProcessingFees: 2600,
      fulfillmentSubsidies: 1700,
      loyaltyPointLiability: 1800,
      returnReserve: 4200,
    },
    returnExposure: {
      expectedReturnRate: 16,
      reverseLogisticsCostPerReturn: 10,
    },
    returnAbuseSignals: {
      bracketingOrderRate: 19,
      serialReturnCustomerRate: 8,
      policyExceptionRate: 6,
    },
    demandShiftSignals: {
      stockpilingRate: 24,
      projectedPostPromotionDip: 16,
      baselineRecoveryDays: 14,
    },
    fulfillmentSignals: {
      splitShipmentRate: 18,
      averageCostPerShipment: 6.8,
      averageCustomerShippingContribution: 6.75,
      remoteZoneOrderRate: 18,
      dimensionalWeightOrderRate: 8,
      addressCorrectionOrderRate: 3,
      returnToSenderOrderRate: 0.8,
    },
    freeShippingThresholdSignals: {
      thresholdOrderValue: 75,
      modalOrderValue: 62,
      qualifyingOrderRate: 48,
    },
    redemptionControl: {
      codeStrategy: "segment_locked",
      distributionChannels: ["email", "affiliate_network"],
      estimatedLeakageRate: 12,
      maxRedemptionsPerCustomer: 2,
    },
    abuseSignals: {
      linkedIdentityRedemptionRate: 12,
      rapidSignupRedemptionRate: 19,
      verifiedIdentityCoverage: 78,
    },
    crackResistanceSignals: {
      failedRedemptionAttemptRate: 16,
      enumerationVelocityPerHour: 95,
      resellerBulkOrderRate: 6,
    },
    cadenceSignals: {
      daysDiscountedLast90: 36,
      averageGapDaysBetweenOffers: 9,
      repeatExposureRate: 47,
    },
    cartRetargetingSignals: {
      cartAbandonmentRate: 69,
      retargetingCoverageRate: 60,
      naturalRecoveryRate: 18,
      couponRecoveryRate: 26,
    },
    shippingReconciliationSignals: {
      carrierInvoiceLagDays: 21,
      retroactiveAdjustmentRate: 11,
      unreconciledShippingCostRate: 12,
    },
  },
  {
    id: "promo-loyalty-bonus",
    name: "Loyalty Member Bonus 10%",
    type: "percentage",
    discountValue: 10,
    applicableProducts: ["all"],
    audienceIntent: "loyalty_reward",
    targetSegments: ["seg-vip", "seg-loyal"],
    excludedSegments: [],
    startDate: "2026-05-15",
    endDate: "2026-08-15",
    budget: 80000,
    spentSoFar: 31000,
    revenueGenerated: 245000,
    ordersInfluenced: 2100,
    status: "active",
    roi: 690.3,
    cannibalizationRate: 52.0,
    incrementalRevenue: 117600,
    costExposure: {
      paymentProcessingFees: 4800,
      fulfillmentSubsidies: 3100,
      loyaltyPointLiability: 14500,
      returnReserve: 5200,
    },
    returnExposure: {
      expectedReturnRate: 19,
      reverseLogisticsCostPerReturn: 14,
    },
    returnAbuseSignals: {
      bracketingOrderRate: 18,
      serialReturnCustomerRate: 12,
      policyExceptionRate: 10,
    },
    demandShiftSignals: {
      stockpilingRate: 42,
      projectedPostPromotionDip: 30,
      baselineRecoveryDays: 35,
    },
    fulfillmentSignals: {
      splitShipmentRate: 20,
      averageCostPerShipment: 7.5,
      averageCustomerShippingContribution: 5.5,
      remoteZoneOrderRate: 10,
      dimensionalWeightOrderRate: 9,
      addressCorrectionOrderRate: 2,
      returnToSenderOrderRate: 0.5,
    },
    freeShippingThresholdSignals: {
      thresholdOrderValue: 90,
      modalOrderValue: 85,
      qualifyingOrderRate: 45,
    },
    redemptionControl: {
      codeStrategy: "segment_locked",
      distributionChannels: ["loyalty_portal", "coupon_extension"],
      estimatedLeakageRate: 18,
      maxRedemptionsPerCustomer: 3,
    },
    abuseSignals: {
      linkedIdentityRedemptionRate: 9,
      rapidSignupRedemptionRate: 12,
      verifiedIdentityCoverage: 88,
    },
    crackResistanceSignals: {
      failedRedemptionAttemptRate: 9,
      enumerationVelocityPerHour: 41,
      resellerBulkOrderRate: 9,
    },
    cadenceSignals: {
      daysDiscountedLast90: 85,
      averageGapDaysBetweenOffers: 2,
      repeatExposureRate: 71,
    },
    cartRetargetingSignals: {
      cartAbandonmentRate: 76,
      retargetingCoverageRate: 80,
      naturalRecoveryRate: 32,
      couponRecoveryRate: 38,
    },
    shippingReconciliationSignals: {
      carrierInvoiceLagDays: 28,
      retroactiveAdjustmentRate: 15,
      unreconciledShippingCostRate: 18,
    },
  },
];

// ============================================================================
// Aggregated Views
// ============================================================================
export function getProductPerformanceRows(): ProductPerformanceRow[] {
  return products.map((product) => ({
    product,
    priceOptimization: priceOptimizations.find(
      (po) => po.productId === product.id
    ),
    inventory: inventoryForecasts.find((inv) => inv.productId === product.id),
  }));
}

export function getHeroStats(): HeroStats {
  const criticalAndHigh = inventoryForecasts.filter(
    (f) => f.stockoutRisk === "critical" || f.stockoutRisk === "high"
  );
  return {
    totalRevenue: revenueMetrics.totalRevenue,
    grossMargin: revenueMetrics.grossMargin,
    stockoutRiskCount: criticalAndHigh.length,
    activeSegments: customerSegments.filter((s) => s.churnRisk < 0.5).length,
    activePromotions: promotions.filter((p) => p.status === "active").length,
    revenueGrowth: revenueMetrics.revenueGrowth,
  };
}

export function getStockoutAlerts(): InventoryForecast[] {
  return inventoryForecasts
    .filter(
      (f) =>
        f.stockoutRisk === "critical" || f.stockoutRisk === "high"
    )
    .sort((a, b) => a.daysOfStockRemaining - b.daysOfStockRemaining);
}

/**
 * Total margin dollars lost to promotion cannibalization — revenue from
 * orders that would have occurred at full margin but were instead
 * discounted by an active promotion. This is the silent cost behind
 * promotions that look ROI-positive on top-line revenue alone.
 */
export function getCannibalizedMarginLoss(): number {
  return promotions.reduce((totalLoss, promo) => {
    const cannibalizedRevenue =
      promo.revenueGenerated * (promo.cannibalizationRate / 100);
    return totalLoss + cannibalizedRevenue * (revenueMetrics.grossMargin / 100);
  }, 0);
}

export function getPromotionVariableCostExposure(promo: Promotion): number {
  return (
    promo.costExposure.paymentProcessingFees +
    promo.costExposure.fulfillmentSubsidies +
    promo.costExposure.loyaltyPointLiability +
    promo.costExposure.returnReserve
  );
}

/**
 * Promotion profitability after accounting for cannibalized demand, campaign
 * spend, and variable costs such as payment fees, fulfillment subsidies,
 * loyalty liabilities, and return reserves. Broad coupons can look efficient on
 * top-line ROI while still leaking margin from customers who would have bought
 * without the discount.
 */
export function getPromotionProfitabilitySnapshots(): PromotionProfitabilitySnapshot[] {
  const grossMarginRate = revenueMetrics.grossMargin / 100;

  return promotions
    .map((promo) => {
      const cannibalizedRevenue =
        promo.revenueGenerated * (promo.cannibalizationRate / 100);
      const cannibalizedMarginLoss = cannibalizedRevenue * grossMarginRate;
      const grossIncrementalMargin = promo.incrementalRevenue * grossMarginRate;
      const variableCostExposure = getPromotionVariableCostExposure(promo);
      const totalPromotionCost = promo.spentSoFar + variableCostExposure;
      const netIncrementalMargin =
        grossIncrementalMargin - totalPromotionCost;
      const adjustedRoi =
        totalPromotionCost === 0
          ? 0
          : (netIncrementalMargin / totalPromotionCost) * 100;
      const riskLevel: PromotionProfitabilitySnapshot["riskLevel"] =
        promo.cannibalizationRate >= 40 || adjustedRoi < 150
          ? "margin_leak"
          : promo.cannibalizationRate >= 25 || adjustedRoi < 225
            ? "watch"
            : "healthy";

      return {
        promotionId: promo.id,
        name: promo.name,
        topLineRoi: promo.roi,
        adjustedRoi,
        cannibalizedRevenue,
        cannibalizedMarginLoss,
        grossIncrementalMargin,
        variableCostExposure,
        netIncrementalMargin,
        riskLevel,
      };
    })
    .sort((a, b) => b.cannibalizedMarginLoss - a.cannibalizedMarginLoss);
}

export function getPromotionEffectiveDiscountDepth(promo: Promotion): number {
  if (promo.type === "free_shipping") {
    return (promo.discountValue / revenueMetrics.averageOrderValue) * 100;
  }

  if (promo.type === "bogo") {
    return promo.discountValue / 2;
  }

  return promo.discountValue;
}

/**
 * Break-even volume lift required before a discount can hold gross profit.
 * This turns each offer into preflight math instead of waiting for top-line
 * revenue to obscure non-incremental orders and margin leakage.
 */
export function getPromotionBreakEvenSnapshots(): PromotionBreakEvenSnapshot[] {
  const grossMarginRate = revenueMetrics.grossMargin / 100;

  return promotions
    .map((promo) => {
      const effectiveDiscountDepth = getPromotionEffectiveDiscountDepth(promo);
      const discountRate = effectiveDiscountDepth / 100;
      const denominator = 1 - discountRate / grossMarginRate;
      const requiredVolumeLift =
        denominator <= 0 ? Number.POSITIVE_INFINITY : (1 / denominator - 1) * 100;
      const riskLevel: PromotionBreakEvenSnapshot["riskLevel"] =
        requiredVolumeLift >= 100 || promo.cannibalizationRate >= 40
          ? "margin_leak"
          : requiredVolumeLift >= 40 || promo.cannibalizationRate >= 25
            ? "watch"
            : "healthy";

      return {
        promotionId: promo.id,
        name: promo.name,
        effectiveDiscountDepth,
        requiredVolumeLift,
        riskLevel,
      };
    })
    .sort((a, b) => b.requiredVolumeLift - a.requiredVolumeLift);
}


function getPromotionOverlapWindow(
  first: Promotion,
  second: Promotion,
): PromotionStackingRisk["overlapWindow"] | null {
  const startDate =
    first.startDate > second.startDate ? first.startDate : second.startDate;
  const endDate =
    first.endDate < second.endDate ? first.endDate : second.endDate;

  return startDate <= endDate ? { startDate, endDate } : null;
}

function getPromotionSharedScope(
  first: Promotion,
  second: Promotion,
): PromotionStackingRisk["sharedScope"] | null {
  const firstIsSitewide = first.applicableProducts.includes("all");
  const secondIsSitewide = second.applicableProducts.includes("all");

  if (firstIsSitewide || secondIsSitewide) {
    return "sitewide";
  }

  const secondProducts = new Set(second.applicableProducts);
  return first.applicableProducts.some((productId) => secondProducts.has(productId))
    ? "product_overlap"
    : null;
}

/**
 * Discount stacking guardrail for overlapping campaigns. Buyers increasingly
 * need promotion engines to catch sitewide coupons, free shipping, and loyalty
 * incentives that combine into a deeper discount than the merchant intended.
 */
export function getPromotionStackingRisks(): PromotionStackingRisk[] {
  const risks: PromotionStackingRisk[] = [];

  for (let i = 0; i < promotions.length; i++) {
    for (let j = i + 1; j < promotions.length; j++) {
      const first = promotions[i];
      const second = promotions[j];
      const overlapWindow = getPromotionOverlapWindow(first, second);
      const sharedScope = getPromotionSharedScope(first, second);

      if (!overlapWindow || !sharedScope) continue;

      const combinedDiscountDepth =
        getPromotionEffectiveDiscountDepth(first) +
        getPromotionEffectiveDiscountDepth(second);
      const approvalStatus =
        combinedDiscountDepth >= 30 ||
        combinedDiscountDepth >= revenueMetrics.grossMargin * 0.5
          ? "blocked"
          : "review_required";

      risks.push({
        promotionIds: [first.id, second.id],
        names: [first.name, second.name],
        overlapWindow,
        combinedDiscountDepth,
        sharedScope,
        approvalStatus,
        reason:
          approvalStatus === "blocked"
            ? "Stacked discount depth consumes too much gross margin; pause one offer or require finance approval."
            : "Overlapping sitewide/product-scope offer should be reviewed before checkout rules allow stacking.",
      });
    }
  }

  return risks.sort((a, b) => {
    if (a.approvalStatus !== b.approvalStatus) {
      return a.approvalStatus === "blocked" ? -1 : 1;
    }

    return b.combinedDiscountDepth - a.combinedDiscountDepth;
  });
}

const leakageReviewRank: Record<PromotionLeakageReview["controlStatus"], number> = {
  blocked: 0,
  review_required: 1,
  approved: 2,
};

const leakageProneChannels = new Set([
  "coupon_extension",
  "affiliate_network",
]);

/**
 * Coupon leakage guardrail for targeted promotions. Public codes picked up by
 * coupon extensions or affiliate surfaces can turn a controlled offer into a
 * margin-eroding universal discount before the team sees it in top-line ROI.
 */
export function getPromotionLeakageReviews(): PromotionLeakageReview[] {
  return promotions
    .map((promo) => {
      const exposedLeakageChannels = promo.redemptionControl.distributionChannels
        .filter((channel) => leakageProneChannels.has(channel));
      const publicCode = promo.redemptionControl.codeStrategy === "public_code";
      const highLeakage = promo.redemptionControl.estimatedLeakageRate >= 20;
      const repeatableCode = promo.redemptionControl.maxRedemptionsPerCustomer > 1;
      const controlStatus: PromotionLeakageReview["controlStatus"] =
        exposedLeakageChannels.includes("coupon_extension") &&
        (publicCode || highLeakage)
          ? "blocked"
          : exposedLeakageChannels.length > 0 ||
              repeatableCode ||
              promo.redemptionControl.estimatedLeakageRate >= 10
            ? "review_required"
            : "approved";
      const reason =
        controlStatus === "blocked"
          ? "Public or high-leakage code is already exposed through coupon extensions; rotate the code or enforce segment locking before more redemptions."
          : controlStatus === "review_required"
            ? "Leakage-prone channel or repeatable code needs QA before the offer expands beyond its intended segment."
            : "Distribution is narrow, single-use, and below the leakage review threshold.";

      return {
        promotionId: promo.id,
        name: promo.name,
        controlStatus,
        leakageRate: promo.redemptionControl.estimatedLeakageRate,
        exposedLeakageChannels,
        reason,
      };
    })
    .sort((a, b) => {
      const rank =
        leakageReviewRank[a.controlStatus] -
        leakageReviewRank[b.controlStatus];
      return rank === 0 ? b.leakageRate - a.leakageRate : rank;
    });
}

const abuseReviewRank: Record<PromotionAbuseReview["reviewStatus"], number> = {
  blocked: 0,
  review_required: 1,
  approved: 2,
};

/**
 * Coordinated-account guardrail for promotions. Device/payment identity overlap,
 * immediate post-signup redemption, and weak verification are evaluated together
 * so one household signal alone does not label a legitimate customer as abuse.
 */
export function getPromotionAbuseReviews(): PromotionAbuseReview[] {
  return promotions
    .map((promo) => {
      const {
        linkedIdentityRedemptionRate,
        rapidSignupRedemptionRate,
        verifiedIdentityCoverage,
      } = promo.abuseSignals;
      const coordinatedAccountRisk = linkedIdentityRedemptionRate >= 20;
      const highVelocity = rapidSignupRedemptionRate >= 25;
      const lowVerification = verifiedIdentityCoverage < 70;
      const reviewStatus: PromotionAbuseReview["reviewStatus"] =
        coordinatedAccountRisk && (highVelocity || lowVerification)
          ? "blocked"
          : linkedIdentityRedemptionRate >= 10 ||
              rapidSignupRedemptionRate >= 15 ||
              verifiedIdentityCoverage < 85
            ? "review_required"
            : "approved";
      const reason =
        reviewStatus === "blocked"
          ? "Coordinated identity overlap and signup velocity exceed the release gate; require identity verification before granting promotional value."
          : reviewStatus === "review_required"
            ? "Account-linkage, redemption velocity, or verification coverage needs a fraud review before the promotion scales."
            : "Identity linkage and redemption velocity are low with strong verification coverage.";

      return {
        promotionId: promo.id,
        name: promo.name,
        reviewStatus,
        linkedIdentityRedemptionRate,
        rapidSignupRedemptionRate,
        verifiedIdentityCoverage,
        reason,
      };
    })
    .sort((a, b) => {
      const rank = abuseReviewRank[a.reviewStatus] - abuseReviewRank[b.reviewStatus];
      return rank === 0
        ? b.linkedIdentityRedemptionRate - a.linkedIdentityRedemptionRate
        : rank;
    });
}

const crackResistanceReviewRank: Record<
  PromotionCrackResistanceReview["reviewStatus"],
  number
> = {
  blocked: 0,
  review_required: 1,
  approved: 2,
};

/**
 * Code-cracking guardrail for promotions. Failed-validation probing, high
 * enumeration velocity, and reseller-scale bulk buying are evaluated together
 * so a single failed attempt never labels a real customer as an attacker.
 */
export function getPromotionCrackResistanceReviews(): PromotionCrackResistanceReview[] {
  return promotions
    .map((promo) => {
      const {
        failedRedemptionAttemptRate,
        enumerationVelocityPerHour,
        resellerBulkOrderRate,
      } = promo.crackResistanceSignals;
      const guessableStrategy =
        promo.redemptionControl.codeStrategy === "public_code";
      const highEnumeration = enumerationVelocityPerHour >= 200;
      const heavyProbing = failedRedemptionAttemptRate >= 25;
      const reviewStatus: PromotionCrackResistanceReview["reviewStatus"] =
        highEnumeration && (guessableStrategy || heavyProbing)
          ? "blocked"
          : enumerationVelocityPerHour >= 60 ||
              failedRedemptionAttemptRate >= 15 ||
              resellerBulkOrderRate >= 8
            ? "review_required"
            : "approved";
      const reason =
        reviewStatus === "blocked"
          ? "Enumeration velocity and failed-redemption probing exceed the release gate; require single-use codes and rate-limited validation before granting promotional value."
          : reviewStatus === "review_required"
            ? "Code-cracking or reseller-bulk signals need a fraud review before the promotion scales."
            : "Validation failures and enumeration velocity are low under single-use redemption controls.";

      return {
        promotionId: promo.id,
        name: promo.name,
        reviewStatus,
        failedRedemptionAttemptRate,
        enumerationVelocityPerHour,
        resellerBulkOrderRate,
        reason,
      };
    })
    .sort((a, b) => {
      const rank =
        crackResistanceReviewRank[a.reviewStatus] -
        crackResistanceReviewRank[b.reviewStatus];
      return rank === 0
        ? b.enumerationVelocityPerHour - a.enumerationVelocityPerHour
        : rank;
    });
}

const audienceReviewRank: Record<
  PromotionAudienceFitReview["reviewStatus"],
  number
> = {
  blocked: 0,
  review_required: 1,
  approved: 2,
};

function isHighValueDiscountSegment(segment: CustomerSegment): boolean {
  return (
    segment.lifetimeValue >= revenueMetrics.customerLifetimeValue * 1.8 ||
    segment.avgOrderValue >= revenueMetrics.averageOrderValue * 1.4
  );
}

function getPromotionTargetedSegments(promo: Promotion): CustomerSegment[] {
  const targetsAllSegments = promo.targetSegments.includes("all");

  return customerSegments.filter((segment) => {
    const targeted =
      targetsAllSegments || promo.targetSegments.includes(segment.id);
    return targeted && !promo.excludedSegments.includes(segment.id);
  });
}

/**
 * Audience-fit guardrail for coupon leakage. Broad discounts should not quietly
 * reach VIP or loyal buyers who already purchase at full price without a
 * holdout/finance review.
 */
export function getPromotionAudienceFitReviews(): PromotionAudienceFitReview[] {
  return promotions
    .map((promo) => {
      const exposedHighValueSegments = getPromotionTargetedSegments(promo)
        .filter(isHighValueDiscountSegment)
        .map((segment) => segment.name);
      const exposesHighValueSegments = exposedHighValueSegments.length > 0;
      const broadAudience = promo.targetSegments.includes("all");
      const highCannibalization = promo.cannibalizationRate >= 40;
      const reviewStatus: PromotionAudienceFitReview["reviewStatus"] =
        exposesHighValueSegments && (broadAudience || highCannibalization)
          ? "blocked"
          : exposesHighValueSegments ||
              (broadAudience && promo.cannibalizationRate >= 25)
            ? "review_required"
            : "approved";
      const reason =
        reviewStatus === "blocked"
          ? "Offer exposes high-value full-price buyers while cannibalization risk is high; gate checkout or add CRM exclusions before launch."
          : reviewStatus === "review_required"
            ? "Offer may reach valuable repeat buyers; require a CRM holdout or finance review before expanding audience."
            : "Audience excludes high-value full-price buyers or is narrow enough to clear discount governance.";

      return {
        promotionId: promo.id,
        name: promo.name,
        audienceIntent: promo.audienceIntent,
        reviewStatus,
        exposedHighValueSegments,
        reason,
      };
    })
    .sort((a, b) => {
      const reviewRank =
        audienceReviewRank[a.reviewStatus] - audienceReviewRank[b.reviewStatus];
      return reviewRank === 0 ? a.name.localeCompare(b.name) : reviewRank;
    });
}

const returnRiskRank: Record<PromotionReturnRiskReview["reviewStatus"], number> = {
  blocked: 0,
  review_required: 1,
  approved: 2,
};

/**
 * Return-cost preflight for active promotions. Discount-led order volume can
 * look profitable until reverse-logistics costs arrive, so high-return offers
 * must carry enough reserve before they are allowed to scale.
 */
export function getPromotionReturnRiskReviews(): PromotionReturnRiskReview[] {
  return promotions
    .map((promo) => {
      const estimatedReturns =
        promo.ordersInfluenced * (promo.returnExposure.expectedReturnRate / 100);
      const estimatedReverseLogisticsCost =
        estimatedReturns * promo.returnExposure.reverseLogisticsCostPerReturn;
      const reserveCoverageRatio =
        estimatedReverseLogisticsCost === 0
          ? Number.POSITIVE_INFINITY
          : promo.costExposure.returnReserve / estimatedReverseLogisticsCost;
      const highReturnRisk = promo.returnExposure.expectedReturnRate >= 18;
      const reviewStatus: PromotionReturnRiskReview["reviewStatus"] =
        highReturnRisk && reserveCoverageRatio < 1
          ? "blocked"
          : promo.returnExposure.expectedReturnRate >= 15 ||
              reserveCoverageRatio < 1
            ? "review_required"
            : "approved";
      const reason =
        reviewStatus === "blocked"
          ? "Expected return volume exceeds the reverse-logistics reserve; increase the return reserve or narrow the offer before scaling."
          : reviewStatus === "review_required"
            ? "Return rate is elevated; validate fit, refund, and reverse-logistics assumptions before expanding the promotion."
            : "Expected return costs are below the review threshold and covered by the current reserve.";

      return {
        promotionId: promo.id,
        name: promo.name,
        reviewStatus,
        expectedReturnRate: promo.returnExposure.expectedReturnRate,
        estimatedReverseLogisticsCost,
        reserveCoverageRatio,
        reason,
      };
    })
    .sort((a, b) => {
      const rank = returnRiskRank[a.reviewStatus] - returnRiskRank[b.reviewStatus];
      return rank === 0
        ? b.expectedReturnRate - a.expectedReturnRate
        : rank;
    });
}


const returnAbuseReviewRank: Record<
  PromotionReturnAbuseReview["reviewStatus"],
  number
> = {
  blocked: 0,
  review_required: 1,
  approved: 2,
};

/**
 * Return-policy abuse preflight for promotions. Bracketing can be a normal
 * ecommerce behavior, so it is never blocked on its own; the release gate
 * requires it to combine with repeated returns or policy exceptions.
 */
export function getPromotionReturnAbuseReviews(): PromotionReturnAbuseReview[] {
  return promotions
    .map((promo) => {
      const {
        bracketingOrderRate,
        serialReturnCustomerRate,
        policyExceptionRate,
      } = promo.returnAbuseSignals;
      const highBracketing = bracketingOrderRate >= 15;
      const repeatedReturns = serialReturnCustomerRate >= 10;
      const policyExceptionPattern = policyExceptionRate >= 8;
      const reviewStatus: PromotionReturnAbuseReview["reviewStatus"] =
        highBracketing && (repeatedReturns || policyExceptionPattern)
          ? "blocked"
          : bracketingOrderRate >= 10 ||
              serialReturnCustomerRate >= 6 ||
              policyExceptionRate >= 5
            ? "review_required"
            : "approved";
      const reason =
        reviewStatus === "blocked"
          ? "Bracketing is paired with repeated returns or policy exceptions; hold refund automation for item-level verification before scaling the promotion."
          : reviewStatus === "review_required"
            ? "Return behavior is elevated; validate item-level evidence and policy exceptions before expanding the promotion. Bracketing alone is not treated as fraud."
            : "Return behavior stays below review thresholds; bracketing alone is not treated as fraud.";

      return {
        promotionId: promo.id,
        name: promo.name,
        reviewStatus,
        bracketingOrderRate,
        serialReturnCustomerRate,
        policyExceptionRate,
        reason,
      };
    })
    .sort((a, b) => {
      const rank =
        returnAbuseReviewRank[a.reviewStatus] -
        returnAbuseReviewRank[b.reviewStatus];
      return rank === 0
        ? b.policyExceptionRate + b.serialReturnCustomerRate -
            (a.policyExceptionRate + a.serialReturnCustomerRate)
        : rank;
    });
}

const inventoryReadinessRank: Record<
  PromotionInventoryReadinessReview["reviewStatus"],
  number
> = {
  blocked: 0,
  review_required: 1,
  approved: 2,
};

/**
 * Inventory preflight for promotions. Current demand and stock signals should
 * be checked before a campaign accelerates constrained SKUs into a stockout.
 */
export function getPromotionInventoryReadinessReviews(): PromotionInventoryReadinessReview[] {
  return promotions
    .map((promo) => {
      const sitewide = promo.applicableProducts.includes("all");
      const applicableProductIds = new Set(promo.applicableProducts);
      const scopedForecasts = inventoryForecasts.filter(
        (forecast) => sitewide || applicableProductIds.has(forecast.productId),
      );
      const criticalForecasts = scopedForecasts.filter(
        (forecast) => forecast.stockoutRisk === "critical",
      );
      const highForecasts = scopedForecasts.filter(
        (forecast) => forecast.stockoutRisk === "high",
      );
      const atRiskForecasts = [...criticalForecasts, ...highForecasts];
      const reviewStatus: PromotionInventoryReadinessReview["reviewStatus"] =
        criticalForecasts.length > 0
          ? "blocked"
          : highForecasts.length > 0
            ? "review_required"
            : "approved";
      const minimumDaysOfStockRemaining =
        scopedForecasts.length === 0
          ? null
          : Math.min(
              ...scopedForecasts.map((forecast) => forecast.daysOfStockRemaining),
            );
      const reason =
        reviewStatus === "blocked"
          ? "Promotion scope includes critically constrained inventory; exclude those SKUs or confirm replenishment before launch."
          : reviewStatus === "review_required"
            ? "Promotion scope includes high stockout-risk inventory; review demand lift and replenishment timing before launch."
            : "Promotion scope has no high or critical stockout signal in the current forecast.";

      return {
        promotionId: promo.id,
        name: promo.name,
        reviewStatus,
        atRiskProductIds: atRiskForecasts.map((forecast) => forecast.productId),
        minimumDaysOfStockRemaining,
        reason,
      };
    })
    .sort((a, b) => {
      const rank =
        inventoryReadinessRank[a.reviewStatus] -
        inventoryReadinessRank[b.reviewStatus];
      if (rank !== 0) return rank;

      return (
        (a.minimumDaysOfStockRemaining ?? Number.POSITIVE_INFINITY) -
        (b.minimumDaysOfStockRemaining ?? Number.POSITIVE_INFINITY)
      );
    });
}

const demandPullForwardReviewRank: Record<
  PromotionDemandPullForwardReview["reviewStatus"],
  number
> = {
  blocked: 0,
  review_required: 1,
  approved: 2,
};

/**
 * Post-promotion demand-displacement check. A sales spike can be borrowed from
 * future periods when customers stockpile, so projected demand dips and slow
 * baseline recovery are reviewed before apparent lift is treated as incremental.
 */
export function getPromotionDemandPullForwardReviews(): PromotionDemandPullForwardReview[] {
  return promotions
    .map((promo) => {
      const {
        stockpilingRate,
        projectedPostPromotionDip,
        baselineRecoveryDays,
      } = promo.demandShiftSignals;
      const severeStockpiling = stockpilingRate >= 30;
      const prolongedDisplacement =
        projectedPostPromotionDip >= 20 || baselineRecoveryDays > 21;
      const reviewStatus: PromotionDemandPullForwardReview["reviewStatus"] =
        severeStockpiling && prolongedDisplacement
          ? "blocked"
          : stockpilingRate >= 15 ||
              projectedPostPromotionDip >= 10 ||
              baselineRecoveryDays > 14
            ? "review_required"
            : "approved";
      const reason =
        reviewStatus === "blocked"
          ? "Projected post-promotion dip indicates substantial demand was pulled forward; hold incremental-lift credit until the baseline recovers."
          : reviewStatus === "review_required"
            ? "Stockpiling or a post-promotion demand dip needs a holdout and recovery-window review before lift is treated as incremental."
            : "Projected demand displacement is limited and baseline recovery stays within the review window.";

      return {
        promotionId: promo.id,
        name: promo.name,
        reviewStatus,
        stockpilingRate,
        projectedPostPromotionDip,
        baselineRecoveryDays,
        reason,
      };
    })
    .sort((a, b) => {
      const rank =
        demandPullForwardReviewRank[a.reviewStatus] -
        demandPullForwardReviewRank[b.reviewStatus];
      return rank === 0
        ? b.projectedPostPromotionDip - a.projectedPostPromotionDip
        : rank;
    });
}

const fulfillmentCostReviewRank: Record<
  PromotionFulfillmentCostReview["reviewStatus"],
  number
> = {
  blocked: 0,
  review_required: 1,
  approved: 2,
};

/**
 * Fulfillment-cost preflight for promotions. Split shipments increase the
 * carrier and pick-and-pack cost behind an offer, so the configured shipping
 * subsidy must cover the projected cost after customer contributions.
 */
export function getPromotionFulfillmentCostReviews(): PromotionFulfillmentCostReview[] {
  return promotions
    .map((promo) => {
      const {
        splitShipmentRate,
        averageCostPerShipment,
        averageCustomerShippingContribution,
      } = promo.fulfillmentSignals;
      const projectedShipmentCount =
        promo.ordersInfluenced * (1 + splitShipmentRate / 100);
      const projectedFulfillmentCost =
        projectedShipmentCount * averageCostPerShipment;
      const projectedCustomerContribution =
        promo.ordersInfluenced * averageCustomerShippingContribution;
      const requiredSubsidy = Math.max(
        projectedFulfillmentCost - projectedCustomerContribution,
        0,
      );
      const reservedSubsidy = promo.costExposure.fulfillmentSubsidies;
      const subsidyCoverageRatio =
        requiredSubsidy === 0
          ? Number.POSITIVE_INFINITY
          : reservedSubsidy / requiredSubsidy;
      const underfunded = subsidyCoverageRatio < 1;
      const severelyUnderfunded = subsidyCoverageRatio < 0.8;
      const highSplitShipmentRate = splitShipmentRate >= 20;
      const reviewStatus: PromotionFulfillmentCostReview["reviewStatus"] =
        underfunded &&
        (severelyUnderfunded ||
          highSplitShipmentRate ||
          promo.type === "free_shipping")
          ? "blocked"
          : underfunded || splitShipmentRate >= 15
            ? "review_required"
            : "approved";
      const reason =
        reviewStatus === "blocked"
          ? "Projected split-shipment costs exceed the reserved subsidy; narrow the shipping scope or fund the gap before launch."
          : reviewStatus === "review_required"
            ? "Fulfillment coverage or split-shipment exposure needs an operations review before the promotion scales."
            : "Customer contributions and the reserved subsidy cover the projected fulfillment cost.";

      return {
        promotionId: promo.id,
        name: promo.name,
        reviewStatus,
        splitShipmentRate,
        projectedShipmentCount,
        projectedFulfillmentCost,
        projectedCustomerContribution,
        requiredSubsidy,
        reservedSubsidy,
        subsidyCoverageRatio,
        reason,
      };
    })
    .sort((a, b) => {
      const rank =
        fulfillmentCostReviewRank[a.reviewStatus] -
        fulfillmentCostReviewRank[b.reviewStatus];
      return rank === 0
        ? a.subsidyCoverageRatio - b.subsidyCoverageRatio
        : rank;
    });
}

const shippingOutlierReviewRank: Record<
  PromotionShippingOutlierReview["reviewStatus"],
  number
> = {
  blocked: 0,
  review_required: 1,
  approved: 2,
};

/**
 * Shipping-scope preflight for promotions. Carrier distance and dimensional
 * weight can turn a flat or free-shipping promise into a margin outlier even
 * when average fulfillment coverage appears adequate.
 */
export function getPromotionShippingOutlierReviews(): PromotionShippingOutlierReview[] {
  return promotions
    .map((promo) => {
      const { remoteZoneOrderRate, dimensionalWeightOrderRate } =
        promo.fulfillmentSignals;
      const severeZoneExposure = remoteZoneOrderRate >= 25;
      const severeDimensionalExposure = dimensionalWeightOrderRate >= 20;
      const reviewStatus: PromotionShippingOutlierReview["reviewStatus"] =
        promo.type === "free_shipping" &&
        (severeZoneExposure || severeDimensionalExposure)
          ? "blocked"
          : remoteZoneOrderRate >= 15 || dimensionalWeightOrderRate >= 12
            ? "review_required"
            : "approved";
      const reason =
        reviewStatus === "blocked"
          ? "Free-shipping scope has material remote-zone or dimensional-weight exposure; add package and zone exclusions or price the surcharge before launch."
          : reviewStatus === "review_required"
            ? "Shipping-zone or package-size outliers need a carrier-rate review before the promotion scales."
            : "Remote-zone and dimensional-weight exposure stay below the shipping review thresholds.";

      return {
        promotionId: promo.id,
        name: promo.name,
        reviewStatus,
        remoteZoneOrderRate,
        dimensionalWeightOrderRate,
        reason,
      };
    })
    .sort((a, b) => {
      const rank =
        shippingOutlierReviewRank[a.reviewStatus] -
        shippingOutlierReviewRank[b.reviewStatus];
      if (rank !== 0) return rank;
      return (
        b.remoteZoneOrderRate + b.dimensionalWeightOrderRate -
        (a.remoteZoneOrderRate + a.dimensionalWeightOrderRate)
      );
    });
}

const deliveryExceptionReviewRank: Record<
  PromotionDeliveryExceptionReview["reviewStatus"],
  number
> = {
  blocked: 0,
  review_required: 1,
  approved: 2,
};

/**
 * Pre-shipment address-quality gate for promotions. Carrier address corrections
 * arrive as retroactive fees, while undeliverable parcels can create both
 * outbound and return freight costs after top-line campaign ROI is reported.
 */
export function getPromotionDeliveryExceptionReviews(): PromotionDeliveryExceptionReview[] {
  return promotions
    .map((promo) => {
      const { addressCorrectionOrderRate, returnToSenderOrderRate } =
        promo.fulfillmentSignals;
      const severeExceptionExposure =
        addressCorrectionOrderRate >= 5 || returnToSenderOrderRate >= 2;
      const reviewStatus: PromotionDeliveryExceptionReview["reviewStatus"] =
        promo.type === "free_shipping" && severeExceptionExposure
          ? "blocked"
          : addressCorrectionOrderRate >= 3 || returnToSenderOrderRate >= 1
            ? "review_required"
            : "approved";
      const reason =
        reviewStatus === "blocked"
          ? "Free-shipping scope has material address-correction or return-to-sender exposure; validate addresses and reserve exception freight before launch."
          : reviewStatus === "review_required"
            ? "Delivery exceptions need an address-quality and carrier-fee review before the promotion scales."
            : "Address-correction and return-to-sender exposure stay below the delivery-exception thresholds.";

      return {
        promotionId: promo.id,
        name: promo.name,
        reviewStatus,
        addressCorrectionOrderRate,
        returnToSenderOrderRate,
        reason,
      };
    })
    .sort((a, b) => {
      const rank =
        deliveryExceptionReviewRank[a.reviewStatus] -
        deliveryExceptionReviewRank[b.reviewStatus];
      if (rank !== 0) return rank;
      return (
        b.addressCorrectionOrderRate + b.returnToSenderOrderRate -
        (a.addressCorrectionOrderRate + a.returnToSenderOrderRate)
      );
    });
}

const cadenceReviewRank: Record<
  PromotionCadenceReview["reviewStatus"],
  number
> = {
  blocked: 0,
  review_required: 1,
  approved: 2,
};

/**
 * Discount-cadence conditioning gate for promotions. When a scope is promoted
 * too often with short full-price gaps, the sale price becomes the reference
 * price and buyers are trained to wait for the next discount instead of
 * purchasing at list price.
 */
export function getPromotionCadenceReviews(): PromotionCadenceReview[] {
  return promotions
    .map((promo) => {
      const {
        daysDiscountedLast90,
        averageGapDaysBetweenOffers,
        repeatExposureRate,
      } = promo.cadenceSignals;
      const nearContinuousDiscounting =
        daysDiscountedLast90 >= 45 && averageGapDaysBetweenOffers <= 7;
      const reviewStatus: PromotionCadenceReview["reviewStatus"] =
        nearContinuousDiscounting
          ? "blocked"
          : daysDiscountedLast90 >= 30 ||
              averageGapDaysBetweenOffers <= 14 ||
              repeatExposureRate >= 40
            ? "review_required"
            : "approved";
      const reason =
        reviewStatus === "blocked"
          ? "Near-continuous discounting has reset the reference price; hold for a full-price reset window before relaunching."
          : reviewStatus === "review_required"
            ? "Frequent discount cadence risks training customers to wait for the next sale; require a cadence and holdout review before extending."
            : "Discount cadence preserves full-price recovery gaps, so the reference price stays intact.";

      return {
        promotionId: promo.id,
        name: promo.name,
        reviewStatus,
        daysDiscountedLast90,
        averageGapDaysBetweenOffers,
        repeatExposureRate,
        reason,
      };
    })
    .sort((a, b) => {
      const rank =
        cadenceReviewRank[a.reviewStatus] - cadenceReviewRank[b.reviewStatus];
      if (rank !== 0) return rank;
      return b.repeatExposureRate - a.repeatExposureRate;
    });
}


export function getPromotionInventoryRefreshReadinessReviews(): PromotionInventoryRefreshReadinessReview[] {
  const peakSeasonStartDoy = 305; // ~Nov 1st in a 365-day year
  const currentDoy = 220; // ~Aug 8th baseline for testing
  
  return promotions
    .map((promo) => {
      const applicableProductIds =
        promo.applicableProducts[0] === "all" ? products.map(p => p.id) : promo.applicableProducts;
      
      const applicableProducts = products.filter(p =>
        applicableProductIds.includes(p.id)
      );
      
      const startDate = new Date(promo.startDate);
      const endDate = new Date(promo.endDate);
      const promotionDurationDays = Math.ceil(
        (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)
      );
      
      const daysUntilPeakSeasonStart =
        peakSeasonStartDoy > currentDoy ? peakSeasonStartDoy - currentDoy : null;
      
      // Estimate daily unit sold across products
      const totalUnitsSold = applicableProducts.reduce((sum, p) => sum + p.unitsSold, 0);
      const estimatedDailyUnitSold = Math.ceil(totalUnitsSold / 90); // rolling 90-day average
      
      const estimatedTotalUnitsNeeded = estimatedDailyUnitSold * promotionDurationDays;
      
      // Min stock and avg lead time across products
      const minimumDaysOfStockAvailable =
        applicableProducts.length > 0
          ? Math.min(...applicableProducts.map(p => p.stockLevel / Math.max(estimatedDailyUnitSold, 1)))
          : null;
      
      const replenishmentLeadTimeDays =
        applicableProducts.length > 0
          ? Math.ceil(applicableProducts.reduce((sum, p) => sum + (p.reorderPoint / 5), 0) / applicableProducts.length)
          : 14;
      
      // Risk assessment: Can we refill during the promotion?
      const totalAvailableStock = applicableProducts.reduce((sum, p) => sum + p.stockLevel, 0);
      
      const stockStress = estimatedTotalUnitsNeeded / Math.max(totalAvailableStock, 1);
      
      let refreshWindowRiskLevel: PromotionInventoryRefreshReadinessReview["refreshWindowRiskLevel"];
      let reviewStatus: PromotionInventoryRefreshReadinessReview["reviewStatus"];
      let reason: string;
      
      if (stockStress > 0.8 || (minimumDaysOfStockAvailable !== null && minimumDaysOfStockAvailable < replenishmentLeadTimeDays + 7)) {
        refreshWindowRiskLevel = "critical";
        reviewStatus = "blocked";
        reason = "Insufficient stock buffer: promotion duration exceeds inventory runway plus replenishment lead time. Risk of stockout mid-campaign or inability to reorder safely.";
      } else if (stockStress > 0.5 || (minimumDaysOfStockAvailable !== null && minimumDaysOfStockAvailable < replenishmentLeadTimeDays + 14)) {
        refreshWindowRiskLevel = "tight";
        reviewStatus = "review_required";
        reason = "Tight inventory refresh window: replenishment must arrive during promotion to sustain demand. Requires expedited lead-time confirmation and safety-stock audits.";
      } else {
        refreshWindowRiskLevel = "healthy";
        reviewStatus = "approved";
        reason = "Healthy inventory refresh readiness: sufficient stock buffer and clear replenishment windows allow campaign to run without inventory risk.";
      }
      
      // Flag peak-season timing risk
      if (daysUntilPeakSeasonStart !== null && daysUntilPeakSeasonStart < 60) {
        if (reviewStatus === "approved") {
          reviewStatus = "review_required";
          reason += " ⚠ Campaign overlaps with peak-season start; coordinate with seasonal demand forecast.";
        }
      }
      
      return {
        promotionId: promo.id,
        name: promo.name,
        reviewStatus,
        promotionDurationDays,
        daysUntilPeakSeasonStart,
        estimatedDailyUnitSold,
        estimatedTotalUnitsNeeded,
        minimumDaysOfStockAvailable: minimumDaysOfStockAvailable ? Math.round(minimumDaysOfStockAvailable * 10) / 10 : null,
        replenishmentLeadTimeDays,
        refreshWindowRiskLevel,
        reason,
      };
    })
    .sort((a, b) => {
      const riskRank: Record<string, number> = { critical: 0, tight: 1, healthy: 2 };
      const aRank = riskRank[a.refreshWindowRiskLevel];
      const bRank = riskRank[b.refreshWindowRiskLevel];
      if (aRank !== bRank) return aRank - bRank;
      const statusRank: Record<string, number> = { blocked: 0, review_required: 1, approved: 2 };
      return statusRank[a.reviewStatus] - statusRank[b.reviewStatus];
    });
}
const freeShippingThresholdReviewRank: Record<
  PromotionFreeShippingThresholdReview["reviewStatus"],
  number
> = {
  blocked: 0,
  review_required: 1,
  approved: 2,
};

/**
 * Free-shipping line economics gate for promotions. A threshold that sits
 * below the modal basket, or that disappears entirely on sitewide offers,
 * absorbs carrier cost on orders that would have shipped anyway, so the
 * offer's conversion lift must be credited against the subsidy it actually
 * funds.
 */
export function getPromotionFreeShippingThresholdReviews(): PromotionFreeShippingThresholdReview[] {
  return promotions
    .map((promo) => {
      const { thresholdOrderValue, modalOrderValue, qualifyingOrderRate } =
        promo.freeShippingThresholdSignals;
      const sitewideFreeShipping =
        promo.type === "free_shipping" && thresholdOrderValue === null;
      const thresholdBelowModalBasket =
        thresholdOrderValue !== null && thresholdOrderValue < modalOrderValue;
      const broadQualification = qualifyingOrderRate >= 70;
      const reviewStatus: PromotionFreeShippingThresholdReview["reviewStatus"] =
        sitewideFreeShipping || qualifyingOrderRate >= 85
          ? "blocked"
          : thresholdBelowModalBasket || broadQualification
            ? "review_required"
            : "approved";
      const reason =
        reviewStatus === "blocked"
          ? "Sitewide free shipping removes the qualification line entirely, so the shipping subsidy lands on orders that would have shipped anyway; add a threshold or zone exclusions before launch."
          : reviewStatus === "review_required"
            ? "The free-shipping line clears too much of the basket distribution to recruit incremental spend; re-derive the threshold from modal order value and carrier cost."
            : "The free-shipping threshold sits above the modal basket and qualifying orders stay a minority, so the subsidy targets conversion instead of being given away.";

      return {
        promotionId: promo.id,
        name: promo.name,
        reviewStatus,
        thresholdOrderValue,
        modalOrderValue,
        qualifyingOrderRate,
        reason,
      };
    })
    .sort((a, b) => {
      const rank =
        freeShippingThresholdReviewRank[a.reviewStatus] -
        freeShippingThresholdReviewRank[b.reviewStatus];
      return rank === 0 ? b.qualifyingOrderRate - a.qualifyingOrderRate : rank;
    });
}
const shippingReconciliationReviewRank: Record<
  PromotionShippingReconciliationReview["reviewStatus"],
  number
> = {
  blocked: 0,
  review_required: 1,
  approved: 2,
};

/**
 * Late-cost reconciliation preflight for promotion economics. Carrier and 3PL
 * invoices can revise shipping costs after the sale, so provisional margin
 * should not be treated as final when adjustment exposure is material.
 */
export function getPromotionShippingReconciliationReviews(): PromotionShippingReconciliationReview[] {
  return promotions
    .map((promo) => {
      const {
        carrierInvoiceLagDays,
        retroactiveAdjustmentRate,
        unreconciledShippingCostRate,
      } = promo.shippingReconciliationSignals;
      const delayedInvoice = carrierInvoiceLagDays >= 21;
      const materialAdjustmentExposure =
        retroactiveAdjustmentRate >= 15 || unreconciledShippingCostRate >= 20;
      const reviewStatus: PromotionShippingReconciliationReview["reviewStatus"] =
        delayedInvoice && materialAdjustmentExposure
          ? "blocked"
          : carrierInvoiceLagDays >= 14 ||
              retroactiveAdjustmentRate >= 8 ||
              unreconciledShippingCostRate >= 8
            ? "review_required"
            : "approved";
      const reason =
        reviewStatus === "blocked"
          ? "Delayed carrier-cost updates and material adjustments can restate promotion margin; reconcile invoice costs at order level before scaling."
          : reviewStatus === "review_required"
            ? "Carrier or 3PL costs may arrive after the sale; keep provisional promotion margin in review until the reconciliation window closes."
            : "Carrier-cost timing and adjustment exposure stay low enough for routine reconciliation.";

      return {
        promotionId: promo.id,
        name: promo.name,
        reviewStatus,
        carrierInvoiceLagDays,
        retroactiveAdjustmentRate,
        unreconciledShippingCostRate,
        reason,
      };
    })
    .sort((a, b) => {
      const rank =
        shippingReconciliationReviewRank[a.reviewStatus] -
        shippingReconciliationReviewRank[b.reviewStatus];
      return rank === 0
        ? b.unreconciledShippingCostRate - a.unreconciledShippingCostRate
        : rank;
    });
}


const cartRetargetingReviewRank: Record<
  PromotionCartRetargetingReview["reviewStatus"],
  number
> = {
  blocked: 0,
  review_required: 1,
  approved: 2,
};

/**
 * Cart-retargeting incrementality gate. Abandoned carts can recover without a
 * coupon, so broad follow-up offers need a holdout before that recovery is
 * credited as incremental revenue.
 */
export function getPromotionCartRetargetingReviews(): PromotionCartRetargetingReview[] {
  return promotions
    .map((promo) => {
      const {
        cartAbandonmentRate,
        retargetingCoverageRate,
        naturalRecoveryRate,
        couponRecoveryRate,
      } = promo.cartRetargetingSignals;
      const incrementalRecoveryRate = Math.max(
        couponRecoveryRate - naturalRecoveryRate,
        0,
      );
      const estimatedDiscountGiveawayRate =
        (retargetingCoverageRate * naturalRecoveryRate) / 100;
      const broadRetargeting = retargetingCoverageRate >= 70;
      const highNaturalRecovery = naturalRecoveryRate >= 25;
      const weakIncrementality = incrementalRecoveryRate < 8;
      const meaningfulAbandonment = cartAbandonmentRate >= 60;
      const reviewStatus: PromotionCartRetargetingReview["reviewStatus"] =
        meaningfulAbandonment &&
        broadRetargeting &&
        highNaturalRecovery &&
        weakIncrementality
          ? "blocked"
          : retargetingCoverageRate >= 50 ||
              naturalRecoveryRate >= 15 ||
              incrementalRecoveryRate < 12
            ? "review_required"
            : "approved";
      const reason =
        reviewStatus === "blocked"
          ? "Broad cart retargeting reaches carts with meaningful natural recovery; hold coupon value until a randomized holdout proves incremental lift."
          : reviewStatus === "review_required"
            ? "Cart recovery may include organic conversions; narrow the audience and validate coupon lift with a holdout before scaling."
            : "Targeted retargeting shows modeled incremental recovery above the review threshold with limited natural-recovery exposure.";

      return {
        promotionId: promo.id,
        name: promo.name,
        reviewStatus,
        cartAbandonmentRate,
        retargetingCoverageRate,
        naturalRecoveryRate,
        couponRecoveryRate,
        incrementalRecoveryRate,
        estimatedDiscountGiveawayRate,
        reason,
      };
    })
    .sort((a, b) => {
      const rank =
        cartRetargetingReviewRank[a.reviewStatus] -
        cartRetargetingReviewRank[b.reviewStatus];
      return rank === 0
        ? b.estimatedDiscountGiveawayRate - a.estimatedDiscountGiveawayRate
        : rank;
    });
}
