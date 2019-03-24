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
import { Entity } from './entity';

/**
 * The properties that are included when fetching a list of Scripts.
 */
export interface ScriptOutput {
    id: string;
    rev: string;
    createdAt: string;
    updatedAt?: string;
    name: string;
}
