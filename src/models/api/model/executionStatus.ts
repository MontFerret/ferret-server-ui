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

/**
 * Execution stats
 */
export type ExecutionStatus = 'unknown' | 'queued' | 'running' | 'completed' | 'cancelled' | 'errored';

export const ExecutionStatus = {
    Unknown: 'unknown' as ExecutionStatus,
    Queued: 'queued' as ExecutionStatus,
    Running: 'running' as ExecutionStatus,
    Completed: 'completed' as ExecutionStatus,
    Cancelled: 'cancelled' as ExecutionStatus,
    Errored: 'errored' as ExecutionStatus,
};
