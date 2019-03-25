/**
 * Ferret Server API
 * API of Ferret Server
 *
 * OpenAPI spec version: 1.0.0-rc.1
 * Contact: mont.ferret@gmail.com
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */
import { DataCommon } from './dataCommon';
import { Entity } from './entity';

export interface DataEntity {
    id: string;
    rev: string;
    createdAt: string;
    updatedAt?: string;
    jobId: string;
    scriptId: string;
    scriptRev: string;
    value: any;
}
