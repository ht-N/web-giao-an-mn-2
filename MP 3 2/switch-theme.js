#!/usr/bin/env node

/**
 * Theme Switcher Script
 * Usage: node switch-theme.js [green|blue-sky]
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const THEMES = {
    'green': {
        name: 'Green Nature',
        primary: {
            50: '#f0fdf4',
            100: '#dcfce7',
            200: '#bbf7d0',
            300: '#86efac',
            400: '#4ade80',
            500: '#22c55e',
            600: '#16a34a',
            700: '#15803d',
            800: '#166534',
            900: '#14532d',
            950: '#052e16',
        }
    },
    'blue-sky': {
        name: 'Blue Sky',
        primary: {
            50: '#eff6ff',
            100: '#dbeafe',
            200: '#bfdbfe',
            300: '#93c5fd',
            400: '#60a5fa',
            500: '#3b82f6',
            600: '#2563eb',
            700: '#1d4ed8',
            800: '#1e40af',
            900: '#1e3a8a',
            950: '#172554',
        }
    }
}

const themeName = process.argv[2]

if (!themeName || !THEMES[themeName]) {
    console.error('❌ Invalid theme name!')
    console.log('Usage: node switch-theme.js [green|blue-sky]')
    console.log('Available themes:', Object.keys(THEMES).join(', '))
    process.exit(1)
}

const theme = THEMES[themeName]

// Update theme.js
const themeConfigPath = path.join(__dirname, 'src/config/theme.js')
let themeConfig = fs.readFileSync(themeConfigPath, 'utf8')
const activeThemeValue = themeName === 'green' ? 'THEMES.GREEN' : 'THEMES.BLUE_SKY'
themeConfig = themeConfig.replace(
    /export const ACTIVE_THEME = .*/,
    `export const ACTIVE_THEME = ${activeThemeValue}`
)
fs.writeFileSync(themeConfigPath, themeConfig)

// Update tailwind.config.js
const tailwindConfigPath = path.join(__dirname, 'tailwind.config.js')
let tailwindConfig = fs.readFileSync(tailwindConfigPath, 'utf8')

const primaryColorBlock = `primary: ${JSON.stringify(theme.primary, null, 10).replace(/"([^"]+)":/g, '$1:')},`

tailwindConfig = tailwindConfig.replace(
    /primary: \{[^}]+\},/s,
    primaryColorBlock
)

fs.writeFileSync(tailwindConfigPath, tailwindConfig)

console.log(`✅ Successfully switched to ${theme.name} theme!`)
console.log('🔄 Restart your dev server to see the changes.')
