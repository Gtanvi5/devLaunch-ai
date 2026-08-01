export const plans = [
  {
    name: "Starter",
    description:
      "Perfect for indie hackers and solo founders validating their first idea.",
    price: {
      monthly: 19,
      annual: 15,
    },
    features: [
      "5 Validation Reports per month",
      "Standard AI Agents (Marketer & Dev)",
      "Basic PDF Exports",
      "Community Discord Support",
    ],
    buttonText: "Start for free",
    buttonVariant: "outline",
    popular: false,
  },
  {
    name: "Pro",
    description:
      "For serious founders and teams shipping multiple products a year.",
    price: {
      monthly: 49,
      annual: 39,
    },
    features: [
      "Unlimited Validation Reports",
      "Advanced Multi-Agent Engine (Investor)",
      "Custom API Access",
      "Priority Email Support",
      "Custom Tech Stack Rules",
    ],
    buttonText: "Upgrade to Pro",
    buttonVariant: "solid",
    popular: true,
  },
  {
    name: "Enterprise",
    description:
      "For incubators, VCs, and agencies needing high-volume validation.",
    price: {
      monthly: 199,
      annual: 159,
    },
    features: [
      "Everything in Pro",
      "Dedicated Account Manager",
      "Custom AI Personality Training",
      "Automated Webhooks",
      "99.9% Uptime SLA",
    ],
    buttonText: "Contact Sales",
    buttonVariant: "outline",
    popular: false,
  },
];

export const comparisonFeatures = [
  {
    category: "Core Features",
    items: [
      {
        name: "Validation Reports",
        starter: "5 / month",
        pro: "Unlimited",
        enterprise: "Unlimited",
      },
      {
        name: "Custom Tech Stack Rules",
        starter: false,
        pro: true,
        enterprise: true,
      },
      {
        name: "Team Members",
        starter: "1",
        pro: "Up to 5",
        enterprise: "Unlimited",
      },
    ],
  },
  {
    category: "AI Engine",
    items: [
      {
        name: "Marketer & Developer Agents",
        starter: true,
        pro: true,
        enterprise: true,
      },
      { name: "Investor Agent", starter: false, pro: true, enterprise: true },
      {
        name: "Custom AI Personality",
        starter: false,
        pro: false,
        enterprise: true,
      },
    ],
  },
  {
    category: "Export & Integrations",
    items: [
      { name: "Basic PDF Export", starter: true, pro: true, enterprise: true },
      {
        name: "Advanced Pitch Deck PDF",
        starter: false,
        pro: true,
        enterprise: true,
      },
      { name: "API Access", starter: false, pro: true, enterprise: true },
      {
        name: "Automated Webhooks",
        starter: false,
        pro: false,
        enterprise: true,
      },
    ],
  },
  {
    category: "Support",
    items: [
      { name: "Community Discord", starter: true, pro: true, enterprise: true },
      { name: "Priority Email", starter: false, pro: true, enterprise: true },
      {
        name: "Dedicated Account Manager",
        starter: false,
        pro: false,
        enterprise: true,
      },
    ],
  },
];
