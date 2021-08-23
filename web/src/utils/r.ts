export const r = (strings, ...args) => {
    if(args.every(a => a)){
        let result = strings[0];
        for (let i = 0; i < args.length; ++i) {
            result += args[i] + strings[i + 1];
        }
        return result
    }
    return null
}