import React, { Component } from 'react';
// import CodeMirror from 'react-codemirror';
import 'codemirror/lib/codemirror.css';
import './App.css'
import {Controlled as CodeMirror} from 'react-codemirror2'
import 'codemirror/mode/xml/xml'
import 'codemirror/theme/dracula.css'
 


export default class App extends Component {
  constructor(){
    super();
    this.state = {
      name: 'CodeMirror',
      code: ':)'
    };
  }

  updateCode = (newCode) => {
		this.setState({
      code: newCode,
		});
	}

  render() {
    const options = {
      lineNumbers: true,
      mode: 'xml',
      theme: 'dracula'
		};
    return (
      <div>
        <p>
          {this.state.code}
        </p>
        {/* <CodeMirror value={this.state.code} onChange={this.updateCode} options={options} autoFocus={true} /> */}
        <CodeMirror
          value={this.state.code}
          options={options}
          onBeforeChange={(editor, data, code) => {
            this.setState({code});
          }}
          onChange={(editor, data, code) => {
            this.updateCode(code)
          }}
        />
      </div>
    );
  }
}

