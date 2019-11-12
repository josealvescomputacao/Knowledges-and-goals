import styled from 'styled-components'

export const RenderStyle = styled.div`
    @media (max-width: 768px)  { 
        #component{
            margin:0 2vw 0 1vw
        }
    }
    @media (min-width: 768px) and (max-width: 992px) { 
        #component{
            margin: 0 7vw 0 3vw
        }
    }
    @media (min-width: 992px) and (max-width: 1200px){ 
        #component{
            margin: 0 10vw 0 6vw 
        }
    }
    @media (min-width: 1200px) { 
        #component{
            margin: 0 14vw 0 14vw 
        }
    } 
    #component{
        width: 100%
        overflow:auto
    }
`