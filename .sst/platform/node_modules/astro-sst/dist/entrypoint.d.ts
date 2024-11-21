import type { SSRManifest } from "astro";
import type { APIGatewayProxyEventV2, CloudFrontRequestEvent } from "aws-lambda";
import type { RequestHandler, ResponseMode, ResponseStream } from "./lib/types";
declare global {
    const awslambda: {
        streamifyResponse(handler: RequestHandler): RequestHandler;
        HttpResponseStream: {
            from(underlyingStream: ResponseStream, metadata: {
                statusCode: number;
                headers?: Record<string, string>;
            }): ResponseStream;
        };
    };
}
export declare function createExports(manifest: SSRManifest, { responseMode }: {
    responseMode: ResponseMode;
}): {
    handler: RequestHandler | ((event: APIGatewayProxyEventV2 | CloudFrontRequestEvent) => Promise<string | void | import("aws-lambda").CloudFrontRequest | import("aws-lambda").APIGatewayProxyStructuredResultV2 | import("aws-lambda").APIGatewayProxyResult | import("aws-lambda").CloudFrontResultResponse | null>);
};
export declare function streamError(statusCode: number, error: string | Error, responseStream: ResponseStream): void;
