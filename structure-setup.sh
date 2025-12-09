#!/bin/bash

# Create directories and files for components
mkdir -p src/components/styles

touch src/components/App.jsx
touch src/components/Main.jsx
touch src/components/StepNavigation.jsx
touch src/components/ProgressBar.jsx
touch src/components/Hero.jsx
touch src/components/StatsBar.jsx
touch src/components/FeaturesGrid.jsx
touch src/components/HowItWorks.jsx
touch src/components/CloudflarePartnership.jsx
touch src/components/DemoSection.jsx
touch src/components/PricingCards.jsx
touch src/components/Footer.jsx

touch src/components/styles/App.scss
touch src/components/styles/Main.scss
touch src/components/styles/StepNavigation.scss
touch src/components/styles/ProgressBar.scss
touch src/components/styles/Hero.scss
touch src/components/styles/StatsBar.scss
touch src/components/styles/FeaturesGrid.scss
touch src/components/styles/HowItWorks.scss
touch src/components/styles/CloudflarePartnership.scss
touch src/components/styles/DemoSection.scss
touch src/components/styles/PricingCards.scss
touch src/components/styles/Footer.scss

# Create directories and files for steps
mkdir -p src/steps/concept/styles
mkdir -p src/steps/structure/styles
mkdir -p src/steps/name/styles
mkdir -p src/steps/registration/styles
mkdir -p src/steps/financing/styles
mkdir -p src/steps/marketing/styles
mkdir -p src/steps/domain/styles

touch src/steps/concept/index.tsx
touch src/steps/concept/Quiz.tsx
touch src/steps/concept/MarketGapAnalysis.tsx
touch src/steps/concept/SuccessStories.tsx
touch src/steps/concept/TrendAnalysis.tsx
touch src/steps/concept/FinancialProjections.tsx
touch src/steps/concept/Networking.tsx
touch src/steps/concept/ExpertAdvice.tsx
touch src/steps/concept/ResourceLibrary.tsx
touch src/steps/concept/LegalGuidance.tsx
touch src/steps/concept/PersonalizedRecommendations.tsx

touch src/steps/concept/styles/index.scss
touch src/steps/concept/styles/Quiz.scss
touch src/steps/concept/styles/MarketGapAnalysis.scss
touch src/steps/concept/styles/SuccessStories.scss
touch src/steps/concept/styles/TrendAnalysis.scss
touch src/steps/concept/styles/FinancialProjections.scss
touch src/steps/concept/styles/Networking.scss
touch src/steps/concept/styles/ExpertAdvice.scss
touch src/steps/concept/styles/ResourceLibrary.scss
touch src/steps/concept/styles/LegalGuidance.scss
touch src/steps/concept/styles/PersonalizedRecommendations.scss

touch src/steps/structure/index.tsx
touch src/steps/structure/LegalStructure.tsx
touch src/steps/structure/ProsCons.tsx
touch src/steps/structure/CostComparison.tsx

touch src/steps/structure/styles/index.scss
touch src/steps/structure/styles/LegalStructure.scss
touch src/steps/structure/styles/ProsCons.scss
touch src/steps/structure/styles/CostComparison.scss

touch src/steps/name/index.tsx
touch src/steps/name/NameIdeas.tsx
touch src/steps/name/NameCheck.tsx
touch src/steps/name/TrademarkCheck.tsx

touch src/steps/name/styles/index.scss
touch src/steps/name/styles/NameIdeas.scss
touch src/steps/name/styles/NameCheck.scss
touch src/steps/name/styles/TrademarkCheck.scss

touch src/steps/registration/index.tsx
touch src/steps/registration/RegistrationForm.tsx
touch src/steps/registration/ComplianceCheck.tsx
touch src/steps/registration/StateComparison.tsx

touch src/steps/registration/styles/index.scss
touch src/steps/registration/styles/RegistrationForm.scss
touch src/steps/registration/styles/ComplianceCheck.scss
touch src/steps/registration/styles/StateComparison.scss

touch src/steps/financing/index.tsx
touch src/steps/financing/FundingOptions.tsx
touch src/steps/financing/FinancialPlanning.tsx
touch src/steps/financing/LoanCalculator.tsx

touch src/steps/financing/styles/index.scss
touch src/steps/financing/styles/FundingOptions.scss
touch src/steps/financing/styles/FinancialPlanning.scss
touch src/steps/financing/styles/LoanCalculator.scss

touch src/steps/marketing/index.tsx
touch src/steps/marketing/MarketingStrategy.tsx
touch src/steps/marketing/Branding.tsx
touch src/steps/marketing/OnlinePresence.tsx

touch src/steps/marketing/styles/index.scss
touch src/steps/marketing/styles/MarketingStrategy.scss
touch src/steps/marketing/styles/Branding.scss
touch src/steps/marketing/styles/OnlinePresence.scss

touch src/steps/domain/index.tsx
touch src/steps/domain/DomainRegistration.tsx
touch src/steps/domain/WebsiteSetup.tsx
touch src/steps/domain/DNSConfiguration.tsx

touch src/steps/domain/styles/index.scss
touch src/steps/domain/styles/DomainRegistration.scss
touch src/steps/domain/styles/WebsiteSetup.scss
touch src/steps/domain/styles/DNSConfiguration.scss

# Create directories and files for styles
mkdir -p src/styles

touch src/styles/StepNavigation.scss
touch src/styles/ProgressBar.scss
touch src/styles/Hero.scss
touch src/styles/StatsBar.scss
touch src/styles/FeaturesGrid.scss
touch src/styles/HowItWorks.scss
touch src/styles/CloudflarePartnership.scss
touch src/styles/DemoSection.scss
touch src/styles/PricingCards.scss
touch src/styles/Footer.scss

# Create directories and files for assets
mkdir -p src/assets

touch src/assets/logo.png
touch src/assets/favicon.ico
touch src/assets/manifest.webmanifest

# Create root files
touch index.html
touch sw.js
touch manifest.webmanifest
touch vite.config.js
touch wrangler.toml

echo "Structure created successfully!"
