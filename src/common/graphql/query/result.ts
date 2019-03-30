import { Entity } from '../../../models/api/model/entity';

export interface QueryResultData<T extends Entity> {
    entity: T;
}
