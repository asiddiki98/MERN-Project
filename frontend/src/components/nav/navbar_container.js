import { connect } from 'react-redux';
import { logout } from '../../actions/session_actions';
import {
  fetchArt,
  fetchDance,
  fetchMusic,
  fetchPhotography,
  fetchPosts
} from '../../actions/post_actions'
import NavBar from './navbar.jsx';
import { openModal } from '../../actions/modal_actions';

const mapStateToProps = state => {
  return {
    user: state.session.user,
    propic: state.session.user.propic,
    loggedIn: state.session.isAuthenticated
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(logout()),
    fetchPosts: () => dispatch(fetchPosts()),
    fetchArt: () => dispatch(fetchArt()),
    fetchDance: () => dispatch(fetchDance()),
    fetchMusic: () => dispatch(fetchMusic()),
    fetchPhotography: () => dispatch(fetchPhotography()),
    createPost: (<div className="create-post-button" onClick={() => dispatch(openModal('createPost'))}>New Post</div>)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NavBar);
