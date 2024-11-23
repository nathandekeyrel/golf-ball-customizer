import React from 'react';
import { Link } from "react-router-dom";

const CTA = () => {
    return (
        <section className='cta'>
            {/*Probably will change this depending on how Home page is implemented*/}
            <p className="cta-text">Ready to go? <br className="sm:block hidden" />
                Let's Design! </p>
            <Link to="/design" className="btn">Design</Link>
        </section>
    )
}

export default CTA;