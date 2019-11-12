import styled from 'styled-components'

export const RenderStyle = styled.div`
    @media (min-width: 320px)  { 
        #title{
            position:relative
            top: 50px
            text-align: center
        }
        h1{
            font-size: 26px
        }
    }
    @media (max-width: 512px)  {   
        #calendar{
            margin-top: 20px
        }
    }
    @media (min-width: 992px){ 
        #title{
            top: 0
            position: absolute
        }
        h1{
            font-size: 32px
        }
    }
    #fields{ 
        box-shadow: 10px 10px 10px 0px
        border-radius: 5px 
        z-index: 1
        transition: all 0.5s ease-in-out
        top:-40px
    }
    #fields:focus{
        box-shadow: 0 0 0 0
        border-radius: 5px 
        z-index: 1
        top:-35px
    }

    #fieldLanguage{ 
        box-shadow: 10px 10px 10px 0px
        border-radius: 5px 
        z-index: 1
        transition: all 0.5s ease-in-out
        top:-35px
    }
    #fieldLanguage:focus{
        box-shadow: 0 0 0 0
        top:-34px
        z-index: 1
    }

    #fieldPassword{ 
        box-shadow: 5px 5px 10px 0px
        border-radius: 5px 
        transition: all 0.5s ease-in-out
        top:-40px
    }
    #fieldPassword:focus{
        box-shadow: 0 0 0 0
        top:-35px
    }

    #boxButton{
        transition: all 0.5s ease-in-out
        box-shadow: 10px 10px 10px 0px rgba(0,0,0,0.99)    
    }
    #boxButton:hover{
        box-shadow: 0 0 0 0 rgba(0,0,0,0.99) 
    }
`