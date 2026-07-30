export interface Product {
  id: string;
  name: string;
  category: string;
  sku: string;
  currentPrice: number;
  costPrice: number;
  margin: number;
  unitsSold: number;
  revenue: number;
  stockLevel: number;
  reorderPoint: number;
  status: "active" | "discontinued" | "out_of_stock";
  image?: string;
}

export type PricingRecommendationAction =
  | "raise_price"
  | "hold_price"
  | "markdown";

export type InventoryPricingSignal =
  | "stockout_guardrail"
  | "balanced"
  | "overstock_clearance";

export interface PriceOptimization {
  productId: string;
  currentPrice: number;
  recommendedPrice: number;
  recommendedAction: PricingRecommendationAction;
  inventorySignal: InventoryPricingSignal;
  marginFloorPrice: number;
  confidence: number; // 0-1
  estimatedRevenueImpact: number; // %
  estimatedMarginImpact: number; // %
  reasoning: string;
  elasticity: number; // price elasticity of demand
  competitorAvgPrice: number;
}

export interface InventoryForecast {
  productId: string;
  currentStock: number;
  dailyDemandAvg: number;
  daysOfStockRemaining: number;
  reorderPoint: number;
  reorderQuantity: number;
  stockoutRisk: "low" | "medium" | "high" | "critical";
  leadTimeDays: number;
  suggestedOrderDate: string; // ISO date
  seasonalFactor: number; // 0-2, 1.0 = normal
}

export interface CustomerSegment {
  id: string;
  name: string;
  description: string;
  customerCount: number;
  percentageOfBase: number;
  avgOrderValue: number;
  arpu: number;
  lifetimeValue: number;
  churnRisk: number; // 0-1
  growthRate: number; // %
  color: string;
}

export interface RevenueMetrics {
  totalRevenue: number;
  revenueGrowth: number; // % YoY
  grossMargin: number; // %
  netProfit: number;
  averageOrderValue: number;
  conversionRate: number; // %
  customerAcquisitionCost: number;
  customerLifetimeValue: number;
  activeCustomers: number;
  churnRate: number; // %
  periodStart: string;
  periodEnd: string;
}

export interface PromotionCostExposure {
  paymentProcessingFees: number;
  fulfillmentSubsidies: number;
  loyaltyPointLiability: number;
  returnReserve: number;
}

export interface PromotionReturnExposure {
  expectedReturnRate: number; // % of influenced orders expected to be returned
  reverseLogisticsCostPerReturn: number;
}

export interface PromotionDemandShiftSignals {
  stockpilingRate: number; // % of influenced orders estimated as forward buying
  projectedPostPromotionDip: number; // % below baseline after the offer ends
  baselineRecoveryDays: number;
}

export interface PromotionFulfillmentSignals {
  splitShipmentRate: number; // % of orders expected to require an extra shipment
  averageCostPerShipment: number;
  averageCustomerShippingContribution: number; // per influenced order
  remoteZoneOrderRate: number; // % shipping to high-cost or remote carrier zones
  dimensionalWeightOrderRate: number; // % billed above actual weight due to package size
}

export interface PromotionAbuseSignals {
  linkedIdentityRedemptionRate: number; // % tied to a device/payment identity used by another account
  rapidSignupRedemptionRate: number; // % redeemed within 60 seconds of account creation
  verifiedIdentityCoverage: number; // % backed by verified phone, payment, or address identity
}

export type PromotionRedemptionChannel =
  | "email"
  | "sms"
  | "loyalty_portal"
  | "onsite_banner"
  | "coupon_extension"
  | "affiliate_network";

export interface PromotionRedemptionControl {
  codeStrategy: "single_use" | "segment_locked" | "public_code";
  distributionChannels: PromotionRedemptionChannel[];
  estimatedLeakageRate: number; // % of redemptions outside intended audience
  maxRedemptionsPerCustomer: number;
}

export type PromotionAudienceIntent =
  | "acquisition"
  | "reactivation"
  | "loyalty_reward"
  | "category_expansion"
  | "cart_conversion";

