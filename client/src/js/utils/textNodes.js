const createTextNode = tag => {
    return (content, className) => {
        if (!content) return ''
        return `<${tag}${className ? ` class="${className}"` : ''}>${content}</${tag}>`
    }
}

export const h1 = createTextNode('h1');
export const h2 = createTextNode('h2');
export const h3 = createTextNode('h3');
export const h4 = createTextNode('h4');
export const h5 = createTextNode('h5');
export const h6 = createTextNode('h6');
export const p = createTextNode('p');