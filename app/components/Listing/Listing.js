import React, { Component } from 'react'
import Navbar from '../Navbar/Navbar'
import './Listing.scss'

let data = {};

class Listing extends Component {

	removeListing(){
		if(this.props.data.shopifyId)
			this.props.actions.removeListing(this.props.data.shopifyId, this.props.data.account.shopName);
	}

	getProductButtons(){
		if(this.props.data.shopifyId)
			return(
				<div className="col-start-center" style={{width: '100%'}}>
					<div className="button" onClick={() => this.removeListing()}>Remove Item</div>
					<a target="_blank" href={`https://${this.props.data.account.shopName}.myshopify.com/admin/products/${this.props.data.shopifyId}`}>Open Shopify</a>
				</div>
			)
	}
	getPlaceholder(){
		if(!this.props.data.shopifyId)
			return(
				<div className="placeholder row-center-center">
					<div className="loading">
						<div className="spinner" />
					</div>
					<span>Adding item</span>
				</div>
			)
	}

	render () {
		return (
			<div className="Listing col-start-center">
				<Navbar>{this.props.data.shopifyId ? 'Item added!' : ''}</Navbar>
				<img className="image" src={data.MainImage.url_570xN} />
				<div className="row-between-center" style={{width: '100%', padding: '20px 5px'}}>
					<img className="avatar" src={data.Shop.icon_url_fullxfull} />
					<div className="col-start-end">
						<div className="shop-name">{data.Shop.shop_name}</div>
						{stars(data.User.feedback_info.score)}
					</div>
				</div>

				<div className="title">{data.title}</div>
				<div className="price row-start-start">
					{data.price}&nbsp;{data.currency_code}
				</div>
				
				{this.getProductButtons.bind(this)()}
				{this.getPlaceholder.bind(this)()}
			</div>
		)
	}

	componentWillMount(){
		data = this.props.data.listing
	}
}

function stars(score){
	// Get the number of stars needed to show -> 5 stars = 100
	const num = Math.round(score/20);
	const stars = [];
	// Add full stars
	for(let i=0; i<num; i++){
		stars.push(<div key={i}> &#9733; </div>)
	}
	// The rest stars should be empty
	for(let i=num; i<5; i++){
		stars.push(<div key={i}> &#9734; </div>)
	}
	return(
		<div className="stars row-end-start">
			{stars}
		</div>
	)
}

export default Listing