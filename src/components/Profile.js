import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import withStyles from '@material-ui/core/styles/withStyles'
import { Link } from 'react-router-dom/Link'
import dayjs from 'dayjs'
import EditDetails from './EditDetails'

import Button from '@material-ui/core/Button'
import MLink from '@material-ui/core/Link'
import Typograpgy from '@material-ui/core/Typography'
import Card from '@material-ui/core/Card'

import { connect } from 'react-redux'

const styles = {
  card: {
    display: 'flex',
    boxShadow: 'none',
    position: 'fixed'
  },

  profileImage: {
    width: 200,
    height: 200,
    objectFit: 'cover',
    maxWidth: '100%',
    margin: 'auto',
    borderRadius: '50%'
  },

  profileDetails: {
    marginLeft: '30px',
    marginTop: '30px'
  },

  margin: {
      margin: '10px'
  },

  introImg: {
    margin: 'auto',
    width: 400,
    position: 'fixed'

}

    
};

export class Profile extends Component {

    render() {
        const { classes, user: { 
            credentials: { user, time, imageUrl, bio, website, location },
            loading,
            authenticated
        }} = this.props

        let profileMarkup = !loading ? (authenticated ? (
            <Card className={classes.card}>
                <div>
                    <img src={imageUrl} alt="profile" className= {classes.profileImage}/>
                    <div className={classes.profileDetails}>
                        <Typograpgy color="secondary" variant="h5">@{user}</Typograpgy>
                        {bio && <Typograpgy variant="body2"><p>{bio}</p></Typograpgy>}
                        {location && <Typograpgy variant="body2"><p>Location: {location}</p></Typograpgy>}
                        {website && <Typograpgy variant="body2" color="primary"><a href={website} target="_blank">{website}</a></Typograpgy>}
                        <Typograpgy variant="body2" color="secondary">Joined {dayjs(time).format('MMM YYYY')}</Typograpgy>
                    </div>
                    <div className={classes.margin}><EditDetails/></div>
                </div>
            </Card>
        ) : (<img src={require('../images/intro.jpg')} className={classes.introImg}/>)) : (<p>loading...</p>)

        return profileMarkup;
    }
}

const mapStateToProps = (state) => ({
    user: state.user
})

Profile.propTypes = {
    user: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired
}

export default connect(mapStateToProps)(withStyles(styles)(Profile))
