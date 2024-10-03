/// <reference path="./.sst/platform/config.d.ts" />
 

export default $config({
    app(input) {
        return {
            name: 'sync-website', // use whatever your project is called here
            removal: input?.stage === 'production' ? 'retain' : 'remove',
            home: 'aws',
            providers: {
                aws: {
                    profile: "sync-dev",
                    region: "us-east-1",
                },
            }
          };
    },
    async run(){
        new sst.aws.Nextjs('MyWeb', {
            domain: {
                name: "getsync.tech",
                redirects: ["welcome.getsync.tech"]
            }
          });
    },
})