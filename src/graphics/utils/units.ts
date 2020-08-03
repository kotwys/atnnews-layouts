/**
 * Convert px units to vh
 * @param screenHeight - height of the screen
 * @param value - value to convert
 */
export function px2vh(screenHeight: number, value: number): number {
    return (value / screenHeight) * 100;
}

/**
 * Convert vh units to px
 * @param screenHeight - height of the screen
 * @param value - value to convert
 */
export function vh2px(screenHeight: number, value: number): number {
    return screenHeight * (value / 100);
}
