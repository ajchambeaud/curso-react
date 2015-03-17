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
          <div className={'item '+this.props.activeClass}>
            <img width={600} height={230} src={this.props.file.url} />
            <div className="carousel-caption">
                <h3>{this.props.file.name}</h3>
            </div>
          </div>
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
            <div id="carrousel" className="carousel slide">
                {/* Wrapper for slides */}
                <div className="carousel-inner" role="listbox">

                    {this.props.images.map(function(item, index){
                        var active = index == 0 ? 'active' : '';
                        return (
                            <MediaItem file={item} activeClass={active}/>
                        )
                    })}

                </div>
                {/* Controls */}
                <a className="left carousel-control" href="#carousel" role="button" data-slide="prev">
                  <span className="glyphicon glyphicon-chevron-left" aria-hidden="true" />
                  <span className="sr-only">Previous</span>
                </a>
                <a className="right carousel-control" href="#carousel" role="button" data-slide="next">
                  <span className="glyphicon glyphicon-chevron-right" aria-hidden="true" />
                  <span className="sr-only">Next</span>
                </a>
            </div>
        );
    },
  
    componentDidMount : function(){
        $(this.getDOMNode()).carousel({interval : 1500});
    },  
  
    componentDidUpdate : function(){
        $(this.getDOMNode()).carousel({interval : 1500});
    },
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