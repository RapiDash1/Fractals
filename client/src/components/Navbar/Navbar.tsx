import React from "react";
import "./Navbar.css";


export class Navbar extends React.Component<{ parentCallback: (message: string) => void }, {}> {
    constructor(props: any) {
        super(props);
        this.handleKochCurveClick = this.handleKochCurveClick.bind(this);
        this.handleTreeClick = this.handleTreeClick.bind(this);
    }


    handleFractalClick() {
        let fractalLinks = document.querySelector(".fractal-selection");
        fractalLinks?.classList.toggle("fractal-selection-active");
    }


    handleSocialMediaClick() {
        let socialMediaLinks = document.querySelector(".Social-Media-selection");
        socialMediaLinks?.classList.toggle("Social-Media-selection-active");
    }

    handleKochCurveClick() {
        this.props.parentCallback("Koch curve");
    }

    handleTreeClick() {
        this.props.parentCallback("tree");
    }

    render() {
        return (
            <nav>
                <div className="navbar-main">
                    <div className="fractal-selection">
                        <ul className="fractal-dropdown">
                            <li className="fractal-dd-item" onClick={this.handleKochCurveClick}>Koch curve</li>
                            <li className="fractal-dd-item" onClick={this.handleTreeClick}>Tree</li>
                        </ul>
                    </div>
                    <div className="Social-Media-selection">
                        <ul className="Social-Media-dropdown">
                            <li className="Social-Media-dd-item"><a href="https://www.instagram.com/sri._vatsa/" target="_blank" id="social-media-element">Instagram</a></li>
                            <li className="Social-Media-dd-item"><a href="https://twitter.com/SrivatsaM11" target="_blank" style={{textDecoration: "none"}} id="social-media-element">Twitter</a></li>
                        </ul>
                    </div>
                    <ul className="nav-links">
                        <li className="Fractals" onClick={this.handleFractalClick}>Fractals</li>
                        <li className="Social-Media" onClick={this.handleSocialMediaClick}>Social Media</li>
                    </ul>
                </div>
            </nav>
        );
    }
}