import React from 'react';
import { Link } from 'react-router-dom';
import NoImg from '../../assests/img/NoImg.png';
import { friendlyUrl, urlRusLat } from '../../utils/utils';

const ListsPage = () => (
	<div className='main'>
		<div className="container">
			<h1>Ссылки на списки</h1>

			<div className="lists-links">
				<div className="lists-links__tv">
					<div className="lists-link"><Link to="">123</Link></div>
					<div className="lists-link"><Link to="">123</Link></div>
					<div className="lists-link"><Link to="">123</Link></div>
					<div className="lists-link"><Link to="">123</Link></div>
				</div>
			</div>

		</div>
	</div>
);

export default (ListsPage);
