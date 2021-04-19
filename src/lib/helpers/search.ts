export function search(target: Record<string, unknown>[], key: string, q: string): Record<string, unknown>[] {
    return [...target].filter((item) => {
        const value = (item[key] as string).toLowerCase();

        return value.includes(q.toLowerCase())
    });
}