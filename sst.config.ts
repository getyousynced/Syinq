/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
  app(input) {
    return {
      name: "SyniqWebsite",
      removal: input?.stage === "production" ? "retain" : "remove",
      home: "aws",
      providers: {
        aws: {
          profile: "sync-dev",
          region: "ap-south-1",
        },
      },
    };
  },
  async run() {
    new sst.aws.Nextjs("SyinqWebsite", {
      domain: {
        name: "syinq.live",
        dns: sst.aws.dns({
          zone: "Z0665679EQ3G18FN222C",
        }),
      },
    });
  },
});
