import React, { Component } from 'react'
import {Treebeard} from 'react-treebeard';

const data = {
    name: 'root',
    toggled: true,
    children: [
        {
            name: 'parent1',
            children: [
                { name: 'child1' },
                { name: 'child2' }
            ]
        },
        {
            name: 'teacher1',
            // loading: true,
            children: [
                {name: 'student1'},
                {name: 'student2'},
            ]
        },
        {
            name: 'parent',
            children: [
                {
                    name: 'nested parent',
                    children: [
                        { name: 'nested child 1' },
                        { name: 'nested child 2' }
                    ]
                }
            ]
        }
    ]
};
export default class Tree extends Component {
    constructor(props){
        super(props);
        this.state = {data};
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
        const {data} = this.state;
        return (
                <Treebeard
                data={data}
                onToggle={this.onToggle}
                style = {style}
                />
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