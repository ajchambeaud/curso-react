var DownloadButton = React.createClass({

    countDown : function(){
        if(this.state.wait > 0){
            var newTime = this.state.wait - 1;
            this.setState({ wait : newTime });
        }else{
            clearTimeout(this.timerInterval);
        }
    },

    getDefaultProps : function(){
        return {
            text : "Download",
            timeToWait : 10
        }
    },

    getInitialState : function(){
        return {
            wait : this.props.timeToWait
        }
    },
    
    componentDidMount : function(){
        this.timerInterval = setInterval(this.countDown, 1000);
    },
    
    render: function(){
        var showElement;
        
        if(this.state.wait > 0 ){
            showElement = <p>La descarga estara disponible en {this.state.wait} segundos.</p>;
        }else{
            showElement = (
                <button type="button" className="btn btn-primary">
                    {this.props.text}
                </button>
            )
        }
        return showElement;
    }
});

var app = angular.module("app");

app.value("DownloadButton", DownloadButton);

