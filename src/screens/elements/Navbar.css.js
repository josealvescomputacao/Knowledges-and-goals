import styled from 'styled-components'

export const RenderStyle = styled.div`
  @media (max-width: 768px)  { 
    #menu{
      position: absolute
      width:200px
      flex-direction: column
      left:0px
      transition: all 1s ease-in-out
      top: ${props => props.displays ? '35px' : '-250px'}
      background: #001529
      opacity: 0.9
      z-index: 1
    } 
    #bars{
      display: block
      margin: 0 auto 0 auto
      cursor: pointer
      color: white
    }
    .links{
      width: 100%
    }
  }

  @media (min-width: 768px)  { 
    #bars{
      display: none
    }   
    #menu{
      z-index:1
      width: 100vw
      padding: 0px 80px 0 0
      postion: absolute
      margin-top: 0
    }   

  }

`