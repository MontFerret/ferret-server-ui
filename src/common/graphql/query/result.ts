import { Entity } from '../../../models/api/model/entity';

export interface QueryResultDataList<T extends Entity> {
    entities: T[];
}

export interface QueryResultData<T extends Entity> {
    entity: T;
}
