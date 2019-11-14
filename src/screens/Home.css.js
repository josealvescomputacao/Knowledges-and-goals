import styled from 'styled-components'

export const Footer = styled.div`

    @media (min-width: 280px) and (max-width: 552px){ 
        
        span{
            font-size: 16px
        }
        bottom: 20px
        left: 30%
        transform: translate(-20%, 0)

    }

    @media (min-width: 552px) and (max-width: 768px){ 
        
        span{
            font-size: 18px
        }
        bottom: 100px
        left: 50%
        transform: translate(-50%, 0)
    }

    @media (min-width: 768px) and (max-width: 992px){     
        span{
            font-size: 22px
        }
        bottom: 80px
        left: 50%
        transform: translate(-50%, 0)
    }
    @media (min-width: 992px){ 
        span{
            font-size: 24px
        }
        bottom: 35px
        left: 50%
        transform: translate(-50%, 0)

    }

`

export const carousel = {
    width: '75vw', 
    maxHeight:'85vh',
    borderRadius:'10px', 
    margin:'20px auto auto auto', 
    boxShadow:'10px 10px 20px 10px rgba(0,0,0,0.99)',
}

export const titleImage = {
    color:'white', 
    marginBottom:'0', 
    textAlign:'center'
}
