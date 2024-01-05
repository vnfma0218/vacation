import { type SchemaTypeDefinition } from 'sanity';

import blockContent from './schemas/blockContent';
import category from './schemas/category';
import post from './schemas/post';
import author from './schemas/author';
import location from './schemas/location';
import hotel from './schemas/hotel';
import reservation from './schemas/reservation';

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [post, author, category, blockContent, location, hotel, reservation],
};
