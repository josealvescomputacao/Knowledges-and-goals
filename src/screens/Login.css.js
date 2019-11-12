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
        h2{
            font-size: 20px
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
  
        h2{
            font-size: 26px
        }
    }

    #fieldEmail{ 
        box-shadow: 10px 10px 10px 0px
        border-radius: 5px 
        transition: all 0.5s ease-in-out
        top:-40px
    }
    #fieldEmail:focus{
        box-shadow: 0 0 0 0
        top:-35px
    }

    #fieldPassword{ 
        box-shadow: 6px 6px 10px 0px
        transition: all 0.5s ease-in-out
        top:-40px
    }
    #fieldPassword:focus{
        box-shadow: 0 0 0 0
        top:-35px
    }

    #boxButton{
        transition: all 0.5s ease-in-out
        box-shadow: 12px 12px 10px 0px rgba(0,0,0,0.7)    
    }
    #boxButton:hover{
        box-shadow: 0 0 0 0 rgba(0,0,0,0.5) 
    }

`