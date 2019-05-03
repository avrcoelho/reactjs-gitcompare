import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin-top: 50px;
`;

export const Repository = styled.div`
     width: 250px;
     background: #fff;
     border-radius: 3px;
     display:flex;
     flex-direction: column;
     margin: 0 10px 50px 10px;

     header {
         padding: 30px;
         display: flex;
         flex-direction: column;
         align-items: center;

        strong {
            font-size: 24px;
            margin-top: 10px;
        }

        small {
            font-size: 14px;
            color: #666
        }

        img {
            width: 64px;
        }
     }

     ul {
         list-style: none;

         li {
             font-weight: bold;
             padding: 12px 20px;

             small {
                 font-weight: normal;
                 font-size: 12px;
                 color: #999;
                 font-style: italic;
             }
             /* aplica e todos os impares */
             &:nth-child(2n -1 ) {
                 background: #f5f5f5;
             }
         }
     }

     .button-container {
         display: flex;
         flex-direction: column;
         align-items: center;
         justify-content: center;

         .update {
            height: 30px;
            width: 120px;
            margin-bottom: 15px;
            padding: 0 20px;
            background: #6382f5;
            color: #fff;
            font-size: 15px;
            border: 0;
            font-weight: bold;
            border-radius: 3px;
            cursor: pointer;

            &:hover {
                background: #3e64f3;
            }
         }
         .remove {
            height: 30px;
            width: 120px;
            margin-bottom: 15px;
            padding: 0 20px;
            background: #f56363;
            color: #fff;
            font-size: 15px;
            border: 0;
            font-weight: bold;
            border-radius: 3px;
            cursor: pointer;

            &:hover {
                background: #f74c4c;
            }
         }
     }
 `;
