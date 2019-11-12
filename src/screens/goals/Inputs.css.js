import styled from 'styled-components'

export const RenderStyle = styled.div`
    @media (max-width: 768px)  { 
        #deleteIcon{
            position: absolute
            right: 20px
            top: 50%
            transform: translate(0%, -50%)
        }
    }
    .title{
        margin: auto 0 auto 13%
        word-wrap: break-word
        padding-right: 10px
        width: 70%
    }
    #deleteIcon{
        width: 10%
        margin: auto 0 auto auto
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