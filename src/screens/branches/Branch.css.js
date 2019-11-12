import styled from 'styled-components'

export const PopupStyle = {
    borderRadius: '5px',
    background:'rgba(0, 21, 41, 0)',
    color:'white',
    outline:'0',
    border:'none'
}

export const RenderStyle = styled.div`
    .button{
        transition: all 0.4s ease-in-out
        box-shadow: 8px 8px 15px 4px rgba(0,0,0,0.9) 
    }
    .button:hover{
        box-shadow: 0 0 0 rgba(0,0,0,0.5)
    }
    #search{
        background: #CEECF5
    }

    @media (min-width: 180px) and (max-width: 400px){ 
        .button{
            transition: all 0.4s ease-in-out
            box-shadow: 8px 8px 15px 4px rgba(0,0,0,0.9) 
        }
        .button:hover{
            box-shadow: 0 0 0 rgba(0,0,0,0.5)
        }
        #seach{
            top: 100vh
            position: fixed
        }
    }

`

