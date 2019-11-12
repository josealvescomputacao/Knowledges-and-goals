import styled from 'styled-components'

export const RenderStyle = styled.div`
    .title{
        margin: auto 0 auto auto
        word-wrap: break-word
        padding-rigth: 10px
        width: 56%
    }
    .icons{
        width: 22%
        margin: auto 0 auto 0
    }
    .inputs{
        transition: all 0.4s ease-in-out
        box-shadow: 10px 10px 25px 5px rgba(0,0,0,0.9)
    }
    .inputs:focus{
        box-shadow: 0 0 0 rgba(0,0,0,0.9)
    }

    .button{
        transition: all 0.4s ease-in-out
        box-shadow: 8px 8px 18px 6px rgba(0,0,0,0.9)
    }
    .button:hover{
        box-shadow: 0 0 0 rgba(0,0,0,0.5)
    }
`