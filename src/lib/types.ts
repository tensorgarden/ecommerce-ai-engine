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

export interface PriceOptimization {
  productId: string;
  currentPrice: number;
  recommendedPrice: number;
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
