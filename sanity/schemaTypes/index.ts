import { type SchemaTypeDefinition } from 'sanity'
import waitlistEntry from './waitlistEntry'
import project from './project'
import contactEntry from './contactEntry'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [waitlistEntry, project, contactEntry],
}