export interface Promotion {
  id: string;
  name: string;
  type: "percentage" | "fixed_amount" | "bogo" | "free_shipping" | "bundle";
  discountValue: number;
  applicableProducts: string[]; // product IDs or "all"
  startDate: string;
  endDate: string;
  budget: number;
  spentSoFar: number;
  revenueGenerated: number;
  ordersInfluenced: number;
  status: "active" | "scheduled" | "ended" | "paused";
  roi: number; // %
  cannibalizationRate: number; // % of orders that would have happened anyway
  incrementalRevenue: number; // revenue after subtracting cannibalized baseline
  costExposure: PromotionCostExposure;
  returnExposure: PromotionReturnExposure;
  demandShiftSignals: PromotionDemandShiftSignals;
  fulfillmentSignals: PromotionFulfillmentSignals;
  redemptionControl: PromotionRedemptionControl;
  abuseSignals: PromotionAbuseSignals;
  audienceIntent: PromotionAudienceIntent;
  targetSegments: string[]; // customer segment IDs or "all"
  excludedSegments: string[]; // customer segment IDs withheld from the offer
}

export interface PromotionAudienceFitReview {
  promotionId: string;
  name: string;
  audienceIntent: PromotionAudienceIntent;
  reviewStatus: "approved" | "review_required" | "blocked";
  exposedHighValueSegments: string[];
  reason: string;
}

export interface PromotionLeakageReview {
  promotionId: string;
  name: string;
  controlStatus: "approved" | "review_required" | "blocked";
  leakageRate: number;
  exposedLeakageChannels: PromotionRedemptionChannel[];
  reason: string;
}

export interface PromotionAbuseReview {
  promotionId: string;
  name: string;
  reviewStatus: "approved" | "review_required" | "blocked";
  linkedIdentityRedemptionRate: number;
  rapidSignupRedemptionRate: number;
  verifiedIdentityCoverage: number;
  reason: string;
}

export interface PromotionReturnRiskReview {
  promotionId: string;
  name: string;
  reviewStatus: "approved" | "review_required" | "blocked";
  expectedReturnRate: number;
  estimatedReverseLogisticsCost: number;
  reserveCoverageRatio: number;
  reason: string;
}

export interface PromotionInventoryReadinessReview {
  promotionId: string;
  name: string;
  reviewStatus: "approved" | "review_required" | "blocked";
  atRiskProductIds: string[];
  minimumDaysOfStockRemaining: number | null;
  reason: string;
}

export interface PromotionDemandPullForwardReview {
  promotionId: string;
  name: string;
  reviewStatus: "approved" | "review_required" | "blocked";
  stockpilingRate: number;
  projectedPostPromotionDip: number;
  baselineRecoveryDays: number;
  reason: string;
}

export interface PromotionFulfillmentCostReview {
  promotionId: string;
  name: string;
  reviewStatus: "approved" | "review_required" | "blocked";
  splitShipmentRate: number;
  projectedShipmentCount: number;
  projectedFulfillmentCost: number;
  projectedCustomerContribution: number;
  requiredSubsidy: number;
  reservedSubsidy: number;
  subsidyCoverageRatio: number;
  reason: string;
}

export interface PromotionShippingOutlierReview {
  promotionId: string;
  name: string;
  reviewStatus: "approved" | "review_required" | "blocked";
  remoteZoneOrderRate: number;
  dimensionalWeightOrderRate: number;
  reason: string;
}

export interface PromotionProfitabilitySnapshot {
  promotionId: string;
  name: string;
  topLineRoi: number;
  adjustedRoi: number;
  cannibalizedRevenue: number;
  cannibalizedMarginLoss: number;
  grossIncrementalMargin: number;
  variableCostExposure: number;
  netIncrementalMargin: number;
  riskLevel: "healthy" | "watch" | "margin_leak";
}

export interface PromotionBreakEvenSnapshot {
  promotionId: string;
  name: string;
  effectiveDiscountDepth: number; // % of AOV or basket value
  requiredVolumeLift: number; // % more units needed to hold gross profit
  riskLevel: "healthy" | "watch" | "margin_leak";
}

export interface PromotionStackingRisk {
  promotionIds: [string, string];
  names: [string, string];
  overlapWindow: {
    startDate: string;
    endDate: string;
  };
  combinedDiscountDepth: number;
  sharedScope: "sitewide" | "product_overlap";
  approvalStatus: "review_required" | "blocked";
  reason: string;
}

export interface ProductPerformanceRow {
  product: Product;
  priceOptimization?: PriceOptimization;
  inventory?: InventoryForecast;
}

export interface HeroStats {
  totalRevenue: number;
  grossMargin: number;
  stockoutRiskCount: number;
  activeSegments: number;
  activePromotions: number;
  revenueGrowth: number;
}
