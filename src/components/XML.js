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

import 'codemirror/addon/hint/xml-hint'
import 'codemirror/addon/hint/show-hint'
import 'codemirror/addon/hint/show-hint.css'

import Hello from './Hello'


export default class XML extends Component {
    constructor(props){
        super(props);
        this.state = {
          name: 'CodeMirror',
          code: '🌹💕🐱‍🚀 <MODE>: </XML> \n<USE Ctrl+Space>',
          viewOpToggle : false,
        };
    }
    autoComplete = cm => {
        const codeMirror = this.refs['CodeMirror'].getCodeMirrorInstance();
        const tags = {
            '!top': ['add','hello'],
            '!attrs': {},
            'add': {
              attrs: {
                'id': null
              },
              children: ['Student', 'hello']
            },
            'hello': {
              attrs: {
                'id': null
              },
              children: ['A-Child']
            },
            'Student': {
              attrs: {
                name: null
              },
              children: ['A-Child']
            },
            'A-Child': {
              attrs: {
                roll_no: null
              },
              children: ['marks']
            },
            'marks': {
              children: [],
            },
          };
          
        const hintOptions = {
          schemaInfo: tags,
          completeSingle: false,
          completeOnSingleClick: true,
          matchInMiddle: true
        };
        codeMirror.showHint(cm, codeMirror.hint.auto, hintOptions); 
      };

      

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
            tabSize: 2,
            matchBrackets: true,
            mode: 'xml',
            theme: 'dracula',
            autoCloseTags: true,
            matchTags: true,
            extraKeys: { "Ctrl-Space": this.autoComplete},
            autoCloseBrackets: true,
        };
        return (
            <div>
                <CodeMirror
                ref="CodeMirror"           
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
