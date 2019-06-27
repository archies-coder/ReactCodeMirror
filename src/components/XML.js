import React, { Component } from 'react'
import 'codemirror/lib/codemirror.css';
import '../App.css'
import {Controlled as CodeMirror} from 'react-codemirror2'
import 'codemirror/mode/xml/xml.js'
import 'codemirror/theme/dracula.css'
import Hello from './Hello'


export default class XML extends Component {
    constructor(props){
        super(props);
        this.state = {
          name: 'CodeMirror',
          code: '🌹💕🐱‍🚀 <MODE>: </XML>',
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
            mode: 'xml',
            theme: 'dracula'
        };
        return (
            <div>
                <CodeMirror
          ref={this.code}
          value={this.state.code}
          options={options}
          onBeforeChange={(editor, data, code) => {
            this.setState({code});
          }}
        />
        <div className="btn btn-primary p-2 my-3 toggler" onClick={this.handleSubmit}>Toggle Code Display</div>
        {this.state.viewOpToggle &&
         <Hello code={this.state.code} />
        }
            </div>
        )
    }
}
