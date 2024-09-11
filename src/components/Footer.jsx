import React from "react";


const Footer = () => {


    return (
        <div className="footer">
            <div className="up">
                <div  id="left">
                    <h4>PageTurner</h4>
                </div>
                <div  id="right">
                    <h5><a href="https://www.linkedin.com/in/jai-agrawal-601584253" style={{cursor: 'pointer', color: '#C9CBCC', fontFamily: 'Arial, Helvetica, sans-serif', textDecoration: 'none'}}><pre>LinkedIn</pre></a></h5>
                    <h5><a href="https://github.com/agrawaljai" style={{cursor: 'pointer', color: '#C9CBCC', fontFamily: 'Arial, Helvetica, sans-serif', textDecoration: 'none'}}><pre>   GitHub</pre></a></h5>
                    <h5><a href="mailto: agrawaljai399@gmail.com" style={{cursor: 'pointer', color: '#C9CBCC', fontFamily: 'Arial, Helvetica, sans-serif', textDecoration: 'none'}}><pre>   Contact Us</pre></a></h5>
                </div>
            
            </div>
            <div className="down">
                <h5>agrawaljai399@gmail.com</h5>
            </div>

        </div>
    );
}


export default Footer;