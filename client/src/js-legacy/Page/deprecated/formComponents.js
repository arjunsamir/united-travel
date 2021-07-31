const generate = {};


// CREATE OPTIONS
const createOption = (opt, type, name, data) => {
    return `
        <label class="select-tile">
            <input type="${type}" name="${name}" value="${opt.value}"${data == opt.value ? ' checked' : ''}>
            <div class="select-tile__container">
                <h4 class="select-tile__title">${opt.title}</h4>
                <p class="select-tile__text">${opt.text || ''}</p>
            </div>
        </label>
    `
}

generate.options = (opts, type, name, data) => {
    return `
        <div class="booking-card__options">
            ${opts.map(opt => createOption(opt, type, name, data)).join('')}
        </div>
    `
}


generate.select = (opts, name, data) => {
    return `
        <div class="dropdown">
            <select class="dropdown__select" name="${name}">
                <option>Please Select</option>
                ${opts.map(opt => `<option value="${opt.value}"${data == opt.value ? ' selected' : ''}>${opt.text}</option>`).join('')}
            </select>
            <svg><use xlink:href="img/icons.svg#carat-right"></use></svg>
        </div>
    `
}


generate.dateTime = (isMobile, time) => {


    return `
        <div class="input date-time">

            <label class="input__field" data-type="name" data-required>
                ${isMobile ? `<input type="date" min="${(new Date()).toISOString().split('T')[0]}">` : '<div class="input__date"><p>Jun 23, 2020</p>/div>'}
                <h6>Date</h6>
            </label>
            
            <label class="input__field" data-type="email" data-required>
                <input type="time">
                <h6>Time</h6>
            </label>

        </div>
    `

}


// Export Options 
export default generate;