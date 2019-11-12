import styled from 'styled-components'

export const RenderStyle = styled.div`
    .boxButton{
        transition: all 0.2s ease-in-out
        borderRadius: 10px
        box-shadow: 8px 8px 10px 0px rgba(0,0,0,0.99)     
    }
    .boxButton:hover{
        box-shadow: 0 0 0 0 
    }
    #branchName{
        color: blue
        font-weight:700
        margin: -15px 0 0 10px
        position: absolute
        cursor: help
    }
    #topicName{
        color: white
        position: absolute
        margin: 20px 0 0 10px
        cursor: help
    }
    #search{
        background: #CEECF5
    }
`

export const PanelStyle = styled.div`  
    .panel{
        position: relative;
        width: 100%;
        margin-bottom: 1rem;
        transition: all 0.5s ease-in-out
        border-radius: 4px;
        padding: 25px 15px 25px 15px;
        
        top: 0px;
        border-left: 3px solid #2600B2;
        
    }
    .panel:hover{        
        box-shadow: rgba(0, 0, 0, 0.6) 10px 10px 15px 3px; 
        top: -5px;
        border-left: 3px solid #00CBFF;
    }
    .collapsed{
        top: ${props => props.display === false ? 0 : '100%'}    
        padding-top: 20px
    }
}
`

export const PopupStyle = {
    borderRadius: '5px',
    background:'rgba(0, 21, 41, 0)'
}