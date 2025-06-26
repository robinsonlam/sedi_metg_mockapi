import { createServer } from '@mswjs/http-middleware';
import { handlers } from './handlers.ts'
 
export const server = createServer(...handlers)