import React from 'react';
import { Link } from 'react-router-dom';
import Swiper from 'react-id-swiper';
import NoImg from '../../img/NoImg.png';
import { friendlyUrl } from '../../utils/utils';

const SwiperParams = {
    scrollbar: {
        el: '.swiper-scrollbar',
        hide: false,
        draggable: true
    },
    slidesPerView: 8,
    spaceBetween: 20

};
const MediaCast = (movie) => (
    <div className="credits">
        <div className="cast">
            <h2 className="cast__title">В ролях</h2>

            <Swiper {...SwiperParams}  shouldSwiperUpdate={true} mousewheel={movie.cast.length>7 ?{sensitivity: 150} : false}>
                {movie.cast.map((actor, indx) =>
                    (<Link to={'/person/'+ friendlyUrl(actor.name)+ '-' + actor.id} className="actor" key={indx}>
                        <div className="actor__img" style={{backgroundImage: actor.profile_path ? 'url(https://image.tmdb.org/t/p/w185/' + actor.profile_path + ')': 'url('+ NoImg + ')'}} />
                        <div className="actor__info">
                            <div className="actor__name">{actor.name}</div>
                            {actor.character  &&
       <div className="actor__role">{actor.character}</div>
                            }
                        </div>
                    </Link>)
                )}
            </Swiper>

        </div>
    </div>
);

export default (MediaCast);