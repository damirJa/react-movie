import React, {Component} from 'react';
import { tvTop } from '../../actions/tv-actions';
import {Helmet} from 'react-helmet';
import { connect } from 'react-redux';
import MediaList from '../MediaList/MediaList';


class TvTop extends Component {
    constructor(props) {
        super(props);
        this.state = {
            intervalId: 0
        };
    }

    componentDidUpdate(prevProps) {
        if (this.props.location.search !== prevProps.location.search) {
            this.scrollToTop();
            this.sendRequest(prevProps);
        }
    }

    componentDidMount() {
        if (window.pageYOffset === 0) {
            clearInterval(this.state.intervalId);
        }
        this.sendRequest();
    }


	 sendRequest = () =>{
		 let movieId = parseFloat(this.props.location.search.split('=').pop());
		 if (this.props.location.search) {
			 if (movieId <= 2) {
				 this.props.loadList(movieId+1);
			 } else {
				 if (movieId <= 3) {
					 this.props.loadList(movieId + 2);
				 } else {
					 this.props.loadList(movieId + 3);
				 }
			 }
		 } else {
			 this.props.loadList();
		 }
	 };

	 prevPage = () => {
	     if (this.props.TopTv.data.page > 1) {
		     if (this.props.TopTv.data.page <= 3) {
			     this.props.history.push('/tv/top');
		     } else {
		         this.props.history.push('/tv/top?page=' + (this.props.TopTv.data.page-3));
	         }
	     } else {
	         this.props.history.push('/tv/top');
	     }
	 };

	 nextPage = () => {
	     if (this.props.TopTv.data.page > 1) {
	         if (this.props.TopTv.data.page <= 3) {
	             this.props.history.push('/tv/top?page=' + (this.props.TopTv.data.page));
	         } else {
	             this.props.history.push('/tv/top?page=' + (this.props.TopTv.data.page-1));
	         }
	     } else {
	         this.props.history.push('/Tv/top?page=' + (this.props.TopTv.data.page+1));
	     }
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
      let { TopTv } = this.props;
      return (
	     <main className="main">
              <Helmet>
                  <title>Топ сериалы</title>
              </Helmet>
		     {TopTv.isFetching ?
			     <div className="movies-content">
                      <MediaList movieListTitle={'Топ сериалы'} movieList={TopTv} typeList='tv'/>
	             {TopTv.data.total_pages > 1 ?
                          <div className="pager-btns clearfix">
			             {TopTv.data.page-1 > 1 ? <div className="pager-btn pager-btn--prev link-angle" onClick={this.prevPage}><i className="fa fa-angle-left" aria-hidden="true" /><span>Предыдущая страница</span></div> :null}
			             {TopTv.data.page+1 < TopTv.data.total_pages ? <div className="pager-btn pager-btn--next link-angle" onClick={this.nextPage}><span>Следующая страница</span><i className="fa fa-angle-right" aria-hidden="true" /></div> :null}
                          </div> : null}
                  </div> : null}
	     </main>
      );

  }
}

function mapStateToProps(state) {
    return {
        TopTv: state.TVs.TopTv
    };
}

const mapDispatchToProps = (dispatch) => ({
    loadList: (page) => dispatch(tvTop(page))
});


export default connect(mapStateToProps, mapDispatchToProps)(TvTop);
