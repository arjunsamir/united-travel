// Import Node Modules
const path_module = require('path');
const fs = require('fs').promises;

// Import 3rd Party Modules
const chokidar = require('chokidar');
const ejs = require('ejs');

// Compile Languages
const bundleLocale = async (template) => {

    const base = './client/views/src/locale';

    const path = {
        main: `${base}/templates/${template}`,
        common: `${base}/common`
    }

    const files = {
        includes: `${path.main}/${template}.includes.json`,
        en: `${path.main}/${template}.en.json`,
        es: `${path.main}/${template}.es.json`
    }

    const includes = JSON.parse(await fs.readFile(files.includes, 'utf8'));

    const compileBundle = async (lang) => {

        const copy = JSON.parse(await fs.readFile(files[lang], 'utf8'));
        const components = {};

        await Promise.all(includes.map(async component => {

            const c = await fs.readFile(`${path.common}/${component}.${lang}.json`, 'utf8');

            components[component] = JSON.parse(c);

        }));

        return { lang, ...copy, components, path: lang === 'en' ? '' : '/' + lang }
    }


    return {
        en: await compileBundle('en'),
        es: await compileBundle('es')
    }

}

const bulkReplace = (str, ...items) => {
    let replaced = str;

    items.forEach(item => {
        replaced = replaced.replaceAll(item[0], item[1]);
    });

    return replaced;
}


// Generate Static Files For Each View
const generateStaticFiles = async (view) => {

    // Define Base Path
    const base = './client/views';

    // Get the template
    const file = `${base}/src/templates/${view}.ejs`

    // Bundle Locales
    const data = await bundleLocale(view);

    const render = (lang) => {

        return new Promise(resolve => {

            ejs.renderFile(file, data[lang], (err, html) => {

                // const output = html.replaceAll('{{', '<%-').replaceAll('}}', '%>');
                const output = bulkReplace(html, ['{{', '<%-'], ['}}', '%>'], ['{%', '<%'], ['%}', '%>']);

                const filename = path_module.join(__dirname, `${base}/static/${lang}/${view}.ejs`);

                fs.writeFile(filename, output, 'utf8').then(resolve);

            })

        })

    }

    await render('en');
    await render('es');

}

const watchStaticFiles = () => {
    return Promise.all(['home', 'about', 'fleet', 'login', 'book', 'account', 'reservation'].map(generateStaticFiles)).then(() => {
        console.log('Rebuilt Static Files 🔥')
    }).catch(err => process.exit());
}


if (process.env.EJS_GEN_MODE == 'watch') {
    watchStaticFiles().then(() => {
        chokidar.watch('./client/views/src').on('change', watchStaticFiles);
    });
}

else watchStaticFiles().then(() => process.exit());