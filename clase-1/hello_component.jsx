var HelloComponent = React.createClass({
    
    getInitialState : function(){
        return {
            name : 'React'
        };
    },
    
    actualizar: function(e){
        this.setState({name : e.target.value});
    },

    render: function(){
        return (
            <div className="jumbotron">
                <h1>Hola {this.state.name}</h1>
                <input type="text" onChange={this.actualizar} value={this.state.name}/>
            </div>
        )
    }
});

React.render(
    <HelloComponent />,
    document.getElementById("content")
);