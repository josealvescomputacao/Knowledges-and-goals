import styled from 'styled-components'


const BodyAccount = styled.div`


    .social_icon{
        position: absolute;
        right: 20px;
        top: -45px;
    }

    .social_icon ul{
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-90%, 100%);
        margin: 0;
        padding: 0;
        display: flex;

    }
    .social_icon ul li{
        list-style: none;
        margin: 0 20px;
        cursor: pointer

    }
    /*.social_icon ul li .fab{
        font-size: 26px;
        color: #262626;
        line-height: 40px;
        transition: .5s;

    }*/
    .social_icon ul li span{
        position: relative;
        display: block;
        width: 40px;
        height: 40px;
        background-color: #fff;
        text-align: center;
        transform: perspective(100px) rotate(-30deg) skew(25deg) translate(0,0);
        transition: .5s;
        box-shadow: -20px 30px 15px 5px rgb(0, 0, 0, 0.9);
    }
    .social_icon ul li span::before{
        content: "";
        position: absolute;
        top: 10px;
        left: -20px;
        height: 100%;
        width: 20px;
        background: #777777;
        transition: .5s;
        transform: rotate(0deg) skewY(-45deg);
    }
    .social_icon ul li span::after{
        content: "";
        position: absolute;
        top: 40px;
        left: -11px;
        height: 20px;
        width: 100%;
        background: #b1b1b1;
        transition: .5s;
        transform: rotate(0deg) skewX(-45deg);
    }
    .social_icon ul li:hover{
        color: #fff;
    }
    .social_icon ul li span:hover{
        transform: perspective(1000px) rotate(-30deg) skew(25deg) translate(20px, -20px);
        box-shadow: -20px 60px 25px 10px rgb(0, 0, 0, 0.5);
    }
    .social_icon ul li:hover:nth-child(1) span{
        background: #3b5999;
    }

    .social_icon ul li:hover:nth-child(1) span:before{
        background: #2e4a86;
    }
    .social_icon ul li:hover:nth-child(1) span:after{
        background: #4a69ad;
    }

    .social_icon ul li:hover:nth-child(2) span{
        background: #dd4b39;
    }

    .social_icon ul li:hover:nth-child(2) span:before{
        background: #c13929;
    }
    .social_icon ul li:hover:nth-child(2) span:after{
        background: #e83322;
    }            

`

export default BodyAccount