import { type SchemaTypeDefinition } from 'sanity'
import waitlistEntry from './waitlistEntry'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [waitlistEntry],
}
