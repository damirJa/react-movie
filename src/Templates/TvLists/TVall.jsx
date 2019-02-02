import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import queryString from 'query-string';

import { tvPopular } from '../../Data/api/Tv.api';
import { sortListTV } from './../../Data/localData';

import MediaList from './../MediaList/MediaList';
import FilterList from './../Filters/Containers/FilterList';
import ServiceBlock from './../Service/ServiceBlock';


class TvPopular extends Component {
    constructor(props) {
        super(props);
        this.state = {
            intervalId: 0,
	        sortType: 'popularity.desc',
	        sortDate: 0,
	        sortSettings: {
		        sortType: null,
		        sortByDate: {
			        data: null
		        },
		        sortByCountry: {
			        ico: null
		        }
	        }
        };
    }

    get genresData() {
    	return this.props.genres.isFetching ? this.props.genres.data.obj : {};
    }

    get genres() {
    	return this.props.genres.isFetching ? this.props.genres.data.arr.AllGenres : [];
    }

    componentDidUpdate(prevProps, previousState) {
        if (this.props.location.search !== prevProps.location.search) {
            this.scrollToTop();
	        this.sendRequest(prevProps);
        } else if (previousState.sortSettings !== this.state.sortSettings) {
	        this.sendRequest();
        }
    }

    componentDidMount() {
	    if (window.pageYOffset === 0) {
		    clearInterval(this.state.intervalId);
	    }
	    this.scrollToTop();
        this.sendRequest();
    }

    get getUrlString() {
        return {
            genre: queryString.parse(this.props.location.search).genre,
            country: queryString.parse(this.props.location.search).country,
            sort_direction: queryString.parse(this.props.location.search).dir,
            year: queryString.parse(this.props.location.search).year,
            page: queryString.parse(this.props.location.search).page
        };
    }

     sendRequest = () =>{
	     let page = +this.getUrlString.page;
	     let UrlStateObj = {
		     page: +this.getUrlString.page,
		     country: this.getUrlString.country,
		     genres: this.getUrlString.genre,
		     sort_by: this.getUrlString.sort_by,
		     year: this.getUrlString.year
	     };

	     if (!page) {
		     delete UrlStateObj.page;
	     }

	     if (page <= 2) {
		     UrlStateObj.page += 1;
	     } else if (page === 3) {
		     UrlStateObj.page += 2;
	     } else if ( page >= 4) {
		     UrlStateObj.page = UrlStateObj.page + UrlStateObj.page - 1;
	     }

	     this.props.loadList(UrlStateObj.page, UrlStateObj.genres, UrlStateObj.sort_by, UrlStateObj.year, UrlStateObj.country, UrlStateObj.adult);
     };

 prevPage = () => {
     let urlObj = this.getUrlString;

     if (this.getUrlString.page > 2) {
         urlObj.page = +this.getUrlString.page - 1;
     }

     if (this.getUrlString.page <= 2) {
         delete urlObj.page;
     }

     this.props.history.push({
         search: queryString.stringify(urlObj)
     });
 };

 nextPage = () => {
     let urlObj = this.getUrlString;

     urlObj.page = 2;

     if (this.getUrlString.page >= 2) {
         urlObj.page = +this.getUrlString.page + 1;
     }

     this.props.history.push({
         search: queryString.stringify(urlObj)
     });
 };


	 scrollStep = () => {
	     if (window.pageYOffset === 0) {
	         clearInterval(this.state.intervalId);
	     }
	     window.scroll(0, window.pageYOffset - 50);
	 };

	 scrollToTop = () => {
	     let intervalId = setInterval(this.scrollStep.bind(this), 16.66);
	     this.setState({ intervalId: intervalId });
	 };


  render() {
	 let width = (window.innerWidth > 0) ? window.innerWidth : screen.width;
	 let { allTV } = this.props;
	    return (
		    <main className="main main--media-list">
			    <Helmet>
				    <title>Популярные сериалы</title>
			    </Helmet>

			    <ServiceBlock
				    isLoading={allTV.isFetching}
				    isError={allTV.status}
				    fetch={this.sendRequest}
			    >

			    <div className="movies-content">
				    <FilterList location={this.props.location}
				                genresData={this.genresData}
				                genres={this.genres}
				                onClickGenres={this.GenresFilter}
				                onClickCountry={this.onClickCountry}
				                onClickSortList={this.sortList}
				                sortByCountry={false}
				                safeFilter={false}
				                sortListType={sortListTV}
				                MobileFilter={width >= 963}
				                history={this.props.history}
				    />

				    <MediaList
					    movieListTitle={`Всего сериалов (${allTV.data.total_results})`}
					    movieList={allTV}
					    typeList="tv"
				    />

				    {allTV.data.total_pages > 1
					    ? <div className="pager-btns clearfix">
						    {allTV.data.page - 1 > 1
							    ? <div
								    className="pager-btn pager-btn--prev link-angle link-angle--left"
								    onClick={this.prevPage}>
								    <i className="fa fa-angle-left" aria-hidden="true" />
								    <span>Предыдущая страница</span>
							      </div>
							    : null}

						        {allTV.data.page + 1 < allTV.data.total_pages
							    ? <div
								    className="pager-btn pager-btn--next link-angle"
								    onClick={this.nextPage}>
								    <span>Следующая страница</span>
								    <i className="fa fa-angle-right" aria-hidden="true" />
							      </div>
							    : null}

					        </div>
					    : null}
			    </div>
			    </ServiceBlock>
		    </main>
	    );
  }
}

function mapStateToProps(state) {
    return {
        allTV: state.TVs.allTV,
	    genres: state.General.Genres
    };
}

const mapDispatchToProps = (dispatch) => ({
    loadList: (page, genre, sortType, date, country, adult) => dispatch(tvPopular(page, genre, sortType, date, country, adult))
});


export default connect(mapStateToProps, mapDispatchToProps)(TvPopular);
