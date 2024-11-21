import type { AstroConfig, RouteData, RouteType } from "astro";
import type { DeploymentStrategy, OutputMode, PageResolution, ResponseMode, TrailingSlash } from "./types";
export type BuildMetaFileName = "sst.buildMeta.json";
export declare const BUILD_META_FILE_NAME: BuildMetaFileName;
type BuildResults = {
    pages: {
        pathname: string;
    }[];
    dir: URL;
    routes: RouteData[];
};
export type BuildMetaConfig = {
    domainName?: string;
    deploymentStrategy: DeploymentStrategy;
    responseMode: ResponseMode;
    outputMode: OutputMode;
    pageResolution: PageResolution;
    trailingSlash: TrailingSlash;
    serverBuildOutputFile: string;
    clientBuildOutputDir: string;
    clientBuildVersionedSubDir: string;
    serverRoutes: string[];
    routes: Array<{
        route: string;
        type: RouteType;
        pattern: string;
        prerender?: boolean;
        redirectPath?: string;
        redirectStatus?: 300 | 301 | 302 | 303 | 304 | 307 | 308;
    }>;
};
export type IntegrationConfig = {
    deploymentStrategy: DeploymentStrategy;
    responseMode: ResponseMode;
    serverRoutes: string[];
};
export declare class BuildMeta {
    protected static integrationConfig: IntegrationConfig;
    protected static astroConfig: AstroConfig;
    protected static buildResults: BuildResults;
    static setIntegrationConfig(config: IntegrationConfig): void;
    static setAstroConfig(config: AstroConfig): void;
    private static getRedirectPath;
    static setBuildResults(buildResults: BuildResults): void;
    private static get domainName();
    private static getSerializableRoute;
    private static getTrailingSlashRedirect;
    static exportBuildMeta(buildExportName?: "sst.buildMeta.json"): Promise<void>;
}
export {};
