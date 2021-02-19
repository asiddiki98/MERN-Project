import React from 'react';
import PostItem from './post_item';

export default class PostsIndex extends React.Component {
    componentDidMount() {
        // this.props.fetchUserPosts(this.props.user._id);
    }
   
    render() {
    
        return (
            <div className="posts-index-container">
                {this.props.posts.map(post => <PostItem key={post._id} post={post} viewPost={this.props.viewPost} />)}
            </div>
        )
    }
}