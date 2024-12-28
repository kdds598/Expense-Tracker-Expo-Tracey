import React from 'react'

export  function AccTxnStyles() {
  return (
    <style>
        {`
      /* Modal Overlay */
    /*  .modal-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1000;
      }*/
    
      /* Modal Content
      .modal-content {
        background: white;
        padding: 20px;
        border-radius: 8px;
        width: 90%;
        max-width: 400px;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
      } */
    
      .modal-content h2 {
        margin-top: 0;
        text-align: center;
      }
    
      .modal-content label {
        display: block;
        margin: 10px 0 5px;
      }
    
      .modal-content input,
      .modal-content select,
      .modal-content textarea {
        width: 100%;
       width: 100%;
        background: white;
        border: none;
        padding: 15px 20px;
        border-radius: 20px;
        margin-top: 15px;
        box-shadow: #cff0ff 0px 10px 10px -5px;
        border-inline: 2px solid transparent;
      }
        textarea{
                height:80px;
}
    
      .modal-content button {
        margin-top: 10px;
        padding: 10px;
        width: 40%;
        border: none;
        border-radius: 4px;
        background: #007bff;
        color: white;
        cursor: pointer;
        transition: background 0.3s;
      }
    
      .modal-content button:hover {
        background: #0056b3;
      }
    
      .modal-content button[type="button"] {
        background: #ccc;
      }
    
      .modal-content button[type="button"]:hover {
        background: #999;
      }







      /*     /////////////////////modal css ////////////////////////////*/


      .Add-acc-modal{
        /* display: none; */
        /* max-width: 350px; */
        background: #F8F9FD;
        background: linear-gradient(0deg, rgb(255, 255, 255) 0%, rgb(244, 247, 251) 100%);
        border-radius: 40px;
        padding: 10px 20px;
        border: 5px solid rgb(255, 255, 255);
        box-shadow: rgba(133, 189, 215, 0.8784313725) 0px 30px 30px -20px;
        margin: 20px;
      }
      
      .Add-acc-modal-heading{
      
        text-align: center;
        font-weight: 900;
        font-size: 30px;
        color: rgb(16, 137, 211);
      
      }
      
      .Add-acc-modaL-input-div{
        display: flex;
        flex-direction: column;
      }
      
      .Add-acc-modal-input,.modal-add-button{
      
      
        /* width: 80%; */
        background: white;
        border: none;
        padding: 15px 20px;
        border-radius: 20px;
        margin-top: 15px;
        box-shadow: #cff0ff 0px 10px 10px -5px;
        border-inline: 2px solid transparent;
      }
      
      .modal-add-button {
        
        
        color: white;
        background: white;
        border: none;
        padding: 15px 20px;
        border-radius: 20px;
        margin-top: 15px;
        box-shadow: #cff0ff 0px 10px 10px -5px;
        font-weight: bold;
        background: linear-gradient(45deg, rgb(16, 137, 211) 0%, rgb(18, 177, 209) 100%);
        box-shadow: rgba(133, 189, 215, 0.8784313725) 0px 20px 10px -15px;
        transition: all 0.2s ease-in-out;
      
      } 
      
      .modal-add-button:hover {
        transform: scale(1.03);
        box-shadow: rgba(133, 189, 215, 0.8784313725) 0px 23px 10px -20px;
      }
      
      .modal-add-button:active {
        transform: scale(0.95);
        box-shadow: rgba(133, 189, 215, 0.8784313725) 0px 15px 10px -10px;
      } 
      
      
      @media (max-width:480px) {
        .acc-modal-labels h3{
          font-size:18px ;
          margin-top: 20px;  }
      }
      @media (max-width: 450px) {
            .Add-acc-modal-heading{
            font-size: 18px;
          }
      
            }
      
        @media (max-width: 366px) {
        
      
            .acc-modal-labels h3{
              font-size: 16px;
            }
      .modal-add-button{
        font-size: 12px;
      }
         
        }
      
    `}
    
   </style>
  )
}
export  function AccHeaderStyles() {
  return (
   <style>
    {`
            //  .modal-content h2 { margin-top: 0; text-align: center; } .modal-content label { display: block; margin: 10px 0 5px; } .modal-content input, .modal-content select, .modal-content textarea { width: 100%; background: white; border: none; padding: 15px 20px; border-radius: 20px; margin-top: 15px; box-shadow: #cff0ff 0px 10px 10px -5px; border-inline: 2px solid transparent; } textarea { height: 80px; } .modal-content button { margin-top: 10px; padding: 10px; border: none; border-radius: 4px; background: #007bff; color: white; cursor: pointer; transition: background 0.3s; width: 40%; } .modal-content button:hover { background: #0056b3; } .modal-content button[type="button"] { background: #ccc; } .modal-content button[type="button"]:hover { background: #999; } .Add-acc-modal { background: #F8F9FD; background: linear-gradient(0deg, rgb(255, 255, 255) 0%, rgb(244, 247, 251) 100%); border-radius: 40px; padding: 10px 20px; border: 5px solid rgb(255, 255, 255); box-shadow: rgba(133, 189, 215, 0.8784313725) 0px 30px 30px -20px; margin: 20px; } .Add-acc-modal-heading { text-align: center; font-weight: 900; font-size: 30px; color: rgb(16, 137, 211); } .Add-acc-modaL-input-div { display: flex; flex-direction: column; } .Add-acc-modal-input, .modal-add-button { background: white; border: none; padding: 15px 20px; border-radius: 20px; margin-top: 15px; box-shadow: #cff0ff 0px 10px 10px -5px; border-inline: 2px solid transparent; } .modal-add-button { color: white; background: linear-gradient(45deg, rgb(16, 137, 211) 0%, rgb(18, 177, 209) 100%); box-shadow: rgba(133, 189, 215, 0.8784313725) 0px 20px 10px -15px; font-weight: bold; transition: all 0.2s ease-in-out; } .modal-add-button:hover { transform: scale(1.03); box-shadow: rgba(133, 189, 215, 0.8784313725) 0px 23px 10px -20px; } .modal-add-button:active { transform: scale(0.95); box-shadow: rgba(133, 189, 215, 0.8784313725) 0px 15px 10px -10px; } @media (max-width:480px) { .acc-modal-labels h3 { font-size: 18px; margin-top: 20px; } } @media (max-width: 450px) { .Add-acc-modal-heading { font-size: 18px; } } @media (max-width: 366px) { .acc-modal-labels h3 { font-size: 16px; } .modal-add-button { font-size: 12px; } }

      .modal-content h2 {
        margin-top: 0;
        text-align: center;
      }
    
      .modal-content label {
        display: block;
        margin: 10px 0 5px;
      }
    
      .modal-content input,
      .modal-content select,
      .modal-content textarea {
  width: 100%;
  background: white;
  border: none;
  padding: 15px 20px;
  border-radius: 20px;
  margin-top: 15px;
  box-shadow: #cff0ff 0px 10px 10px -5px;
  border-inline: 2px solid transparent;
      }
        textarea{
                height:80px;
}   
      .modal-content button {
        margin-top: 10px;
        padding: 10px;
        border: none;
        border-radius: 4px;
        background: #007bff;
        color: white;
        cursor: pointer;
        transition: background 0.3s;
            width: 40%;
      }
    
      .modal-content button:hover {
        background: #0056b3;
      }
    
      .modal-content button[type="button"] {
        background: #ccc;
      }
    
      .modal-content button[type="button"]:hover {
        background: #999;
      }

      /*     /////////////////////modal css ////////////////////////////*/


      .Add-acc-modal{
        /* display: none; */
        /* max-width: 350px; */
        background: #F8F9FD;
        background: linear-gradient(0deg, rgb(255, 255, 255) 0%, rgb(244, 247, 251) 100%);
        border-radius: 40px;
        padding: 10px 20px;
        border: 5px solid rgb(255, 255, 255);
        box-shadow: rgba(133, 189, 215, 0.8784313725) 0px 30px 30px -20px;
        margin: 20px;
      }
      
      .Add-acc-modal-heading{
      
        text-align: center;
        font-weight: 900;
        font-size: 30px;
        color: rgb(16, 137, 211);
      
      }
      
      .Add-acc-modaL-input-div{
        display: flex;
        flex-direction: column;
      }
      
      .Add-acc-modal-input,.modal-add-button{
      
      
        /* width: 80%; */
        background: white;
        border: none;
        padding: 15px 20px;
        border-radius: 20px;
        margin-top: 15px;
        box-shadow: #cff0ff 0px 10px 10px -5px;
        border-inline: 2px solid transparent;
      }
      
      .modal-add-button {
        
        color: white;
        background: white;
        border: none;
        padding: 15px 20px;
        border-radius: 20px;
        margin-top: 15px;
        box-shadow: #cff0ff 0px 10px 10px -5px;
        font-weight: bold;
        background: linear-gradient(45deg, rgb(16, 137, 211) 0%, rgb(18, 177, 209) 100%);
        box-shadow: rgba(133, 189, 215, 0.8784313725) 0px 20px 10px -15px;
        transition: all 0.2s ease-in-out;
      
      } 
      
      .modal-add-button:hover {
        transform: scale(1.03);
        box-shadow: rgba(133, 189, 215, 0.8784313725) 0px 23px 10px -20px;
      }
      
      .modal-add-button:active {
        transform: scale(0.95);
        box-shadow: rgba(133, 189, 215, 0.8784313725) 0px 15px 10px -10px;
      } 
      
      @media (max-width:480px) {
        .acc-modal-labels h3{
          font-size:18px ;
          margin-top: 20px;  }
      }
      @media (max-width: 450px) {
            .Add-acc-modal-heading{
            font-size: 18px;
          }
            }
      
        @media (max-width: 366px) {
        
      
            .acc-modal-labels h3{
              font-size: 16px;
            }
      .modal-add-button{
        font-size: 12px;
      }
         
        } 
    `}
   </style>
  )
}
export  function BHeaderStyles() {
  return (
    <style>
        {`
    
      .modal-content h2 {
        margin-top: 0;
        text-align: center;
      }
    
      .modal-content label {
        display: block;
        margin: 10px 0 5px;
      }
    
      .modal-content input,
      .modal-content select,
      .modal-content textarea {
  
    width: 100%;
    background: white;
    border: none;
    padding: 15px 20px;
    border-radius: 20px;
    margin-top: 15px;
    box-shadow: #cff0ff 0px 10px 10px -5px;
    border-inline: 2px solid transparent;

      }
        textarea{
                height:80px;
}
    
      .modal-content button {
        margin-top: 10px;
        padding: 10px;
        width: 40%;
        border: none;
        border-radius: 4px;
        background: #007bff;
        color: white;
        cursor: pointer;
        transition: background 0.3s;
      }
    
      .modal-content button:hover {
        background: #0056b3;
      }
    
      .modal-content button[type="button"] {
        background: #ccc;
      }
    
      .modal-content button[type="button"]:hover {
        background: #999;
      }





   #delbudgetbum::after{
      content:"Delete Budget";
      }
   @media (max-width:650px) {
 #delbudgetbum::after{
      content:"Del Budget";
      }
      

    }


      /*     /////////////////////modal css ////////////////////////////*/


      .Add-acc-modal{
        /* display: none; */
        /* max-width: 350px; */
        background: #F8F9FD;
        background: linear-gradient(0deg, rgb(255, 255, 255) 0%, rgb(244, 247, 251) 100%);
        border-radius: 40px;
        padding: 10px 20px;
        border: 5px solid rgb(255, 255, 255);
        box-shadow: rgba(133, 189, 215, 0.8784313725) 0px 30px 30px -20px;
        margin: 20px;
      }
      
      .Add-acc-modal-heading{
      
        text-align: center;
        font-weight: 900;
        font-size: 30px;
        color: rgb(16, 137, 211);
      
      }
      
      .Add-acc-modaL-input-div{
        display: flex;
        flex-direction: column;
      }
      
      .Add-acc-modal-input,.modal-add-button{
      
      
        /* width: 80%; */
        background: white;
        border: none;
        padding: 15px 20px;
        border-radius: 20px;
        margin-top: 15px;
        box-shadow: #cff0ff 0px 10px 10px -5px;
        border-inline: 2px solid transparent;
      }
      
      .modal-add-button {
        
        
        color: white;
        background: white;
        border: none;
        padding: 15px 20px;
        border-radius: 20px;
        margin-top: 15px;
        box-shadow: #cff0ff 0px 10px 10px -5px;
        font-weight: bold;
        background: linear-gradient(45deg, rgb(16, 137, 211) 0%, rgb(18, 177, 209) 100%);
        box-shadow: rgba(133, 189, 215, 0.8784313725) 0px 20px 10px -15px;
        transition: all 0.2s ease-in-out;
      
      } 
      
      .modal-add-button:hover {
        transform: scale(1.03);
        box-shadow: rgba(133, 189, 215, 0.8784313725) 0px 23px 10px -20px;
      }
      
      .modal-add-button:active {
        transform: scale(0.95);
        box-shadow: rgba(133, 189, 215, 0.8784313725) 0px 15px 10px -10px;
      } 
      
      
      @media (max-width:480px) {
        .acc-modal-labels h3{
          font-size:18px ;
          margin-top: 20px;  }
      }
      @media (max-width: 450px) {
            .Add-acc-modal-heading{
            font-size: 18px;
          }
      
            }
      
        @media (max-width: 366px) {
        
      
            .acc-modal-labels h3{
              font-size: 16px;
            }
      .modal-add-button{
        font-size: 12px;
      }
         
        }

    `}
      </style>
  )
}
export  function BtxnStyles() {
  return (
    <style>
    {`
  /* Modal Overlay */
/*  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
  }*/

  /* Modal Content
  .modal-content {
    background: white;
    padding: 20px;
    border-radius: 8px;
    width: 90%;
    max-width: 400px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  } */

  .modal-content h2 {
    margin-top: 0;
    text-align: center;
  }

  .modal-content label {
    display: block;
    margin: 10px 0 5px;
  }

  .modal-content input,
  .modal-content select,
  .modal-content textarea {
    width: 100%;
    background: white;
    border: none;
    padding: 15px 20px;
    border-radius: 20px;
    margin-top: 15px;
    box-shadow: #cff0ff 0px 10px 10px -5px;
    border-inline: 2px solid transparent;
  }
    textarea{
            height:80px;
}

  .modal-content button {
    margin-top: 10px;
    padding: 10px;
    width: 40%;
    border: none;
    border-radius: 4px;
    background: #007bff;
    color: white;
    cursor: pointer;
    transition: background 0.3s;
  }

  .modal-content button:hover {
    background: #0056b3;
  }

  .modal-content button[type="button"] {
    background: #ccc;
  }

  .modal-content button[type="button"]:hover {
    background: #999;
  }







  /*     /////////////////////modal css ////////////////////////////*/


  .Add-acc-modal{
    /* display: none; */
    /* max-width: 350px; */
    background: #F8F9FD;
    background: linear-gradient(0deg, rgb(255, 255, 255) 0%, rgb(244, 247, 251) 100%);
    border-radius: 40px;
    padding: 10px 20px;
    border: 5px solid rgb(255, 255, 255);
    box-shadow: rgba(133, 189, 215, 0.8784313725) 0px 30px 30px -20px;
    margin: 20px;
  }
  
  .Add-acc-modal-heading{
  
    text-align: center;
    font-weight: 900;
    font-size: 30px;
    color: rgb(16, 137, 211);
  
  }
  
  .Add-acc-modaL-input-div{
    display: flex;
    flex-direction: column;
  }
  
  .Add-acc-modal-input,.modal-add-button{
  
  
    /* width: 80%; */
    background: white;
    border: none;
    padding: 15px 20px;
    border-radius: 20px;
    margin-top: 15px;
    box-shadow: #cff0ff 0px 10px 10px -5px;
    border-inline: 2px solid transparent;
  }
  
  .modal-add-button {
    
    
    color: white;
    background: white;
    border: none;
    padding: 15px 20px;
    border-radius: 20px;
    margin-top: 15px;
    box-shadow: #cff0ff 0px 10px 10px -5px;
    font-weight: bold;
    background: linear-gradient(45deg, rgb(16, 137, 211) 0%, rgb(18, 177, 209) 100%);
    box-shadow: rgba(133, 189, 215, 0.8784313725) 0px 20px 10px -15px;
    transition: all 0.2s ease-in-out;
  
  } 
  
  .modal-add-button:hover {
    transform: scale(1.03);
    box-shadow: rgba(133, 189, 215, 0.8784313725) 0px 23px 10px -20px;
  }
  
  .modal-add-button:active {
    transform: scale(0.95);
    box-shadow: rgba(133, 189, 215, 0.8784313725) 0px 15px 10px -10px;
  } 
  
  
  @media (max-width:480px) {
    .acc-modal-labels h3{
      font-size:18px ;
      margin-top: 20px;  }
  }
  @media (max-width: 450px) {
        .Add-acc-modal-heading{
        font-size: 18px;
      }
  
        }
  
    @media (max-width: 366px) {
    
  
        .acc-modal-labels h3{
          font-size: 16px;
        }
  .modal-add-button{
    font-size: 12px;
  }
     
    }

`}
  </style>
  )
}
