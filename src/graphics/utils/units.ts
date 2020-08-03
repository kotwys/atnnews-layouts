/**
 * Convert pixels to relative units
 * @param total - total size
 * @param value - value to convert
 */
export function toRelative(total: number, value: number): number {
    return (value / total) * 100;
}

/**
 * Convert relative units to pixels
 * @param total - total size
 * @param value - value to convert
 */
export function fromRelative(total: number, value: number): number {
    return total * (value / 100);
}
