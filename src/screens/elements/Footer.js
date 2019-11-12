import React, { Fragment } from 'react'

const style = {
    margin:'0', 
    position:'fixed', 
    width:'100%', 
    borderRadius:'10px', 
    height:'150px', 
    top:'97vh', 
    background:'rgba(0, 21, 41, 1)', 
    boxShadow:'0px -8px 20px 5px rgba(0,0,0,0.9)', 
    textAlign:'center', 
    zIndex:'2'
}

export const Footer = () => {
    return (
        <Fragment>
            <div style={style}></div>
        </Fragment>
    )
}