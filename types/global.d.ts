import * as $utils from './src/utils'

declare global {
  // export function get(input: RequestInfo | URL, init?: RequestInit | undefined): Promise<Response>;
  // export function post(input: RequestInfo | URL, init?: RequestInit | undefined): Promise<Response>;
  const $utils: typeof $utils;
}