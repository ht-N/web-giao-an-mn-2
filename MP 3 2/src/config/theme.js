export const THEMES = {
    GREEN: 'green',
    BLUE_SKY: 'blue-sky'
}

export const ACTIVE_THEME = THEMES.GREEN

export const themeConfig = {
    [THEMES.GREEN]: {
        name: 'Green Nature',
        description: 'Màu xanh lá tự nhiên - phù hợp với chủ đề hóa học và môi trường',
        primary: 'primary',
        background: 'slate'
    },
    [THEMES.BLUE_SKY]: {
        name: 'Blue Sky',
        description: 'Màu xanh da trời nhẹ nhàng - tạo cảm giác khoa học và chuyên nghiệp',
        primary: 'secondary',
        background: 'slate'
    }
}

export const getCurrentTheme = () => themeConfig[ACTIVE_THEME]
