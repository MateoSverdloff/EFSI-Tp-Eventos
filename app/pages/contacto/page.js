"use client";

export default function Contacto() {
    return (
        <div className="container">
            <div className="row">
                <h1>Contactanos!</h1>
            </div>
            <div className="row">
                <h4 style={{ textAlign: 'center' }}>Nos encantaria recibir tu opinion!</h4>
            </div>
            <div className="row input-container">
                <div className="col-xs-12">
                    <div className="styled-input wide">
                        <input type="text" required />
                        <label className="label-contact">Name</label>
                    </div>
                </div>
                <div className="col-md-6 col-sm-12">
                    <div className="styled-input">
                        <input type="text" required />
                        <label className="label-contact">Email</label>
                    </div>
                </div>
                <div className="col-md-6 col-sm-12">
                    <div className="styled-input" style={{ float: 'right' }}>
                        <input type="text" required />
                        <label className="label-contact">Phone Number</label>
                    </div>
                </div>
                <div className="col-xs-12">
                    <div className="styled-input wide">
                        <textarea required></textarea>
                        <label className="label-contact">Message</label>
                    </div>
                </div>
                <div className="col-xs-12">
                    <div className="btn-lrg submit-btn">Send Message</div>
                </div>
            </div>
        </div>
    );
}
