
import styled from 'styled-components'

export const SettingBody = styled.div` 
    @media (max-width: 768px)  { 
        #image{
            text-align: center 
            margin-bottom: 20px
        }
    }
    @media (max-width: 992px)  { 
        #deleteAccount{
            position: relative
            margin-top: ${props => props.visible ? '-105px' : '-50px'}
            transition: all 1s ease-in-out
            width:100%
            z-index:0
        }
    }
    @media (min-width: 992px)  { 
        #deleteAccount{
            position: absolute
            margin-top: -50px
            left: ${props => props.visible ? '21%' : '0'}
            transition: all 1s ease-in-out
            width:100%
            z-index:0
        }
    }

    #all{
        margin-top: 40px
        text-align:center
    }

    #fieldsWhitoutPassword{ 
        box-shadow: 10px 10px 10px 0px
        border-radius: 5px 
        transition: all 0.5s ease-in-out
    }
    #fieldsWhitoutPassword:focus{
        box-shadow: 0 0 0 0
    }
    #password{
        box-shadow: 10px 10px 10px 0px
        border-radius: 5px 
        transition: all 0.5s ease-in-out
    }
    #password:focus{
        box-shadow: 0 0 0 0
    }
    #passwordConfirm{
        box-shadow: 10px 10px 10px 0px
        border-radius: 5px 
        transition: all 0.5s ease-in-out
    }
    #passwordConfirm:focus{
        box-shadow: 0 0 0 0
    }

    #boxButton{
        transition: all 0.3s ease-in-out
        box-shadow: 12px 12px 10px 0px rgba(0,0,0,0.7)    
    }
    #boxButton:hover{
        box-shadow: 0 0 0 0 rgba(0,0,0,0.5) 
    }
}
`