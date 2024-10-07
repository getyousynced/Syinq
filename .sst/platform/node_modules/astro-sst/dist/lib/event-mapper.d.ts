/// <reference types="node" />
import type { APIGatewayProxyEventV2, APIGatewayProxyEvent, APIGatewayProxyResult, CloudFrontRequestEvent } from "aws-lambda";
import type { ResponseStream } from "./types";
export type InternalEvent = {
    readonly type: "v1" | "v2" | "cf";
    readonly method: string;
    readonly queryString: string;
    readonly rawPath: string;
    readonly url: string;
    readonly body: Buffer;
    readonly headers: Record<string, string>;
    readonly remoteAddress: string;
};
type InternalResultInput = {
    readonly type: "v1" | "v2" | "cf";
    response: Response;
    responseStream?: ResponseStream;
    cookies?: string[];
};
export declare function convertFrom(event: APIGatewayProxyEventV2 | APIGatewayProxyEvent | CloudFrontRequestEvent): {
    url: string;
    type: "v1" | "v2" | "cf";
    method: string;
    queryString: string;
    rawPath: string;
    body: Buffer;
    headers: Record<string, string>;
    remoteAddress: string;
};
export declare function convertTo({ type, response, responseStream, cookies: appCookies, }: InternalResultInput): Promise<string | void | import("aws-lambda").CloudFrontRequest | import("aws-lambda").APIGatewayProxyStructuredResultV2 | APIGatewayProxyResult | import("aws-lambda").CloudFrontResultResponse | null>;
export {};
