import styled from 'styled-components'

export const RenderStyle = styled.div`
    .boxButton{
        transition: all 0.2s ease-in-out
        border-radius: 50px
        box-shadow: 10px 10px 15px 10px rgba(0,0,0,0.99)    
    }

    .boxButton:hover{
        box-shadow: 0 0 0 0
    }

    .button{
        border-radius: 50px 
        transition: all 0.4s ease-in-out
        box-shadow: 8px 8px 15px 4px rgba(0,0,0,0.9)
    }
    .button:hover{
        box-shadow: 0 0 0 rgba(0,0,0,0.5)
    }

    .branch{
        box-shadow: 6px 6px 25px 5px rgba(0,0,0,0.9)
    }
    
    @media (min-width: 180px) and (max-width: 400px){ 
        #titleName{ 
            box-shadow: 10px 10px 20px 5px
            transition: all 0.5s ease-in-out
            width: 180px
            height: 30px
        }
        #titleName:focus{
            box-shadow: 0 0 0 rgba(0,0,0,0.9)
            width: 180px
            height: 30px
        }
        .branch{
            height: 50px
        }
        .BranchName{
            font-size: 16px
        }
    }

    @media (min-width: 401px) and (max-width: 992px){ 
        #titleName{ 
            box-shadow: 10px 10px 20px 5px
            transition: all 0.5s ease-in-out
            width: 240px
            height: 40px
        }
        #titleName:focus{
            box-shadow: 0 0 0 rgba(0,0,0,0.9)
            width: 240px
            height: 40px
        }
        .branch{
            height: 70px
        }
        .BranchName{
            font-size: 20px
        }
    }
    @media (min-width: 992px){ 
        #titleName{ 
            box-shadow: 10px 10px 20px 5px
            transition: all 0.5s ease-in-out
            width: 240px
            height: 35px
        }
        #titleName:focus{
            box-shadow: 0 0 0 rgba(0,0,0,0.9)
            width: 240px
            height: 35px
        }
        .BranchName{
            font-size: 24px
        }
        .button{
            margin-right: 10px
        }
    }

`