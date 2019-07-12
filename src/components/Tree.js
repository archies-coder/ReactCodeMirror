import React, { Component } from 'react'
import {Treebeard, animations} from 'react-treebeard';
import Modal from 'react-modal';
import './Tree.css'

const customStyles = {
    content : {
      top                   : '50%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      marginRight           : '-50%',
      transform             : 'translate(-50%, -50%)',
      width                 : '300px',  
      height                : '300px',  
      backgroundColor       : '#FF80AB',
      overflow              : 'hidden'
    }
  };
  // Modal.setAppElement('#root')

let data = {
    name: 'root',
    toggled: true,
    children: [
        {
            name: 'App',
            children: [
                { name: 'server.js' },
                { name: 'data.js' }
            ]
        },
        {
            name: 'styles',
            children: [
                {name: 'header.css'},
                {name: 'footer.css'},
            ]
        },
        {
            name: 'client',
            children: [
                {
                    name: 'App',
                    children: [
                        { name: 'index.js' },
                        { name: 'context.js' }
                    ]
                }
            ]
        }
    ]
};
export default class Tree extends Component {
    constructor(props){
        super(props);
        this.state = {
          data,
          modalAddIsOpen: false,
          value: "",
          deleteNode: "",
          activeNode:{},
          elToDel: {}
        };
    }

    openAddModal = (node) => {
      this.setState({ modalAddIsOpen: true, activeNode:node });
      const found = this.state.data.children.filter((data)=> data.name === node.name)
      console.log(found);
      // this.findParent(node);
    }
    closeModal = () => {
      this.setState({modalAddIsOpen: false, modalDeleteIsOpen: false});
    }

    addIcon = (node) => {
         
        node.map((child, index)=> {
        const name1 = child.name;
        (name1.indexOf('.') === -1) ?
          child.name = <div ref={selected => this.selected = selected}>
                <i className="far fa-folder px-2"></i>
                {name1} <span onClick={(e)=>this.openAddModal(child, e)}><i className="far fa-plus-square pl-2"/></span>
                <span><i onClick={(e)=>this.deleteElement(child, index, e)} className="far fa-trash-alt pl-2"></i></span> 
              </div>
          : child.name = <div>
                <i className="far fa-file-code px-2"></i> {name1}
                <span><i onClick={(e)=>this.deleteElement(child, index, e)} className="far fa-trash-alt pl-2"></i></span>
              </div>
        if(child.children){
          this.addIcon(child.children);       
        } 
      })
    }
    componentWillMount = () => {
      this.addIcon(this.state.data.children)
    }

    // findParent = (item) => {
    //   const data = this.state.data;
    //   let member, i, array;
    //   for (member in data) {
    //       if (data.hasOwnProperty(member) && typeof data[member] === 'object' && data[member] instanceof Array) {
    //           array = data[member];
    //           for(i = 0; i < array.length; i += 1) {
    //               if (array[i] === item) {
    //                 console.log(array)
    //                 if(array.children){
    //                   this.findParent(array[i].children[0])
    //                   debugger;
    //                 }//
    //                   return array;
    //               }
    //           }
    //       }
    //   }
    // }

    handleSubmit = (e) =>{
      e.preventDefault();
      if(this.state.activeNode.children){
        this.state.activeNode.children.push({name: this.state.value});
      }
      const newData = this.state.data;
      this.setState({data: newData});
      this.closeModal();
    }
    deleteElement = (_,index,e) => {
      e.preventDefault();
      console.log(index);
      const newData = this.state.data.children.splice(index,1);
      this.setState({data: newData})
    }

    handleChange(event) {
      this.setState({value: event.target.value});
    }
  
    onToggle = (node, toggled) => {
        const {cursor, data} = this.state;
        if (cursor) {
            this.setState(() => ({cursor, active: false}));
        }
        node.active = true;
        if (node.children) { 
            node.toggled = toggled;
        }
        this.setState(() => ({cursor: node, data: Object.assign({}, data)}));
    }
    render() {
        // const {data} = this.state;
        return (
          <React.Fragment>
            <Modal
              isOpen={this.state.modalAddIsOpen}
              onAfterOpen={this.afterOpenModal}
              onRequestClose={this.closeModal}
              style={customStyles}
              ariaHideApp={false}
              contentLabel="Add Modal"
            >
              <form onSubmit={(e)=>{this.handleSubmit(e)}}>
                <input id= "child-name" type="text" value={this.state.value} onChange={(e)=>{this.handleChange(e)}} required/>
                <input className='btn btn-md btn-dark submit' type="submit" value="ENTER"/>
              </form>
            </Modal>
            {/* <Modal
              isOpen={this.state.modalDeleteIsOpen}
              onRequestClose={this.closeModal}
              style={customStyles}
              contentLabel="Delete Modal"
            >
              <form onSubmit={(e)=>{this.handleSubmit(e)}}>
                {this.state.activeNode.}
                <input className='btn btn-md btn-dark submit' type="submit" value="ENTER"/>
              </form>
            </Modal> */}
            <Treebeard
              data={this.state.data}
              onToggle={this.onToggle}
              style = {style}
              animations = {animations}
            />
          </React.Fragment>
                
        )
    }
}


const style = {
    tree: {
      base: {
        listStyle: 'none',
        backgroundColor: '#fff1ff',
        margin: '10px',
        padding: '10px',
        color: '#b00020',
        fontFamily: 'lucida grande ,tahoma,verdana,arial,sans-serif',
        fontSize: '18px'
      },
      node: {
        base: {
          position: 'relative'
        },
        link: {
          cursor: 'pointer',
          position: 'relative',
          padding: '10px 5px',
          display: 'block'
        },
        activeLink: {
          background: '#fff'
        },
        toggle: {
          base: {
            position: 'relative',
            display: 'inline-block',
            verticalAlign: 'top',
            marginLeft: '-5px',
            height: '24px',
            width: '24px'
          },
          wrapper: {
            position: 'absolute',
            top: '50%',
            left: '50%',
            margin: '-9px 0 0 -9px',
            height: '18px'
          },
          height: 14,
          width: 14,
          arrow: {
            fill: '#b00020',
            strokeWidth: 0
          }
        },
        header: {
          base: {
            display: 'inline-block',
            verticalAlign: 'top',
            color: '#b00020'
          },
          connector: {
            width: '2px',
            height: '12px',
            borderLeft: 'solid 2px black',
            borderBottom: 'solid 2px black',
            position: 'absolute',
            top: '0px',
            left: '-21px'
          },
          title: {
            lineHeight: '24px',
            verticalAlign: 'middle'
          }
        },
        subtree: {
          listStyle: 'none',
          paddingLeft: '19px'
        },
        loading: {
          color: '#E2C089'
        }
      }
    }
  };