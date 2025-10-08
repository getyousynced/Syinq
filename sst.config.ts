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
        name: "syinq.com",
        dns: sst.aws.dns({
          zone: "Z06181831OF6LPR0FXMIV",
        }),
        cert: "arn:aws:acm:us-east-1:831926620158:certificate/41abc802-e907-48df-a68d-f1edfbbaa3c2",
      },
    });
  },
});
