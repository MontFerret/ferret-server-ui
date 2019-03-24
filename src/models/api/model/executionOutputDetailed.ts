/**
 * Ferret Server API
 * API of Ferret Server
 *
 * OpenAPI spec version: 0.1
 * Contact: ziflex@gmail.com
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */
import { ExecutionCause } from './executionCause';
import { ExecutionOutput } from './executionOutput';
import { ExecutionStatus } from './executionStatus';

/**
 * The properties that are included when fetching a single Execution.
 */
export interface ExecutionOutputDetailed {
    jobId: string;
    scriptId: string;
    scriptRev: string;
    status: ExecutionStatus;
    cause: ExecutionCause;
    params?: { [key: string]: any; };
    startedAt?: string;
    endedAt?: string;
    logs?: string[];
    error?: string;
}
