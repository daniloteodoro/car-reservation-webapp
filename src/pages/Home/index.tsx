import React from 'react';
import './index.css';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { connect } from 'react-redux';
import State from '../../store/types';
import * as actions from '../../store/actions';


interface Props {
	categoryName: string;
	changeCategoryTitleAction: (payload: any) => void;
}


const Home: React.FC<Props> = (props): JSX.Element => {
	return (
		<Card className="card">
			<CardActionArea>
				<CardMedia
					component="img"
					alt="Contemplative Reptile"
					height="140"
					image="/static/images/contemplative-reptile.jpg"
					title="Some title"
				/>
				<CardContent>
					<Typography gutterBottom variant="h5" component="h2">
						{props.categoryName}
          			</Typography>
					<Typography variant="body2" color="textSecondary" component="p">
						Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
						across all continents except Antarctica
          			</Typography>
				</CardContent>
			</CardActionArea>
			<CardActions>
				<Button size="small" color="primary" onClick={() => props.changeCategoryTitleAction("new")}>
					Share
        		</Button>
				<Button size="small" color="primary">
					Learn More
        		</Button>
			</CardActions>
		</Card>
	);
}

const mapStateToProps = (state: State) => ({
	categoryName: state.name,
});

const mapDispatchToProps = {
	changeCategoryTitleAction: actions.changeCategoryTitleAction,
};

// export default Home;
export default connect(mapStateToProps, mapDispatchToProps)(Home);
