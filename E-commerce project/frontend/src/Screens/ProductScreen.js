import React from 'react';
import data from '../data';
import { Link } from 'react-router-dom';

function ProductScreen(props) {
	console.log(props.match.params.id);
	const product = data.products.find(x => x._id === props.match.params.id);
	// console.log(product.name);
  	return <div>
		<div><Link to="/">Back to homepage</Link></div>
		<div className="details">
			<div className="details-image">
				<img src={product.image} alt="product" />
			</div>
			<div className="details-info">
				<ul>
					<li>
						<h4>{product.name}</h4>
					</li>
					<li>
						{product.rating} Stars ({product.numReviews} Reviews)
					</li>
					<li>
						<b>{product.price}</b>
					</li>
					<li>
						Description:
						<div>{product.description}</div>
					</li>
				</ul>
			</div>
		</div>
  	</div>
}

export default ProductScreen;
