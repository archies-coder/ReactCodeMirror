import React, { Component } from 'react'
import 'codemirror/lib/codemirror.css';
import '../App.css'
import CodeMirror from 'react-codemirror'
import 'codemirror/mode/xml/xml.js'
import 'codemirror/addon/edit/closetag'
import 'codemirror/addon/edit/matchtags'
import 'codemirror/addon/edit/matchbrackets'
import 'codemirror/addon/edit/closebrackets'
import 'codemirror/theme/dracula.css'
import Hello from './Hello'


export default class XML extends Component {
    constructor(props){
        super(props);
        this.state = {
          name: 'CodeMirror',
          code: '🌹💕🐱‍🚀 <MODE>: </XML>',
          viewOpToggle : false,
        };
    }

    updateCode = (newCode) => {
		this.setState({
      code: newCode,
      // viewOpToggle: true
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
            theme: 'dracula',
            autoCloseTags: true,
            matchTags: true,
            autoCloseBrackets: true
        };
        return (
            <div>
                <CodeMirror
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
