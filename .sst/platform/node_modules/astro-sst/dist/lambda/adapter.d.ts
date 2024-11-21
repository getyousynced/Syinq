import type { AstroIntegration } from "astro";
import type { ResponseMode } from "../lib/types.js";
export default function createIntegration({ responseMode, serverRoutes, }?: {
    responseMode?: ResponseMode;
    serverRoutes?: string[];
}): AstroIntegration;
