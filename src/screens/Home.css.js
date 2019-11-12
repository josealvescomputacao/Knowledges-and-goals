import styled from 'styled-components'

export const Footer = styled.div`
    @media (max-width: 320px)  {             
        span{
            font-size: 16px
        }
    }

    @media (min-width: 320px) and (max-width: 552px){ 
        
        span{
            font-size: 18px
        }
    }

    @media (min-width: 552px) and (max-width: 768px){ 
        
        span{
            font-size: 20px
        }
    }

    @media (min-width: 768px) and (max-width: 992px){     
        span{
            font-size: 22px
        }
    }
    @media (min-width: 992px){ 
        span{
            font-size: 24px
        }
    }

`

export const carousel = {
    width: '75vw', 
    overflowX: 'hidden',
    borderRadius:'10px', 
    margin:'20px auto auto auto', 
    boxShadow:'10px 10px 20px 10px rgba(0,0,0,0.99)'
}

export const titleImage = {
    color:'white', 
    marginBottom:'0', 
    textAlign:'center'
}
