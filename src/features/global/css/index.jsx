import React from 'react';
import { Global } from '@emotion/react';

const GlobalCss = () => {
	return (
		<Global
			styles={`
            html{
                overflow-x: hidden;
                overflow-y:auto;
                background:white;
                scroll-behavior: smooth;
                // user-select: none; 
                // -webkit-user-select: none;
                scroll-behavior: smooth;
            }
            body, body.chakra-ui-light {
                background:white;
                scroll-behavior: smooth;
                margin-right:0 !important;
                padding:0 !important;
                // -webkit-user-select: none; 
                // -ms-user-select: none; 
                // user-select: none; 
            }
            a,
            a:hover, button, button:hover, input[type="submit"],input[type="submit"]:hover] {
                transition: all 0.4s ease-in-out;
            }
            a.chakra-link:focus {
                box-shadow:none;
            }
            ::-webkit-scrollbar {
              width: 5px;
              height: 10px;
              margin-left: 10px;
            }
            ::-webkit-scrollbar-track {
              box-shadow: inset 0 0 5px gray-300; 
              border-radius: 15px;
       
            }
            ::-webkit-scrollbar-thumb {
              background: var(--chakra-colors-gray-500); 
              border-radius: 10px;
            }
            ::-webkit-scrollbar-thumb:hover {
              background: #28537e; 
            }
            .p-datepicker.p-component{
              z-index: 11111 !important;
            }
            .p-checkbox-box{
								border: 2px solid #003060;
                background-color: #003060;
						}

            // media Query globally
            @media only screen and (max-width: 1023px) {

              }
            @media (min-width: 768px) and (max-width: 1023px) {

              }
            @media (min-width: 980px) and (max-width: 1023px) {
                
              }
            
            `}
		/>
	);
};

export default GlobalCss;
