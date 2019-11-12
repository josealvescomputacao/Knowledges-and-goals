import styled from 'styled-components'

export const RenderStyle = styled.div`
    @media (min-width: 320px)  {    
        #date{
            position:relative
        }
    }
    @media (max-width: 512px)  {   
        #calendar{
            margin-top: 20px
        }
    }
    @media (min-width: 992px){ 
        #date{
            position: absolute
        }
    }

    #topicName{
        position: absolute
        box-shadow: 8px 14px 16px 0px
        border-radius: 5px 
        background: #F3F4DF
        transition: all 0.5s ease-in-out
        top:-5px
    }
    #topicName: focus{
        box-shadow: 0 0 0 0
        top:0px
    }
    #branchName{
        position: absolute
        box-shadow: 8px 14px 16px 0px
        border-radius: 5px 
        background: #F3F4DF
        transition: all 0.5s ease-in-out
        top:-5px
    }
    #branchName: focus{
        box-shadow: 0 0 0 0
        top:0px
    }

    #titleName{ 
        box-shadow: 5px 10px 10px 0px
        border-radius: 5px 
        margin-bottom: 20px
        transition: all 0.5s ease-in-out
        position: absolute
        top:-45px
    }

    #titleName:focus{
        box-shadow: 0 0 0 0
        top:-40px
    }

    #contentName{ 
        position: absolute
        box-shadow: 5px 10px 10px 0px
        border-radius: 5px 
        margin-bottom: 20px
        transition: all 0.5s ease-in-out
        top:-40px
    }
    #contentName:focus{
        box-shadow: 0 0 0 0
        top:-35px
    }

    .inputFile{
        width: 0.1px;
        height: 0.1px;
        opacity: 0;
        overflow: hidden;
        margin-left: -15px
        transition: all 0.5s ease-in-out
        position: absolute;
        marginBottom: 20px;
        z-index: -1;
    }
    .inputFile:hover{
        box-shadow: 0 0 0 0
    }

    .boxButton{
        transition: all 0.2s ease-in-out
        box-shadow: 8px 8px 10px 0px rgba(0,0,0,0.99)     
    }
    .boxButton:hover{
        box-shadow: 0 0 0 0
    }
`
export const PanelStyle = styled.div`  
    .panel{
        position: relative
        background: rgb(36, 40, 42)
        width: 100%
        margin-bottom: 1rem
        transition: all 1s ease-in-out
        border-radius: 4px
        padding: 25px 15px 25px 15px
        top: 0px
        border-left: 3px solid #2600B2 
    }
    .panel:hover{        
        box-shadow: rgba(0, 0, 0, 0.6) 10px 10px 15px 5px; 
        top: -5px
        border-left: 3px solid #00CBFF
    }
    .collapsed{
        top: ${props => props.display === false ? 0 : '100%'}
        width: 100%    
        padding-top: 20px  
    }
}
`
export const PopupStyle = {
    borderRadius: '5px',
    background:'rgba(0, 21, 41, 0)',
    color:'white',
    outline:'0',
    border:'none'
}
