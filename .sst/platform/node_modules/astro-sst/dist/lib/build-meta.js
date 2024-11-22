import { join, relative } from "path";
import { writeFile } from "fs/promises";
import { fileURLToPath, parse } from "url";
export const BUILD_META_FILE_NAME = "sst.buildMeta.json";
export class BuildMeta {
    static setIntegrationConfig(config) {
        this.integrationConfig = config;
    }
    static setAstroConfig(config) {
        this.astroConfig = config;
    }
    static getRedirectPath({ segments }, trailingSlash) {
        let i = 0;
        return ("/" +
            segments
                .map((segment) => segment
                .map((part) => (part.dynamic ? `\${${++i}}` : part.content))
                .join(""))
                .join("/") +
            (trailingSlash === "always" ? "/" : "")).replace(/\/+/g, "/");
    }
    static setBuildResults(buildResults) {
        this.buildResults = buildResults;
    }
    static get domainName() {
        if (typeof this.astroConfig.site === "string" &&
            this.astroConfig.site.length > 0) {
            return parse(this.astroConfig.site).hostname ?? undefined;
        }
    }
    static getSerializableRoute(route, trailingSlash, outputMode) {
        const isStatic = outputMode === "static";
        return {
            route: route.route + (trailingSlash === "always" ? "/" : ""),
            type: route.type,
            pattern: route.pattern.toString(),
            prerender: route.type !== "redirect" ? isStatic || route.prerender : undefined,
            redirectPath: typeof route.redirectRoute !== "undefined"
                ? BuildMeta.getRedirectPath(route.redirectRoute, trailingSlash)
                : typeof route.redirect === "string"
                    ? route.redirect
                    : route.redirect?.destination,
            redirectStatus: typeof route.redirect === "object" ? route.redirect.status : undefined,
        };
    }
    static getTrailingSlashRedirect(route, trailingSlash) {
        if (trailingSlash === "never") {
            return {
                route: route.route + "/",
                type: "redirect",
                pattern: route.pattern.toString().replace(/\$\/$/, "\\/$/"),
                redirectPath: BuildMeta.getRedirectPath(route, trailingSlash),
            };
        }
        return {
            route: route.route.replace(/\/$/, ""),
            type: "redirect",
            pattern: route.pattern.toString().replace(/\\\/\$\/$/, "$/"),
            redirectPath: BuildMeta.getRedirectPath(route, trailingSlash),
        };
    }
    static async exportBuildMeta(buildExportName = BUILD_META_FILE_NAME) {
        const rootDir = fileURLToPath(this.astroConfig.root);
        const outputPath = join(relative(rootDir, fileURLToPath(this.astroConfig.outDir)), buildExportName);
        const routes = this.buildResults.routes
            .map((route) => {
            const routeSet = [
                this.getSerializableRoute(route, this.astroConfig.trailingSlash, this.astroConfig.output),
            ];
            if (route.type === "page" && route.route !== "/") {
                if (this.astroConfig.trailingSlash === "never") {
                    routeSet.unshift(this.getTrailingSlashRedirect(route, this.astroConfig.trailingSlash));
                }
                else if (this.astroConfig.trailingSlash === "always") {
                    routeSet.push(this.getTrailingSlashRedirect(route, this.astroConfig.trailingSlash));
                }
            }
            return routeSet;
        })
            .flat();
        if (this.astroConfig.output === "static") {
            const lastAssetIndex = routes.reduce((acc, { route }, index) => route.startsWith(`/${this.astroConfig.build.assets}`) ? index : acc, -1);
            routes.splice(lastAssetIndex + 1, 0, {
                route: `/${this.astroConfig.build.assets}/[...slug]`,
                type: "endpoint",
                pattern: `/^\\/${this.astroConfig.build.assets}\\/.*?\\/?$/`,
                prerender: true,
            });
        }
        const buildMeta = {
            domainName: this.domainName ?? undefined,
            deploymentStrategy: this.integrationConfig.deploymentStrategy,
            responseMode: this.integrationConfig.responseMode,
            outputMode: this.astroConfig.output,
            pageResolution: this.astroConfig.build.format,
            trailingSlash: this.astroConfig.trailingSlash,
            serverBuildOutputFile: join(relative(rootDir, fileURLToPath(this.astroConfig.build.server)), this.astroConfig.build.serverEntry),
            clientBuildOutputDir: relative(rootDir, fileURLToPath(this.astroConfig.build.client)),
            clientBuildVersionedSubDir: this.astroConfig.build.assets,
            routes,
            serverRoutes: this.integrationConfig.serverRoutes,
        };
        /**
         * For some reason the Astro integration system sets the following values
         * as if the site was configured for server deployment even when it's
         * actually configured for static. For this reason, we need to override these
         * values as best we can.
         **/
        if (this.astroConfig.output === "static") {
            buildMeta.clientBuildOutputDir = join(buildMeta.clientBuildOutputDir, "../");
        }
        await writeFile(outputPath, JSON.stringify(buildMeta));
    }
}
