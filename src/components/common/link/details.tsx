import React from 'react';
import { Link } from 'react-router-dom';
import { Entity } from '../../../models/api/model/entity';

export const LinkToDetails = (url: string, text: string, entity: Entity) => (
    <Link to={`${url}/${entity.id}`}>{text}</Link>
);
