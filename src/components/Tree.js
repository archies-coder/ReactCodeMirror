import React, { Component } from 'react'
import {Treebeard} from 'react-treebeard';
import Modal from 'react-modal';
import Folder from './Folder'
import File from './File'

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
    }
  };


const data = {
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
          modalIsOpen: false,
          value: "Enter",
          activeNode:{}
        };
    }

    openModal = (node)=> {
      console.log(node);
      this.setState({modalIsOpen: true,activeNode:node});
    }
   
   
    closeModal = ()=> {
      this.setState({modalIsOpen: false});
    }


    componentWillMount = () => {
      this.state.data.children.map((child, index)=> {
        const name1 = child.name;
        child.name = <div>HI {name1} <span onClick={(e)=>this.openModal(child,e)}><i className="far fa-plus-square"/></span></div>;
      })
    }

    handleSubmit = (e) =>{
      e.preventDefault();
      const name = e.target.value;
      this.state.activeNode.children.push({name:this.state.value});
      const newData = this.state.data;
      this.setState({data: newData});
      this.closeModal()
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
            isOpen={this.state.modalIsOpen}
            onAfterOpen={this.afterOpenModal}
            onRequestClose={this.closeModal}
            style={customStyles}
            contentLabel="Example Modal"
            >
              <form onSubmit={(e)=>{this.handleSubmit(e)}}>
              <input type="text" value={this.state.value} onChange={(e)=>{this.handleChange(e)}} />
                <input type="submit" value="ENTER"/>
              </form>

            </Modal>
            <Treebeard
              data={this.state.data}
              onToggle={this.onToggle}
              style = {style}
            />
          </React.Fragment>
                
        )
    }
}


const style = {
    tree: {
      base: {
        listStyle: 'none',
        backgroundColor: '#21252B',
        margin: '10px',
        padding: '10px',
        color: '#9DA5AB',
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
          background: '#31363F'
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
            fill: '#9DA5AB',
            strokeWidth: 0
          }
        },
        header: {
          base: {
            display: 'inline-block',
            verticalAlign: 'top',
            color: '#9DA5AB'
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