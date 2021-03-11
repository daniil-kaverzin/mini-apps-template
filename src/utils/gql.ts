import { APIError } from '../types';
import { isApolloError } from 'apollo-client';

export function isAPIError(e: any): e is APIError {
  return isApolloError(e);
}
