import React, { Component } from 'react';
import { Link } from 'react-router-dom';


class MoviePopup extends Component   {
    constructor(props) {
        super(props);
        this.toltip = null;
    }
    componentDidMount() {
        let target = this.props.el,
            targetParent = target.parentNode,
            coords = target.getBoundingClientRect(),
            tooltipElem = this.toltip,
		    left = coords.left + target.offsetWidth,
            top = target.offsetTop;

        if (left < 0) {
            left =  0;
        }

        if ( coords.left > targetParent.offsetWidth - 30 - target.offsetWidth - tooltipElem.offsetWidth ) {
            left = target.offsetLeft - tooltipElem.offsetWidth ;
	        tooltipElem.classList.add('movie-tooltip--right');
	        tooltipElem.classList.remove('movie-tooltip--left');
        }

        tooltipElem.style.left = left + 'px';
        tooltipElem.style.top = top + 'px';
    }
    render() {
        return (
            <div className="movie-tooltip movie-tooltip--left tooltip tooltip--movie" ref={el=> this.toltip = el}>
                <div className="tooltip__content">
                    <div className="tooltip__title">
                        <div className="ru-title">{this.props.title}</div>
                        <div className="original-title">{this.props.originalTitle}</div>
                    </div>
                    <div className="movie-tooltip__info">
                        <div className="rating">Рейтинг {this.props.data.vote_average} из 10</div>
                        <div className="time" />
                    </div>
                    <div className="movie-tooltip__description">{this.props.data.overview.length > 475 ? this.props.data.overview.substring(0, 475) + '...' : this.props.data.overview}</div>
                </div>
            </div>
        );
    }
}
export default MoviePopup;
