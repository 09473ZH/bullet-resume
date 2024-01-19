// uno.config.ts
import {
    defineConfig,
    presetAttributify,
    presetIcons,
    presetTypography,
    presetUno,
    presetWebFonts,
    transformerDirectives,
    transformerVariantGroup,
} from 'unocss'

export default defineConfig({
    shortcuts: [
        {'item-title': 'border-solid border-0 border-l-5  p0.5 px-2 bg-gray-100'}
    ],
    theme: {
        breakpoints: {
            xxs: '0px',
            xs: '320px',
            sm: '480px',
            md: '768px',
            lg: '1024px',
            xl: '1280px',
            xxl: '1600px',
        },
        colors: {
            // ...
        },
    },
    presets: [
        presetUno(),
        presetAttributify(),
        presetIcons(),
        presetTypography(),
        presetWebFonts({
            fonts: {
                sans: 'Roboto',
                mono: ['Fira Code', 'Fira Mono:400,700'],
            },
        }),
    ],
    transformers: [transformerDirectives(), transformerVariantGroup()],
})
