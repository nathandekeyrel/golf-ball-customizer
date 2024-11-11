import React from 'react';
import { Link } from "react-router-dom";

const CTA = () => {
    return (
        <section className='cta'>
            <p className="cta-text">Ready to go? <br className="sm:block hidden" />
                Let's Design! </p>
            <Link to="/design" className="btn">Contact</Link>
        </section>
    )
}

export default CTA;