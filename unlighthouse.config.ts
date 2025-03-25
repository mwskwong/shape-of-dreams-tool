const config = {
  site: process.env.DEPLOYMENT_URL,
  cache: false,
  ci: {
    reporter: "jsonExpanded",
    buildStatic: true,
    budget: {
      performance: 70,
      accessibility: 100,
      "best-practices": 100,
      seo: 60, // minus point from non-PROD not being indexable
    },
  },
  extraHeaders: {
    "x-vercel-protection-bypass": process.env.VERCEL_AUTOMATION_BYPASS_SECRET,
  },
  scanner: {
    samples: 3,
  },
  lighthouseOptions: {
    throttling: {
      cpuSlowdownMultiplier: 8.6, // matches GitHub Action Ubuntu performance
    },
  },
  puppeteerClusterOptions: {
    maxConcurrency: 1,
  },
};

export default config;
