import React, { Component } from 'react'
import 'codemirror/lib/codemirror.css';
import '../App.css'
import CodeMirror from 'react-codemirror'
import 'codemirror/mode/xml/xml.js'
import 'codemirror/mode/htmlmixed/htmlmixed'
import 'codemirror/addon/edit/closetag'
import 'codemirror/addon/edit/matchtags'
import 'codemirror/addon/edit/matchbrackets'
import 'codemirror/addon/edit/closebrackets'
import 'codemirror/theme/dracula.css'

import 'codemirror/keymap/sublime'

import 'codemirror/addon/hint/xml-hint'
import 'codemirror/addon/hint/show-hint'
import 'codemirror/addon/hint/show-hint.css'

import 'codemirror/addon/comment/comment'

import Hello from './Hello'


export default class XML extends Component {
    constructor(props){
        super(props);
        this.state = {
          name: 'CodeMirror',
          code: '<Mode>\n\t<XML/>\n</Mode>\n<AutoComplete>\n\tCtrl+Space\n</AutoComplete>\n<keyBindings>\n\tSublime\n</KeyBindings> ',
          viewOpToggle : false,
        };
        
    }

    autoComplete = cm => {
        const codeMirror = this.refs['CodeMirror'].getCodeMirrorInstance();
        const customTags = {
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
          schemaInfo: customTags,
          completeSingle: false,
          completeOnSingleClick: true,
          matchInMiddle: true
        };
        codeMirror.showHint(cm, codeMirror.hint.auto, hintOptions); 
        
      };

      toggleComment = function(cm) {
        cm.toggleComment({ indent: true });
      }

      // toggleSelection = cm => {
      //   const {from, to} = this.getSelectedRange(cm);
      //   cm.lineComment(from, to, { indent: true });
      // }
    
      indentToggle = (cm) => {
        cm.execCommand('indentAuto');
      }

      // getSelectedRange = cm => {
      //   return { from: cm.getCursor(true), to: cm.getCursor(false) };
      // }

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
            mode: 'htmlmixed',
            theme: 'dracula',
            autoCloseTags: true,
            matchTags: true,
            extraKeys: {
              "Ctrl-Space": this.autoComplete,
              "Shift-Alt": this.indentToggle,
              "Ctrl-Alt": this.toggleComment
            },
            autoCloseBrackets: true,
            keyMap: "sublime"
        };
        return (
          <div>
            <CodeMirror
              ref="CodeMirror"           
              value={this.state.code}
              options={options}
              onChange={this.updateCode}
            />
            <div className="key-bindings">To Indent, Select and Shift+Alt <br/> To Comment, Select and Ctrl-Alt</div>
            <div className="btn btn-primary p-2 my-3 toggler" onClick={this.handleSubmit}>Toggle Code Display</div>
            {/* <div className="btn btn-primary p-2 my-5 " onClick={this.toggleSelection}>Toggle indent</div> */}
            {this.state.viewOpToggle &&
            <Hello code={this.state.code} />
            }
          </div>
        )
    }
}