import React, { Component } from 'react'
import 'codemirror/lib/codemirror.css';
import '../App.css'
import CodeMirror from 'react-codemirror'
import 'codemirror/mode/javascript/javascript'
import 'codemirror/theme/darcula.css'
import Hello from './Hello'


export default class XML extends Component {
    constructor(props){
        super(props);
        this.state = {
          name: 'CodeMirror',
          code: '🌹💕🐱‍🚀 MODE: JS',
          viewOpToggle : false
        };
    }

    updateCode = (newCode) => {
		this.setState({
            code: newCode,
		});
    }
  
    handleSubmit = e => {
        e.preventDefault();
        this.setState(
        {viewOpToggle: !this.state.viewOpToggle}
        )
    }
    render() {
        const options = {
            lineNumbers: true,
            matchBrackets: true,
            mode: 'javascript',
            theme: 'darcula'
        };
        return (
            <div>
                <CodeMirror
                    ref={this.code}
                    value={this.state.code}
                    options={options}
                    onChange={this.updateCode}
                />
        <div className="btn btn-primary p-2 my-3 toggler" onClick={this.handleSubmit}>Toggle Code Display</div>
        {this.state.viewOpToggle &&
         <Hello code={this.state.code} />
        }
            </div>
        )
    }
}
