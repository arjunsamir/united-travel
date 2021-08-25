import React from 'react';

const copy = {
    en: "We're having trouble loading this application. Please try again later.",
    es: "Tenemos problemas para cargar esta aplicación. Por favor, inténtelo de nuevo más tarde."
}

const Oppsie = () => {

    return (
        <section className="oopsie">
            <img src="/img/oopsie.svg" alt="Oopsie" />
            <h3>{copy[window.locale] || copy.en}</h3>
        </section>
    )

}

export default Oppsie;