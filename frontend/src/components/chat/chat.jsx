import React from 'react';
import 'whatwg-fetch'
import openSocket from 'socket.io-client'
import ChatBox from './chat_box';


//chat is over all chat. gets all chat related to current user. will have 
//individual chat component to that this component parses messages to
export default class Chat extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            //has array of userids current user is chatting with to display
            dispChats: [],
            isMounted: false
        }
        
    }

    componentDidMount(){
        this.props.fetchMessages(this.props.currentUser._id)
        this.socket = openSocket('http://localhost:8000',{
            withCredentials: true,
            extraHeaders: {
                "my-custom-header": "abcd"
            }, 
            transport: ['websocket']
        });
        this.socket.emit("connect user", this.props.currentUser._id)
        this.socket.on('chat message', message => {
            this.props.receiveMessage(message)
        })
        this.setState({isMounted: true})
        
    }

    componentWillUnmount(){
        this.socket.emit("disconnect user", this.props.currentUser._id)
    }

    handleChatClick(userId){
        return e => {
            let dispChats = this.state.dispChats;
            if(!dispChats.includes(userId)){

                dispChats.push(userId)
            }
            this.setState({dispChats})
        }
    }

    handleCloseChat(userId){
        let dispChats = this.state.dispChats.filter(otherUserId => {
            return otherUserId !== userId
        });
        this.setState({dispChats})

    }

    render(){
        let chatboxList = null;
        if(this.state.isMounted){
            chatboxList = (
                
                <div id="chatbox-list">
                        <ul>
                            {
                                this.state.dispChats.map((otherUserId,idx) => {
                                    <ChatBox otherUser={this.props.otherUsers[otherUserId]}
                                        currentUser={this.props.currentUser}
                                        messages={this.props.messages[otherUserId]}
                                        receiveMessage={this.props.receiveMessage}
                                        handleCloseChat={this.handleCloseChat}
                                        key={idx}
                                        socket={this.socket}
                                    />
                                })
                            }
                        </ul>
                </div>
            )    
        }
        return(
            <div id="chat">
                <div id="open-chats-container">
                    <ul>
                        {
                            Object.values(this.props.otherUsers).map((user,idx) => {
                                return <li onClick={this.handleChatClick(user._id)} 
                                        key={user._id}>
                                        {user.username}
                                    </li>
                            })
                        }
                    </ul>
                </div>
                {chatboxList}
            </div>

        )
    }
}