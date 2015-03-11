var MyButton = React.createClass({
    render: function(){
        return (
            <button type="button" className="btn btn-primary">
                My Button JSX
            </button>
        )
    }
});

React.render(
    <MyButton />,
    document.getElementById("content")
);