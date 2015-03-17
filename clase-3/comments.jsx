var Comment = React.createClass({
    render : function(){
        return (
            <li className="ui-state-default">
                <strong className="pull-left primary-font">{this.props.data.user}</strong>
                <small className="pull-right text-muted">
                <span className="glyphicon glyphicon-time"></span>7 mins ago</small>
                <br/>
                {this.props.data.body}
            </li>
        );
    }
});

var CommentList = React.createClass({
    render : function(){
        return (
            <ul className="list-unstyled ui-sortable">
            {this.props.comments.map(function(comment){
                return(
                    <Comment data={comment} />
                )
            })}
            </ul>
        );
    }
});

var CommentForm = React.createClass({

    postComment: function(e){
        e.preventDefault();
        this.comment = {
          user : this.props.name,
          body : this.refs.bodyInput.getDOMNode().value
          // React 0.13.x body : this.findDOMNode(this.refs.bodyInput).value
        };
        $.post(
            "http://localhost/curso-react/clase-3/api/comentarios.php?action=create",
            this.comment,
            this.postCommentCallback
        );
    },

    postCommentCallback: function(e){
        if(!e.error){
            this.comment.id = e.data.id
            this.props.onNewComment(this.comment);
        }
        this.comment = null;
    },

    render : function(){
        return (
            <div className="input-group">
                <input ref="bodyInput" type="text" className="form-control input-sm chat-input" placeholder="Write your message here..." />
                <span className="input-group-btn">     
                    <a href="#" onClick={this.postComment} className="btn btn-primary btn-sm"><span className="glyphicon glyphicon-comment"></span> Add Comment</a>
                </span>
            </div>
        );
    }
});

var CommentPanel = React.createClass({

    getInitialState : function(){
        return {
            commentList : []
        }
    },

    handleNewComment : function(comment){
        
        var comments = this.state.commentList;
        comments.push(comment);
        this.setState({commentList : comments});
        
        //this.getComments();
    }, 

    getComments : function(){
        $.get(
            "http://localhost/curso-react/clase-3/api/comentarios.php?action=list",
            this.getCommentsCallback
        );
    },
    
    getCommentsCallback : function(e){
        console.log(e);
        if(!e.error){
            this.setState({
                commentList : e.data.comentarios
            });
        }
    },

    render : function(){
        return (
            <div className="container">
                <div className="col-lg-4 col-sm-6 text-center">
                    <div className="well">
                        <h4>What is on your mind?</h4>
                        <CommentForm name="Ainu" onNewComment={this.handleNewComment}/>
                        <hr />
                        <CommentList comments={this.state.commentList}/>
                    </div>
                </div>
            </div>
        );
    },
    
    componentDidMount : function(){
        this.getComments();
    }
});

React.render(
    <CommentPanel/>,
    document.getElementById("content")
);