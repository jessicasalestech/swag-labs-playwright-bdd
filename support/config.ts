import 'dotenv/config';

/**
 * Leitura segura de variáveis de ambiente com fallback.
 * Números/credenciais reais nunca são versionados — vêm de .env / secrets de CI.
 */
const env = (key: string, fallback: string): string => process.env[key] ?? fallback;

export const BASE_URL = env('BASE_URL', 'https://www.saucedemo.com');

export const STANDARD_USER = env('STANDARD_USER', 'standard_user');
export const LOCKED_USER = env('LOCKED_USER', 'locked_out_user');
export const PROBLEM_USER = env('PROBLEM_USER', 'problem_user');

export const PASSWORD = env('PASSWORD', 'secret_sauce');

export const FIRST_NAME = env('FIRST_NAME', 'Jessica');
export const LAST_NAME = env('LAST_NAME', 'Sales');
export const POSTAL_CODE = env('POSTAL_CODE', '00000000');

export const DEFAULT_PRICE_SORT = 'Price (low to high)';