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

// import 'codemirror/addon/format/formatting'

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

      // getSelectedRange = () => {
      //   const codeMirror = this.refs['CodeMirror'].getCodeMirrorInstance();
      //   return { from: codeMirror.getCursor(true), to: codeMirror.getCursor(false) };
      // }
      
      // autoFormatSelection = () => {
      //   const range = this.getSelectedRange();
      //   const codeMirror = this.refs['CodeMirror'].getCodeMirrorInstance();
      //   codeMirror.autoFormatRange(range.from, range.to);
      // }
      
      // commentSelection = (isComment) => {
      //   const range = this.getSelectedRange();
      //   const codeMirror = this.refs['CodeMirror'].getCodeMirrorInstance();
      //   codeMirror.commentRange(isComment, range.from, range.to);
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
              // "Shift-Tab": this.autoFormatSelection
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

        <div className="btn btn-primary p-2 my-3 toggler" onClick={this.handleSubmit}>Toggle Code Display</div>
        {/* c */}
        {this.state.viewOpToggle &&
         <Hello code={this.state.code} />
        }
            </div>
        )
    }
}
