import React from 'react';

const localCopy = {
    en: "We're having trouble loading this application. Please try again later.",
    es: "Tenemos problemas para cargar esta aplicación. Por favor, inténtelo de nuevo más tarde."
}

const Oppsie = ({ copy, src }) => {

    return (
        <section className="oopsie">
            <img src={src || "/img/oopsie.svg"} alt="Oopsie" />
            <h3>{copy || (localCopy[window.locale] || localCopy.en)}</h3>
        </section>
    )

}

export default Oppsie;