# Ecommerce AI Engine

Enterprise-grade AI engine for pricing optimization, inventory intelligence, customer segmentation, and revenue analytics. Designed for high-scale ecommerce operations.

## Features

- **Pricing Optimization** -- ML-driven price recommendations with elasticity analysis, competitor benchmarking, and revenue impact projections
- **Inventory Intelligence** -- Real-time stock monitoring, demand forecasting, stockout risk alerts, and automated reorder suggestions
- **Customer Segmentation** -- 6-segment behavioral model (VIP, Loyal, At-Risk, New, Dormant, Bargain Hunters) with ARPU and LTV tracking
- **Promotion Effectiveness** -- Campaign ROI tracking with budget utilization, revenue attribution, and order influence metrics
- **Revenue Analytics** -- Comprehensive KPIs including gross margin, CAC, LTV:CAC ratio, churn rate, and conversion tracking

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript 5.7 |
| Styling | Tailwind CSS 3.4 |
| Testing | Vitest 4 |
| Database | Supabase (optional) |
| E2E | Playwright |

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the dashboard.

## Project Structure

```
src/
  app/
    layout.tsx          # Root layout with header
    page.tsx            # Dashboard page (hero stats, product grid, segments, etc.)
    globals.css         # Tailwind + global styles
  components/
    ui.tsx              # Reusable UI primitives (Badge, Card, ProgressBar, StatusDot, StatCard)
  lib/
    types.ts            # TypeScript interfaces for all domain models
    demo-data.ts        # 20 products, price optimizations, inventory forecasts, segments, revenue metrics, promotions
tests/
  ecommerce.test.ts     # 20 Vitest unit tests covering all data modules
```

## Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Production build |
| `npm test` | Run Vitest test suite |
| `npm run typecheck` | TypeScript type checking |
| `npm run lint` | ESLint (max warnings 0) |

## Domain Model

### Product
Core product entity with SKU, pricing (current, cost, margin), sales volume, and inventory levels.

### PriceOptimization
ML-driven price recommendations with confidence scores, elasticity modeling, competitor benchmarking, and projected revenue/margin impact.

### InventoryForecast
Demand-driven inventory projections with daily demand averages, days-of-stock calculations, stockout risk levels, reorder quantities, and seasonal factors.

### CustomerSegment
Behavioral segmentation with customer counts, average order values, ARPU, lifetime value, churn risk, and growth trajectories.

### RevenueMetrics
Aggregate business KPIs covering total revenue, growth rate, gross margin, net profit, AOV, conversion rate, CAC, CLTV, active customers, and churn.

### Promotion
Campaign tracking with discount types (percentage, fixed amount, BOGO, free shipping, bundle), budget utilization, revenue attribution, and ROI calculation.

## License

Proprietary. All rights reserved.
