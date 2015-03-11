var DropPanel = React.createClass({
    
    panelClassNames : {
        default : 'panel-default',
        dragOver : 'panel-info'
    },
    
    panelTextLabels : {
        textPanelDefault : 'Drag File Here',
        textPanelDrop : 'Drop your file!',
        textPanelLoading : 'loading file...'
    },
    
    getDefaultProps: function(){
        return {
            title : 'Drop Panel',
            onNewFile : function(f){
                console.log("Implementar funcion onNewFile()");
                console.log(f);
            }
        }
    },
    
    getInitialState: function(){
        return {
            panelClass : this.panelClassNames.default,
            panelText : this.panelTextLabels.textPanelDefault
        }
    },
    
    dragOverHandler: function(e){
        e.preventDefault();
        e.dataTransfer.dropEffect = "copy";
        this.setState({
            panelClass : this.panelClassNames.dragOver,
            panelText : this.panelTextLabels.textPanelDrop
        });
    },
    
    dragLeaveHandler: function(e){
        e.preventDefault();
        this.setState({
            panelClass : this.panelClassNames.default,
            panelText : this.panelTextLabels.textPanelDefault
        });
    },
    
    dropHandler: function(e){
        e.preventDefault();
        if(e.dataTransfer.files && e.dataTransfer.files[0]){
            this.currentFileData = e.dataTransfer.files[0];
            
            var reader = new FileReader();
            reader.onload = this.fileLoadHandler;
            reader.readAsDataURL(this.currentFileData);
            
            this.setState({
                panelClass : this.panelClassNames.default,
                panelText : this.panelTextLabels.textPanelLoading
            });
        }else{
            this.setState({
                panelClass : this.panelClassNames.default,
                panelText : this.panelTextLabels.textPanelDefault
            });
        }
    },
    
    fileLoadHandler : function(e){
        var file = {
            data : this.currentFileData,
            url : e.target.result
        };
        this.props.onNewFile(file);
        this.currentFileData = {};
        this.setState({
            panelText : this.panelTextLabels.textPanelDefault
        });
    },
    
    render : function(){
        return(
            <div className={'panel '+this.state.panelClass}>
              <div className="panel-heading">{this.props.title}</div>
              <div className="panel-body tall"
                onDragOver={this.dragOverHandler}
                onDragLeave={this.dragLeaveHandler}
                onDrop={this.dropHandler}>
              {this.state.panelText}
              </div>
            </div>
        );
    }
});

var MediaItem = React.createClass({
    render : function(){
        return(
          <li className="media">
            <div className="media-left">
              <a href="#">
                <img width="64" height="64" className="media-object" src={this.props.file.url} />
              </a>
            </div>
            <div className="media-body">
              <h4 className="media-heading">{this.props.file.data.name}</h4>
              <p>
                size: {this.props.file.data.size} <br/>
                type: {this.props.file.data.type}
              </p>
            </div>
          </li>
        );
    }
});

var MediaList = React.createClass({
    getDefaultProps : function(){
        return {
            images : []
        };
    },
    
    render : function(){
        return(
            <ul className="media-list">
                {this.props.images.map(function(item){
                    return (
                        <MediaItem file={item} />
                    )
                })}
            </ul>
        );
    }
});

var MainPanel = React.createClass({

    getInitialState : function(){
        return {
            fileList : []
        };
    },

    newFileHandler : function(file){
        var list = this.state.fileList;
        list.push(file);
        this.setState({ fileList : list });
    },

    render : function(){
        return(
            <div className="row">
                <div className="col-md-5 margin">
                    <DropPanel onNewFile={this.newFileHandler}/>
                </div>
        
                <div className="col-md-5 margin">
                    <MediaList images={this.state.fileList}/>
                </div>
            </div>
        );
    }
});

React.render(
    <MainPanel />,
    document.getElementById("content")
);