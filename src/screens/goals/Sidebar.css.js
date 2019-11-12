import styled from 'styled-components'

export const BodySidebar = styled.div` 
    @media (max-width: 768px)  { 
        #sidebar{
            max-width: 180px
        }
    }
    @media (min-width: 768px) and (max-width: 992px) { 
        #sidebar{
            max-width: 250px
        }
    }
    @media (min-width: 992px)  { 
        #sidebar{
            max-width: 350px 
        }
    }
    .button{
        transition: all 0.4s ease-in-out
        box-shadow: 8px 8px 18px 6px rgba(0,0,0,0.9)
    }
    .button:hover{
        box-shadow: 0 0 0 rgba(0,0,0,0.5)
    }
`
export const PopupStyle = {
    borderRadius: '5px',
    background:'rgba(0, 21, 41, 0)'
}