import { connect } from 'react-redux';
import React from 'react';
import { sendFile } from '../../actions/content_actions';
import { closeModal } from '../../actions/modal_actions';
import { createPost } from '../../actions/post_actions';
import '../../assets/post/createPost.scss'

class CreatePostForm extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            description: "",
            category: "",
            errors: ""
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleFile(field) {
        return e => this.setState({[field]: e.currentTarget.files[0]});
    }

    handleChange(field) {
        return e => this.setState({ [field]: e.currentTarget.value });
    }

    handleCategoryClick(field){
        return e => this.setState({category: field})
    }

    handleSubmit(e) {
        e.preventDefault();
        if(!this.state.file || !this.state.description || !this.state.category){
            this.setState({errors: "all fields required"})
        }else{

            const formData = new FormData();
            formData.append('file', this.state.file);
            formData.append('caption', "post-pic");
            this.props.sendFile(formData).then(() => this.props.createPost({
                description: this.state.description,
                category: this.state.category,
                filename: this.props.content.filename,
                creator: this.props.currentUserId
            })).then(this.props.closeModal);
        }
    }

    render(){
        const {closeModal} = this.props;
        return (
            <div className="create-post-container">
                <div>Create A New Post!</div>
                <div className="closemodal" onClick={closeModal}>✕</div>
                <form onSubmit={this.handleSubmit} encType='multipart/form-data'>
                    <label>Description:
                        <input type="text" value={this.state.description} onChange={this.handleChange('description')}/>
                    </label>
                    <label>Post: 
                        <input type="file" accept=".png, .jpg, .jpeg, mp4, mov, mp3, wav, mp4" onChange={this.handleFile("file")}/>
                    </label>
                    <label>Category:
                        <div onClick={this.handleCategoryClick("Art")} className={this.state.category === 'Art' ? `create-post-category chosen` : `create-post-category` }>Art</div>
                        <div onClick={this.handleCategoryClick("Photography")} className={this.state.category === 'Photography' ? `create-post-category chosen` : `create-post-category` }>Photography</div>
                        <div onClick={this.handleCategoryClick("Music")} className={this.state.category === 'Music' ? `create-post-category chosen` : `create-post-category` }>Music</div>
                        <div onClick={this.handleCategoryClick("Dance")}className={this.state.category === 'Dance' ? `create-post-category chosen` : `create-post-category` }>Dance</div>
                    </label>
                    <button>Submit</button>
                </form>
                {this.state.errors ? <div>{this.state.errors}</div> : null}
            </div>
        )
    }

}

const mSTP = (state = {}, ownProps) => {
    return {
        currentUserId: state.session.user._id,
        content: state.ui.content
    }
}

const mDTP = dispatch => {
    return {
        createPost: post => dispatch(createPost(post)),
        closeModal: () => dispatch(closeModal()),
        sendFile: file => dispatch(sendFile(file))
    }
}

export default connect(mSTP,mDTP)(CreatePostForm)