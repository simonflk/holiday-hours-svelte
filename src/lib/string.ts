export function plural(count = 0, singular = '', plural: string = singular + 's') : string {
    return count === 1 ? singular : plural
}
