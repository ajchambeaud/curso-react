var LogMixin = function(componente){
    return{

        componentWillUpdate : function(){
            console.log("> "+componente+": componentWillUpdate()");
        },

        componentDidUpdate : function(){
            console.log("> "+componente+": componentDidUpdate()");
        },
        
        componentWillReceiveProps : function(nextprops){
            console.log("> "+componente+": componentWillReciveProps()");
            console.log(nextprops);
        },
        
        componentDidMount : function(){
            console.log("> "+componente+": componentDidMount()");
        },

        componentWillUnmount : function(){
            console.log("> "+componente+": componentWillUnmount()");
        }
    }
}

var Titulo = React.createClass({

    mixins : [LogMixin('Titulo')],

    getInitialState : function(){
        return {
          tituloLabel : this.props.label  
        };
    },

    componentWillReceiveProps : function(nextprops){
        this.setState({
            tituloLabel : nextprops.label  
        });
    },

    render : function(){
        return (
            <h1>{this.state.tituloLabel}</h1>
        )
    }

});


var TestComponent = React.createClass({

    mixins : [LogMixin('TestComponent')],

    getDefaultProps : function() {
        console.log("> getDefaultProps()");
        return {
            text : "Test Component"
        };
    },
    
    getInitialState : function(){
        console.log("> getInitialState()");
        //this.props
        return {
            text : this.props.text
        };
    },

    componentWillMount : function(){
        console.log("> componentWillMount()");
    },
    
    update : function(e){
        this.setState({
            text : e.target.value
        });
    },
    
    render : function(){
        // this.props
        // this.state
        console.log("> render()");
        return (
            <div>
                <input type="text" onChange={this.update} />
                <Titulo label={this.state.text} />
            </div>
        )
    },
    
    shouldComponentUpdate : function(netxprops, nextstate){
        return nextstate.text.length > 5 || nextstate.text.length == 0;
    }
    
});

var desmontar = function(node_nro){
    var nodo = document.getElementById("content" + node_nro);
    React.unmountComponentAtNode(nodo);
};

React.render(
    <TestComponent/>,
    document.getElementById("content1")
);