export function formatNumber(value: number | undefined) {
    if(value) {
        if (value >= 1_000_000) {
            return (value / 1_000_000).toFixed(1).replace(/\.0$/, '') + 'M';
        } else if (value >= 1_000) {
            return (value / 1_000).toFixed(1).replace(/\.0$/, '') + 'k';
        }
        return value.toString();
    }
    return value
}